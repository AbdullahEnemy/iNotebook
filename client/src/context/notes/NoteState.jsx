import React from "react";
import noteContext from "./noteContext";
import { useState } from "react";
const NoteState=(props)=>{
    
    const n=[
        {
            "_id": "68795a065cef7e4c76af0a2c",
            "user": "687959f35cef7e4c76af0a29",
            "title": "oasdas",
            "description": "oksakdmsa",
            "tag": "work",
            "date": "2025-07-17T20:16:06.804Z",
            "__v": 0
        },
        {
            "_id": "68795a085cef7e4c76af0a2f",
            "user": "687959f35cef7e4c76af0a29",
            "title": "oasdas",
            "description": "oksakdmsa",
            "tag": "work",
            "date": "2025-07-17T20:16:08.111Z",
            "__v": 0
        },
        {
            "_id": "68795a085cef7e4c76af0a32",
            "user": "687959f35cef7e4c76af0a29",
            "title": "oasdas",
            "description": "oksakdmsa",
            "tag": "work",
            "date": "2025-07-17T20:16:08.926Z",
            "__v": 0
        }
    ]
     const [notes,setNotes]=useState(n)
    const addNote=async(title,description,tag)=>{
        let note={
            "_id": "",
            "user": "687959f35cef7e4c76af0a29",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2025-07-17T20:16:08.926Z",
            "__v": 0
        };
        console.log("adding a new note");
        setNotes(notes.concat(note))
    }
    const editNote=async(id,title,description,tag)=>{
        for(let idx=0;idx<notes.length;idx++)
        {
            const element=notes[idx];
            if(element._id===id)
            {
                element.title=title;
                element.tag=tag;
                element.description=description;
                break;
            }
        }
        
    }
    const deleteNote=async(id)=>{
        console.log(id);
        let newNotes=notes.filter((note)=>{return note._id!==id;
        })
        setNotes(newNotes);
        
    }
    return (
        <noteContext.Provider value={{notes,setNotes,deleteNote,addNote,editNote}}>
            {props.children}
        </noteContext.Provider>

    )
}
export default NoteState;