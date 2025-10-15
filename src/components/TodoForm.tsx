import React, { useState } from 'react';

interface TodoFormProps {
  addTodo: (text: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    addTodo(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 p-4 bg-white rounded-xl shadow-lg border border-gray-100">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Что нужно сделать?"
        aria-label="Новая задача"
        className="flex-grow p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
      />
      <button
        type="submit"
        disabled={!input.trim()}
        className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 disabled:opacity-50 transition duration-150 transform hover:scale-[1.01] active:scale-[0.99]"
      >
        Добавить
      </button>
    </form>
  );
};

export default TodoForm;
