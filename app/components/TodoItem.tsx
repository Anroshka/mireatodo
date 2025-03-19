'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo, removeTodo, editTodo, saveTodosToStorage, Todo } from '../store/features/todoSlice';

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleToggle = () => {
    dispatch(toggleTodo({ id: todo.id }));
    setTimeout(() => {
      dispatch(saveTodosToStorage() as any);
    }, 100);
  };

  const handleDelete = () => {
    dispatch(removeTodo({ id: todo.id }));
    setTimeout(() => {
      dispatch(saveTodosToStorage() as any);
    }, 100);
  };

  const handleEdit = () => {
    if (editedText.trim() !== '') {
      dispatch(editTodo({ id: todo.id, text: editedText }));
      setTimeout(() => {
        dispatch(saveTodosToStorage() as any);
      }, 100);
      setIsEditing(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className={`task-item ${todo.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="flex-1 p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
            autoFocus
          />
          <button 
            onClick={handleEdit}
            className="btn btn-primary"
          >
            Сохранить
          </button>
          <button 
            onClick={() => {
              setIsEditing(false);
              setEditedText(todo.text);
            }}
            className="btn btn-danger"
          >
            Отмена
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={handleToggle}
                className="w-5 h-5 cursor-pointer"
              />
              <span 
                className={`text-lg ${todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200'}`}
              >
                {todo.text}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 text-blue-500 hover:text-blue-700"
                aria-label="Редактировать задачу"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 0L11.828 15.9l-4.242.707.707-4.242 9.9-9.9z" />
                </svg>
              </button>
              <button
                onClick={handleDelete}
                className="p-1 text-red-500 hover:text-red-700"
                aria-label="Удалить задачу"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Создано: {formatDate(todo.createdAt)}
          </div>
        </>
      )}
    </div>
  );
} 