import './App.css';
import Header from './components/Header'
import Footer from './components/Footer';
import Body from './components/Body';

const App = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <Body />
      </div>
      <Footer />
    </div>
  );
};

export default App;