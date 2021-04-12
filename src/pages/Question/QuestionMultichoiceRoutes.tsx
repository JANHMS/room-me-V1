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
import { questions } from "./questions";

interface RouteParams {
  id: string;
}

const NUMBEROFQUESTIONS = 15
const QuestionMultichoiceRoutes = () => {
  
  const checkedList = [
    {id: 0, checked: false, text: "" }, 
    {id: 1, checked: false, text: "" }, 
    {id: 2, checked: false, text: "" }, 
    {id: 3, checked: false, text: "" },
    {id: 4, checked: false, text: "" },
    {id: 5, checked: false, text: "" },
    {id: 6, checked: false, text: "" },
    {id: 7, checked: false, text: "" },
    {id: 8, checked: false, text: "" },
    {id: 9, checked: false, text: "" },
    {id: 10, checked: false, text: ""},
    {id: 11, checked: false, text: ""},
  ]

  const { id } = useParams<RouteParams>();
  
  const [text, setText] = useState("")
  const [checked, setChecked] = useState(false)
  const [questionData, setQuestionData] = useState<any>()
  const [loading, setLoading] = useState(true)
  const history = useHistory()
  const { userId } = useAuth()
  
  useEffect(() => {
    setQuestionData(questions)
  },[])
  
  useEffect(() => {
    setLoading(false)
    if(questionData){
      const data = questionData[id].answers.map((answer) => 
      checkedList.push({
        id: parseInt(answer.id), 
        checked: false,
        text: answer.text
      }))
  
      console.log(checkedList)
    } else return;
  },[questionData])
  
  
  const handleChecked = ((answerId, text) => {
      setChecked(!checkedList[answerId].checked)
      setText(checkedList[answerId].text)
      const foundIndex = checkedList.findIndex(x => x.id == answerId);
      checkedList[foundIndex] = {
        id: foundIndex,
        checked: checked,
        text: text
      };
      console.log(checkedList)
    })
  
  // questionData is a array of objects with the questions and the answers
  
  const handleNextClick = async () => {
    if(parseInt(id) < NUMBEROFQUESTIONS) {
      await firestore.collection('profiles')
      .doc(userId)
      .collection('character')
      .doc(id)
      .set({question: questionData[id].question, checkedList: checkedList})
      .then(() => {
        toast("Data stored!")

        history.push(`/my/register/question/${parseInt(id)+1}`)
      })
    }
      else {
        history.push(`/my/register/inputquestion/${parseInt(id)+1}`)
      }
    }


  return (
    !loading && questionData ? 
    <QuestionMultiChoicePage
      question={questionData[id].question}
      answers={questionData[id].answers}
      handleNextClick={handleNextClick}
      questionData={questionData}
      loading={loading}
      checkedList={checkedList}
      handleChecked={handleChecked}
    /> : <IonLoading isOpen={loading}/>
  )
}

export default QuestionMultichoiceRoutes;
