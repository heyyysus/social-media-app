import { FC, useState } from 'react';
import { Session } from '../App';
import { RegisterForm, RegistrationBody } from '../components/RegisterForm';
import { Authenticate, Register } from '../util/api';

export interface RegisterPageProps {
    setSession: React.Dispatch<React.SetStateAction<Session | null>>
};

export const RegsiterPage: FC<RegisterPageProps> =  ({ setSession }) => {

    const [ status, setStatus ] = useState<string>("");

    const handleRegistration = (registrationBody: RegistrationBody) => {
        Register(registrationBody)
            .then(registeredUser => {
                if(registeredUser){
                    Authenticate(registrationBody.email, registrationBody.password)
                    .then(token => {
                        if(token)
                            setSession({ access_token: token });
                        else 
                            setStatus("Error Registering 2");
                    })
                }
                else 
                    setStatus("Error Registering");
            })
    }

    return (
    <div>
        <h2>Register</h2>
        <RegisterForm handleRegistration={handleRegistration} />
        <span>{status}</span>
    </div>
    );
};