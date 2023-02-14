import React, { useEffect, useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { HomePage } from './pages/Home';
import { LoginPage } from './pages/LoginPage';
import { Navbar } from './components/Navbar';

import "./styles/App.css";
import { GetLocalUser, IUser } from './util/api';

export interface Session {
  access_token: string,
}


function App() {

  const [ session, setSession ] = useState<Session | undefined>(undefined);
  const [ localUser, setLocalUser ] = useState<IUser | null>(null);
  const navigate = useNavigate();

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
        <Navbar />
        <main className="container">
          <Routes>
            <Route path='/' element={ <HomePage localUser={localUser} /> }></Route>
            <Route path='/login' element={ <LoginPage setSession={setSession} /> }></Route>
          </Routes>
        </main>
      </div>
  );
}

export default App;
