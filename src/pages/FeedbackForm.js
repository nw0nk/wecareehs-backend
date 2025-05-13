import React, { useState } from 'react';
import {
  FaRegFrown,
  FaRegMeh,
  FaRegSmile,
  FaSmile,
  FaGrinStars,
  FaCheckCircle
} from 'react-icons/fa';
import './FeedbackForm.css';

const LOCAL_API_BASE_URL = "http://localhost:5000";
const RENDER_API_BASE_URL = "https://wecareehs-backend.onrender.com";

const API_BASE_URL = process.env.REACT_APP_USE_RENDER === "true" ? RENDER_API_BASE_URL : LOCAL_API_BASE_URL;

const feedbackQuestions = [
  {
    key: 'duration',
    label: 'Training Time Duration',
    hindi: 'प्रशिक्षण कालावधि'
  },
  {
    key: 'content',
    label: 'Training Course Content',
    hindi: 'प्रशिक्षण सामग्री'
  },
  {
    key: 'knowledge',
    label: "Trainer's Knowledge",
    hindi: 'प्रशिक्षक का ज्ञान'
  },
  {
    key: 'presentation',
    label: 'Presentation Skills',
    hindi: 'प्रशिक्षण प्रदर्शन'
  },
  {
    key: 'increase',
    label: 'Increase my Knowledge',
    hindi: 'मेरा ज्ञान बढ़ा'
  }
];

const ratingOptions = [
  {
    value: 1,
    label: 'Not Ok',
    color: '#e74c3c',
    icon: <FaRegFrown />
  },
  {
    value: 2,
    label: 'Improve',
    color: '#e67e22',
    icon: <FaRegMeh />
  },
  {
    value: 3,
    label: 'Ok',
    color: '#f1c40f',
    icon: <FaRegSmile />
  },
  {
    value: 4,
    label: 'Good',
    color: '#7ed957',
    icon: <FaSmile />
  },
  {
    value: 5,
    label: 'Excellent',
    color: '#27ae60',
    icon: <FaGrinStars />
  }
];

const initialRatings = feedbackQuestions.reduce((acc, q) => {
  acc[q.key] = 0;
  return acc;
}, {});

