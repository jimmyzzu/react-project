import React from 'react';

function PageHeader({ title, right }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      {right ? <div>{right}</div> : null}
    </div>
  );
}

export default PageHeader;