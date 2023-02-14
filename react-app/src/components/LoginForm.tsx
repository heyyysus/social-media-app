import { FC, FormEventHandler, useRef } from 'react';
import "../styles/LoginForm.css";

export interface LoginFormProps {
    handleLogin: (username: string, password: string) => void,
};

export const LoginForm: FC<LoginFormProps> =  ({ handleLogin }) => {

    const usernameRef = useRef<any>();
    const passwordRef = useRef<any>();

    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault()

        const username: string = usernameRef.current.value;
        const password: string = passwordRef.current.value;

        handleLogin(username, password);
    }

    return (
        <form onSubmit={ handleSubmit }>
            <div className="form-group">
                <label htmlFor="usernameField">Username</label>
                <input ref={ usernameRef } type="text" className="form-control" id="usernameField" placeholder="Enter Username" />
            </div>
            <div className="form-group">
                <label htmlFor="passwordField">Password</label>
                <input ref={ passwordRef } type="password" className="form-control" id="passwordField" placeholder="Enter Password" />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    );
};