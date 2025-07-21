
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route} from "react-router";
import { Navbar } from './components/Navbar';
import { About } from './components/About';
import { Home } from './components/Home';
import NoteState from './context/notes/NoteState';
import { Alert } from './components/Alert';
function App() {
  return (
    <>
    <NoteState>
    <Router>
      <Navbar>  </Navbar>
      <Alert message="ok"></Alert>
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
         
          <Route path='/about' element={<About/>}></Route>
        </Routes>
        </div>
    </Router>
    </NoteState>
    </>
  )
}

export default App
