export const todoReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            if (state.todos.some(todo => todo.text.toLowerCase() === action.payload.toLowerCase())) {
                return { ...state, error: 'Another to-do with this name already exists.' };
            }
            return {
                ...state,
                todos: [...state.todos, { id: Date.now(), text: action.payload, completed: false }],
                error: null,
            };
        case 'EDIT_TODO':
            const { id, text } = action.payload;
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === id ? { ...todo, text: text } : todo
                ),
                error: null,
            };
        case 'TOGGLE_COMPLETE':
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
                ),
            };
        case 'DELETE_TODO':
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload),
            };
        case 'CLEAR_COMPLETED':
            return {
                ...state,
                todos: state.todos.filter(todo => !todo.completed),
            };
        case 'CLEAR_ERROR':
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}