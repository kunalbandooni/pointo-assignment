import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';

const App = () => {
  return (
    <div style={{
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Header />
      <div style={{
        flex: 1,
        height: '80%',
        overflowY: 'auto'
        }}>
        <Body />
      </div>
      <Footer />
    </div>
  );
};

export default App;