import React from 'react';

import useTodos from './hooks/useTodos.tsx';


import TodoForm from './components/TodoForm.tsx';
import TodoList from './components/TodoList.tsx';
import FilterButtons from './components/FilterButtons.tsx';


const App: React.FC = () => {

  const {
    filteredTodos,
    filter,
    activeCount,
    setFilter,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 font-sans">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-8 tracking-tight">
          React Todo List (TS)
        </h1>


        <TodoForm addTodo={addTodo} />


        <FilterButtons
          filter={filter}
          setFilter={setFilter}
          activeCount={activeCount}
        />


        <TodoList
          todos={filteredTodos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />


        <p className="text-center text-xs text-gray-500 mt-8">
          * Чтобы отредактировать задачу, дважды кликните по тексту, или нажмите на иконку карандаша.
        </p>

      </div>
    </div>
  );
};

export default App;
