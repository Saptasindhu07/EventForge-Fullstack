import React, { createContext, useContext } from 'react'
import { useState,useEffect,useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
const CartContext=createContext()

function NavbarReducer(selected, action){
    if(action.type=="home"){
        return selected="home"
    }
    if(action.type=="calendar"){
        return selected="calendar"
    }
    if(action.type=="message"){
        return selected="message"
    }
    if(action.type=="attention"){
        return selected="attention"
    }
    if(action.type=="info"){
        return selected="info"
    }
}

function NavProvider({children}){
    const navigate= useNavigate()
    const [selected, dispatch] = useReducer(NavbarReducer,"home")
    return(
        <CartContext.Provider value={{selected,dispatch}}>{children}</CartContext.Provider>
    ) 
}

export function useNav(){
    return useContext(CartContext)
}

export default NavProvider