'use client';

import React from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import ThemeToggle from './ThemeToggle';

export default function Todo() {
  return (
    <div className="min-h-screen transition-colors dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            Todo Приложение
          </h1>
          <ThemeToggle />
        </div>
        <TodoForm />
        <TodoList />
      </div>
    </div>
  );
} 