import { useCallback, useState, useEffect } from "react";
const MAXTODOLENGTH = 22;

export const useValidation = (value, todos, id) => {
    const [error, setError] = useState(null);
    const [isValid, setIsValid] = useState(true);

    const validate = useCallback((value, todos, id) => {
        if (!value.trim()) { return "To-dos must contain at least one letter"; }
        if (value.length > MAXTODOLENGTH) { return `To-dos must have maximum ${MAXTODOLENGTH} letters`; }
        if (value.match(/[^a-zA-Z0-9\s]/)) { return `Stop! This to-do contains illegal characters! Only whitespaces, numers and letters are allowed.`; }
        if (todos.some(todo => todo.id !== id && todo.text.toLowerCase() === value.toLowerCase())) {
            return 'Another to-do with this name already exists.'
        };
        return '';
    });

    useEffect(() => {
        const validationError = validate(value, todos, id);
        setError(validationError);
        setIsValid(!validationError);
    }, [value, validate]);

    return { error, isValid };
};

