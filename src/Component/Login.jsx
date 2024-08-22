import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; 
import { useContext } from 'react';
import MyContext from '../Context';
import './Login.css';


const Login = () => {
  const { setUser } = useContext(MyContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/'); 
    setUser(true);
    
    } catch (error) {
      setError("Enter correct email and password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className='container1' onSubmit={handleSubmit}>
        <label for="email">Email:</label>
        <input 
          type="text" 
          id="email" 
          placeholder='Enter your email'
          onChange={(e) => setEmail(e.target.value)} 
          name="email" 
          required 
        />

        <label for="password">Password:</label>
        <input 
          type="password" 
          id="password" 
          placeholder='Enter your password'
          onChange={(e) => setPassword(e.target.value)} 
          name="password" 
          required 
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
