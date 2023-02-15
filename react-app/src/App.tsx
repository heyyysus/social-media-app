import React, { useEffect, useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { HomePage } from './pages/Home';
import { LoginPage } from './pages/LoginPage';
import { Navbar } from './components/Navbar';

import "./styles/App.css";
import { GetLocalUser, IUser } from './util/api';
import { RegsiterPage } from './pages/Register';
import { UserProfilePage } from './pages/UserProfile';

export interface Session {
  access_token: string,
}


function App() {

  const [ session, setSession ] = useState<Session | null>(null);
  const [ localUser, setLocalUser ] = useState<IUser | null>(null);
  const navigate = useNavigate();
  const Logout = () => {
    setSession(null);
    setLocalUser(null);
  }

  useEffect(()  => {
    if(session)
      GetLocalUser(session)
        .then(user => {
          if(user) setLocalUser(user);
          navigate('/');
        })
  }, [session]);

  return (
      <div className="App">
        <Navbar localUser={localUser} LogoutCallback={Logout} />
        <main className="container">
          <Routes>
            <Route path='/' element={ <HomePage localUser={localUser} session={session} /> }></Route>
            <Route path='/login' element={ <LoginPage setSession={setSession} /> }></Route>
            <Route path='/register' element={ <RegsiterPage setSession={setSession} /> }></Route>
            <Route path='/u/:handle' element={ <UserProfilePage session={session} /> }></Route>
          </Routes>
        </main>
      </div>
  );
}

export default App;
