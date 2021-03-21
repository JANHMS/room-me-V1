import { IonContent, IonButton, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonRow, IonCol } from '@ionic/react';
import React, { useState, useEffect } from "react";
import HeaderImage from '../components/HeaderImage';
import rommmeimage from'../images/roomme.png';

const Homescreen: React.FC = () => {
  
  const [input, setInput] = useState<string>('')
  
  useEffect(() => {
    console.log(input)
  }, [input])
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton routerLink="/login" style={{
            position: "absolute",
            width: "30vw", 
            fontSize:"15", 
            height:"40px",
            top: "2.5px",
            right: "20px"
          }}>Sign in</IonButton>
          <HeaderImage />
        </IonToolbar>
      </IonHeader>
      <br/>
      <IonContent className="icon-padding">
        <IonTitle>   
          <h2>You're about to <br/> find your tribe</h2>
        <br/>
        <h5>Find your <img src={rommmeimage} style={{width:"100px", position:"relative", top:"10px"}}/> <br/> <br/> easily uncomplicated. <br/> <br/> <br/> <div style={{color:"darkblue"}}>How is that <br /> for a change?</div></h5>
      </IonTitle>
      <IonFooter style={{
        position: "absolute",
        bottom: "10px"
      }}>
        <IonToolbar>
          <IonTitle>
            <IonRow class="ion-align-items-center">
              <IonCol size="12" class="ion-text-center">

                <IonButton routerLink="/register">
                  Join Room-Me       
                </IonButton>
              </IonCol>
            </IonRow>
          </IonTitle>
        </IonToolbar>
      </IonFooter>
      </IonContent>
    </IonPage>
  );
};

export default Homescreen;
