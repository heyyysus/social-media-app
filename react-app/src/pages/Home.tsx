import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session } from '../App';
import { Post } from '../components/Post';
import { GetFeed, IUser } from '../util/api';
import "../styles/Home.css";

export interface HomePageProps {
    localUser: IUser | null,
    session: Session | null,
};

export const HomePage: FC<HomePageProps> =  ({ localUser, session }) => {

    const [feed, setFeed] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if(session)
            GetFeed(session)
                .then(feed => setFeed(feed));
        else
            navigate('/login');

    }, [session])

    return (
    <div>
        <p>Welcome {localUser?.handle},</p>
        {feed.map((e, i) => {
            return(<Post key={i} data={e} />)
        })}
        
    </div>);
};