import { FC } from 'react';
import { Link } from 'react-router-dom';

export interface NavbarProps {};

interface MenuItem {
    label: string,
    to: string,
};

export const Navbar: FC<NavbarProps> =  ({}) => {
    const menuItems: MenuItem[] = [
        {
            label: "Home",
            to: "/",
        },
        {
            label: "Login",
            to: "/login",
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
                </ul>
            </div>
        </nav>

    );
};