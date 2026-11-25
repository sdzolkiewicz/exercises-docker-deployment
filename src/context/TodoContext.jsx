import React, { createContext, useReducer, useCallback, useMemo, useEffect} from 'react';
import { todoReducer } from '../reducers/todoReducer';
import { useLocalStorage } from '../hooks/useLocalStorage'

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [storedTodos, setStoredTodos] = useLocalStorage('todos', []);
  const [state, dispatch] = useReducer(todoReducer, {
    todos: storedTodos,
    error: null,
  });

  useEffect(() => {
    setStoredTodos(state.todos);
  }, [state.todos, setStoredTodos]);

  const addTodo = useCallback((text) => {
    dispatch({ type: 'ADD_TODO', payload: text });
  }, [dispatch]);

  const deleteTodo = useCallback((id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  }, [dispatch]);

  const toggleComplete = useCallback((id) => {
    dispatch({ type: 'TOGGLE_COMPLETE', payload: id });
  }, [dispatch]);

  const editTodo = useCallback((id, text) => {
    dispatch({ type: 'EDIT_TODO', payload: { id, text } });
  }, [dispatch]);

  const clearCompletedTodos = useCallback(() => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  }, [dispatch]);

  const clearError = useCallback(() => {
    dispatch({ type: "CLEAR_ERROR" });
  }, [dispatch]);

  const contextValue = useMemo(() => ({
    todos: state.todos,
    error: state.error,
    addTodo,
    deleteTodo,
    toggleComplete,
    editTodo,
    clearCompletedTodos,
    clearError,
  }), [
    state.todos,
    state.error,
    addTodo,
    deleteTodo,
    toggleComplete,
    editTodo,
    clearCompletedTodos,
    clearError,
  ]);

  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  );
};

