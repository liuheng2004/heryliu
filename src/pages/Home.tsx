import React from 'react';
import { ChevronDown, ArrowUpRight } from 'lucide-react';

const playClickSound = () => {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.1);
  } catch (error) {
    // 忽略音频错误
  }
};

export default function Home() {
  return (
    <div className="space-y-32 pb-32">
      {/* Hero Section */}
      <section className="pt-48 px-6 max-w-5xl mx-auto flex flex-col items-center justify-center text-center relative">
        {/* Planet Orb Behind Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-tr from-blue-600/30 to-mint/30 rounded-full blur-[80px] pointer-events-none -z-10" />
        <div className="absolute top-0 w-48 h-48 bg-blue-500/20 rounded-full blur-[80px] -z-10"></div>
        
        <div className="space-y-6 z-10 relative">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 m-0 leading-tight">
            每天睡不够
          </h1>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[2px] w-12 bg-mint/50 rounded-full" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-widest text-mint m-0 uppercase">
              个人博客
            </h2>
            <div className="h-[2px] w-12 bg-mint/50 rounded-full" />
          </div>
        </div>
        
        <p className="max-w-3xl text-gray-400 font-medium text-lg md:text-xl lg:text-2xl leading-relaxed mt-12 z-10 relative italic px-4">
          "天行健，君子以自强不息"
        </p>
        
        <div className="mt-20 text-white/50 animate-bounce">
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* About Section */}
      <section className="px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-stretch gap-12 relative">
        {/* Glow Orb */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] -z-10"></div>
        
        <div className="flex-1 glass-card p-10 md:p-14 space-y-8 relative overflow-hidden group">
          {/* Decorative Top Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-mint/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <h2 className="text-4xl font-bold text-white flex items-center gap-4">
            <span className="w-2 h-8 bg-mint rounded-full inline-block" />
            关于我
          </h2>
          
          <div className="space-y-6 text-base text-gray-300 leading-loose relative">
            {/* Quotation mark decoration */}
            <div className="absolute -top-8 -left-4 text-7xl text-white/5 font-serif pointer-events-none select-none">"</div>
            
            <p className="text-xl font-medium text-white/90">
              你好，各位！<span className="text-mint">欢迎来到我的个人博客。</span>
            </p>
            
            <p className="pl-4 border-l-2 border-mint/30">
              目前，我正满怀热情地探索着广阔的人工智能（AI）领域。学习 AI 就像是推开了一扇新世界的大门，虽然充满未知与挑战，但我骨子里那股<strong className="text-white">“凡事坚持到底”</strong>的韧劲，让我非常享受这个不断突破自我的过程。
            </p>
            
            <p>
              搭建这个小站的初衷很简单：我想为自己的生活和成长安一个<span className="bg-mint/10 text-mint px-2 py-1 rounded">“数字家园”</span>。在这里，你会看到我死磕 AI 知识时的学习笔记，也会看到我充满烟火气的日常点滴。
            </p>
            
            <p className="pt-4 text-gray-400 italic">
              很高兴在这里与你相遇，希望我的记录能给你带来一些启发，或者仅仅是让你感受到一份热爱生活的共鸣！
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 pt-8 mt-8 border-t border-white/5">
            {[
              { name: '抖音', link: 'https://www.douyin.com/user/MS4wLjABAAAAiN9tP1kG_W-T4w8z89oT1Pq5hR7q8XyA_0DkR9w_G6s', color: 'hover:border-pink-500 hover:text-pink-400 hover:shadow-[0_0_15px_rgba(236,72,153,0.5)]' },
              { name: 'GitHub', link: 'https://github.com/liuheng2004', color: 'hover:border-gray-400 hover:text-white hover:shadow-[0_0_15px_rgba(156,163,175,0.5)]' },
              { name: 'BiliBili', link: 'https://space.bilibili.com/3493268800162580', color: 'hover:border-blue-400 hover:text-blue-300 hover:shadow-[0_0_15px_rgba(96,165,250,0.5)]' }
            ].map(platform => (
              <a 
                key={platform.name}
                href={platform.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClickSound}
                className={`bg-white/5 border border-white/10 text-gray-300 text-sm font-bold px-8 py-3 rounded-full transition-all duration-300 active:scale-90 active:bg-white/20 transform hover:-translate-y-2 ${platform.color} flex items-center justify-center`}
              >
                {platform.name}
              </a>
            ))}
          </div>
        </div>
        <div className="md:w-1/3 aspect-[3/4] md:aspect-auto rounded-2xl overflow-hidden border border-white/10 relative group perspective-1000 shadow-[0_0_30px_rgba(89,193,139,0.15)] transition-all duration-700 hover:shadow-[0_0_50px_rgba(89,193,139,0.4)]">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
          <img 
            src="/hero-portrait.png" 
            alt="Portrait" 
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1" 
          />
          {/* 边框发光特效 */}
          <div className="absolute inset-0 border-2 border-mint/0 group-hover:border-mint/50 rounded-2xl transition-colors duration-500 z-20 pointer-events-none" />
        </div>
      </section>

      {/* Hobbies Section */}
      <section className="px-6 max-w-6xl mx-auto relative">
        {/* Glow Orb */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-mint/10 rounded-full blur-[120px] -z-10"></div>
        
        <div className="glass-card p-10">
          <h2 className="text-3xl font-bold text-white text-center mb-12">我的爱好与热情</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { icon: '🛹', title: '滑板', sub: '驾驭栏杆' },
              { icon: '🦢', title: '折纸', sub: '折纸艺术' },
              { icon: '🎬', title: '摄影', sub: '捕捉瞬间' },
              { icon: '🎭', title: '表演', sub: '演绎角色' },
              { icon: '💃', title: '舞蹈', sub: '随节奏舞动' },
              { icon: '😂', title: '梗图创作', sub: '制造欢笑' },
              { icon: '💪', title: '力量举重', sub: '增强力量' },
              { icon: '🏃', title: '跑步', sub: '追逐目标' },
              { icon: '🤸', title: '徒手健身', sub: '掌控身体' },
              { icon: '👨‍🍳', title: '烹饪', sub: '厨艺多面手' },
              { icon: '💻', title: '编程', sub: '构建解决方案' },
              { icon: '📚', title: '持续学习', sub: '每天都在成长' },
            ].map((hobby, i) => (
              <div key={i} className="bg-white/5 border border-white/5 rounded-xl p-6 text-center hover:bg-white/10 transition-colors flex flex-col items-center justify-center gap-3">
                <div className="text-4xl drop-shadow-lg">{hobby.icon}</div>
                <div>
                  <h3 className="text-white font-medium text-sm">{hobby.title}</h3>
                  <p className="text-gray-500 text-xs mt-1">{hobby.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ikigai Section */}
      <section className="px-6 max-w-6xl mx-auto">
        <div className="glass-card p-10">
          <h2 className="text-3xl font-bold text-white text-center mb-16">我的 Ikigai - 寻找人生意义</h2>
          
          <div className="flex flex-col md:flex-row gap-12 items-center">
            {/* Venn Diagram Visual (Simplified CSS version) */}
            <div className="flex-1 relative w-full max-w-md aspect-square flex items-center justify-center">
              <div className="absolute top-[20%] left-[20%] w-[50%] h-[50%] border border-white/10 bg-white/5 rounded-full flex items-start justify-center pt-8 text-xs text-gray-400">
                <span className="text-center">我热爱什么<br/><span className="text-[10px]">爱好</span></span>
              </div>
              <div className="absolute top-[20%] right-[20%] w-[50%] h-[50%] border border-white/10 bg-white/5 rounded-full flex items-start justify-center pt-8 text-xs text-gray-400">
                <span className="text-center">我擅长什么</span>
              </div>
              <div className="absolute bottom-[20%] left-[20%] w-[50%] h-[50%] border border-white/10 bg-white/5 rounded-full flex items-end justify-center pb-8 text-xs text-gray-400">
                <span className="text-center">别人愿意付钱<br/>让我做什么</span>
              </div>
              <div className="absolute bottom-[20%] right-[20%] w-[50%] h-[50%] border border-white/10 bg-white/5 rounded-full flex items-end justify-center pb-8 text-xs text-gray-400">
                <span className="text-center">世界需要什么</span>
              </div>
              
              {/* Center IKIGAI */}
              <div className="absolute z-10 w-20 h-20 bg-mint rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(89,193,139,0.4)]">
                <span className="text-dark-bg font-bold text-sm tracking-wider">IKIGAI</span>
              </div>
            </div>
            
            {/* Lists */}
            <div className="flex-1 space-y-8">
              <div>
                <h3 className="text-white font-medium mb-2 text-sm">我热爱什么</h3>
                <p className="text-gray-400 text-xs leading-relaxed">摄影、编程、力量举重、舞蹈、表演、滑板、烹饪、折纸、跑步、徒手健身</p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2 text-sm">我擅长什么</h3>
                <p className="text-gray-400 text-xs leading-relaxed">数字营销、编程、内容创作、农业、景观设计、广告、设计</p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2 text-sm">世界需要什么</h3>
                <p className="text-gray-400 text-xs leading-relaxed">可持续农业、环境解决方案、数字化转型、健康与保健</p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2 text-sm">别人愿意付钱让我做什么</h3>
                <p className="text-gray-400 text-xs leading-relaxed">增长营销、农业咨询、网站开发、内容制作、品牌战略</p>
              </div>
              
              <div className="pt-6 border-t border-white/10 flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-mint mt-1 shrink-0"></div>
                <p className="text-gray-400 text-xs italic">
                  我的 Ikigai 位于交汇处：通过数字创新和农业专业知识创造可持续的解决方案。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="px-6 max-w-6xl mx-auto relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] -z-10"></div>
        
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">精选项目</h2>
          <p className="text-gray-400 text-sm">展示了跨越各个行业的设计和开发工作的精选近期项目</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto md:h-[600px]">
          {/* Project 1 - Tall Card */}
          <div className="glass-card flex flex-col justify-end p-8 relative group overflow-hidden md:row-span-2 h-[400px] md:h-full bg-gradient-to-t from-black/80 to-transparent">
             <div className="absolute top-8 left-8 text-mint text-[10px] uppercase tracking-wider font-semibold z-10">
               农业创新与 3D 建模
             </div>
             <div className="absolute top-8 right-8 text-mint z-10 opacity-0 group-hover:opacity-100 transition-opacity">
               <ArrowUpRight className="w-5 h-5" />
             </div>
             
             {/* Simulated Image Background */}
             <div className="absolute inset-0 bg-zinc-900/50 -z-10 group-hover:scale-105 transition-transform duration-700"></div>
             
             <div className="relative z-10 space-y-4">
               <h3 className="text-2xl font-bold text-white">3D 垂直农场模型</h3>
               <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
                 使用 SketchUp 设计并构建了一个全面的 3D 垂直农场模型，展示了可持续农业实践和城市环境中的创新耕作技术。
               </p>
               <div className="flex flex-wrap gap-2 pt-2">
                 {['3D 建模', 'SketchUp', '农业', '可持续性'].map(tag => (
                   <span key={tag} className="text-[10px] bg-white/10 text-gray-300 px-2 py-1 rounded-full">
                     {tag}
                   </span>
                 ))}
               </div>
             </div>
          </div>
          
          {/* Project 2 */}
          <div className="glass-card flex flex-col justify-end p-8 relative group overflow-hidden h-[300px] md:h-auto bg-gradient-to-t from-black/80 to-transparent">
             <div className="absolute top-8 left-8 text-mint text-[10px] uppercase tracking-wider font-semibold z-10">
               农业与食品工程
             </div>
             <div className="absolute top-8 right-8 text-mint z-10 opacity-0 group-hover:opacity-100 transition-opacity">
               <ArrowUpRight className="w-5 h-5" />
             </div>
             
             <div className="absolute inset-0 bg-zinc-800/40 -z-10 group-hover:scale-105 transition-transform duration-700"></div>
             
             <div className="relative z-10 space-y-3">
               <h3 className="text-xl font-bold text-white">食品加工与供应链</h3>
               <p className="text-gray-400 text-xs leading-relaxed">
                 领导了一个利基行业的完整从农场到商店的供应链。生产从作物到装瓶的果酱、果冻和酱汁。通过战略营销和分销，成功在商店销售了大量产品。
               </p>
               <div className="flex flex-wrap gap-2 pt-2">
                 {['供应链', '食品加工', '营销', '农业'].map(tag => (
                   <span key={tag} className="text-[10px] bg-white/10 text-gray-300 px-2 py-1 rounded-full">
                     {tag}
                   </span>
                 ))}
               </div>
             </div>
          </div>
          
          {/* Project 3 */}
          <div className="glass-card flex flex-col justify-end p-8 relative group overflow-hidden h-[300px] md:h-auto bg-gradient-to-t from-black/80 to-transparent">
             <div className="absolute top-8 left-8 text-mint text-[10px] uppercase tracking-wider font-semibold z-10">
               园艺与农场开发
             </div>
             <div className="absolute top-8 right-8 text-mint z-10 opacity-0 group-hover:opacity-100 transition-opacity">
               <ArrowUpRight className="w-5 h-5" />
             </div>
             
             <div className="absolute inset-0 bg-zinc-900/60 -z-10 group-hover:scale-105 transition-transform duration-700"></div>
             
             <div className="relative z-10 space-y-3">
               <h3 className="text-xl font-bold text-white">园艺农场开发</h3>
               <p className="text-gray-400 text-xs leading-relaxed">
                 从零开始建立和维护大型农场。精心培育并种植了 5000 株苹果树苗、1200 株杏树苗和 200 株番石榴树苗。制备和施用有机肥料并管理完整的作物生命周期。
               </p>
               <div className="flex flex-wrap gap-2 pt-2">
                 {['生物肥料', '有机农业', '嫁接', '可持续性'].map(tag => (
                   <span key={tag} className="text-[10px] bg-white/10 text-gray-300 px-2 py-1 rounded-full">
                     {tag}
                   </span>
                 ))}
               </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
