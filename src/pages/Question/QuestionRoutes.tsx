// here I create the routes
// fetch the questions and navigate to the questions the currently selected question 
// determine the current route with useState
// move hole useEffect here 
import { IonButton } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { firestore } from "../../firebase";
import QuestionMultiChoicePage from "./QuestionMultiChoicePage";


const QuestionRoutes = () => {
  
  const [questionData, setQuestionData] = useState<any>()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    firestore.collection('questions')
    .get()
    .then(async snapshot => {
      await setQuestionData(
        snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
      )
        setLoading(false)
      }
    )
  },[])
  // questionData is a array of objects with the qu\estions and the answers

  const handleNextClick = () => {
    console.log(questionData)
  }
  const id = '0'
  return (
    <QuestionMultiChoicePage
      question={questionData[id].question}
      answers={questionData[id].answers}
      handleNextClick={handleNextClick}
      questionData={questionData}
      loading={loading}
      id={id}
    />
  )
}

export default QuestionRoutes;
