const weatherCodeDescriptions: { [key: number]: string } = {
  0: "晴朗",
  1: "大部晴朗",
  2: "局部多云",
  3: "阴天",
  45: "有雾",
  48: "雾（有霜）",
  51: "毛毛雨（小）",
  53: "毛毛雨（中）",
  55: "毛毛雨（大）",
  56: "冻雨（小）",
  57: "冻雨（大）",
  61: "小雨",
  63: "中雨",
  65: "大雨",
  66: "冻雨（小）",
  67: "冻雨（大）",
  71: "小雪",
  73: "中雪",
  75: "大雪",
  77: "雪粒",
  80: "小阵雨",
  81: "中阵雨",
  82: "暴雨",
  85: "小阵雪",
  86: "大阵雪",
  95: "雷暴（弱到中等强度）",
  96: "雷暴伴有小冰雹",
  99: "雷暴伴有大冰雹",
};

const getWeatherDescription = (code: number): string => {
  return weatherCodeDescriptions[code] || "未知天气";
};

export default getWeatherDescription;
