import React, { useState, useContext, useCallback, useMemo, useRef, useEffect } from 'react';
import { TodoContext } from '../context/TodoContext';
import { useValidation } from '../hooks/useValidation';
import deleteIcon from '../assets/delete.png';
import writeIcon from '../assets/write.png';
import cancelIcon from '../assets/close.png';
import saveIcon from '../assets/check.png';
import styles from '../styles/TodoItem.module.css';


const TodoItem = ({ todo }) => {
    const { deleteTodo, error: appError, toggleComplete, editTodo, todos: allTodos, clearError } = useContext(TodoContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(todo.text);
    const inputRef = useRef(null);
    const { error: editError, isValid: isEditValid } = useValidation(editedText, allTodos, todo.id);

    useEffect(() => {
        if (inputRef.current)
            inputRef.current.focus();
    }, [isEditing])

    const handleDelete = useCallback(() => {
        deleteTodo(todo.id);
        clearError();
    }, [deleteTodo, todo.id, clearError]);

    const handleToggleComplete = useCallback(() => {
        toggleComplete(todo.id);
        clearError();
    }, [toggleComplete, todo.id, clearError]);

    const handleEdit = useCallback(() => {
        setIsEditing(true);
        clearError();
    }, [clearError]);

    const handleSaveEdit = useCallback(() => {
        if (editError) {
            if (inputRef.current)
                inputRef.current.focus();
            alert(`Error: ${editError}`);
            return;
        }
        editTodo(todo.id, editedText);
        setIsEditing(false);
        clearError();
    }, [editTodo, todo.id, editedText, isEditValid, editError, clearError]);

    const handleCancelEdit = useCallback(() => {
        setEditedText(todo.text);
        setIsEditing(false);
        clearError();
    }, [todo.text, clearError]);

    return (<li key={todo.text} className={styles.todo__task}>

        <div className={todo.completed ? `${styles.todo__textarea} ${styles['todo__textarea--completed']}` : styles.todo__textarea}>
            <label className={styles.container}>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={handleToggleComplete}
                />
                <span className={styles.checkmark}></span>
            </label>
            {isEditing ?
                <input
                    ref={inputRef}
                    className={styles.todo__input}
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                />

                : <p>{todo.text}</p>}</div>
        <div className={styles.todo__buttons}>
            {isEditing ? <>
                <div className={styles.todo__button} onClick={handleSaveEdit}><img src={saveIcon} alt="save edit button" /></div>
                <div className={styles.todo__button} onClick={handleCancelEdit}><img src={cancelIcon} alt="cancel edit button" /></div>
            </> : <>
                <div className={styles.todo__button} onClick={handleEdit}><img src={writeIcon} alt="write button" /></div>
                <div className={styles.todo__button} onClick={handleDelete}><img src={deleteIcon} alt="delete button" /></div>
            </>}</div>
    </li>);
};

export default React.memo(TodoItem);
