import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Session } from '../App';
import { Message } from '../components/Message';
import { Button } from '../stories/Button';
import { GetLocalUser, GetUserByHandle, IUser, UserAction } from '../util/api';

const UserProfile: FC<{user: IUser | null, localUser: IUser | null, handleAction: (action: "follow" | "unfollow") => void}> = 
    ({ user, localUser, handleAction }) => {
    if(!user)
        return(<Message type="error" code={404} message="User not found" />);
    
    return(
        <>
            <h3>{user.handle}</h3>
            <p>Account created: {`${user.createdDate}`}</p>
            <p>Followers: {user?.followers?.length}</p>
            <p>Follwing: {user?.following?.length}</p>
            {(user?.following?.some(f => f.user_id === localUser?.user_id)) ? 
            (<p>Follows you</p>) : 
            (<></>)}
            
            {
            (localUser?.following?.some(f => f.user_id === localUser?.user_id)) ? 
            (<a href='#' onClick={(e) => {e.preventDefault(); handleAction("unfollow")}}>Unfollow</a>) :
            (<a href='#' onClick={(e) => {e.preventDefault(); handleAction("follow")}}>Follow</a>)
            }

        </>
    );
}

export interface UserProfilePageProps {
    session: Session | null,
}

export const UserProfilePage: FC<UserProfilePageProps> =  ({ session }) => {
    const { handle } = useParams();
    const [ user, setUser ] = useState<IUser | null>(null);
    const [ localUser, setLocalUser ] = useState<IUser | null>(null);

    const navigate = useNavigate();

    const handleAction = (action: "follow" | "unfollow") => {
        if(session && user) {
            UserAction(session, action, user.user_id)
            .then(u => setUser(u))
        }
    }

    useEffect(() => {
        if(!session)
            navigate('/login');
        else if(handle){
            GetUserByHandle(session, handle)
            .then(u => {
                setUser(u);
            });
            GetLocalUser(session)
            .then(u => {
                setLocalUser(u);
            })
        }
    }, [])

    return (<UserProfile handleAction={handleAction} user={user} localUser={localUser} />);
};