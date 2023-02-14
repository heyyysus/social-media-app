import { FC } from 'react';
import { IPost } from '../util/api';

export interface  PostProps {
    data: IPost
};

export const Post: FC<PostProps> =  ({ data }) => {
    return (
        <div className="card feed-post-card">
            <div className="card-body">
                <p>{ data.body }</p>
                <a style={{"color": "grey"}}>{ `@${data.user.handle}` }</a>
            </div>
        </div>
    ); 
};