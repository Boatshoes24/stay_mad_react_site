import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogoHeader from './components/LogoHeader';
import GuildInformation from './components/GuildInformation';
import Links from './components/Links';
import ImageSlider from './components/ImageSlider';
import Streams from './components/Streams';
import GuildApplication from './components/GuildApplication';
import Footer from './components/Footer';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className='container'>
        <LogoHeader />
        <br />
        <Links />
        <br />
        <div className='current-content'>
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/streams' element={<Streams />} />
            <Route path='/gallery' element={<ImageSlider />} />
            <Route path='/about' element={<GuildInformation />} />
            <Route path='/apply' element={<GuildApplication />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
