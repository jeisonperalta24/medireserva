import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import Navbar from './components/Navbar';

import Home from './pages/Home';
import Courses from './pages/Courses';
import Contact from './pages/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/courses"
          element={<Courses />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

      </Routes>
      
      <Footer />
    
    </BrowserRouter>
  );
}

export default App;