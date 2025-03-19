import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './features/todoSlice';
import themeReducer from './features/themeSlice';

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    theme: themeReducer,
  },
  // Добавляем middleware для логирования в development режиме
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false, // Отключаем проверку на сериализуемость для поддержки дат
    }),
});

// Типы для TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 