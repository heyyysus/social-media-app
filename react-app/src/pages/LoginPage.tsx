import { FC, useState } from 'react';
import { Session } from '../App';
import { LoginForm } from '../components/LoginForm';
import { Authenticate } from '../util/api';

export interface LoginPageProps {
    setSession: React.Dispatch<React.SetStateAction<Session | undefined>>
};

export const LoginPage: FC<LoginPageProps> =  ({ setSession }) => {
    const [ status, setStatus ] = useState("");
    const handleLogin = async (email: string, password: string) => {
        const access_token = (await Authenticate(email, password));
        if(access_token)
            setSession({ access_token: access_token });
        else 
            setStatus("Invalid Credentials");
        
    }
    return (
    <div>
        <h2>Login</h2>
        <LoginForm handleLogin={ handleLogin } />
        <span className='loginForm-status'>{status}</span>
    </div>
    );
};