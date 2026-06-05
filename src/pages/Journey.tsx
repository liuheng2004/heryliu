import React, { useState } from 'react';
import { MapPin, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import provinceData from '../data/china-provinces.json';
import { PROVINCE_CITIES } from '../data/china-cities';
import { CITY_NAME_TO_ABBR } from '../data/photo-data';

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
  const navigate = useNavigate();
  const [viewState, setViewState] = useState<ViewState>('overview');
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

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

              {/* 城市标记 */}
              {(() => {
                // 收集要显示的城市：总览视图显示所有城市，省份视图显示当前省份城市
                const citiesToShow = isOverview
                  ? Object.entries(PROVINCE_CITIES).flatMap(([, cities]) => cities)
                  : currentCities;

                if (citiesToShow.length === 0) return null;

                // 根据视图计算缩放比例
                let scale: number;
                let DOT_R: number;
                let TXT_SIZE: number;
                let TXT_OFFSET: number;
                let EST_CHAR_W: number;
                let EST_LINE_H: number;
                let BBOX_PAD_X: number;
                let BBOX_PAD_Y: number;

                if (isOverview) {
                  // 总览视图：固定小尺寸，适合全国视图
                  scale = 0.4;
                  DOT_R = 0.28;
                  TXT_SIZE = 1.1;
                  TXT_OFFSET = 1.5;
                  EST_CHAR_W = 0.85;
                  EST_LINE_H = 1.6;
                  BBOX_PAD_X = 0.2;
                  BBOX_PAD_Y = 0.2;
                } else {
                  // 省份视图：根据省份范围动态计算缩放比例
                  const pBounds = currentProvince ? getPathBounds(currentProvince.path) : null;
                  const pW = pBounds ? Math.max(pBounds.maxX - pBounds.minX, 1) : 30;
                  const pH = pBounds ? Math.max(pBounds.maxY - pBounds.minY, 1) : 30;
                  const pSize = Math.sqrt(pW * pH);
                  const REF_SIZE = 32;
                  const cityCount = citiesToShow.length;

                  scale = pSize / REF_SIZE;

                  const density = cityCount / Math.max((pW * pH) / 500, 0.3);
                  if (density > 2.0) scale *= 0.55;
                  else if (density > 1.2) scale *= 0.75;
                  else if (density > 0.7) scale *= 0.88;

                  scale = Math.max(0.3, Math.min(2.5, scale));

                  DOT_R = 0.35 * scale;
                  TXT_SIZE = 1.75 * scale;
                  TXT_OFFSET = 1.8 * scale;
                  EST_CHAR_W = 1.15 * scale;
                  EST_LINE_H = 2.1 * scale;
                  BBOX_PAD_X = 0.25 * scale;
                  BBOX_PAD_Y = 0.25 * scale;
                }

                const estLabelW = (name: string) => name.length * EST_CHAR_W;

                interface Box { x: number; y: number; w: number; h: number }
                const placed: Box[] = [];

                const hasOverlap = (bx: number, by: number, bw: number, bh: number): boolean =>
                  placed.some(p =>
                    bx + bw + BBOX_PAD_X > p.x && p.x + p.w + BBOX_PAD_X > bx &&
                    by + bh + BBOX_PAD_Y > p.y && p.y + p.h + BBOX_PAD_Y > by
                  );

                const sorted = [...citiesToShow]
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

                return labels.map(label => {
                  const isCityHovered = hoveredCity === label.name;
                  const hasPhotos = label.visited && CITY_NAME_TO_ABBR[label.name] !== undefined;

                  return (
                  <g key={label.name}
                    onMouseEnter={() => label.visited && setHoveredCity(label.name)}
                    onMouseLeave={() => setHoveredCity(null)}
                    onClick={() => {
                      if (hasPhotos) {
                        navigate(`/gallery?city=${encodeURIComponent(label.name)}`);
                      }
                    }}
                    style={{ cursor: hasPhotos ? 'pointer' : 'default' }}
                  >
                    <circle
                      cx={label.cx}
                      cy={label.cy}
                      r={DOT_R}
                      fill={isCityHovered && label.visited ? '#f97316' : label.visited ? '#3b82f6' : '#6b7280'}
                      opacity={label.visited ? 1 : 0.5}
                      className="transition-colors duration-200"
                    />
                    <text
                      x={label.lx}
                      y={label.ly}
                      fill={isCityHovered && label.visited ? '#f97316' : label.visited ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)'}
                      fontSize={TXT_SIZE}
                      fontFamily="sans-serif"
                      textAnchor={label.anchor}
                      dominantBaseline="central"
                      className="select-none transition-colors duration-200"
                    >
                      {label.name}
                    </text>
                  </g>
                  );
                });
              })()}
            </svg>
          </div>

          {/* 图例 */}
          <div className="flex items-center justify-center gap-6 mt-6 text-xs text-gray-500 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 border-t border-dashed border-white" />
              <span>省份边界</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span>已去过</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-500" />
              <span>未去过</span>
            </div>
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