const FeedbackForm = () => {
  const [header, setHeader] = useState({
    name: '',
    company: '',
    trainingTitle: '',
    date: '',
    place: '',
    trainer: ''
  });
  const [ratings, setRatings] = useState(initialRatings);
  const [overall, setOverall] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    setHeader((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleRating = (key, value) => {
    setRatings((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const handleOverall = (value) => {
    setOverall(value);
    if (errors.overall) setErrors((prev) => ({ ...prev, overall: '' }));
  };

  const handleComment = (e) => {
    setComment(e.target.value.slice(0, 255));
  };

  const validate = () => {
    const newErrors = {};
    if (!header.name.trim()) newErrors.name = 'Name is required';
    if (!header.company.trim()) newErrors.company = 'Company is required';
    if (!header.trainingTitle.trim()) newErrors.trainingTitle = 'Training Title is required';
    if (!header.date.trim()) newErrors.date = 'Date is required';
    if (!header.place.trim()) newErrors.place = 'Place is required';
    if (!header.trainer.trim()) newErrors.trainer = 'Trainer is required';
    feedbackQuestions.forEach(q => {
      if (!ratings[q.key]) newErrors[q.key] = 'Required';
    });
    if (!overall) newErrors.overall = 'Overall rating required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: header.name,
          company: header.company,
          trainingTitle: header.trainingTitle,
          date: header.date,
          place: header.place,
          trainer: header.trainer,
          ratings: ratings,
          overall: overall,
          comment: comment
        })
      });
      if (!res.ok) throw new Error('Failed to submit feedback');
      setIsSubmitted(true);
    } catch (err) {
      setErrors(prev => ({ ...prev, submit: err.message }));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="feedback-success">
        <FaCheckCircle className="success-icon" />
        <h2>Thank you for your feedback!</h2>
        <p>Your feedback has been submitted successfully.</p>
      </div>
    );
  }

  return (
    <div className="feedback-container advanced-theme">
      <form className="feedback-advanced-form" onSubmit={handleSubmit}>
        {/* Header Section */}
        <div className="feedback-header-table">
          <div className="header-row">
            <div className="header-cell">
              <label>Name:</label>
              <input name="name" value={header.name} onChange={handleHeaderChange} className={errors.name ? 'error' : ''} />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>
            <div className="header-cell">
              <label>Date:</label>
              <input name="date" type="date" value={header.date} onChange={handleHeaderChange} className={errors.date ? 'error' : ''} />
              {errors.date && <span className="error-text">{errors.date}</span>}
            </div>
          </div>
          <div className="header-row">
            <div className="header-cell">
              <label>Company:</label>
              <input name="company" value={header.company} onChange={handleHeaderChange} className={errors.company ? 'error' : ''} />
              {errors.company && <span className="error-text">{errors.company}</span>}
            </div>
            <div className="header-cell">
              <label>Place:</label>
              <input name="place" value={header.place} onChange={handleHeaderChange} className={errors.place ? 'error' : ''} />
              {errors.place && <span className="error-text">{errors.place}</span>}
            </div>
          </div>
          <div className="header-row">
            <div className="header-cell">
              <label>Training Title:</label>
              <input name="trainingTitle" value={header.trainingTitle} onChange={handleHeaderChange} className={errors.trainingTitle ? 'error' : ''} />
              {errors.trainingTitle && <span className="error-text">{errors.trainingTitle}</span>}
            </div>
            <div className="header-cell">
              <label>Trainer:</label>
              <input name="trainer" value={header.trainer} onChange={handleHeaderChange} className={errors.trainer ? 'error' : ''} />
              {errors.trainer && <span className="error-text">{errors.trainer}</span>}
            </div>
          </div>
        </div>

        {/* Feedback Table Section */}
        <div className="feedback-table-section">
          <table className="feedback-table">
            <thead>
              <tr>
                <th>Sr.</th>
                <th>Feedback <span className="hindi">(प्रतिक्रिया)</span></th>
                {ratingOptions.map(opt => (
                  <th key={opt.value} className="rating-label">
                    <span style={{ color: opt.color }}>{opt.icon}</span>
                    <div className="rating-label-text">{opt.label}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {feedbackQuestions.map((q, idx) => (
                <tr key={q.key}>
                  <td>{idx + 1}</td>
                  <td>
                    {q.label} <span className="hindi">({q.hindi})</span>
                  </td>
                  {ratingOptions.map(opt => (
                    <td key={opt.value}>
                      <input
                        type="radio"
                        name={q.key}
                        value={opt.value}
                        checked={ratings[q.key] === opt.value}
                        onChange={() => handleRating(q.key, opt.value)}
                        className="rating-radio"
                        style={{ accentColor: opt.color }}
                      />
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td colSpan={2} className="overall-label">
                  <b>Overall Rating <span className="hindi">(कुल मिलाकर)</span>:</b>
                  {errors.overall && <span className="error-text"> {errors.overall}</span>}
                </td>
                {ratingOptions.map(opt => (
                  <td key={opt.value}>
                    <input
                      type="radio"
                      name="overall"
                      value={opt.value}
                      checked={overall === opt.value}
                      onChange={() => handleOverall(opt.value)}
                      className="rating-radio"
                      style={{ accentColor: opt.color }}
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td colSpan={2} className="overall-label">
                  <b>My Comment <span className="hindi">(मेरी टिप्पणी)</span>:</b>
                </td>
                <td colSpan={5}>
                  <textarea
                    className="comment-box"
                    value={comment}
                    onChange={handleComment}
                    maxLength={255}
                    placeholder="Free text 255 Characters"
                  />
                  <div className="char-count">{comment.length}/255</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="submit-row">
          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
