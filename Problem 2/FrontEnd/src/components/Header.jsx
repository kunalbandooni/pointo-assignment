import React from 'react';

const Header = () => {
  return (
    <header
      style={{
        background: '#1f1f1f',
        padding: '1rem',
        textAlign: 'center',
        flexShrink: 0,
        color: 'whitesmoke',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000
      }}
    >
      <h1 style={{ margin: 0 }}>Task Management System</h1>
    </header>
  );
};

export default Header;