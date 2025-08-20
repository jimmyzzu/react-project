import React from 'react';

function Card({ title, children, className = '' }) {
  return (
    <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
      {title ? <h3 className="text-lg font-semibold mb-4">{title}</h3> : null}
      {children}
    </div>
  );
}

export default Card;


