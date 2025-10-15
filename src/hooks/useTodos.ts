import { useState, useEffect, useMemo, useCallback } from 'react';
import { Todo, FilterType, LOCAL_STORAGE_KEY } from '../types';


export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      }
    } catch (e) {
      console.error("Ошибка при загрузке задач из localStorage", e);
    } finally {
      setIsReady(true);
    }
  }, []);


  useEffect(() => {
    if (isReady) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
      } catch (e) {
        console.error("Ошибка при сохранении задач в localStorage", e);
      }
    }
  }, [todos, isReady]);



  const addTodo = useCallback((text: string) => {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: trimmedText,
      completed: false,
    };

    setTodos(prev => [newTodo, ...prev]);
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const editTodo = useCallback((id: string, newText: string) => {
    const trimmedText = newText.trim();
    if (!trimmedText) return deleteTodo(id);

    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, text: trimmedText } : todo
      )
    );
  }, [deleteTodo]);


  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    });
  }, [todos, filter]);


  const activeCount = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);


  return {
    filteredTodos,
    filter,
    activeCount,
    setFilter,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
  };
};
