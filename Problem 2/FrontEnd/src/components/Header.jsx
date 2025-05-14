import React from 'react';

const Header = () => {
  return (
    <header
      style={{
        background: '#1f1f1f',
        padding: '1rem',
        textAlign: 'center',
        height: '10%',
        flexShrink: 0
      }}
    >
      <h1 style={{color: 'whitesmoke'}}>Task Management System</h1>
    </header>
  );
};

export default Header;