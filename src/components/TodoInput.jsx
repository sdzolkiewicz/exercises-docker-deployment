import styles from '../styles/TodoInput.module.css';

const TodoInput = ({ value, onChange, onAddTodo, onFocus, onBlur, isValid, inputRef }) => {
  return (<>
    <div className={styles.todo__task}>
      <input
        ref={inputRef}
        className={styles.todo__input}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder="Add a new to-do"
      />
      {isValid ?
        <button onClick={onAddTodo} className={`${styles.todo__button} ${styles["todo__button--active"]}`}>Add</button> :
        <div className={`${styles.todo__button} ${styles["todo__button--deactivated"]}`}>Add</div> }

    </div>
  </>
  );
};

export default TodoInput;