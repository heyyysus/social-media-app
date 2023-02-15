import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Session } from '../App';
import { Message } from '../components/Message';
import { GetUserByHandle, IUser } from '../util/api';

const UserProfile: FC<{user: IUser | null, handleFollow: () => void}> = ({ user }) => {
    if(!user)
        return(<Message type="error" code={404} message="User not found" />);
    
    return(
        <>
            <h3>{user.handle}</h3>
            <p>Account created: {`${user.createdDate}`}</p>
        </>
    );
}

export interface UserProfilePageProps {
    session: Session | null
}

export const UserProfilePage: FC<UserProfilePageProps> =  ({ session }) => {
    const { handle } = useParams();
    const [ user, setUser ] = useState<IUser | null>(null);

    const navigate = useNavigate();

    const handleFollow = () => {
        
    }

    useEffect(() => {
        if(!session)
            navigate('/login');
        else if(handle)
            GetUserByHandle(session, handle)
            .then(u => {
                setUser(u);
            })
    })

    return (<UserProfile handleFollow={handleFollow} user={user} />);
};