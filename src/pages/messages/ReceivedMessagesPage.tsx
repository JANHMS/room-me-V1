import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { useHistory } from "react-router";
import ReceivedMessages from "../../components/messages/ReceivedMessages";
import { getMessages } from "../../reducers";

const RecievedMessagesPage = (props) => {
  const { user, isAuth, messages } = props.auth
  const { loadFresh } = props
  const history = useHistory()
  useEffect(() => {
    if (!loadFresh) { return }

    const script = document.createElement('script')
    script.src = `${process.env.PUBLIC_URL}/js/fresh.js`
    script.async = true
    document.body.appendChild(script)
  }, [loadFresh])
  
  useEffect(()=>{
    history.go(0)
  },[])

  return(
    <ReceivedMessages
    messages={messages}
  />
  )
}



const mapStateToProps = (state) => ({messages: getMessages(state)})

export default connect(mapStateToProps)(RecievedMessagesPage)