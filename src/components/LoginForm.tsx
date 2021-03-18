import { IonContent, IonLoading, IonInput, IonIcon, IonButton, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { SignIn } from './GoogleSignInButton';
import HeaderImage from './HeaderImage';

interface Props {
  username: string;
  setUsername: (x: string) => void;
  password: string;
  setPassword: (x: string) => void;
  loading: boolean;
  handleLogin: any;
  auth: any;
}

const LoginForm: React.FC<Props> = ({
  username,
  setUsername,
  password,
  setPassword,
  loading,
  handleLogin,
  auth
}) => {
  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <HeaderImage />
        </IonToolbar>
      </IonHeader>
      <h2>Login</h2>
      <IonLoading message="Logging in..." duration={1000} isOpen={loading}/>
      <IonContent className="icon-padding">
        <IonInput 
          value={username} 
          onIonChange={(e:any) => setUsername(e.target.value)} 
          placeholder="Username" 
        />
        <IonInput 
          type="password"
          value={password} 
          onIonChange={(e:any) => setPassword(e.target.value)} 
          placeholder="Password" 
        />
        <IonButton onClick={handleLogin} expand="full">
          Login        
        </IonButton>
        <SignIn auth={auth}/>
        <p><Link to="/register">New here?</Link></p>
      </IonContent>
    </IonPage>
  )
}

export default LoginForm;