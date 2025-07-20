import React from "react";
import noteContext from "./noteContext";
import { useState } from "react";
const NoteState=(props)=>{
    const s1={
        "name":"Enemy",
        "class":"done"
    }
    const [state,setState]=useState(s1);
    return (
        <noteContext.Provider value={{state:state}}>
            {props.children}
        </noteContext.Provider>

    )
}
export default NoteState;