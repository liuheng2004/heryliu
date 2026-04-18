import React from 'react';
import { Mail, Briefcase, ChevronRight, PenTool, Layout, Monitor, Zap, MessageSquare } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-32 pb-32">
      {/* Hero Section */}
      <section className="pt-48 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
        <div className="flex-1 space-y-10">
          <h1 className="text-6xl md:text-8xl font-black leading-tight tracking-tighter">
            我是 <span className="highlight-pink inline-block ml-[10px]">牛小恒</span>，<br />
            欢迎来到我的<br />
            <span className="highlight-blue text-white">个人博客</span>
          </h1>
          <p className="max-w-md text-gray-500 font-medium text-lg leading-relaxed">
            我专注于创造具有视觉冲击力的用户体验和直观的数字产品，帮助品牌在数字世界中脱颖而出。
          </p>
          <div className="flex flex-wrap gap-6 pt-4">
            <button className="neo-button-black cursor-pointer">
              <Mail className="w-5 h-5" /> 联系我
            </button>
            <button className="neo-button-white cursor-pointer">
              <Briefcase className="w-5 h-5" /> 查看作品集
            </button>
          </div>
        </div>
        <div className="flex-1 relative">
           <div className="w-full aspect-square border-4 border-black rounded-3xl overflow-hidden neo-box p-8 bg-neo-yellow group hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 cursor-pointer">
              <img 
                src="https://picsum.photos/seed/portrait/800/800" 
                alt="John portrait" 
                className="w-full h-full object-contain group-hover:scale-105 group-hover:rotate-2 transition-all duration-500"
              />
           </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-6 max-w-7xl mx-auto space-y-20">
        <div className="text-center space-y-6">
          <h2 className="text-5xl font-black">我提供的 <span className="highlight-pink">广泛服务</span></h2>
          <p className="max-w-2xl mx-auto text-gray-500 font-medium leading-relaxed">
            从创意概念到最终落地，我提供全方位的数字设计服务，确保每个细节都能完美呈现您的品牌价值。
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: '网页设计', icon: <Monitor />, desc: '打造令人难忘的数字空间，将卓越美学与流畅的用户旅程相结合。' },
            { title: 'UI/UX 设计', icon: <Layout />, desc: '基于深度研究的直观界面，为用户带来愉快的使用体验。' },
            { title: '产品设计', icon: <PenTool />, desc: '端到端的产品设计方案，解决真实问题并推动业务增长。' },
            { title: '内容策略', icon: <Zap />, desc: '极具吸引力的叙事方式，连接您的受众并清晰传达品牌愿景。' },
            { title: '品牌设计', icon: <Briefcase />, desc: '建立强大且一致的视觉标识，让您的品牌更具辨识度。' },
          ].map((service, i) => (
            <div key={i} className="neo-box p-10 space-y-8 group hover:-translate-y-2 transition-all cursor-pointer">
               <div className="w-16 h-16 border-3 border-black rounded-xl flex items-center justify-center bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:bg-neo-yellow transition-colors">
                 {React.cloneElement(service.icon, { className: 'w-8 h-8' })}
               </div>
               <div className="space-y-4">
                 <h3 className="text-2xl font-black italic">{service.title}</h3>
                 <p className="text-gray-500 font-medium leading-relaxed">{service.desc}</p>
               </div>
            </div>
          ))}
          <div className="neo-box p-10 bg-neo-yellow flex flex-col items-center justify-center text-center space-y-6 cursor-pointer hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all">
             <div className="w-16 h-16 border-3 border-black rounded-xl bg-white flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Mail className="w-8 h-8" />
             </div>
             <div className="space-y-2">
                <h3 className="text-2xl font-black italic">联系我</h3>
                <p className="text-gray-800 font-medium text-sm leading-relaxed px-4">寻找其他服务？请与我联系，我很有可能可以帮到您！</p>
             </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-20">
         <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-0 bg-neo-pink rounded-full border-4 border-black translate-x-4 translate-y-4 -z-10" />
              <div className="w-full aspect-square border-4 border-black rounded-full overflow-hidden bg-white shadow-neo-lg flex items-center justify-center overflow-hidden">
                <img src="https://picsum.photos/seed/laptop/800/800" alt="About" className="w-full h-full object-cover" />
              </div>
            </div>
         </div>
         <div className="flex-1 space-y-10">
            <h2 className="text-5xl font-black leading-tight">
              谁是这些优秀作品的 <span className="highlight-blue text-white cursor-pointer hover:bg-neo-pink transition-colors">幕后推手？</span>
            </h2>
            <div className="space-y-6 text-gray-500 font-medium leading-relaxed text-lg">
              <p>拥有深厚的设计背景和对技术的敏锐直觉，我致力于将复杂的想法转化为优雅的数字解决方案，同时确保每一个项目都独具特色。</p>
              <div className="grid grid-cols-2 gap-12 pt-4">
                 <div className="space-y-2">
                    <div className="text-4xl font-black italic">7年以上</div>
                    <div className="text-xs font-black uppercase tracking-widest text-gray-400">经验</div>
                 </div>
                 <div className="space-y-2">
                    <div className="text-4xl font-black italic">50+</div>
                    <div className="text-xs font-black uppercase tracking-widest text-gray-400">成功项目</div>
                 </div>
              </div>
            </div>
            <button className="neo-button-black mt-4 px-8">
               了解更多关于我
            </button>
         </div>
      </section>

      {/* Portfolio Section */}
      <section className="px-6 max-w-7xl mx-auto space-y-20">
        <div className="text-center">
           <h2 className="text-5xl font-black">
             看看我的 <span className="highlight-yellow">设计作品集</span>
           </h2>
        </div>
        <div className="space-y-12">
            {[
              { title: 'Studio 用户研究与分析', category: 'UI/UX 设计', color: 'bg-neo-purple', logo: 'Studio.' },
              { title: 'Venture 工作空间 Web 应用重新设计', category: '产品设计', color: 'bg-neo-blue', logo: 'Venture.' },
            ].map((proj, i) => (
              <div key={i} className="neo-box overflow-hidden flex flex-col md:flex-row group cursor-pointer transition-all hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                 <div className="flex-1 p-12 flex flex-col justify-center space-y-8">
                    <div className="flex items-center gap-3 text-2xl font-black italic tracking-tighter">
                       <div className={`w-8 h-8 rounded-lg ${proj.color} border-2 border-black`} /> {proj.logo}
                    </div>
                    <span className="bg-black text-white text-[10px] font-black px-3 py-1 rounded-full uppercase self-start italic tracking-widest">
                       {proj.category}
                    </span>
                    <h3 className="text-4xl font-black leading-tight group-hover:text-neo-pink transition-colors">{proj.title}</h3>
                    <p className="text-gray-500 font-medium leading-relaxed max-w-md">探索我在数字产品领域的最新实践，了解我是如何通过设计解决复杂的业务挑战的。</p>
                    <div className="flex items-center gap-2 font-black text-sm group-hover:gap-4 transition-all italic underline underline-offset-4">
                       查看案例研究 <ChevronRight className="w-4 h-4" />
                    </div>
                 </div>
                 <div className={`flex-1 ${proj.color} border-l-4 border-black p-12 flex items-center justify-center min-h-[400px]`}>
                    <div className="w-full h-full neo-box bg-white overflow-hidden p-4">
                       <img src={`https://picsum.photos/seed/p${i}/800/600`} alt="Portfolio" className="w-full h-full object-cover rounded-lg" />
                    </div>
                 </div>
              </div>
            ))}
        </div>
      </section>

       {/* Testimonials */}
       <section className="px-6 max-w-7xl mx-auto space-y-20">
        <div className="text-center">
           <h2 className="text-5xl font-black">
             客户对我的工作 <span className="highlight-blue text-white">有何评价</span>
           </h2>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-5xl mx-auto">
           <div className="flex-1 neo-box p-12 bg-white relative">
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-black rounded-lg flex items-center justify-center text-white border-2 border-white shadow-neo">
                 <MessageSquare className="w-6 h-6" />
              </div>
              <p className="text-2xl font-black leading-relaxed italic text-black">
                "牛小恒是一位出色的设计师，他不仅能交付精美的视觉效果，还能深入理解我们的业务目标并将其完美融入到设计中。"
              </p>
              <div className="mt-8 border-t-2 border-dashed border-gray-200 pt-6">
                <div className="font-black text-xl italic">Lily Woods</div>
                <div className="text-gray-400 font-bold text-sm">Google 设计副总裁</div>
              </div>
           </div>
           <div className="relative">
              <div className="w-64 h-64 border-4 border-black rounded-full bg-neo-pink overflow-hidden group shadow-neo-lg">
                 <img src="https://picsum.photos/seed/client/400/400" alt="Client" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-neo-purple border-4 border-black rounded-full flex items-center justify-center shadow-neo">
                 <Zap className="w-10 h-10 text-white fill-current" />
              </div>
           </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="px-6 max-w-7xl mx-auto space-y-16">
        <div className="flex items-end justify-between border-b-4 border-black pb-8">
           <h2 className="text-5xl font-black italic tracking-tighter">文章与新闻</h2>
           <button className="neo-button-white px-8">
              浏览所有文章
           </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Featured */}
           <div className="neo-box p-8 space-y-8 flex flex-col group cursor-pointer hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all">
              <div className="aspect-video bg-white border-4 border-black rounded-2xl overflow-hidden relative shadow-neo-lg">
                 <img src="https://picsum.photos/seed/featured/800/600" alt="article" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                 <span className="absolute top-6 right-6 bg-black text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-neo">资源</span>
              </div>
              <div className="space-y-6 flex-1 flex flex-col">
                 <h3 className="text-3xl font-black italic group-hover:text-neo-pink transition-colors">2026年该如何选择合适的设计工具？</h3>
                 <div className="mt-auto flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full border-2 border-black bg-neo-yellow overflow-hidden">
                       <img src="https://picsum.photos/seed/author/100/100" alt="JD" className="w-full h-full object-cover" />
                    </div>
                    <div>
                       <div className="font-black text-sm">牛小恒</div>
                       <div className="text-xs text-gray-400 font-bold">2026年10月28日</div>
                    </div>
                 </div>
              </div>
           </div>
           {/* List */}
           <div className="space-y-8">
              {[
                { title: 'UI设计中的字体大小：完整遵循指南', category: '文章' },
                { title: '成为专业UI/UX设计师的6个实用练习', category: '新闻' },
              ].map((art, i) => (
                <div key={i} className="neo-box p-8 flex flex-col sm:flex-row gap-8 group cursor-pointer hover:border-neo-blue transition-all">
                   <div className="sm:w-1/3 aspect-square bg-white border-3 border-black rounded-xl overflow-hidden shadow-neo">
                      <img src={`https://picsum.photos/seed/sm${i}/400/400`} alt="art" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                   </div>
                   <div className="flex-1 space-y-3">
                      <span className="bg-black text-white text-[9px] font-black px-2 py-1 rounded-full uppercase italic shadow-neo">{art.category}</span>
                      <h4 className="text-xl font-black italic group-hover:text-neo-blue transition-colors leading-tight">{art.title}</h4>
                      <p className="text-gray-400 text-sm font-medium line-clamp-2">在设计数字产品时，我们应该关注每一个细节，从而提供无缝且愉悦的用户体验。</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
}
