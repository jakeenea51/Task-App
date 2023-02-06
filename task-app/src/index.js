import ReactDOM from "react-dom/client";
import Login from "./pages/Login";
import Hero from "./pages/Hero";
import CreatedTasks from "./pages/CreatedTasks";
import AcceptedTasks from "./pages/AcceptedTasks";
import React, {useState, useEffect} from 'react';
import {auth, db} from './fire';
import 'bootstrap/dist/css/bootstrap.css';
import{createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth';
import './App.css';
import NewTask from './pages/NewTask';
import {collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc} from 'firebase/firestore';


export default function App() {

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  };

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  };

  const handleLogin = async () => {
    clearErrors();
    try{
      const user = await signInWithEmailAndPassword(auth, email, password);
    } catch (error){
      setEmailError(error.message);
    }
  };

  const handleSignup = async () => {
    clearErrors();
    clearInputs();
    try{
      const user = await createUserWithEmailAndPassword(auth, email, password);
    } catch (error){
      setPasswordError(error.message);
    }
  };

  const handleLogout = async() => {
    await signOut(auth);
  };

  const authListener = () => {
    onAuthStateChanged(auth, (user) => {
        setUser(user);
    });
  };

  useEffect(() => {
    authListener();
  }, []);


  const pathname = window.location.pathname

  const loadPage = (pathname) => {
    if (pathname === "/dashboard" || pathname === "/") {
      return <Hero handleLogout={handleLogout} user={user} />
    }
    else if (pathname === "/created") {
      return <CreatedTasks handleLogout={handleLogout} user={user}/>
    }
    else if (pathname === "/accepted") {
      return <AcceptedTasks handleLogout={handleLogout} user={user} />
    }
    else if (pathname === "/newtask") {
      return <NewTask user={user}/>
    }
  }

      return (
        <>
      {user ? (
        <>
        {loadPage(pathname)}
        </>
      ):(
        <Login 
        user={user}
        email={email} 
        setEmail={setEmail} 
        password={password} 
        setPassword={setPassword} 
        handleLogin={handleLogin}
        handleSignup={handleSignup}
        handleLogout={handleLogout}
        hasAccount={hasAccount}
        setHasAccount={setHasAccount}
        emailError={emailError}
        passwordError={passwordError}
      />
      )}
      </>
      )
    
    // else if (window.location.pathname === "/") {
    //   return <Login 
    //   user={user}
    //   email={email} 
    //   setEmail={setEmail} 
    //   password={password} 
    //   setPassword={setPassword} 
    //   handleLogin={handleLogin}
    //   handleSignup={handleSignup}
    //   handleLogout={handleLogout}
    //   hasAccount={hasAccount}
    //   setHasAccount={setHasAccount}
    //   emailError={emailError}
    //   passwordError={passwordError}
    // />
    // }
    }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);


// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { BrowserRouter } from 'react-router-dom';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//       <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
