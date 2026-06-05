import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PHOTO_CITIES, CITY_ABBR_MAP, getCityPhotos } from '../data/photo-data';

export default function Gallery() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const filterCity = searchParams.get('city'); // 从 URL 参数获取筛选城市
  const [lightbox, setLightbox] = useState<string | null>(null);

  // 筛选要显示的城市
  const cities = filterCity
    ? PHOTO_CITIES.filter(abbr => CITY_ABBR_MAP[abbr] === filterCity)
    : PHOTO_CITIES;

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
      {/* 头部 */}
      <div className="text-center mb-10">
        <div className="absolute left-1/2 -translate-x-1/2 w-80 h-80 bg-mint/10 rounded-full blur-[120px] pointer-events-none" />
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 relative z-10">我的相册</h1>
        <p className="text-gray-400 text-sm">记录每一座城市的风景</p>
      </div>

      {/* 返回按钮 */}
      {filterCity && (
        <button
          onClick={() => navigate('/gallery')}
          className="flex items-center gap-1 text-mint hover:text-mint/80 transition-colors text-sm mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          查看全部城市
        </button>
      )}

      {/* 城市列表 */}
      <div className="space-y-0">
        {cities.map((abbr, idx) => {
          const cityName = CITY_ABBR_MAP[abbr];
          const photos = getCityPhotos(abbr);

          return (
            <div key={abbr}>
              {/* 分隔线 */}
              {idx > 0 && (
                <div className="border-t border-gray-700/50 my-10" />
              )}

              {/* 城市名称 */}
              <h2 className="text-2xl font-bold text-white mb-6">{cityName}</h2>

              {/* 照片网格 */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {photos.map((src, pIdx) => (
                  <div
                    key={pIdx}
                    className="aspect-square rounded-lg overflow-hidden cursor-pointer group relative bg-gray-800"
                    onClick={() => setLightbox(src)}
                  >
                    <img
                      src={src}
                      alt={`${cityName} ${pIdx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* 灯箱 */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl transition-colors"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
          <img
            src={lightbox}
            alt="预览"
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
