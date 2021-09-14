import React, {useReducer} from 'react'
import {reducer} from "./Reducer";
import {initialState} from "./InititalState";
import {AnubisContext} from "./Context";

export const AnubisProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AnubisContext.Provider value={{ state, dispatch }}>
            {children}
        </AnubisContext.Provider>
    );
};
