'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import { fetchTodos, clearCompleted, saveTodosToStorage } from '../store/features/todoSlice';
import { RootState } from '../store';

export default function TodoList() {
  const dispatch = useDispatch();
  const { todos, loading, error } = useSelector((state: RootState) => state.todos);

  // Загружаем задачи при монтировании компонента
  useEffect(() => {
    dispatch(fetchTodos() as any);
  }, [dispatch]);

  const handleClearCompleted = () => {
    dispatch(clearCompleted());
    setTimeout(() => {
      dispatch(saveTodosToStorage() as any);
    }, 100);
  };

  if (loading) {
    return <div className="text-center py-4">Загрузка задач...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Ошибка: {error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold dark:text-white">Список задач</h2>
        <button 
          onClick={handleClearCompleted}
          className="btn btn-danger"
          disabled={!todos.some(todo => todo.completed)}
        >
          Удалить завершенные
        </button>
      </div>

      {todos.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Список задач пуст. Добавьте новую задачу!
        </div>
      ) : (
        <div className="space-y-2">
          {todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  );
} 