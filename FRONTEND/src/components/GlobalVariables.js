import { createGlobalState } from 'react-hooks-global-state';

const initialState = {language:'PL'}
const {setGlobalState, useGlobalState } = createGlobalState(initialState);

export{useGlobalState, setGlobalState};

//React hooks global state - Zmienne globalne