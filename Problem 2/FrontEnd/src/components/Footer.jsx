import React from 'react';

const Footer = () => {
  return (
    <footer
      style={{
        background: '#1f1f1f',
        padding: '1rem',
        textAlign: 'center',
        flexShrink: 0,
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        color: 'whitesmoke'
      }}
    >
      <p style={{ margin: 0 }}>© All Copyrights Reserved 2025</p>
    </footer>
  );
};

export default Footer;