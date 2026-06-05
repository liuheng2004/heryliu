import React, { useState } from 'react';
import { MapPin, ArrowLeft } from 'lucide-react';
import provinceData from '../data/china-provinces.json';

// 城市数据（visited: true=已去过绿色, false=未去过灰色）
const PROVINCE_CITIES: Record<string, { name: string; lat: number; lon: number; visited: boolean }[]> = {
  '浙江省': [
    { name: '杭州', lat: 30.25, lon: 120.17, visited: true },
    { name: '宁波', lat: 29.87, lon: 121.55, visited: false },
    { name: '温州', lat: 28.00, lon: 120.70, visited: false },
    { name: '绍兴', lat: 30.00, lon: 120.58, visited: false },
    { name: '嘉兴', lat: 30.77, lon: 120.75, visited: false },
    { name: '湖州', lat: 30.87, lon: 120.10, visited: false },
    { name: '金华', lat: 29.08, lon: 119.65, visited: false },
    { name: '台州', lat: 28.66, lon: 121.42, visited: false },
    { name: '丽水', lat: 28.45, lon: 119.92, visited: false },
    { name: '衢州', lat: 28.95, lon: 118.87, visited: false },
    { name: '舟山', lat: 30.02, lon: 122.11, visited: true },
  ],
  '湖南省': [
    { name: '长沙', lat: 28.23, lon: 112.93, visited: true },
    { name: '株洲', lat: 27.83, lon: 113.13, visited: false },
    { name: '湘潭', lat: 27.83, lon: 112.93, visited: false },
    { name: '衡阳', lat: 26.90, lon: 112.57, visited: false },
    { name: '岳阳', lat: 29.35, lon: 113.12, visited: false },
    { name: '常德', lat: 29.05, lon: 111.70, visited: false },
    { name: '张家界', lat: 29.12, lon: 110.48, visited: true },
    { name: '怀化', lat: 27.55, lon: 109.97, visited: true },
    { name: '娄底', lat: 27.73, lon: 111.98, visited: false },
    { name: '邵阳', lat: 27.25, lon: 111.47, visited: false },
    { name: '永州', lat: 26.43, lon: 111.62, visited: false },
    { name: '郴州', lat: 25.80, lon: 113.03, visited: false },
    { name: '益阳', lat: 28.55, lon: 112.35, visited: false },
    { name: '湘西', lat: 28.32, lon: 109.73, visited: false },
  ],
  '湖北省': [
    { name: '武汉', lat: 30.58, lon: 114.30, visited: true },
    { name: '宜昌', lat: 30.70, lon: 111.29, visited: true },
    { name: '襄阳', lat: 32.04, lon: 112.14, visited: true },
    { name: '荆州', lat: 30.33, lon: 112.23, visited: false },
    { name: '黄冈', lat: 30.45, lon: 114.88, visited: false },
    { name: '十堰', lat: 32.65, lon: 110.80, visited: false },
    { name: '荆门', lat: 31.03, lon: 112.20, visited: false },
    { name: '鄂州', lat: 30.39, lon: 114.89, visited: true },
    { name: '孝感', lat: 30.93, lon: 113.92, visited: true },
    { name: '黄石', lat: 30.20, lon: 115.08, visited: true },
    { name: '咸宁', lat: 29.85, lon: 114.33, visited: false },
    { name: '随州', lat: 31.72, lon: 113.37, visited: false },
    { name: '恩施', lat: 30.27, lon: 109.48, visited: false },
  ],
};

// Convert lat/lng to SVG coords (same projection as province data)
const MIN_LON = 73.502355;
const MAX_LON = 135.09567;
const MIN_LAT = 3.823583;
const MAX_LAT = 53.563269;
const SCALE = 3.5;
const PAD = 10;

function geoToSvg(lon: number, lat: number) {
  return {
    x: (lon - MIN_LON) * SCALE + PAD,
    y: (MAX_LAT - lat) * SCALE + PAD,
  };
}

type ViewState = 'overview' | 'province';

