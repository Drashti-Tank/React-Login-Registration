import RegistrationForm from './components/RegistrationForm';
import Login from './components/LoginForm';
import TodoList from './components/TodoList';
import UserProfile from './components/UserProfile';
import { Routes, Route } from 'react-router-dom';
import MyNavBar from './components/MyNavBar';
import { useState } from 'react';
import RequireAuth from './components/private/RequireAuth';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [toggleButton, setToggle] = useState(false);
  return (
    <div className="container">
    <MyNavBar toggleButton={toggleButton} setToggle={setToggle}/>
      <Routes>
        <Route exact path="/" element={<RegistrationForm />} />
        <Route path="/login" element={<Login setToggle={setToggle} />} />
        <Route path="/profile" element={<RequireAuth><UserProfile/></RequireAuth>} />
        <Route path="/todos" element={<TodoList/>} />
      </Routes>
      <ToastContainer/>
    </div>
  );
}

export default App;
