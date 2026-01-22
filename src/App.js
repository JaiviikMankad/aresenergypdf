import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import AresDoc from './AresDoc';
function App() {
  return (
    <Routes>
      <Route path="/" element={<AresDoc/>} />
    </Routes>
  );
}

export default App;
