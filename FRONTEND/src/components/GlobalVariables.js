import { createGlobalState } from 'react-hooks-global-state';

const initialState = {language:'PL'}
const {setGlobalState, useGlobalState } = createGlobalState(initialState);

export{useGlobalState, setGlobalState};

/*
-------Objasnienie Language---------
NIE STOTUJEMY ENUMA JAK PONIZEJ
const initialState = {language:{
    EN:false,
    PL:true
}}
TYLKO -----> const initialState = {language:'PL'}
PONIEWAZ NIE JEST WYMAGANA ITERACJA I ZMIANA STANOW!
EG.
JESLI ZMIENISZ NA PL:true to reszte musisz na flase itd.
------------------------------------
*/