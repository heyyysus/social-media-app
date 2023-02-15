import { FC, FormEventHandler, useRef } from 'react';
import "../styles/RegisterForm.css";

export interface RegistrationBody {
    email: string, 
    handle: string, 
    password: string
}

export interface RegisterFormProps {
    handleRegistration: (registrationBody: RegistrationBody) => void,
};

export const RegisterForm: FC<RegisterFormProps> =  ({ handleRegistration }) => {

    const emailRef = useRef<any>();
    const handleRef = useRef<any>();
    const passwordRef = useRef<any>();

    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault()

        const email: string = emailRef.current.value;
        const handle: string = handleRef.current.value;
        const password: string = passwordRef.current.value;

        handleRegistration({email, handle, password});
    }

    return (
        <form onSubmit={ handleSubmit }>
            <div className="form-group">
                <label htmlFor="emailField">Email</label>
                <input ref={ emailRef } type="email" className="form-control" id="emailField" placeholder="Enter Email" />
            </div>
            <div className="form-group">
                <label htmlFor="handleField">Handle</label>
                <input ref={ handleRef } type="text" className="form-control" id="handleField" placeholder="Enter Handle" />
            </div>
            <div className="form-group">
                <label htmlFor="passwordField">Password</label>
                <input ref={ passwordRef } type="password" className="form-control" id="passwordField" placeholder="Enter Password" />
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
        </form>
    );
};