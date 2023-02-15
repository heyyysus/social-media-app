import { FC } from 'react';
import { Link } from 'react-router-dom';
import { IUser } from '../util/api';

export interface NavbarProps {
    localUser: IUser | null,
    LogoutCallback: () => void,
};

interface MenuItem {
    label: string,
    to: string,
};

export const Navbar: FC<NavbarProps> =  ({ localUser, LogoutCallback }) => {
    const menuItems: MenuItem[] = [
        {
            label: "Home",
            to: "/",
        },
        
    ];
    return (
        <nav className="navbar navbar-dark bg-dark">
            <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {
                    menuItems.map((e,i) => {
                        return(
                            <li key={i} className={"nav-item"}>
                                <Link className="nav-link" to={e.to}>{e.label}</Link>
                            </li>
                        );
                    })
                    }
                    <li>
                        {(localUser) ? 
                        (<a className="nav-link" href="#" onClick={LogoutCallback}>Logout</a>) : 
                        (<><Link className="nav-link" to="/login">Login</Link>
                        <Link className="nav-link" to="register">Register</Link></>)}
                    </li>
                </ul>
            </div>
        </nav>

    );
};