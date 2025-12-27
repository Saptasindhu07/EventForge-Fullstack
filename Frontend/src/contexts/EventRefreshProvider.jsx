import React, { createContext, useContext } from 'react'
import { useState,useEffect,useReducer } from 'react'

const RefreshContext=createContext()

function RefreshReducer(state, action){
    if(action.type=="refresh"){
        return !state
    }
}

function RefreshProvider({children}){
    const [state, dispatch] = useReducer(RefreshReducer,true)
    return(
        <RefreshContext.Provider value={{state,dispatch}}>{children}</RefreshContext.Provider>
    ) 
}

export function useRefresh(){
    return useContext(RefreshContext)
}

export default RefreshProvider