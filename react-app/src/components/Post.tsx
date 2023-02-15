import { FC, FormEventHandler } from 'react';
import { Session } from '../App';
import { Button } from '../stories/Button';
import { IPost, IUser, LikePost } from '../util/api';

import "../styles/Post.css";
import { Link } from 'react-router-dom';

export interface  PostProps {
    data: IPost,
    handleLike: React.MouseEventHandler<HTMLAnchorElement>,
    handleUnlike: React.MouseEventHandler<HTMLAnchorElement>,
    localUser: IUser | null,
};

export const Post: FC<PostProps> =  ({ data, handleLike, handleUnlike, localUser }) => {

    if(!localUser)
        return <></>;
    return (
        <div className="card feed-post-card">
            <div className="card-body">
                <p>{ data.body }</p>
                <Link to={`/u/${data.user.handle}`} style={{"color": "grey"}}>{ `@${data.user.handle}` }</Link>
                <div className='action-menu'>
                    <div className='like-count'>{data.likes.length}</div>
                    <div className='like-button'>
                        {
                        data.likes.some(u => u.user_id === localUser.user_id) ? 
                        <a href="#" onClick={ handleUnlike }>Unlike</a> : 
                        <a href="#" onClick={ handleLike }>Like</a>
                        }
                    </div>
                </div>
            </div>
        </div>
    ); 
};