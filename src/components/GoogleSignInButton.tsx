import { IonButton } from "@ionic/react";
import firebase from "firebase";


//google sign in
export function SignIn({auth}: any) {
  
  async function signInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      await auth.signInWithPopup(provider);
    }
  return (
    <div>
      <IonButton className="sign-in" onClick={signInWithGoogle} expand="full" >
        Sign in with Google
      </IonButton>
    </div>
  )
}

export function SignOut({auth}: any) {
  return auth.currentUser && (
    <IonButton className="sign-out" onClick={() => auth.signOut()} expand="full">Sign Out</IonButton>
  )
}
