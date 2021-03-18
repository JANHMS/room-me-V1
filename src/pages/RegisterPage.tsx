import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { useAuth } from '../auth';
import RegisterForm from '../components/RegisterForm';
import { auth } from '../firebase';
import { toast } from '../toast';

const RegisterPage: React.FC = () => {
  const { loggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [status, setStatus] = useState({ loading: false, error: false });

  const handleRegister = async () => {
    if(password === cpassword) {
    try {
      setStatus({ loading: true, error: false });
      const credential = await auth.createUserWithEmailAndPassword(email, password);
      console.log('credential:', credential);
    } catch (error) {
      setStatus({ loading: false, error: true });
      console.log('error:', error);
    }
  } else {
    return toast("Passwords do not match")
  }
  };

  if (loggedIn) {
    return <Redirect to="/my/entries" />;
  }
  return (
    <RegisterForm 
      email={email}
      setEmail={setEmail}
      password={password} 
      setPassword={setPassword}
      cpassword={cpassword} 
      setCPassword={setCPassword}
      status={status}
      handleRegister={handleRegister}
/>
  );
};

export default RegisterPage;
