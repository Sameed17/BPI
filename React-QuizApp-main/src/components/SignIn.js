import React, { useState } from 'react';
import '../bootstrap.min.css';
import '../App.css';

import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";  


export default function SignIn({isLoggedIn, setIsLoggedIn, setIsStart}) {
  const [outerFlipped, setOuterFlipped] = useState(false);
  const [nestedFlipped, setNestedFlipped] = useState(false);
  const [signupN, setSignupN] = useState('');
  const [signupE, setSignupE] = useState('');
  const [signupPass, setSignupPass] = useState('');

  const [resetE, setResetE] = useState('');

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const toggleOuter = () => {
    setOuterFlipped(f => !f);
    setNestedFlipped(false);
  };
  const toggleNested = () => setNestedFlipped(f => !f);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setEmail(""); 
      setPassword("");

      setIsLoggedIn({uid: userCredential.user.uid, email, password});
    } catch (err) {
      alert( `Login Error [${err.code}]: ${err.message}`);
    }
  };

  const handleReset = async e => { 
    
    e.preventDefault(); 
    
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("✅ Reset link sent! Check your inbox.");
    } catch (err) {
      alert(err.message);
    }

    setResetE('');
    
    toggleNested(); 

  };
  const handleSignup = async e => {
    e.preventDefault();
    const valid = signupPass.length >= 8
      && /[a-z]/.test(signupPass)
      && /[A-Z]/.test(signupPass)
      && /[0-9]/.test(signupPass)
      && /[@$!%*?&]/.test(signupPass);
    if (!valid) { alert('Password invalid'); return; }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, signupE, signupPass);

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: signupN,                  // from your form input
        email: signupE,                 // safer to read from Auth user
        password: signupPass,                 // safer to read from Auth user
        score: 0,
      });

      setSignupN(""); 
      setSignupE(""); 
      setSignupPass("");
      setIsLoggedIn({uid: userCredential.user.uid, email: signupE, password: signupPass});
      alert('Registered');
    } catch (err) {
      alert("Registeration error:", err);
    }

    toggleOuter();
  };
  
  return (
    <div className="d-flex flex-column min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <div className="container">
          <span className="navbar-brand" onClick={() => setIsStart(false)}>Bright Pakistan</span>
          <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="nav">
            <ul className="navbar-nav ms-auto">
              {['About','HowItWorks','Scholarships','Testimonials','Contact'].map(id =>
                <li className="nav-item" key={id}>
                  <a className="nav-link" href={`#${id.toLowerCase()}`}>
                    {id.replace(/([A-Z])/g,' $1')}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <header className="masthead flex-grow-1">
        <div className="card-container d-flex align-items-center justify-content-center hu">
          <div className="card card-custom w-75 w-md-50 mx-auto hu">
            <div className={`flip-card ${outerFlipped ? 'flipped' : ''}`}>

              {/* — Front: Login / Forgot */}
              <div className="flip-side">
                <div className={`nested-card ${nestedFlipped ? 'flipped' : ''}`}>
                  <div className="nested-side">
                    <h4 className="text-center text-primary mb-3">Login</h4>
                    <form onSubmit={e => {e.preventDefault(); handleLogin();}} className="mb-3">
                    <input
                      type="email"
                      className="form-control mb-2"
                      placeholder="Email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                    <input
                      type="password"
                      className="form-control mb-3"
                      placeholder="Password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                    />
                      <button type="submit" className="butn butn-primary w-100">Login</button>
                    </form>
                    <button className="butn butn-link" onClick={toggleNested}>
                      Forgot your password?
                    </button>
                    <button className="butn butn-link" onClick={toggleOuter}>
                      Sign Up
                    </button>
                  </div>
                  <div className="nested-side nested-back">
                    <h4 className="text-center text-primary mb-3">Reset Password</h4>
                    <form onSubmit={handleReset} className="mb-3">
                      <input type="email" className="form-control mb-3" placeholder="Email" value={resetE} onChange={e => setResetE(e.target.value)}  required />
                      <button type="submit" className="butn butn-primary w-100">
                        Send Reset Link
                      </button>
                    </form>
                    <button className="butn butn-link" onClick={toggleNested}>
                      Back to Login
                    </button>
                  </div>
                </div>
              </div>

              {/* — Back: Sign Up */}
              <div className="flip-side flip-back">
                <div className="nested-side">
                  <h4 className="text-center text-primary mb-3">Sign Up</h4>
                  <form onSubmit={handleSignup} className="mb-3">
                    <input type="text" className="form-control mb-2" placeholder="Full Name" value={signupN} onChange={e => setSignupN(e.target.value)} required />
                    <input type="email" className="form-control mb-2" placeholder="Email" value={signupE} onChange={e => setSignupE(e.target.value)} required />
                    <input
                      type="password"
                      className="form-control mb-2"
                      placeholder="Password"
                      value={signupPass}
                      onChange={e => setSignupPass(e.target.value)}
                      required
                    />
                    <ul className="small mb-3 text-start ps-3 text-danger">
                      <li>{signupPass.length >= 8 ? '✅' : '❌'} At least 8 characters</li>
                      <li>{/[a-z]/.test(signupPass) ? '✅' : '❌'} One lowercase letter</li>
                      <li>{/[A-Z]/.test(signupPass) ? '✅' : '❌'} One uppercase letter</li>
                      <li>{/[0-9]/.test(signupPass) ? '✅' : '❌'} One number</li>
                      <li>{/[@$!%*?&]/.test(signupPass) ? '✅' : '❌'} One special character</li>
                    </ul>
                    <button type="submit" className="butn butn-primary w-100">Register</button>
                  </form>
                  <button className="butn butn-link" onClick={toggleOuter}>
                    Already have an account? Login
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </header>

      <footer className="py-3 bg-primary text-center text-secondary">
        <small>© 2025 Bright Pakistan Initiative</small>
      </footer>
    </div>
  );
}



// import React, { useState } from 'react';
// import '../bootstrap.min.css';
// import '../App.css';

// export default function App() {
//   const [outerFlipped, setOuterFlipped] = useState(false);
//   const [nestedFlipped, setNestedFlipped] = useState(false);
//   const [signupPass, setSignupPass] = useState('');

//   const toggleOuter = () => {
//     setOuterFlipped(f => !f);
//     setNestedFlipped(false);
//   };
//   const toggleNested = () => setNestedFlipped(f => !f);

//   const handleLogin = e => { e.preventDefault(); /* login logic */ };
//   const handleReset = e => { e.preventDefault(); alert('Reset link sent'); toggleNested(); };
//   const handleSignup = e => {
//     e.preventDefault();
//     const val = signupPass;
//     const valid = val.length>=8 && /[a-z]/.test(val) && /[A-Z]/.test(val) && /[0-9]/.test(val) && /[@$!%*?&]/.test(val);
//     if(!valid){ alert('Password invalid'); return; }
//     alert('Registered');
//     toggleOuter();
//   };

//   return (
//     <div className="app-container">
//       <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
//         <div className="container">
//           <h1 className="navbar-brand">Bright Pakistan</h1>
//           <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav">
//             <span className="navbar-toggler-icon"/>
//           </button>
//           <div className="collapse navbar-collapse" id="nav">
//             <ul className="navbar-nav ms-auto">
//               {['About','HowItWorks','Scholarships','Testimonials','Contact'].map(id=>
//                 <li className="nav-item" key={id}><button className="nav-link">{id.replace(/([A-Z])/g,' $1')}</button></li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </nav>

//       <header className="masthead">
//         <div className="card-container">
//           <div className="card card-custom hu">
//             <div className={`flip-card ${outerFlipped?'flipped':''}`}>

//               {/* Login / Forgot */}
//               <div className="flip-side">
//                 <div className={`nested-card ${nestedFlipped?'flipped':''}`}>
//                   <div className="nested-side">
//                     <h4>Login</h4>
//                     <form onSubmit={handleLogin}>
//                       <input type="email" placeholder="Email" required />
//                       <input type="password" placeholder="Password" required />
//                       <button type="submit">Login</button>
//                     </form>
//                     <button className="link" onClick={toggleNested}>Forgot your password?</button>
//                     <button className="link" onClick={toggleOuter}>Sign Up</button>
//                   </div>
//                   <div className="nested-side nested-back">
//                     <h4>Reset Password</h4>
//                     <form onSubmit={handleReset}>
//                       <input type="email" placeholder="Email" required />
//                       <button type="submit">Send Reset Link</button>
//                     </form>
//                     <button className="link" onClick={toggleNested}>Back to Login</button>
//                   </div>
//                 </div>
//               </div>

//               {/* Sign Up */}
//               <div className="flip-side flip-back">
//                 <div className="nested-side">
//                   <h4>Sign Up</h4>
//                   <form onSubmit={handleSignup}>
//                     <input type="text" placeholder="Full Name" required />
//                     <input type="email" placeholder="Email" required />
//                     <input type="password" placeholder="Password" value={signupPass} onChange={e=>setSignupPass(e.target.value)} required />
//                     <ul>
//                        <li>{signupPass.length>=8?'✅':'❌'} At least 8 characters</li>
//                         <li>{/[a-z]/.test(signupPass)?'✅':'❌'} One lowercase letter</li>
//                         <li>{/[A-Z]/.test(signupPass)?'✅':'❌'} One uppercase letter</li>
//                         <li>{/[0-9]/.test(signupPass)?'✅':'❌'} One number</li>
//                         <li>{/[@$!%*?&]/.test(signupPass)?'✅':'❌'} One special character</li>
//                     </ul>
//                     <button type="submit">Register</button>
//                   </form>
//                   <button className="link" onClick={toggleOuter}>Login</button>
//                 </div>
//               </div>

//             </div>
//           </div>
//         </div>
//       </header>

//       <footer>© 2025 Bright Pakistan Initiative</footer>
//     </div>
//   );
// }