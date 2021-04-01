import { IonLoading } from "@ionic/react";
import React, { useEffect, useState } from "react";
import QuestionMultiChoiceComponent from "../../components/Question/QuestionMultiChoiceComponent";
import { firestore } from "../../firebase";

const QuestionMultiChoicePage = () => {
  const [questionData, setQuestionData] = useState<any>()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    firestore.collection('questions')
    .doc('1')
    .get()
    .then(async snapshot => {
      await setQuestionData(
        {...snapshot.data()})
        setLoading(false)
      }
    )
  },[])

  
  const handleNextClick = console.log("Clicked")

  return(
    !loading && questionData ?
    <QuestionMultiChoiceComponent
      answers={questionData.answers}
      question={questionData.question}
      handleNextClick={handleNextClick}
    /> : <IonLoading isOpen={loading}/>
  )
}

export default QuestionMultiChoicePage;
