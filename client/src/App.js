import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
import React, { useState } from 'react';

function App() {
  const [user, setUser] = useState([]);

  return (
    <div className="App">
      <Navbar user={user} setUser={setUser}/>
      <Main/>
      <Footer/>
    </div>
  );
}

export default App;
