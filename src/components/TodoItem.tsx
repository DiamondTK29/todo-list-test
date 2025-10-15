import React, { useState } from 'react';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  toggleTodo,
  deleteTodo,
  editTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    // Сохраняем изменения и выходим из режима редактирования
    editTodo(todo.id, editText);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEdit();
    }
    if (e.key === 'Escape') {
      setIsEditing(false);
      setEditText(todo.text); // Отмена изменений
    }
  };

  const handleToggle = () => {
      toggleTodo(todo.id);
  }

  // Режим редактирования
  if (isEditing) {
    return (
      <li className="flex items-center p-4 bg-yellow-50 rounded-xl shadow-inner border border-yellow-200 transition duration-150 ease-in-out">
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit} // Сохранение при потере фокуса
          onKeyDown={handleKeyDown}
          autoFocus
          className="flex-grow p-2 border border-yellow-500 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-600 transition duration-150"
        />
        <button
          onClick={handleEdit}
          className="ml-3 px-4 py-2 bg-yellow-600 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-700 transition duration-150"
        >
          ✓ Save
        </button>
      </li>
    );
  }

  // Режим просмотра
  return (
    <li
      className={`flex items-center justify-between p-4 rounded-xl shadow-md transition duration-200 ease-in-out cursor-pointer
        ${todo.completed ? 'bg-green-100/70 border-l-4 border-green-500 opacity-70' : 'bg-white hover:bg-indigo-50 border-l-4 border-transparent'}`}
      onDoubleClick={() => setIsEditing(true)}
    >
      <div className="flex items-center flex-grow min-w-0" onClick={handleToggle}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => {}} // Обрабатываем переключение через div клик для UX
          className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
          aria-label="Отметить как выполненное"
        />
        <span
          className={`ml-4 text-lg truncate min-w-0 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}
        >
          {todo.text}
        </span>
      </div>

      <div className="flex items-center space-x-2 ml-4">
        {/* Кнопка Редактировать */}
        <button
          onClick={() => setIsEditing(true)}
          className="p-2 text-indigo-500 hover:text-indigo-700 rounded-full transition duration-150 hover:bg-indigo-100"
          aria-label="Редактировать задачу"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-7.586 7.586l3.636-3.636L14 8.54V11H6.5v-2.5zm11.414-1.414L16.586 8.54l-2.828-2.828-.793.793 2.828 2.828zM15 11h2.5a.5.5 0 010 1H15v-1zm0 3h-3v-1h3v1zm0 3h-5v-1h5v1z" />
          </svg>
        </button>

        {/* Кнопка Удалить */}
        <button
          onClick={() => deleteTodo(todo.id)}
          className="p-2 text-red-500 hover:text-red-700 rounded-full transition duration-150 hover:bg-red-100"
          aria-label="Удалить задачу"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 100 2v6a1 1 0 100-2V8z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
