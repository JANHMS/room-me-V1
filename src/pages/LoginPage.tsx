import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { useAuth } from '../auth';
import LoginForm from '../components/LoginForm';
import { auth } from '../firebase';
import { toast } from '../toast';

const LoginPage: React.FC = () => {
  const { loggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ loading: false, error: false });

  const handleLogin = async () => {
    try {
      setStatus({ loading: true, error: false });
      const credential = await auth.signInWithEmailAndPassword(email, password);
      console.log('credential:', credential);
      toast("Logged in")
    } catch (error) {
      setStatus({ loading: false, error: true });
      console.log('error:', error);
      toast("Login failed")
    }
  };

  if (loggedIn) {
    return <Redirect to="/my" />;
  }
  return (
    <LoginForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      status={status}
      handleLogin={handleLogin}
      auth={auth}
    />
  );
};

export default LoginPage;
