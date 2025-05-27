import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './about';

function App() {
  const basename = '/react-webpack';

  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/about" element={<About />} />
        <Route path="/test1" element={<div>test1</div>} />
      </Routes>
    </Router>
  );
}

export default App;
