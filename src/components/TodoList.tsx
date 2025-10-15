import React from 'react';
import { Todo } from '../types';
import TodoItem from './TodoItem';


interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, newText: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo, deleteTodo, editTodo }) => {
  if (todos.length === 0) {
    return (
      <div className="text-center p-8 mt-6 bg-gray-50 rounded-xl text-gray-500 shadow-md">
        <p className="text-xl font-medium">Список задач пуст.</p>
        <p className="mt-2 text-sm">Начните, добавив новую задачу выше!</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3 mt-6">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
