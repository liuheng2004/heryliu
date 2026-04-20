import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar, Footer } from './components/Navigation';
import Home from './pages/Home';
import { Starfield } from './components/Starfield';

const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="pt-40 px-6 max-w-7xl mx-auto min-h-[70vh] flex flex-col items-center justify-center text-center">
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-mint/20 rounded-full blur-[100px] pointer-events-none" />
    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 relative z-10">{title}</h1>
    <p className="text-gray-400 text-lg relative z-10">内容正在建设中...</p>
  </div>
);

export default function App() {
  return (
    <div className="antialiased selection:bg-mint selection:text-dark-bg min-h-screen flex flex-col overflow-x-hidden relative">
      <Starfield />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<PlaceholderPage title="关于我" />} />
          <Route path="/projects" element={<PlaceholderPage title="我的项目" />} />
          <Route path="/journey" element={<PlaceholderPage title="我的旅程" />} />
          <Route path="/gallery" element={<PlaceholderPage title="我的相册" />} />
          <Route path="/contact" element={<PlaceholderPage title="联系我" />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
