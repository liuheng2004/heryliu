import React, { useState } from 'react';
import { MapPin, ArrowLeft } from 'lucide-react';
import provinceData from '../data/china-provinces.json';

// 省级城市数据（完整地级市）
const PROVINCE_CITIES: Record<string, { name: string; lat: number; lon: number }[]> = {
  '北京市': [
    { name: '北京', lat: 39.90, lon: 116.40 },
  ],
  '天津市': [
    { name: '天津', lat: 39.13, lon: 117.20 },
  ],
  '河北省': [
    { name: '石家庄', lat: 38.05, lon: 114.50 },
    { name: '唐山', lat: 39.63, lon: 118.18 },
    { name: '保定', lat: 38.87, lon: 115.47 },
    { name: '邯郸', lat: 36.60, lon: 114.48 },
    { name: '秦皇岛', lat: 39.93, lon: 119.60 },
    { name: '张家口', lat: 40.77, lon: 114.88 },
    { name: '承德', lat: 40.95, lon: 117.95 },
    { name: '廊坊', lat: 39.52, lon: 116.70 },
    { name: '沧州', lat: 38.30, lon: 116.83 },
    { name: '衡水', lat: 37.73, lon: 115.67 },
    { name: '邢台', lat: 37.07, lon: 114.50 },
  ],
  '山西省': [
    { name: '太原', lat: 37.87, lon: 112.55 },
    { name: '大同', lat: 40.08, lon: 113.30 },
    { name: '晋中', lat: 37.68, lon: 112.75 },
    { name: '临汾', lat: 36.08, lon: 111.52 },
    { name: '长治', lat: 36.20, lon: 113.12 },
    { name: '运城', lat: 35.03, lon: 110.98 },
    { name: '晋城', lat: 35.50, lon: 112.85 },
    { name: '朔州', lat: 39.33, lon: 112.43 },
    { name: '忻州', lat: 38.42, lon: 112.73 },
    { name: '吕梁', lat: 37.52, lon: 111.13 },
  ],
  '内蒙古自治区': [
    { name: '呼和浩特', lat: 40.82, lon: 111.75 },
    { name: '包头', lat: 40.65, lon: 109.84 },
    { name: '赤峰', lat: 42.27, lon: 118.97 },
    { name: '通辽', lat: 43.62, lon: 122.27 },
    { name: '鄂尔多斯', lat: 39.62, lon: 109.78 },
    { name: '呼伦贝尔', lat: 49.22, lon: 119.75 },
    { name: '乌兰察布', lat: 40.90, lon: 113.12 },
    { name: '巴彦淖尔', lat: 40.73, lon: 107.42 },
    { name: '兴安盟', lat: 46.08, lon: 122.05 },
    { name: '锡林郭勒', lat: 43.95, lon: 116.05 },
  ],
  '辽宁省': [
    { name: '沈阳', lat: 41.80, lon: 123.43 },
    { name: '大连', lat: 38.91, lon: 121.61 },
    { name: '鞍山', lat: 41.08, lon: 122.98 },
    { name: '抚顺', lat: 41.87, lon: 123.92 },
    { name: '锦州', lat: 41.13, lon: 121.13 },
    { name: '营口', lat: 40.67, lon: 122.23 },
    { name: '盘锦', lat: 41.12, lon: 122.07 },
    { name: '丹东', lat: 40.12, lon: 124.38 },
    { name: '辽阳', lat: 41.27, lon: 123.17 },
    { name: '本溪', lat: 41.30, lon: 123.77 },
    { name: '阜新', lat: 42.02, lon: 121.75 },
    { name: '朝阳', lat: 41.57, lon: 120.45 },
    { name: '葫芦岛', lat: 40.72, lon: 120.83 },
  ],
  '吉林省': [
    { name: '长春', lat: 43.88, lon: 125.32 },
    { name: '吉林', lat: 43.83, lon: 126.56 },
    { name: '四平', lat: 43.17, lon: 124.37 },
    { name: '延吉', lat: 42.90, lon: 129.51 },
    { name: '通化', lat: 41.73, lon: 125.93 },
    { name: '松原', lat: 45.13, lon: 124.83 },
    { name: '白城', lat: 45.62, lon: 122.83 },
    { name: '辽源', lat: 42.88, lon: 125.13 },
    { name: '白山', lat: 41.93, lon: 126.42 },
  ],
  '黑龙江省': [
    { name: '哈尔滨', lat: 45.75, lon: 126.64 },
    { name: '大庆', lat: 46.59, lon: 125.10 },
    { name: '齐齐哈尔', lat: 47.35, lon: 123.95 },
    { name: '牡丹江', lat: 44.58, lon: 129.60 },
    { name: '佳木斯', lat: 46.82, lon: 130.37 },
    { name: '绥化', lat: 46.63, lon: 126.98 },
    { name: '鸡西', lat: 45.30, lon: 130.97 },
    { name: '鹤岗', lat: 47.33, lon: 130.28 },
    { name: '双鸭山', lat: 46.63, lon: 131.15 },
    { name: '伊春', lat: 47.73, lon: 128.90 },
    { name: '七台河', lat: 45.77, lon: 131.00 },
    { name: '黑河', lat: 50.25, lon: 127.48 },
  ],
  '上海市': [
    { name: '上海', lat: 31.23, lon: 121.47 },
  ],
  '江苏省': [
    { name: '南京', lat: 32.06, lon: 118.78 },
    { name: '苏州', lat: 31.30, lon: 120.58 },
    { name: '无锡', lat: 31.57, lon: 120.31 },
    { name: '常州', lat: 31.78, lon: 119.97 },
    { name: '南通', lat: 32.02, lon: 120.86 },
    { name: '徐州', lat: 34.27, lon: 117.18 },
    { name: '扬州', lat: 32.39, lon: 119.42 },
    { name: '镇江', lat: 32.20, lon: 119.45 },
    { name: '盐城', lat: 33.38, lon: 120.13 },
    { name: '淮安', lat: 33.50, lon: 119.02 },
    { name: '连云港', lat: 34.60, lon: 119.17 },
    { name: '泰州', lat: 32.46, lon: 119.92 },
    { name: '宿迁', lat: 33.96, lon: 118.30 },
  ],
  '浙江省': [
    { name: '杭州', lat: 30.27, lon: 120.15 },
    { name: '宁波', lat: 29.87, lon: 121.54 },
    { name: '温州', lat: 28.00, lon: 120.70 },
    { name: '嘉兴', lat: 30.77, lon: 120.75 },
    { name: '绍兴', lat: 30.00, lon: 120.58 },
    { name: '台州', lat: 28.65, lon: 121.42 },
    { name: '金华', lat: 29.10, lon: 119.65 },
    { name: '湖州', lat: 30.87, lon: 120.10 },
    { name: '衢州', lat: 28.97, lon: 118.87 },
    { name: '舟山', lat: 30.02, lon: 122.20 },
    { name: '丽水', lat: 28.45, lon: 119.92 },
  ],
  '安徽省': [
    { name: '合肥', lat: 31.82, lon: 117.23 },
    { name: '芜湖', lat: 31.35, lon: 118.38 },
    { name: '安庆', lat: 30.53, lon: 117.05 },
    { name: '蚌埠', lat: 32.93, lon: 117.38 },
    { name: '马鞍山', lat: 31.70, lon: 118.48 },
    { name: '阜阳', lat: 32.90, lon: 115.82 },
    { name: '黄山', lat: 29.72, lon: 118.33 },
    { name: '滁州', lat: 32.30, lon: 118.32 },
    { name: '六安', lat: 31.73, lon: 116.50 },
    { name: '淮南', lat: 32.63, lon: 116.98 },
    { name: '淮北', lat: 33.97, lon: 116.78 },
    { name: '铜陵', lat: 30.93, lon: 117.82 },
    { name: '池州', lat: 30.67, lon: 117.48 },
    { name: '宣城', lat: 30.95, lon: 118.75 },
  ],
  '福建省': [
    { name: '福州', lat: 26.07, lon: 119.30 },
    { name: '厦门', lat: 24.48, lon: 118.09 },
    { name: '泉州', lat: 24.90, lon: 118.58 },
    { name: '漳州', lat: 24.52, lon: 117.65 },
    { name: '莆田', lat: 25.43, lon: 119.02 },
    { name: '龙岩', lat: 25.10, lon: 117.03 },
    { name: '三明', lat: 26.27, lon: 117.62 },
    { name: '南平', lat: 26.63, lon: 118.18 },
    { name: '宁德', lat: 26.67, lon: 119.52 },
  ],
  '江西省': [
    { name: '南昌', lat: 28.68, lon: 115.86 },
    { name: '九江', lat: 29.70, lon: 115.98 },
    { name: '赣州', lat: 25.85, lon: 114.93 },
    { name: '景德镇', lat: 29.28, lon: 117.18 },
    { name: '上饶', lat: 28.45, lon: 117.97 },
    { name: '宜春', lat: 27.80, lon: 114.38 },
    { name: '吉安', lat: 27.12, lon: 114.98 },
    { name: '抚州', lat: 28.00, lon: 116.35 },
    { name: '萍乡', lat: 27.63, lon: 113.85 },
    { name: '新余', lat: 27.82, lon: 114.92 },
    { name: '鹰潭', lat: 28.28, lon: 117.03 },
  ],
  '山东省': [
    { name: '济南', lat: 36.65, lon: 117.00 },
    { name: '青岛', lat: 36.07, lon: 120.38 },
    { name: '烟台', lat: 37.47, lon: 121.45 },
    { name: '潍坊', lat: 36.70, lon: 119.10 },
    { name: '临沂', lat: 35.05, lon: 118.35 },
    { name: '淄博', lat: 36.78, lon: 118.05 },
    { name: '济宁', lat: 35.42, lon: 116.58 },
    { name: '威海', lat: 37.50, lon: 122.12 },
    { name: '泰安', lat: 36.20, lon: 117.08 },
    { name: '日照', lat: 35.42, lon: 119.53 },
    { name: '东营', lat: 37.45, lon: 118.50 },
    { name: '德州', lat: 37.45, lon: 116.30 },
    { name: '聊城', lat: 36.45, lon: 115.98 },
    { name: '滨州', lat: 37.37, lon: 117.97 },
    { name: '菏泽', lat: 35.23, lon: 115.43 },
    { name: '枣庄', lat: 34.82, lon: 117.32 },
  ],
  '河南省': [
    { name: '郑州', lat: 34.75, lon: 113.63 },
    { name: '洛阳', lat: 34.62, lon: 112.45 },
    { name: '开封', lat: 34.80, lon: 114.30 },
    { name: '新乡', lat: 35.30, lon: 113.87 },
    { name: '安阳', lat: 36.10, lon: 114.35 },
    { name: '许昌', lat: 34.03, lon: 113.85 },
    { name: '南阳', lat: 33.00, lon: 112.52 },
    { name: '商丘', lat: 34.42, lon: 115.65 },
    { name: '平顶山', lat: 33.73, lon: 113.18 },
    { name: '周口', lat: 33.63, lon: 114.63 },
    { name: '驻马店', lat: 32.98, lon: 113.38 },
    { name: '信阳', lat: 32.13, lon: 114.08 },
    { name: '焦作', lat: 35.25, lon: 113.25 },
    { name: '濮阳', lat: 35.77, lon: 115.03 },
    { name: '漯河', lat: 33.58, lon: 114.02 },
    { name: '三门峡', lat: 34.78, lon: 111.20 },
    { name: '鹤壁', lat: 35.90, lon: 114.30 },
  ],
  '湖北省': [
    { name: '武汉', lat: 30.60, lon: 114.30 },
    { name: '宜昌', lat: 30.70, lon: 111.28 },
    { name: '襄阳', lat: 32.08, lon: 112.15 },
    { name: '荆州', lat: 30.33, lon: 112.23 },
    { name: '黄石', lat: 30.22, lon: 115.07 },
    { name: '十堰', lat: 32.63, lon: 110.80 },
    { name: '荆门', lat: 31.03, lon: 112.20 },
    { name: '鄂州', lat: 30.38, lon: 114.88 },
    { name: '孝感', lat: 30.92, lon: 113.92 },
    { name: '黄冈', lat: 30.45, lon: 114.88 },
    { name: '咸宁', lat: 29.83, lon: 114.32 },
    { name: '随州', lat: 31.72, lon: 113.37 },
    { name: '恩施', lat: 30.28, lon: 109.48 },
  ],
  '湖南省': [
    { name: '长沙', lat: 28.23, lon: 112.98 },
    { name: '岳阳', lat: 29.37, lon: 113.13 },
    { name: '株洲', lat: 27.83, lon: 113.13 },
    { name: '湘潭', lat: 27.85, lon: 112.93 },
    { name: '衡阳', lat: 26.90, lon: 112.62 },
    { name: '常德', lat: 29.03, lon: 111.68 },
    { name: '郴州', lat: 25.78, lon: 113.02 },
    { name: '怀化', lat: 27.55, lon: 109.97 },
    { name: '娄底', lat: 27.73, lon: 112.00 },
    { name: '益阳', lat: 28.58, lon: 112.33 },
    { name: '永州', lat: 26.42, lon: 111.60 },
    { name: '邵阳', lat: 27.23, lon: 111.47 },
    { name: '张家界', lat: 29.13, lon: 110.48 },
    { name: '湘西', lat: 28.32, lon: 109.73 },
  ],
  '广东省': [
    { name: '广州', lat: 23.13, lon: 113.26 },
    { name: '深圳', lat: 22.55, lon: 114.07 },
    { name: '珠海', lat: 22.27, lon: 113.57 },
    { name: '东莞', lat: 23.02, lon: 113.75 },
    { name: '佛山', lat: 23.03, lon: 113.12 },
    { name: '中山', lat: 22.52, lon: 113.38 },
    { name: '惠州', lat: 23.08, lon: 114.40 },
    { name: '汕头', lat: 23.37, lon: 116.70 },
    { name: '湛江', lat: 21.27, lon: 110.35 },
    { name: '肇庆', lat: 23.05, lon: 112.47 },
    { name: '江门', lat: 22.58, lon: 113.08 },
    { name: '潮州', lat: 23.67, lon: 116.63 },
    { name: '揭阳', lat: 23.55, lon: 116.37 },
    { name: '韶关', lat: 24.80, lon: 113.60 },
    { name: '茂名', lat: 21.67, lon: 110.92 },
    { name: '梅州', lat: 24.30, lon: 116.12 },
    { name: '汕尾', lat: 22.78, lon: 115.37 },
    { name: '河源', lat: 23.73, lon: 114.68 },
    { name: '阳江', lat: 21.85, lon: 111.97 },
    { name: '清远', lat: 23.70, lon: 113.05 },
    { name: '云浮', lat: 22.92, lon: 112.03 },
  ],
  '广西壮族自治区': [
    { name: '南宁', lat: 22.82, lon: 108.37 },
    { name: '桂林', lat: 25.27, lon: 110.29 },
    { name: '柳州', lat: 24.32, lon: 109.42 },
    { name: '北海', lat: 21.48, lon: 109.12 },
    { name: '玉林', lat: 22.63, lon: 110.15 },
    { name: '梧州', lat: 23.48, lon: 111.28 },
    { name: '百色', lat: 23.90, lon: 106.62 },
    { name: '钦州', lat: 21.95, lon: 108.62 },
    { name: '防城港', lat: 21.68, lon: 108.35 },
    { name: '贵港', lat: 23.10, lon: 109.60 },
    { name: '贺州', lat: 24.42, lon: 111.55 },
    { name: '河池', lat: 24.70, lon: 108.07 },
    { name: '来宾', lat: 23.73, lon: 109.23 },
    { name: '崇左', lat: 22.38, lon: 107.37 },
  ],
  '海南省': [
    { name: '海口', lat: 20.02, lon: 110.33 },
    { name: '三亚', lat: 18.25, lon: 109.51 },
    { name: '儋州', lat: 19.52, lon: 109.58 },
    { name: '琼海', lat: 19.25, lon: 110.47 },
    { name: '文昌', lat: 19.55, lon: 110.80 },
    { name: '万宁', lat: 18.80, lon: 110.40 },
    { name: '东方', lat: 19.10, lon: 108.65 },
  ],
  '重庆市': [
    { name: '重庆', lat: 29.57, lon: 106.55 },
  ],
  '四川省': [
    { name: '成都', lat: 30.57, lon: 104.07 },
    { name: '绵阳', lat: 31.47, lon: 104.73 },
    { name: '德阳', lat: 31.13, lon: 104.38 },
    { name: '宜宾', lat: 28.77, lon: 104.62 },
    { name: '南充', lat: 30.78, lon: 106.10 },
    { name: '泸州', lat: 28.88, lon: 105.43 },
    { name: '乐山', lat: 29.58, lon: 103.73 },
    { name: '自贡', lat: 29.35, lon: 104.78 },
    { name: '达州', lat: 31.22, lon: 107.50 },
    { name: '内江', lat: 29.58, lon: 105.05 },
    { name: '遂宁', lat: 30.52, lon: 105.57 },
    { name: '广元', lat: 32.43, lon: 105.85 },
    { name: '眉山', lat: 30.05, lon: 103.83 },
    { name: '广安', lat: 30.47, lon: 106.63 },
    { name: '攀枝花', lat: 26.58, lon: 101.72 },
    { name: '巴中', lat: 31.85, lon: 106.77 },
    { name: '资阳', lat: 30.12, lon: 104.63 },
    { name: '雅安', lat: 29.98, lon: 103.00 },
    { name: '西昌', lat: 27.90, lon: 102.27 },
  ],
  '贵州省': [
    { name: '贵阳', lat: 26.65, lon: 106.63 },
    { name: '遵义', lat: 27.73, lon: 106.92 },
    { name: '六盘水', lat: 26.60, lon: 104.83 },
    { name: '安顺', lat: 26.25, lon: 105.95 },
    { name: '毕节', lat: 27.30, lon: 105.28 },
    { name: '铜仁', lat: 27.72, lon: 109.18 },
    { name: '黔东南', lat: 26.58, lon: 107.97 },
    { name: '黔南', lat: 26.25, lon: 107.52 },
    { name: '黔西南', lat: 25.08, lon: 104.90 },
  ],
  '云南省': [
    { name: '昆明', lat: 25.05, lon: 102.72 },
    { name: '大理', lat: 25.59, lon: 100.23 },
    { name: '丽江', lat: 26.87, lon: 100.23 },
    { name: '曲靖', lat: 25.50, lon: 103.80 },
    { name: '玉溪', lat: 24.35, lon: 102.55 },
    { name: '红河', lat: 23.37, lon: 103.37 },
    { name: '西双版纳', lat: 22.02, lon: 100.80 },
    { name: '楚雄', lat: 25.03, lon: 101.55 },
    { name: '保山', lat: 25.12, lon: 99.17 },
    { name: '昭通', lat: 27.33, lon: 103.72 },
    { name: '普洱', lat: 22.78, lon: 100.97 },
    { name: '文山', lat: 23.37, lon: 104.25 },
    { name: '德宏', lat: 24.43, lon: 98.58 },
    { name: '怒江', lat: 25.85, lon: 98.85 },
    { name: '迪庆', lat: 27.82, lon: 99.70 },
  ],
  '西藏自治区': [
    { name: '拉萨', lat: 29.65, lon: 91.13 },
    { name: '日喀则', lat: 29.27, lon: 88.88 },
    { name: '林芝', lat: 29.58, lon: 94.48 },
    { name: '昌都', lat: 31.13, lon: 97.18 },
    { name: '那曲', lat: 31.48, lon: 92.05 },
    { name: '山南', lat: 29.23, lon: 91.77 },
    { name: '阿里', lat: 30.40, lon: 81.13 },
  ],
  '陕西省': [
    { name: '西安', lat: 34.26, lon: 108.94 },
    { name: '咸阳', lat: 34.33, lon: 108.71 },
    { name: '宝鸡', lat: 34.37, lon: 107.15 },
    { name: '渭南', lat: 34.50, lon: 109.50 },
    { name: '延安', lat: 36.58, lon: 109.48 },
    { name: '榆林', lat: 38.28, lon: 109.73 },
    { name: '汉中', lat: 33.07, lon: 107.03 },
    { name: '安康', lat: 32.68, lon: 109.02 },
    { name: '商洛', lat: 33.87, lon: 109.93 },
    { name: '铜川', lat: 34.90, lon: 108.98 },
  ],
  '甘肃省': [
    { name: '兰州', lat: 36.06, lon: 103.83 },
    { name: '天水', lat: 34.58, lon: 105.73 },
    { name: '酒泉', lat: 39.73, lon: 98.50 },
    { name: '嘉峪关', lat: 39.78, lon: 98.28 },
    { name: '庆阳', lat: 35.73, lon: 107.63 },
    { name: '平凉', lat: 35.55, lon: 106.67 },
    { name: '张掖', lat: 38.93, lon: 100.45 },
    { name: '武威', lat: 37.93, lon: 102.63 },
    { name: '陇南', lat: 33.37, lon: 104.92 },
    { name: '白银', lat: 36.55, lon: 104.18 },
    { name: '金昌', lat: 38.48, lon: 102.18 },
    { name: '临夏', lat: 35.60, lon: 103.22 },
    { name: '甘南', lat: 34.98, lon: 102.92 },
  ],
  '青海省': [
    { name: '西宁', lat: 36.62, lon: 101.78 },
    { name: '海东', lat: 36.50, lon: 102.12 },
    { name: '格尔木', lat: 36.42, lon: 94.90 },
    { name: '玉树', lat: 33.00, lon: 97.02 },
    { name: '德令哈', lat: 37.37, lon: 97.37 },
    { name: '海南', lat: 36.28, lon: 100.62 },
    { name: '海北', lat: 36.97, lon: 100.90 },
    { name: '黄南', lat: 35.52, lon: 102.02 },
    { name: '果洛', lat: 34.47, lon: 100.23 },
  ],
  '宁夏回族自治区': [
    { name: '银川', lat: 38.47, lon: 106.27 },
    { name: '石嘴山', lat: 39.02, lon: 106.38 },
    { name: '吴忠', lat: 37.98, lon: 106.20 },
    { name: '中卫', lat: 37.52, lon: 105.18 },
    { name: '固原', lat: 36.00, lon: 106.28 },
  ],
  '新疆维吾尔自治区': [
    { name: '乌鲁木齐', lat: 43.80, lon: 87.62 },
    { name: '克拉玛依', lat: 45.60, lon: 84.87 },
    { name: '伊宁', lat: 43.92, lon: 81.32 },
    { name: '喀什', lat: 39.47, lon: 75.98 },
    { name: '吐鲁番', lat: 42.95, lon: 89.18 },
    { name: '库尔勒', lat: 41.73, lon: 86.13 },
    { name: '石河子', lat: 44.30, lon: 86.03 },
    { name: '阿克苏', lat: 41.17, lon: 80.27 },
    { name: '哈密', lat: 42.82, lon: 93.52 },
    { name: '昌吉', lat: 44.02, lon: 87.30 },
    { name: '阿勒泰', lat: 47.83, lon: 88.13 },
    { name: '塔城', lat: 46.75, lon: 82.98 },
    { name: '博乐', lat: 44.90, lon: 82.07 },
    { name: '和田', lat: 37.12, lon: 79.92 },
    { name: '阿图什', lat: 39.72, lon: 76.17 },
  ],
  '台湾省': [
    { name: '台北', lat: 25.05, lon: 121.50 },
    { name: '高雄', lat: 22.63, lon: 120.30 },
    { name: '台中', lat: 24.15, lon: 120.68 },
    { name: '台南', lat: 23.00, lon: 120.20 },
    { name: '桃园', lat: 24.98, lon: 121.30 },
    { name: '新北', lat: 25.02, lon: 121.47 },
    { name: '基隆', lat: 25.13, lon: 121.75 },
    { name: '新竹', lat: 24.80, lon: 120.97 },
    { name: '嘉义', lat: 23.48, lon: 120.45 },
  ],
  '香港特别行政区': [
    { name: '香港', lat: 22.32, lon: 114.17 },
  ],
  '澳门特别行政区': [
    { name: '澳门', lat: 22.20, lon: 113.55 },
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

  // Calculate viewBox so the province fills ~90% of the view
  const getProvinceViewBox = (): string => {
    if (!currentProvince) return viewBox;
    const bounds = getPathBounds(currentProvince.path);
    const pW = Math.max(bounds.maxX - bounds.minX, 1);
    const pH = Math.max(bounds.maxY - bounds.minY, 1);
    const fill = 0.9;
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
                    {/* 省份轮廓 */}
                    <path
                      d={prov.path}
                      fill={isActive ? 'rgba(89, 193, 139, 0.15)' : isHovered ? 'rgba(89, 193, 139, 0.08)' : 'transparent'}
                      stroke="white"
                      strokeWidth={isActive ? (() => { const b = getPathBounds(prov.path); const pw = Math.max(b.maxX - b.minX, 1); return Math.max(0.02, 0.3 * Math.min(1, pw / 30)); })() : 0.8}
                      strokeDasharray={isOverview ? '4 3' : 'none'}
                      strokeOpacity={isOverview ? 0.7 : 1}
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

              {/* 城市标记（省份视图）- 等比例缩放 */}
              {!isOverview && (() => {
                const pBounds = currentProvince ? getPathBounds(currentProvince.path) : null;
                // 根据省份地理范围标准化视觉尺寸
                const pW = pBounds ? Math.max(pBounds.maxX - pBounds.minX, 1) : 30;
                const sizeNorm = pW > 30 ? Math.min(2, pW / 30) : 1;
                const cityScale = currentCities.length > 10
                  ? Math.max(0.6, 1 - (currentCities.length - 10) * 0.025)
                  : 1;
                const scale = Math.min(1, cityScale * sizeNorm);
                const dotR = (0.7 * scale).toFixed(2);
                const txtSize = (2.5 * scale).toFixed(1);
                const txtOff = (2.5 * scale).toFixed(1);
                const txtYOff = (0.5 * scale).toFixed(1);
                return currentCities.map((city) => {
                  const pos = geoToSvg(city.lon, city.lat);
                  return (
                    <g key={city.name}>
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={dotR}
                        fill="#59c18b"
                      />
                      <text
                        x={pos.x + parseFloat(txtOff)}
                        y={pos.y + parseFloat(txtYOff)}
                        fill="rgba(255,255,255,0.85)"
                        fontSize={txtSize}
                        className="select-none"
                      >
                        {city.name}
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
