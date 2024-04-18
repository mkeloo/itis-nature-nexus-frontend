// TitleComponent.js
import React from 'react';

const TitleComponent = ({ title }) => {
  return (
    <header className="text-black bg-blue-100 font-bold text-3xl p-4 text-center">
      {title}
    </header>
  );
};

export default TitleComponent;
