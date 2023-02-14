import { FC, FormEventHandler, useRef } from 'react';
import "../styles/LoginForm.css";

export interface LoginFormProps {
    handleLogin: (email: string, password: string) => void,
};

export const LoginForm: FC<LoginFormProps> =  ({ handleLogin }) => {

    const emailRef = useRef<any>();
    const passwordRef = useRef<any>();

    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault()

        const email: string = emailRef.current.value;
        const password: string = passwordRef.current.value;

        handleLogin(email, password);
    }

    return (
        <form onSubmit={ handleSubmit }>
            <div className="form-group">
                <label htmlFor="emailField">Email</label>
                <input ref={ emailRef } type="email" className="form-control" id="emailField" placeholder="Enter Email" />
            </div>
            <div className="form-group">
                <label htmlFor="passwordField">Password</label>
                <input ref={ passwordRef } type="password" className="form-control" id="passwordField" placeholder="Enter Password" />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    );
};