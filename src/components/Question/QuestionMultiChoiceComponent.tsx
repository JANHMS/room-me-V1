import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCheckbox, IonContent, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react';

interface Props {
  answers: any[];
  handleNextClick: any;
  question: any;
}


const QuestionInputComponent: React.FC<Props> = ({
  handleNextClick,
  question,
  answers
}) => {
  
  return (
    <IonItem>
      <IonHeader translucent>
      <IonToolbar>
        <IonTitle>About you</IonTitle>
      </IonToolbar>
      <h1>{question.text}</h1>
    </IonHeader>
      <IonContent>
      <IonList  style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          marginTop: "-50px",
          marginLeft: "-100px",
        }}>
        { answers.map((answer) => (
          <IonItem key={answer.id}>
            <IonLabel>{answer.text}</IonLabel>
            <IonCheckbox color="primary" checked slot="start"></IonCheckbox>
          </IonItem>
        ))
        }
        </IonList>
      </IonContent>
      <IonButton onClick={handleNextClick}>
      </IonButton>
    </IonItem>
  )
}

export default QuestionInputComponent;