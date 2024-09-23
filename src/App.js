import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Component/Navbar';
import Newz from './Component/Newz';

const App = () => {

  const apiKey = process.env.REACT_APP_NEWS_API;
  const pageSize = 7;
  const country = "us";

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/General" />} />
          <Route exact path="/General" element={<Newz key="General" apiKey={apiKey} country={country} pageSize={pageSize} category="General" />} />
          <Route exact path="/Business" element={<Newz key="Business" apiKey={apiKey} country={country} pageSize={pageSize} category="Business" />} />
          <Route exact path="/Entertainment" element={<Newz key="Entertainment" apiKey={apiKey} country={country} pageSize={pageSize} category="Entertainment" />} />
          <Route exact path="/Health" element={<Newz key="Health" apiKey={apiKey} country={country} pageSize={pageSize} category="Health" />} />
          <Route exact path="/Science" element={<Newz key="Science" apiKey={apiKey} country={country} pageSize={pageSize} category="Science" />} />
          <Route exact path="/Sports" element={<Newz key="Sports" apiKey={apiKey} country={country} pageSize={pageSize} category="Sports" />} />
          <Route exact path="/Technology" element={<Newz key="Technology" apiKey={apiKey} country={country} pageSize={pageSize} category="Technology" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
