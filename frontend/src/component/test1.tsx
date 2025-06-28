import React, { useState } from 'react';
import './test.css';

const CardWithModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log('Saved data:', formData);
    handleClose();
  };

  return (
    <div>
      <div className="card" onClick={handleOpen}>
        <h3>Click to Fill Details</h3>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-button" onClick={handleClose}>
              &times;
            </button>
            <h2>Fill Details</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <div className="button-group">
              <button onClick={handleSave} className="save-button">Save</button>
              <button onClick={handleClose} className="cancel-button">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardWithModal;
