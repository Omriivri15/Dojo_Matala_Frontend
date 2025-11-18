import React from 'react';
import './ConfirmModal.css';

const ConfirmModal = ({ message, onConfirm, onCancel, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>DOJO IS GREAT</h3>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-confirm" onClick={onConfirm}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

