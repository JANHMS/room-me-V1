// here I create the routes
// fetch the questions and navigate to the questions the currently selected question 
// determine the current route with useState
// move hole useEffect here 
import { IonButton } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Route, useParams } from "react-router-dom";
import { useAuth } from "../../auth";
import { firestore } from "../../firebase";
import QuestionMultiChoicePage from "./QuestionMultiChoicePage";
import _ from "lodash";

interface RouteParams {
  id: string;
}

const QuestionRoutes = () => {
  const [checked, setChecked] = useState(false)
  const [questionData, setQuestionData] = useState<any>()
  const [loading, setLoading] = useState(true)
  
  // the array is sorted by id, but id is a string hence after 1 comes 11 but we want 2 to be the next one
  var compare = function(a, b) {
    return parseInt(a.id) - parseInt(b.id);
  }
  
  useEffect(() => {
    firestore.collection('questions')
    .get()
    .then(async snapshot => {
      await setQuestionData(
        snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})).sort(compare)
      )
        setLoading(false)
      }
    )
  },[])
  
  // questionData is a array of objects with the questions and the answers
  const { userId } = useAuth()

  const handleNextClick = () => {
    firestore.collection('profiles')
      .doc(userId)
      .collection('character')
      .add([questionData[id].question, questionData[id].answer])
  }
  const { id } = useParams<RouteParams>();
  
  return (
    !loading && questionData &&
    <QuestionMultiChoicePage
      question={questionData[id].question}
      answers={questionData[id].answers}
      handleNextClick={handleNextClick}
      questionData={questionData}
      loading={loading}
      checked={checked}
      setChecked={setChecked}
    />
  )
}

export default QuestionRoutes;
