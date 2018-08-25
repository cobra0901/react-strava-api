import {createStore, applyMiddleware} from 'redux';
import rootReducer from './rootReducer';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {    // accepts initialState for App - beneficial when doing server side rendering
  return createStore(
      rootReducer,
      initialState,
      applyMiddleware(thunk, reduxImmutableStateInvariant())     // detects mutation on state either inside a dispatch or between dispatches.
  );
}