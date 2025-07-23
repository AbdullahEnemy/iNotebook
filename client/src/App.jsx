import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Navbar } from "./components/Navbar";
import { About } from "./components/About";
import { Home } from "./components/Home";
import NoteState from "./context/notes/NoteState";
import { Alert } from "./components/Alert";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar> </Navbar>
          <Alert message="ok"></Alert>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />}></Route>

              <Route path="/about" element={<About />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
