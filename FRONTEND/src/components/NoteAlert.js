import { createGlobalState } from 'react-hooks-global-state';

const {setGlobalState, useGlobalState } = createGlobalState({
    signalChange:false
});

export{useGlobalState, setGlobalState};
