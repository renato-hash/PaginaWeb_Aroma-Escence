import React from 'react';

export function Toast({ mensaje }) {
  if (!mensaje) return null;

  return (
    <div 
      className="position-fixed bottom-0 end-0 p-3" 
      style={{ zIndex: 2000 }}
    >
      <div className="toast show align-items-center text-white bg-success border-0 shadow-lg p-2" role="alert">
        <div className="d-flex align-items-center">
          <div className="toast-body fw-bold fs-6">
             {mensaje}
          </div>
        </div>
      </div>
    </div>
  );
}