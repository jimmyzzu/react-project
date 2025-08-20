import React from 'react';

function ProgressBar({ value, color = 'indigo', width = 'w-32' }) {
  return (
    <div className={`${width} bg-gray-200 rounded-full h-2`}>
      <div className={`h-2 rounded-full bg-${color}-500`} style={{ width: `${value}%` }}></div>
    </div>
  );
}

export default ProgressBar;


