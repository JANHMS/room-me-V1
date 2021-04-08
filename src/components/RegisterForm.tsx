import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonLoading, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/react";
import React, { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { SignIn } from "./GoogleSignInButton";
import HeaderImage from "./HeaderImage";

interface Props {
  email: string;
  setEmail: (password: string) => void;
  password: string;
  setPassword: (password: string) => void;
  cpassword: string;
  setCPassword: (password: string) => void;
  fullName: string;
  setFullName: (name: string) => void;
  status: any;
  socialMediaLink: string;
  setSocialMediaLink: (socialMediaLink: string) => void;
  handleRegister: MouseEventHandler<HTMLIonButtonElement>;
}

const RegisterForm: React.FC<Props> = ({
  email,
  setEmail,
  password,
  setPassword,
  cpassword,
  setCPassword,
  status,
  handleRegister,
  fullName,
  setFullName,
  socialMediaLink,
  setSocialMediaLink
}) => {
  
  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <HeaderImage />
        </IonToolbar>
      </IonHeader>
      <h2 style={{position: "relative", margin: "10px auto"}}>Finish Register with credentials</h2>
     <IonContent className="ion-padding">
       <IonList>
         <IonItem>
           <IonLabel position="stacked">Full Name</IonLabel>
           <IonInput value={fullName}
             onIonChange={(event) => setFullName(event.detail.value)}
           />
         </IonItem>
         <IonItem>
           <IonLabel position="stacked">Email</IonLabel>
           <IonInput type="email" value={email}
             onIonChange={(event) => setEmail(event.detail.value)}
           />
         </IonItem>
         <IonItem>
           <IonLabel position="stacked">Password</IonLabel>
           <IonInput type="password" value={password}
             onIonChange={(event) => setPassword(event.detail.value)}
           />
         </IonItem>
         <IonItem>
           <IonLabel position="stacked">Confirm Password</IonLabel>
           <IonInput type="password" value={cpassword}
             onIonChange={(event) => setCPassword(event.detail.value)}
           />
         </IonItem>
         
         <IonItem>
           <IonLabel position="stacked">socialMediaLink</IonLabel>
           <IonInput value={socialMediaLink}
             onIonChange={(event) => setSocialMediaLink(event.detail.value)}
           />
         </IonItem> 

       </IonList>
       {status.error &&
         <IonText color="danger">Registration failed</IonText>
       }
       <IonButton expand="block" onClick={handleRegister}>
         Create Account
       </IonButton>
       <IonButton expand="block" fill="clear" routerLink="/login">
         Already have an account?
       </IonButton>
       <IonLoading isOpen={status.loading} />
     </IonContent>
   </IonPage>
  )
}

export default RegisterForm;

