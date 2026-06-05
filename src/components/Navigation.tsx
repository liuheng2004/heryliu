import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, ChevronDown, ShoppingCart } from 'lucide-react';
import { cn } from '../lib/utils';

export const Navbar = () => {
  const location = useLocation();
  
  const navLinks = [
    { name: '关于', path: '/about' },
    { name: '项目', path: '/projects' },
    { name: '旅程', path: '/journey' },
    { name: '相册', path: '/gallery' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full py-6 px-8 md:px-12 backdrop-blur-sm bg-dark-bg/50 border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-white font-bold text-xl tracking-wide shrink-0">
          首页
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 justify-end flex-1 pl-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium tracking-wide transition-colors hover:text-mint",
                location.pathname === link.path ? "text-mint" : "text-gray-300"
              )}
            >
              {link.name}
            </Link>
          ))}
          
          <Link to="/contact" className="bg-[#1a3a2a] text-mint px-5 py-2 rounded-full text-sm font-bold hover:bg-mint hover:text-dark-bg transition-all">
            联系我
          </Link>
        </div>
      </div>
    </nav>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-black text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          {/* 品牌介绍 */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center overflow-hidden bg-mint">
                <span className="text-dark-bg text-sm font-bold">H</span>
              </div>
              <span className="text-xl font-bold tracking-tight">我的小站</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              记录学习、生活和成长的数字家园。用设计与技术创造有价值的产品。
            </p>
          </div>

          {/* 快速导航 */}
          <div>
            <h3 className="text-white font-bold mb-6">快速导航</h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-mint transition-colors">首页</Link></li>
              <li><Link to="/about" className="hover:text-mint transition-colors">关于</Link></li>
              <li><Link to="/projects" className="hover:text-mint transition-colors">项目</Link></li>
              <li><Link to="/journey" className="hover:text-mint transition-colors">旅程</Link></li>
              <li><Link to="/gallery" className="hover:text-mint transition-colors">相册</Link></li>
              <li><Link to="/contact" className="hover:text-mint transition-colors">联系</Link></li>
            </ul>
          </div>

          {/* 联系方式 */}
          <div>
            <h3 className="text-white font-bold mb-6">联系方式</h3>
            <div className="space-y-4 text-sm">
              <a href="mailto:hello@zhendesign.com" className="flex items-center gap-2 text-gray-400 hover:text-mint transition-colors">
                <Mail className="w-4 h-4 text-mint" /> hello@zhendesign.com
              </a>
              <div className="flex items-center gap-2 text-gray-400">
                <span className="text-mint text-base">📱</span> +86-138-0000-0000
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <span className="text-mint text-base">📍</span> 中国 · 北京
              </div>
            </div>
          </div>

          {/* 关于本站 */}
          <div>
            <h3 className="text-white font-bold mb-6">关于本站</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              基于 React + Vite + Tailwind CSS v4 构建。源代码托管于 GitHub，欢迎交流学习。
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} 我的小站 · 用 ❤️ 打造
        </div>
      </div>
    </footer>
  );
};
