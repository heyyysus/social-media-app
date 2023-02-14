import { FC } from 'react';
import { IUser } from '../util/api';

export interface HomePageProps {
    localUser: IUser | null,
};

export const HomePage: FC<HomePageProps> =  ({ localUser }) => {
    return (
    <div>
        <h2>Home</h2>
        <p>Local User: </p>
        <table>
            <tr>
                <th>user_id </th>
                <th>{localUser?.user_id}</th>
            </tr>
            <tr>
                <th>email </th>
                <th>{localUser?.email}</th>
            </tr>
            <tr>
                <th>handle </th>
                <th>{localUser?.handle}</th>
            </tr>
        </table>
    </div>);
};