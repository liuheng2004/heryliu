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
        {/* Newsletter Section */}
        <div className="bg-white border-4 border-black rounded-3xl p-8 mb-20 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1),-8px_-8px_0px_0px_#00D1FF20]">
           <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-neo-blue border-3 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Mail className="w-8 h-8 text-black" />
              </div>
              <h2 className="text-black text-2xl font-black italic">Subscribe to my newsletter</h2>
           </div>
           <div className="flex-1 max-w-md w-full flex border-3 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 px-4 py-3 text-black outline-none font-medium"
              />
              <button className="bg-black text-white px-6 font-bold hover:bg-zinc-800 transition-colors">
                Subscribe
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
              Lorem ipsum dolor sit amet consecte adipiscing elit. Lectus mattis nunc.
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
            <h3 className="text-lg font-black italic mb-6">Pages</h3>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link to="/project" className="hover:text-white transition-colors">Single Project</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-black italic mb-6">Utility Pages</h3>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li>Style Guide</li>
              <li>Start Here</li>
              <li>404 Not Found</li>
              <li>Password Protected</li>
              <li>Licenses</li>
              <li>Changelog</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-black italic mb-6">Contact us</h3>
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
          © {new Date().getFullYear()} ZHEN DESIGN STUDIO. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};
