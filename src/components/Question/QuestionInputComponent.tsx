import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonContent, IonHeader, IonImg, IonInput, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react';

interface Props {
  InputAnswer: string;
  handleNextClick: any;
  question: any;
}


const QuestionInputComponent: React.FC<Props> = ({
  InputAnswer,
  handleNextClick,
  question
}) => {
  
  return (
    <IonItem>
      <IonHeader translucent>
      <IonToolbar>
        <IonTitle>About you</IonTitle>
      </IonToolbar>
      <h1>{question}</h1>
    </IonHeader>
      <IonContent>
        <IonInput style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            marginTop: "-50px",
            marginLeft: "-100px",
          }}
          value={InputAnswer}
        />
      </IonContent>
      <IonButton onClick={handleNextClick}>
      </IonButton>
    </IonItem>
  )
}

export default QuestionInputComponent;