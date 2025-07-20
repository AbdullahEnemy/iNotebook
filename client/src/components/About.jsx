import React from 'react';
import { useContext ,useEffect} from 'react';

import noteContext from '../context/notes/noteContext'
export const About = () => {

  const a=useContext(noteContext);
  return (
    <div>this is about</div>
  )
}
