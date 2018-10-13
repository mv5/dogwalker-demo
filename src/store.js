import { createStore, applyMiddleware, compose  } from "redux";
import thunkMiddleware from 'redux-thunk'

import rootReducer from "./reducers/RootReducer";
import {mapSettings} from './constants/MapSettings'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
  return createStore(
    rootReducer,
    {mapSettings},
    composeEnhancers(
      applyMiddleware(
        thunkMiddleware
      ),
    )   
  )
}
