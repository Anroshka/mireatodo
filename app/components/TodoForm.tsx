'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo, saveTodosToStorage } from '../store/features/todoSlice';

export default function TodoForm() {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (text.trim()) {
      dispatch(addTodo({ text: text.trim() }));
      
      setTimeout(() => {
        dispatch(saveTodosToStorage() as any);
      }, 100);
      
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Добавить новую задачу..."
          className="flex-1 p-3 border dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit"
          className="btn btn-primary"
          disabled={!text.trim()}
        >
          Добавить
        </button>
      </div>
    </form>
  );
} 