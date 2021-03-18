import { IonButton, IonContent, IonHeader, IonInput, IonLoading, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React, { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { SignIn } from "./GoogleSignInButton";
import HeaderImage from "./HeaderImage";

interface Props {
  username: string;
  setUsername: (password: string) => void;
  password: string;
  setPassword: (password: string) => void;
  cpassword: string;
  setCPassword: (password: string) => void;
  loading: boolean;
  handleregisterUser: MouseEventHandler<HTMLIonButtonElement>;
  auth: any;
}

const RegisterForm: React.FC<Props> = ({
  username,
  setUsername,
  password,
  setPassword,
  cpassword,
  setCPassword,
  loading,
  handleregisterUser,
  auth
}) => {
  
  return(

    <IonPage>
        <IonToolbar>
          <HeaderImage />
        </IonToolbar>
      <h2>Register</h2>
      <IonLoading message="Registration in progress..." duration={1000} isOpen={loading}/>
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
        <IonInput 
          type="password"
          value={cpassword} 
          onIonChange={(e:any) => setCPassword(e.target.value)} 
          placeholder="Confirm Password" 
        />
        <IonButton onClick={handleregisterUser} expand="full" routerLink="/home">
          Register        
        </IonButton>
        <SignIn auth={auth}/>
        <p><Link to="/login">Already have an Account?</Link></p>
      </IonContent>
    </IonPage>
  )
}

export default RegisterForm;

