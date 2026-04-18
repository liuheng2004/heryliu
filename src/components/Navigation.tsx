import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, ChevronDown, ShoppingCart } from 'lucide-react';
import { cn } from '../lib/utils';

export const Navbar = () => {
  const location = useLocation();
  
  const navLinks = [
    { name: '首页', path: '/' },
    { name: '关于', path: '/about' },
    { name: '作品集', path: '/portfolio' },
    { name: '文章', path: '/articles' },
  ];

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl">
      <div className="bg-white border-4 border-black rounded-full h-16 flex items-center justify-between px-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 border-4 border-black rounded-full flex items-center justify-center bg-white group-hover:bg-neo-yellow transition-colors">
             <div className="w-4 h-4 border-4 border-black rounded-full" />
          </div>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "font-bold text-sm tracking-wide transition-colors hover:text-neo-pink",
                location.pathname === link.path ? "text-neo-pink" : "text-black"
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center gap-1 font-bold text-sm cursor-pointer group hover:text-neo-blue">
            页面 <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
          </div>
          <div className="flex items-center gap-2 font-bold text-sm cursor-pointer hover:text-neo-purple">
            购物车 <span className="text-gray-400 font-medium">(0)</span>
          </div>
        </div>

        {/* Contact Icon */}
        <div className="bg-black text-white w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer hover:bg-zinc-800 transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <Mail className="w-5 h-5" />
        </div>
      </div>
    </nav>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-black text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Newsletter Section */}
        <div className="bg-white border-4 border-black rounded-3xl p-8 mb-20 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1),-8px_-8px_0px_0px_#00D1FF20]">
           <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-neo-blue border-3 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Mail className="w-8 h-8 text-black" />
              </div>
              <h2 className="text-black text-2xl font-black italic">订阅我的通讯</h2>
           </div>
           <div className="flex-1 max-w-md w-full flex border-3 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <input 
                type="email" 
                placeholder="输入您的邮箱地址" 
                className="flex-1 px-4 py-3 text-black outline-none font-medium"
              />
              <button className="bg-black text-white px-6 font-bold hover:bg-zinc-800 transition-colors">
                订阅
              </button>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center overflow-hidden bg-neo-yellow">
                 <img src="https://picsum.photos/seed/john/100/100" alt="JD" className="w-full h-full object-cover" />
              </div>
              <span className="text-xl font-black italic tracking-tighter">Paperfolio X</span>
            </div>
            <p className="text-gray-400 font-medium leading-relaxed">
              专注于提供优质的数字设计体验，让每一个像素都充满生命力。
            </p>
            <div className="flex gap-4">
              {['Facebook', 'Twitter', 'Instagram', 'Youtube', 'Linkedin'].map((social) => (
                <div key={social} className="w-10 h-10 border-2 border-gray-700 rounded-full flex items-center justify-center hover:bg-neo-pink hover:border-black hover:text-black cursor-pointer transition-all">
                  <span className="text-xs font-bold leading-none">{social[0]}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-black italic mb-6">页面</h3>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li><Link to="/" className="hover:text-white transition-colors">首页</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">关于</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">联系</Link></li>
              <li><Link to="/portfolio" className="hover:text-white transition-colors">作品集</Link></li>
              <li><Link to="/project" className="hover:text-white transition-colors">单个项目</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-black italic mb-6">实用页面</h3>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li>样式指南</li>
              <li>从这里开始</li>
              <li>404 未找到</li>
              <li>密码保护</li>
              <li>许可证</li>
              <li>更新日志</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-black italic mb-6">联系我们</h3>
            <div className="space-y-4">
              <a href="mailto:nikhil@helpinggeeks.com" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-medium">
                <Mail className="w-4 h-4 text-neo-blue" /> hello@designer.com
              </a>
              <div className="flex items-center gap-2 text-gray-400 font-medium">
                <span className="text-neo-pink">📞</span> +86-1234567890
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-10 text-center text-gray-500 text-sm font-medium">
          © {new Date().getFullYear()} 甄设计工作室。保留所有权利。
        </div>
      </div>
    </footer>
  );
};
