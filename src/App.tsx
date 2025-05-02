import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Accommodations from './components/Accommodations';
import Studios from './components/Studios';
import Features from './components/Features';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="font-sans">
      <Header />
      <Hero />
      <Accommodations />
      <Studios />
      <Features />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;