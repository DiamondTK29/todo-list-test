export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export type FilterType = 'all' | 'active' | 'completed';

export const LOCAL_STORAGE_KEY = 'react-todo-list-ts-tasks';
