
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route} from "react-router";
import { Navbar } from './components/Navbar';
import { About } from './components/About';
import { Home } from './components/Home';
function App() {
  return (
    <>
    <Router>
      <Navbar>  </Navbar>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
         
          <Route path='/about' element={<About/>}></Route>
        </Routes>
    </Router>
    </>
  )
}

export default App
