import { IonBackButton, IonButton,IonTextarea, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonContent, IonHeader, IonImg, IonInput, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react';

interface Props {
  setInputAnswer: (answer: string) => void;
  handleNextClick: any;
  question: any;
}


const QuestionInputComponent: React.FC<Props> = ({
  setInputAnswer,
  handleNextClick,
  question
}) => {
  
  return (
    <IonPage key={question.id}>
      <IonHeader translucent>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton />
        </IonButtons>
        <IonTitle>About you</IonTitle>
      </IonToolbar>
    </IonHeader>
    <h1 style={{position: "relative", textAlign: 'center'}}>{question}</h1>

      <IonContent>
        <IonTextarea
          enterkeyhint="enter"
          rows={10}
          placeholder="your answer goes here..."
          style={{
            
            position: "fixed",
            top: "30%",
            left: "50%",
            marginTop: "-20px",
            marginLeft: "-140px",
            border: "2px solid black",
            borderRadius: "10px",
            height: "200px",
            width: "290px"
          }}
          onIonChange={(event) => setInputAnswer(event.detail.value)}
        />
      </IonContent>
      <IonButton onClick={handleNextClick}         
        style={{
          marginBottom: "35px",
        }}>
        Save
      </IonButton>
    </IonPage>
  )
}

export default QuestionInputComponent;