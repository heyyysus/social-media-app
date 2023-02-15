import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session } from '../App';
import { Post } from '../components/Post';
import { CreatePost, GetFeed, IPost, IUser, LikePost, UnlikePost } from '../util/api';
import "../styles/Home.css";
import { PostCreationBody, PostCreationForm } from '../components/PostCreationForm';

export interface HomePageProps {
    localUser: IUser | null,
    session: Session | null,
};

export const HomePage: FC<HomePageProps> =  ({ localUser, session }) => {

    const [feed, setFeed] = useState<IPost[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        //setInterval(UpdateFeed, 3000)
    }, [])

    const UpdateFeed = () => {
        if(session)
            GetFeed(session)
                .then(feed => setFeed(feed));
    }

    const [ postCreationFormStatus, setPostCreationFormStatus ] = useState<string>("");

    const HandlePostCreate = async (postCreationBody: PostCreationBody) => {
        if(session){
            const createdPost = await CreatePost(session, postCreationBody);
            UpdateFeed();
        }
    }

    const HandleLike = (i: number) => {
        if(session){
            LikePost(session, feed[i].post_id)
            .then(newPost => {
                if(newPost){
                    const newFeed = feed.slice();
                    newFeed[i] = newPost;
                    setFeed(newFeed);
                }
            })
        }
    }

    const HandleUnlike = (i: number) => {
        if(session){
            UnlikePost(session, feed[i].post_id)
            .then(newPost => {
                if(newPost){
                    const newFeed = feed.slice();
                    newFeed[i] = newPost;
                    setFeed(newFeed);
                }
            })
        }
    }

    useEffect(() => {
        if(session)
            UpdateFeed()
        else
            navigate('/login');

    }, [session])

    return (
    <div>
        <p>Welcome {localUser?.handle},</p>

        <PostCreationForm handlePostCreation={ HandlePostCreate } />
        <span>{postCreationFormStatus}</span>

        {
        
        feed.map((e, i) => {
            
            return(<Post 
                        key={i} 
                        data={e} 
                        handleLike={(e) => {e.preventDefault(); HandleLike(i);} } 
                        handleUnlike = {(e) => {e.preventDefault(); HandleUnlike(i);}}
                        localUser={localUser} />)
        })
        }
        
    </div>);
};