export default function Journey() {
  const [viewState, setViewState] = useState<ViewState>('overview');
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);

  const { viewBox, provinces } = provinceData;

  // Calculate current view
  const isOverview = viewState === 'overview';
  const currentProvince = selectedProvince
    ? provinces.find(p => p.name === selectedProvince)
    : null;
  const currentCities = selectedProvince ? (PROVINCE_CITIES[selectedProvince] || []) : [];

  const handleProvinceClick = (name: string) => {
    setSelectedProvince(name);
    setViewState('province');
  };

  const handleBack = () => {
    setSelectedProvince(null);
    setViewState('overview');
  };

  // Parse SVG path string to compute bounding box
  function getPathBounds(path: string): { minX: number; minY: number; maxX: number; maxY: number } {
    const pairs = path.match(/[\d.]+,[\d.]+/g);
    if (!pairs) return { minX: 0, minY: 0, maxX: 236, maxY: 195 };
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const p of pairs) {
      const [xs, ys] = p.split(',');
      const x = parseFloat(xs);
      const y = parseFloat(ys);
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
    return { minX, minY, maxX, maxY };
  }

  // Calculate viewBox with padding for labels
  const getProvinceViewBox = (): string => {
    if (!currentProvince) return viewBox;
    const bounds = getPathBounds(currentProvince.path);
    const pW = Math.max(bounds.maxX - bounds.minX, 1);
    const pH = Math.max(bounds.maxY - bounds.minY, 1);
    const fill = 0.7;
    const vw = pW / fill;
    const vh = pH / fill;
    const vx = bounds.minX - (vw - pW) / 2;
    const vy = bounds.minY - (vh - pH) / 2;
    return `${vx} ${vy} ${vw} ${vh}`;
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
      {/* 头部标题 */}
      <div className="text-center mb-8">
        <div className="absolute left-1/2 -translate-x-1/2 w-80 h-80 bg-mint/10 rounded-full blur-[120px] pointer-events-none" />
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 relative z-10">我的旅程</h1>
        <p className="text-gray-400 text-sm">用脚步丈量世界，用心记录每一段旅程</p>
      </div>

      {/* 地图容器 - 60% 页面尺寸，80% 宽度 */}
      <div className="glass-card p-6 md:p-10 relative overflow-hidden w-4/5 mx-auto min-h-[60vh]">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-mint/5 rounded-full blur-[60px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/5 rounded-full blur-[60px] pointer-events-none" />

        <div className="relative h-full flex flex-col">
          {/* 标题栏 */}
          <div className="flex items-center gap-2 mb-6 shrink-0">
            {!isOverview && (
              <button
                onClick={handleBack}
                className="flex items-center gap-1 text-mint hover:text-mint/80 transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                返回
              </button>
            )}
            <MapPin className="w-5 h-5 text-mint shrink-0" />
            <h2 className="text-white font-bold text-lg">
              {isOverview ? '中国足迹' : selectedProvince}
            </h2>
            <span className="text-gray-500 text-xs ml-auto">
              {isOverview ? '点击省份查看详情' : `${currentCities.length} 个城市`}
            </span>
          </div>

          {/* SVG 地图 */}
          <div className="flex-1 flex justify-center items-center min-h-0">
            <svg
              viewBox={isOverview ? viewBox : getProvinceViewBox()}
              className="w-full h-full max-h-[55vh]"
              xmlns="http://www.w3.org/2000/svg"
              style={{ minHeight: '350px' }}
            >
              {provinces.map((prov) => {
                const isActive = selectedProvince === prov.name;
                const isHovered = hoveredProvince === prov.name;

                // 省份视图下只显示选中的省
                if (!isOverview && !isActive) return null;

                return (
                  <g key={prov.adcode}>
                    {/* 悬浮发光层 */}
                    {isHovered && isOverview && (
                      <path
                        d={prov.path}
                        fill="rgba(89, 193, 139, 0.15)"
                        stroke="rgba(89, 193, 139, 0.6)"
                        strokeWidth="1.5"
                        className="pointer-events-none"
                        style={{ animation: 'province-pulse 1.5s ease-in-out infinite' }}
                      />
                    )}
                    {/* 省份轮廓 */}
                    <path
                      d={prov.path}
                      fill={isActive ? 'rgba(89, 193, 139, 0.15)' : isHovered ? 'rgba(89, 193, 139, 0.12)' : 'transparent'}
                      stroke={isActive ? 'rgba(255,255,255,0.3)' : isHovered && isOverview ? 'rgba(89, 193, 139, 0.9)' : 'white'}
                      strokeWidth={isActive ? (() => { const b = getPathBounds(prov.path); const pw = Math.max(b.maxX - b.minX, 1); const ph = Math.max(b.maxY - b.minY, 1); const pSize = Math.sqrt(pw * ph); const scale = Math.max(0.3, Math.min(2.5, pSize / 32)); return 0.18 * scale; })() : isHovered && isOverview ? 1.2 : 0.8}
                      strokeDasharray={isOverview ? '4 3' : 'none'}
                      strokeOpacity={isOverview ? (isHovered ? 1 : 0.7) : 1}
                      className="cursor-pointer transition-all duration-300"
                      onMouseEnter={() => setHoveredProvince(prov.name)}
                      onMouseLeave={() => setHoveredProvince(null)}
                      onClick={() => handleProvinceClick(prov.name)}
                    />
                  </g>
                );
              })}

              {/* 城市间浅白色虚线连接（省份视图） */}
              {!isOverview && currentCities.length > 1 && (() => {
                const capital = geoToSvg(currentCities[0].lon, currentCities[0].lat);
                const lines = currentCities.slice(1).map(city => {
                  const pos = geoToSvg(city.lon, city.lat);
                  return `M ${capital.x},${capital.y} L ${pos.x},${pos.y}`;
                }).join(' ');
                return (
                  <path
                    d={lines}
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="0.08"
                    fill="none"
                  />
                );
              })()}

              {/* 城市标记（省份视图）- 根据省份范围自适应排版 */}
              {!isOverview && (() => {
                // 根据省份地理范围动态计算缩放比例
                const pBounds = currentProvince ? getPathBounds(currentProvince.path) : null;
                const pW = pBounds ? Math.max(pBounds.maxX - pBounds.minX, 1) : 30;
                const pH = pBounds ? Math.max(pBounds.maxY - pBounds.minY, 1) : 30;
                const pSize = Math.sqrt(pW * pH);
                const REF_SIZE = 32;
                const cityCount = currentCities.length;

                let scale = pSize / REF_SIZE;

                // 密集省份（城市多面积小）进一步缩小
                const density = cityCount / Math.max((pW * pH) / 500, 0.3);
                if (density > 2.0) scale *= 0.55;
                else if (density > 1.2) scale *= 0.75;
                else if (density > 0.7) scale *= 0.88;

                scale = Math.max(0.3, Math.min(2.5, scale));

                const DOT_R = 0.35 * scale;
                const TXT_SIZE = 1.75 * scale;
                const TXT_OFFSET = 1.8 * scale;
                const EST_CHAR_W = 1.15 * scale;
                const EST_LINE_H = 2.1 * scale;
                const BBOX_PAD_X = 0.25 * scale;
                const BBOX_PAD_Y = 0.25 * scale;

                const estLabelW = (name: string) => name.length * EST_CHAR_W;

                interface Box { x: number; y: number; w: number; h: number }
                const placed: Box[] = [];

                const hasOverlap = (bx: number, by: number, bw: number, bh: number): boolean =>
                  placed.some(p =>
                    bx + bw + BBOX_PAD_X > p.x && p.x + p.w + BBOX_PAD_X > bx &&
                    by + bh + BBOX_PAD_Y > p.y && p.y + p.h + BBOX_PAD_Y > by
                  );

                const sorted = [...currentCities]
                  .map(city => ({ ...city, pos: geoToSvg(city.lon, city.lat) }))
                  .sort((a, b) => a.pos.y - b.pos.y);

                interface Label {
                  name: string;
                  visited: boolean;
                  cx: number; cy: number;
                  lx: number; ly: number;
                  anchor: 'start' | 'end';
                }
                const labels: Label[] = [];

                const candidates: [number, number, 'start' | 'end'][] = [
                  [1, 0, 'start'],
                  [-1, 0, 'end'],
                  [1, -1, 'start'],
                  [-1, -1, 'end'],
                  [1, 1, 'start'],
                  [-1, 1, 'end'],
                  [1, -2, 'start'],
                  [-1, -2, 'end'],
                  [1, 2, 'start'],
                  [-1, 2, 'end'],
                  [1, -3, 'start'],
                  [-1, -3, 'end'],
                ];

                for (const city of sorted) {
                  const { x, y } = city.pos;
                  const tw = estLabelW(city.name);
                  const th = EST_LINE_H;

                  let placed_ok = false;
                  for (const [dx, dy, anchor] of candidates) {
                    const lx = x + dx * TXT_OFFSET;
                    const ly = y + dy * TXT_OFFSET;
                    const bx = anchor === 'start' ? lx - BBOX_PAD_X : lx - tw + BBOX_PAD_X;
                    const by = ly - th / 2;

                    if (!hasOverlap(bx, by, tw, th)) {
                      labels.push({ name: city.name, visited: city.visited, cx: x, cy: y, lx, ly, anchor });
                      placed.push({ x: bx, y: by, w: tw, h: th });
                      placed_ok = true;
                      break;
                    }
                  }

                  if (!placed_ok) {
                    const lx = x + TXT_OFFSET;
                    const ly = y;
                    labels.push({ name: city.name, visited: city.visited, cx: x, cy: y, lx, ly, anchor: 'start' });
                    placed.push({ x: lx - BBOX_PAD_X, y: ly - th / 2, w: tw, h: th });
                  }
                }

                return labels.map(label => (
                  <g key={label.name}>
                    <circle
                      cx={label.cx}
                      cy={label.cy}
                      r={DOT_R}
                      fill={label.visited ? '#59c18b' : '#6b7280'}
                      opacity={label.visited ? 1 : 0.5}
                    />
                    <text
                      x={label.lx}
                      y={label.ly}
                      fill={label.visited ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)'}
                      fontSize={TXT_SIZE}
                      fontFamily="sans-serif"
                      textAnchor={label.anchor}
                      dominantBaseline="central"
                      className="select-none"
                    >
                      {label.name}
                    </text>
                  </g>
                ));
              })()}
            </svg>
          </div>

          {/* 图例 */}
          <div className="flex items-center justify-center gap-6 mt-6 text-xs text-gray-500 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 border-t border-dashed border-white" />
              <span>省份边界</span>
            </div>
            {!isOverview && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-mint" />
                <span>城市</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded border border-white bg-transparent" />
              <span>可点击</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
