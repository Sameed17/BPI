import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
//import '../bootstrap.min.css';
import '../styles.css';

export default function HomePage({ setIsStart }) {
  // Prevent form submission reload
  const formRef = useRef(null);
  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!formRef.current) return;
    // handle form data...
     emailjs.sendForm(
      'service_nw0tu7g',  // e.g. 'gmail'
      'template_m48raen', // e.g. 'template_contact'
      formRef.current,
      'P88wddaWF2VC7PQYc'      // public key
    )
    .then(
      result => {
        console.log('Email successfully sent!', result.text);
        alert('Thank you—your message has been sent!');
        formRef.current?.reset();
      },
      error => {
        console.error('Email send error:', error.text);
        alert('Oops, something went wrong. Please try again later.');
      }
    );
  };

  return (
    <>
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
        <div className="container">
          <a className="navbar-brand" href="#page-top">Bright Pakistan</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto text-uppercase">
              <li className="nav-item"><a className="nav-blink" href="#how">How It Works</a></li>
              <li className="nav-item"><a className="nav-blink" href="#scholarships">Scholarships</a></li>
              <li className="nav-item"><a className="nav-blink" href="#about">About</a></li>
              <li className="nav-item"><a className="nav-blink" href="#testimonials">Testimonials</a></li>
              <li className="nav-item"><a className="nav-blink" href="#contact">Contact</a></li>
              <li className="nav-item"><button className="nav-blink butun butun-blink" type="button" onClick={() => setIsStart(true)}>Login/Signup</button></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Masthead */}
      <header className="masthead text-center text-white d-flex" id="page-top">
        <div className="container my-auto">
          <div className="masthead-subheading">Empowering Students for a Brighter Future</div>
          <div className="masthead-heading text-uppercase">Bright Pakistan Initiative</div>
          <button type="button" className="butun butun-primary butun-xl text-uppercase" onClick={() => setIsStart(true)}>Get Started</button>
        </div>
      </header>

      {/* How It Works */}
      <section className="page-section bg-light" id="how">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">How It Works</h2>
            <p className="section-subheading text-muted">Simple steps to join and qualify for scholarships.</p>
          </div>
          <div className="row text-center">
            {['Register', 'Pay Test Fee', 'Take Test'].map((title, idx) => {
              const icons = ['fa-user-plus', 'fa-credit-card', 'fa-question'];
              const texts = [
                'Sign up with your email and verify your account.',
                'Securely pay the online assessment fee.',
                'Complete the MCQ test and get instant results.'
              ];
              return (
                <div className="col-md-4" key={idx}>
                  <span className="fa-stack fa-4x">
                    <i className="fas fa-circle fa-stack-2x text-primary"></i>
                    <i className={`fas ${icons[idx]} fa-stack-1x fa-inverse`}></i>
                  </span>
                  <h4 className="my-3">{title}</h4>
                  <p className="text-muted">{texts[idx]}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Scholarships */}
      <section className="page-section" id="scholarships">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">Scholarships & Benefits</h2>
            <p className="section-subheading text-muted">Top performers receive:</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Full or partial tuition fee scholarships</li>
            <li className="list-group-item">Mentorship from industry leaders</li>
            <li className="list-group-item">Internship and job placement assistance</li>
            <li className="list-group-item">Access to exclusive career development programs</li>
          </ul>
        </div>
      </section>

      {/* About */}
      <section className="page-section" id="about">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">About Us</h2>
            <p className="section-subheading text-muted">
              The Bright Pakistan Initiative is dedicated to providing quality education and scholarship opportunities
              to deserving students across Pakistan. We believe every student, regardless of background, deserves a chance to succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="page-section bg-light" id="testimonials">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">Success Stories</h2>
          </div>
          <div className="row">
            {[{ text: 'Bright Pakistan Initiative changed my life!', author: 'Ayesha Khan' },
              { text: 'The mentorship I received was invaluable.', author: 'Ahmed Raza' }
            ].map((t, i) => (
              <div className="col-md-6" key={i}>
                <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                  <h5 className="mb-1">"{t.text}"</h5>
                  <p className="font-weight-light mb-0">– {t.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <div className="py-5">
        <div className="container">
          <div className="row align-items-center">
            {['Microsoft', 'Google', 'Facebook', 'github'].map((client, i) => (
            <div className="col-md-3 col-sm-6 my-3" key={i}>
                <span className="fa-stack fa-2x d-block mx-auto">
                <i className="fas fa-circle fa-stack-2x text-primary"></i>
                <i className={`fab fa-${client.toLowerCase()} fa-stack-1x fa-inverse`}></i>
                </span>
                <p className="text-center mt-2">{client}</p>
            </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact */}
      <section className="page-section" id="contact">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">Contact Us</h2>
            <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
          </div>
          <form id="contactForm" ref={formRef} onSubmit={handleContactSubmit}>
            <div className="row align-items-stretch mb-5">
              <div className="col-md-6">
                <div className="form-group">
                  <input className="form-control" name="name" placeholder="Your Name *" required />
                  <div className="invalid-feedback">A name is required.</div>
                </div>
                <div className="form-group">
                  <input type="email" className="form-control" name="email" placeholder="Your Email *" required />
                  <div className="invalid-feedback">An email is required and must be valid.</div>
                </div>
                <div className="form-group mb-md-0">
                  <input className="form-control" name="phone" placeholder="Your Phone *" required />
                  <div className="invalid-feedback">A phone number is required.</div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group form-group-textarea mb-md-0">
                  <textarea className="form-control" name="message" placeholder="Your Message *" required></textarea>
                  <div className="invalid-feedback">A message is required.</div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button className="butun butun-primary butun-xl text-uppercase" type="submit">Send Message</button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer py-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4 text-lg-start">Copyright © 2025 Bright Pakistan Initiative</div>
            <div className="col-lg-4 my-3 my-lg-0 text-center">
              <button className="butun butun-dark butun-social mx-2"><i className="fab fa-twitter"></i></button>
              <button className="butun butun-dark butun-social mx-2"><i className="fab fa-facebook-f"></i></button>
              <button className="butun butun-dark butun-social mx-2"><i className="fab fa-linkedin-in"></i></button>
            </div>
            <div className="col-lg-4 text-lg-end">
              <a className="blink-dark text-decoration-none me-3" href="/">Privacy Policy</a>
              <a className="blink-dark text-decoration-none" href="/">Terms of Use</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
