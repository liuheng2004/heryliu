import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar, Footer } from './components/Navigation';
import Home from './pages/Home';

// Lazy loading or component definition
const About = () => (
  <div className="pt-40 px-6 max-w-7xl mx-auto min-h-screen text-center space-y-12 pb-20">
    <h1 className="text-7xl font-black bg-neo-pink inline-block px-6 py-2 border-4 border-black shadow-neo-lg">关于我</h1>
    <div className="max-w-3xl mx-auto space-y-6 text-xl font-medium text-gray-500 leading-relaxed">
      <p>
        我是牛小恒，一名专注于数字体验的跨领域设计师。
        拥有 7 年以上的行业经验，我曾与众多全球品牌和初创公司合作。
      </p>
      <div className="neo-box p-12 bg-neo-yellow text-black text-left">
         <h2 className="text-3xl font-black mb-6 italic">我的设计理念</h2>
         <p>我认为设计应该是功能性、大胆且以人为本的。通过将野兽派美学与现代可用性相结合，我创造出引人注目且能带来高转化率的界面。</p>
      </div>
    </div>
  </div>
);

const Portfolio = () => (
  <div className="pt-40 px-6 max-w-7xl mx-auto min-h-screen space-y-20 pb-20">
    <div className="text-center">
      <h1 className="text-7xl font-black bg-neo-blue text-white inline-block px-6 py-2 border-4 border-black shadow-neo-lg">我的作品集</h1>
      <p className="mt-8 text-xl text-gray-400 font-bold max-w-2xl mx-auto italic">探索我最新的设计项目和案例研究精选。</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-20">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="neo-box overflow-hidden group cursor-pointer">
           <div className="aspect-video bg-neo-purple border-b-4 border-black overflow-hidden relative">
              <img src={`https://picsum.photos/seed/work${i}/800/600`} alt="work" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
           </div>
           <div className="p-8 space-y-4">
              <span className="bg-black text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">案例研究</span>
              <h3 className="text-3xl font-black group-hover:text-neo-pink transition-colors">数字产品 {i}</h3>
              <p className="text-gray-500 font-medium line-clamp-2 leading-relaxed">探索极具创新性的数字产品设计与开发体验，感受前所未有的交互魅力。</p>
           </div>
        </div>
      ))}
    </div>
  </div>
);

const Articles = () => (
  <div className="pt-40 px-6 max-w-7xl mx-auto min-h-screen space-y-20 pb-20">
    <div className="text-center">
      <h1 className="text-7xl font-black bg-neo-purple text-white inline-block px-6 py-2 border-4 border-black shadow-neo-lg italic underline underline-offset-8">文章</h1>
      <p className="mt-8 text-xl text-gray-400 font-bold max-w-2xl mx-auto underline-offset-4 decoration-neo-pink">关于设计、技术和创造力的见解。</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="neo-box p-6 space-y-6 hover:-translate-y-2 transition-transform cursor-pointer group">
           <div className="aspect-square bg-white border-4 border-black rounded-2xl overflow-hidden shadow-neo-lg">
              <img src={`https://picsum.photos/seed/art${i}/600/600`} alt="art" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
           </div>
           <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-400">
                 <span>设计</span>
                 <span>2026年5月{20 - i}日</span>
              </div>
              <h3 className="text-2xl font-black leading-tight hover:text-neo-blue transition-colors">野兽派网页设计的演变 {i}</h3>
           </div>
        </div>
      ))}
    </div>
  </div>
);

export default function App() {
  return (
    <div className="antialiased selection:bg-neo-yellow selection:text-black min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
