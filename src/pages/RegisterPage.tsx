import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import { useAuth } from '../auth';
import RegisterForm from '../components/RegisterForm';
import { useToasts } from 'react-toast-notifications'
import { toast } from '../toast';
import { register } from '../actions'

const RegisterPage: React.FC = () => {

  const { loggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [socialMediaLink, setSocialMediaLink] = useState('');

  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [citylocation, setCitylocation] = useState('');

  const [status, setStatus] = useState({ loading: false, error: false });
  const history = useHistory();

  const handleRegister = async () => {
    if(password === cpassword) {
    try {
      setStatus({ loading: true, error: false });
        register({email, password, fullName, socialMediaLink})
        .then(
          () => history.push("/my/register/picture"),
          errorMessage => toast(errorMessage),
        )
    } catch (error) {
      setStatus({ loading: false, error: true });
      console.log('error:', error);
    }
  } else {
    return toast("Passwords do not match")
  }
  };
  
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
      socialMediaLink={socialMediaLink}
      setSocialMediaLink={setSocialMediaLink}
      fullName={fullName}
      setFullName={setFullName}
      citylocation={citylocation}
      setCitylocation={setCitylocation}
    />
  );
};

export default RegisterPage;
