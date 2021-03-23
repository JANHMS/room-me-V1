import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { useAuth } from '../auth';
import RegisterForm from '../components/RegisterForm';
import { useToasts } from 'react-toast-notifications'
import { toast } from '../toast';
import { register } from '../actions'

const RegisterPage: React.FC = () => {

  const { loggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [avatar, setAvatar] = useState('');

  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [status, setStatus] = useState({ loading: false, error: false });

  const handleRegister = async () => {
    if(password === cpassword) {
    try {
      setStatus({ loading: true, error: false });
        register({email, password, fullName, avatar})
        .then(
          _ => () => {},
          errorMessage => toast(errorMessage))
    } catch (error) {
      setStatus({ loading: false, error: true });
      console.log('error:', error);
    }
  } else {
    return toast("Passwords do not match")
  }
  };

  if (loggedIn) {
    return <Redirect to="/my" />;
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
      avatar={avatar}
      setAvatar={setAvatar}
      fullName={fullName}
      setFullName={setFullName}
    />
  );
};

export default RegisterPage;
