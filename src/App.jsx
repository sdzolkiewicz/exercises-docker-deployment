import { useState, useRef, useContext, useCallback, useEffect } from 'react'
import TodoInput from './components/TodoInput'
import { TodoContext } from './context/TodoContext'
import { useValidation } from './hooks/useValidation';
import { useHasCompletedTodos } from './hooks/useHasCompletedTodos';
import TodoList from './components/TodoList'
import styles from './styles/App.module.css';

function App() {
  const { todos, error: appError, addTodo, clearError, clearCompletedTodos } = useContext(TodoContext);
  const inputRef = useRef(null);
  const [newTodoText, setNewTodoText] = useState('');
  const { error: inputError, isValid: isValidInput } = useValidation(newTodoText, todos, null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const hasCompleted = useHasCompletedTodos(todos);
  
  const handleAddTodo = useCallback(() => {
    if (!isValidInput) {
      return;
    }

    addTodo(newTodoText);

    setNewTodoText('');

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [newTodoText, addTodo, isValidInput, clearError, todos]);

  const handleFocus = useCallback(() => {
    setIsInputFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsInputFocused(false);
    clearError();
  }, []);

  return (
    <div className={styles.todo}>
      <TodoInput
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        onAddTodo={handleAddTodo}
        onFocus={handleFocus}
        onBlur={handleBlur}
        isValid= {isValidInput}
        inputRef={inputRef}
      />
      {inputError && isInputFocused && <p className={styles.error}>{inputError}</p>}
      <TodoList todos={todos} />
      {hasCompleted && (
          <button className={styles.todo__button} onClick={clearCompletedTodos}>
            Clear Completed
          </button>
        )}
    </div>
  )
}

export default App
