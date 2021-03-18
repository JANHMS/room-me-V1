import React, { createContext, useReducer } from "react";
import firestore from "./firebase";

let AppContext = createContext({});

const initialState = {
  count: 0,
  user: JSON.parse(localStorage.getItem("whatsapp-user")),
  noTabs: false,
  chattingWith: {}
};

let reducer = (state, action) => {
  switch (action.type) {
    case "setCount": {
      return { ...state, count: action.payload.count };
    }

    case "loadUser": {
      console.log("Mutation called");
      localStorage.setItem(
        "whatsapp-user",
        JSON.stringify(action.payload.user)
      );
      return { ...state, user: action.payload.user };
    }

    case "setNoTabs": {
      return { ...state, noTabs: action.payload };
    }

    case "setChattingWith": {
      return { ...state, chattingWith: action.payload };
    }

    default:
      return state;
  }
};

function AppContextProvider(props) {
  const fullInitialState = {
    ...initialState
  };

  let [state, dispatch] = useReducer(reducer, fullInitialState);
  let value = { state, dispatch };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}

let AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };
