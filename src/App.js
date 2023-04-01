import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogoHeader from './components/LogoHeader';
import GuildInformation from './components/GuildInformation';
import Links from './components/Links';
import ImageSlider from './components/ImageSlider';
import Streams from './components/Streams';
import AppFormSuccess from './components/AppFormSuccess';
import Footer from './components/Footer';
import Home from './components/Home';
import AppForm from './components/AppForm';
import AppFormDuplicate from './components/AppFormDuplicate';

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
              <Route path="/"  element={<Home />} />
              <Route path='/streams' element={<Streams />} />
              <Route path='/gallery' element={<ImageSlider />} />
              <Route path='/about' element={<GuildInformation />} />
              <Route path='/apply' element={<AppForm />} />
              <Route path='/applysuccess' element={<AppFormSuccess />} />
              <Route path='/applyduplicate' element={<AppFormDuplicate />} />
            </Routes>
          </div>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
