import { useMemo } from 'react';

export function useHasCompletedTodos(todos) {
  const hasCompleted = useMemo(() => {
    return todos.some(todo => todo.completed);
  }, [todos]);

  return hasCompleted;
}