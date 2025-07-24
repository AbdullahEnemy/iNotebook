import React from 'react';
import { useContext ,useEffect} from 'react';

import noteContext from '../context/notes/noteContext'
export const About = () => {

  const a=useContext(noteContext);
  return (
    <>
    <div className="container py-5">
  <div className="text-center mb-5">
    <h1 className="display-5 fw-bold text-primary">About iNotebook</h1>
    <p className="lead text-muted">
      Your personal cloud-based note manager — fast, secure, and accessible from anywhere.
    </p>
  </div>

  <div className="row align-items-center mb-5">
    <div className="col-md-6">
      <img
        src="https://cdn.prod.website-files.com/5f7ece8a7da656e8a25402bc/631f32ee984371cb97df4ce2_How%20to%20take%20notes%20from%20a%20textbook.webp"
        alt="iNotebook Illustration"
        className="img-fluid rounded shadow-sm"
      />
    </div>
    <div className="col-md-6">
      <h3 className="text-dark mb-3">What is iNotebook?</h3>
      <p className="text-muted">
        iNotebook is a secure note-taking app built with the MERN stack. It allows you to store, manage, and
        access your notes securely across devices. With features like login authentication, real-time updates,
        and responsive design, it’s perfect for both personal and professional use.
      </p>
    </div>
  </div>

 <div className="row text-center mb-5">
  <div className="col-md-4 mb-4">
    <div className="card border-0 shadow h-100 hover-card">
      <div className="card-body">
        <i className="fa-solid fa-cloud fa-2x text-primary mb-3"></i>
        <h5 className="card-title">Cloud Sync</h5>
        <p className="card-text text-muted">
          Your notes are securely stored in the cloud and synced instantly.
        </p>
      </div>
    </div>
  </div>
  <div className="col-md-4 mb-4">
    <div className="card border-0 shadow h-100 hover-card">
      <div className="card-body">
        <i className="fa-solid fa-lock fa-2x text-primary mb-3"></i>
        <h5 className="card-title">Secure</h5>
        <p className="card-text text-muted">
          We use JWT authentication to protect your data and ensure privacy.
        </p>
      </div>
    </div>
  </div>
  <div className="col-md-4 mb-4">
    <div className="card border-0 shadow h-100 hover-card">
      <div className="card-body">
        <i className="fa-solid fa-bolt fa-2x text-primary mb-3"></i>
        <h5 className="card-title">Fast & Responsive</h5>
        <p className="card-text text-muted">
          Built with React and Bootstrap, iNotebook works smoothly on all devices.
        </p>
      </div>
    </div>
  </div>
</div>



</div>
</>
  )
}
