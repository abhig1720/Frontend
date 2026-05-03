import React, { useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim() || rating) {
      // In a real app, send to backend here
      setSubmitted(true);
      setTimeout(() => {
        setShowFeedback(false);
        setSubmitted(false);
        setFeedback("");
        setRating("");
      }, 2500);
    }
  };
  return (
    <footer className="myntra-footer">
      <div className="footer-feedback-section">
        <p>We'd love to hear what you think!</p>
        <button className="feedback-btn" onClick={() => setShowFeedback(true)}>Give feedback</button>
      </div>

      {showFeedback && (
        <div className="feedback-modal-overlay">
          <div className="feedback-modal">
            <button className="feedback-close-btn" onClick={() => setShowFeedback(false)}>
              <i className="fa-solid fa-times"></i>
            </button>
            {submitted ? (
              <div className="feedback-success">
                <i className="fa-regular fa-circle-check" style={{fontSize: "3rem", color: "#15803d", marginBottom: "15px"}}></i>
                <h2>Thank you!</h2>
                <p>Your feedback helps us improve.</p>
              </div>
            ) : (
              <>
                <h2>Give Feedback</h2>
                <p className="feedback-subtitle">How was your experience today?</p>
                <form onSubmit={handleSubmit} className="feedback-form">
                  <div className="feedback-rating">
                    {[1, 2, 3, 4, 5].map(num => (
                      <button 
                        key={num} 
                        type="button" 
                        className={`rating-btn ${rating === num ? 'active' : ''}`}
                        onClick={() => setRating(num)}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                  <textarea 
                    placeholder="Tell us what you loved or how we can improve..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    required
                  ></textarea>
                  <button type="submit" className="feedback-submit-btn">Submit Feedback</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <div className="footer-links-section">
        <ul className="footer-link-list">
          <li><a href="#">Men</a></li>
          <li><a href="#">Women</a></li>
          <li><a href="#">Kids</a></li>
          <li><a href="#">Home & Living</a></li>
          <li><a href="#">Beauty</a></li>
          <li><a href="#">Store Directory</a></li>
          <li><a href="#">Careers</a></li>
          <li><a href="#">Our Company</a></li>
          <li><a href="#">Sell on Myntra</a></li>
          <li><a href="#">Help</a></li>
          <li><a href="#">Accessibility</a></li>
          <li><a href="#">Get the Myntra App</a></li>
          <li><a href="#">Sign-up for Email</a></li>
          <li><a href="#">Terms of Use</a></li>
          <li><a href="#">Privacy Notice</a></li>
        </ul>
      </div>

      <div className="footer-copyright-section">
        <p>© 2026 Myntra Clone. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
