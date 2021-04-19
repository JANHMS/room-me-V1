import { IonButton, IonLoading } from "@ionic/react";
import React, { useCallback, useEffect, useState } from "react";
import { Route, useParams } from "react-router-dom";
import { useAuth } from "../../auth";
import { firestore } from "../../firebase";
import QuestionMultiChoicePage from "./QuestionMultiChoicePage";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import { toast } from "../../toast";
import { fetchQuestions } from "../../api/questions";
import QuestionInputComponent from "../../components/Question/QuestionInputComponent";

interface RouteParams {
  id: string;
}

const NUMBEROFQUESTIONS = 18
  
const QuestionInputRoutes = () => {
  const { id } = useParams<RouteParams>();

  const [questionData, setQuestionData] = useState<any>()
  const [loading, setLoading] = useState(true)
  const [inputAnswer, setInputAnswer] = useState("")
  const history = useHistory()
  const { userId } = useAuth()
  
  useEffect(() => {
    fetchQuestions(setQuestionData)
    setLoading(false)
  },[])
  
    
  const handleNextClick = async () => {
    if(parseInt(id) < NUMBEROFQUESTIONS) {
      await firestore.collection('profiles')
      .doc(userId)
      .collection('character')
      .doc(id)
      .set({question: questionData[id].question, answer: inputAnswer.toLowerCase()})
      .then(async () => {
        toast("Data stored!")
        history.push(`/my/register/inputquestion/${parseInt(id)+1}`)
      })
    }
      else {
        history.push('/my/create/services')
      }
    }

  return (
    !loading && questionData ? 
    <QuestionInputComponent
      question={questionData[id].question}
      setInputAnswer={setInputAnswer}
      handleNextClick={handleNextClick}
    /> : <IonLoading isOpen={loading}/>
  )
}

export default QuestionInputRoutes;
