import mapboxgl from '!mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken =
  'pk.eyJ1IjoiMTc2NDk2MjA3MSIsImEiOiJja3NzejJqc2QxMXA3Mm5tZDAxczhveGVhIn0.x18MjxzVW8sdN4nKEtd0Wg';

/**
 * 天地图底图
 */
export const sourceTian = {
  sources: {
    //天地图底图分成底图和注记两部分，需设置两个数据源

    tiandituimg: {
      type: 'raster',

      tiles: [
        'https://t{s}.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=3c1fa5502bab6c274c3557cea72eb9f1',
      ],

      tileSize: 256,
    },

    tiandituano: {
      type: 'raster',

      tiles: [
        'https://t{s}.tianditu.gov.cn/DataServer?T=cva_c&x={x}&y={y}&l={z}&tk=3c1fa5502bab6c274c3557cea72eb9f1',
      ],

      tileSize: 256,
    },
  },

  layers: [
    {
      //根据数据源，添加两个图层

      id: 'tiandituimg',

      type: 'raster',

      source: 'tiandituimg',

      minzoom: 0,

      maxzoom: 18,
    },
    {
      //根据数据源，添加两个图层

      id: 'tiandituano',

      type: 'raster',

      source: 'tiandituano',

      minzoom: 0,

      maxzoom: 18,
    },
  ],
};

export default mapboxgl;
