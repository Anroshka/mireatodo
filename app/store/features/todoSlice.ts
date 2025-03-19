import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  cache: {
    lastUpdated: number;
  };
}

// Имитируем задержку сети для асинхронных операций
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Вспомогательная функция для проверки доступности localStorage
const isLocalStorageAvailable = () => {
  return typeof window !== 'undefined' && window.localStorage !== undefined;
};

// Асинхронные thunk actions
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  try {
    await delay(500);
    if (isLocalStorageAvailable()) {
      const storedTodos = localStorage.getItem('todos');
      return storedTodos ? JSON.parse(storedTodos) : [];
    }
    return [];
  } catch (error) {
    console.error('Failed to fetch todos from localStorage', error);
    return [];
  }
});

export const saveTodosToStorage = createAsyncThunk('todos/saveTodosToStorage', 
  async (_, { getState }: any) => {
    try {
      const { todos } = getState().todos as TodoState;
      await delay(300);
      if (isLocalStorageAvailable()) {
        localStorage.setItem('todos', JSON.stringify(todos));
      }
      return true;
    } catch (error) {
      console.error('Failed to save todos to localStorage', error);
      throw error;
    }
  }
);

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
  cache: {
    lastUpdated: Date.now(),
  },
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ text: string }>) => {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: action.payload.text,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      state.todos.push(newTodo);
      state.cache.lastUpdated = Date.now();
    },
    toggleTodo: (state, action: PayloadAction<{ id: string }>) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.completed = !todo.completed;
        state.cache.lastUpdated = Date.now();
      }
    },
    editTodo: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
        state.cache.lastUpdated = Date.now();
      }
    },
    removeTodo: (state, action: PayloadAction<{ id: string }>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
      state.cache.lastUpdated = Date.now();
    },
    clearCompleted: (state) => {
      state.todos = state.todos.filter(todo => !todo.completed);
      state.cache.lastUpdated = Date.now();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
        state.cache.lastUpdated = Date.now();
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при загрузке задач';
      })
      .addCase(saveTodosToStorage.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка при сохранении задач';
      });
  },
});

export const { addTodo, toggleTodo, editTodo, removeTodo, clearCompleted } = todoSlice.actions;

export default todoSlice.reducer; 