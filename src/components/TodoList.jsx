import React, { useMemo } from 'react';
import TodoItem from './TodoItem';
import styles from '../styles/TodoList.module.css';

const TodoList = ({ todos }) => {
    const memoizedTodoItems = useMemo(() => {
        const sortedTodos = [...todos].sort((a, b) => {
            if (a.completed && !b.completed) return 1;
            if (!a.completed && b.completed) return -1;
            return 0;
        });

        return sortedTodos.map((todo) => (
            <TodoItem
                key={todo.id}
                todo={todo}
            />
        ));
    }, [todos]);

    return (
        <ul className={styles.todo__list}>
            {memoizedTodoItems}
        </ul>
    );
}

export default React.memo(TodoList);