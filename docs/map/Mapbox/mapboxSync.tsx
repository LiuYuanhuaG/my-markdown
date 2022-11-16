import React, { useRef } from 'react';
import styles from './mapboxSync.less';
import mapboxgl, { sourceTian } from './baseConfig';
import { useEffect } from 'react';
import _ from 'lodash';
let isSync1 = null; // 用于判断是那个地图在进行缩放 使其以正常缩放速度进行缩放。否则缩放速度会慢于平时。性能不佳
let time; // 定时器
const mapboxSync = () => {
  const sync1 = useRef(null);
  const sync2 = useRef(null);
  const init = () => {
    sync1.current = new mapboxgl.Map({
      container: 'async1', // 容器id
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [118, 30], //中心坐标 [lng, lat]
      zoom: 9, // 缩放层级 zoom
      // ...sourceTian,
      projection: 'globe', // 地图模式 display the map as a 3D globe
    });

    sync2.current = new mapboxgl.Map({
      container: 'async2', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [118, 30], // starting position [lng, lat]
      zoom: 9, // starting zoom
      // ...sourceTian,
      projection: 'globe', // display the map as a 3D globe
    });
    // 设置同步中心
    function setSyncCenter(terEl, setEl) {
      let map2_x = terEl?.getCenter().lng;
      let map2_y = terEl?.getCenter().lat;
      setEl?.setCenter([map2_x, map2_y]);
    }

    // 拖拽;
    sync2.current?.on('drag', function() {
      setSyncCenter(sync2.current, sync1.current);
    });
    sync1.current?.on('drag', function() {
      setSyncCenter(sync1.current, sync2.current);
    });

    //   放大缩小
    sync2.current?.on('zoom', function() {
      if (isSync1 == null) {
        isSync1 = false;
      }
      if (isSync1 == false) {
        let map2_zoom = sync2.current?.getZoom();
        sync1.current?.setZoom(map2_zoom);
        setSyncCenter(sync2.current, sync1.current);
        clearTimeout(time);
        time = setTimeout(() => {
          isSync1 = null;
        }, 300);
      }
    });
    sync1.current?.on('zoom', function() {
      if (isSync1 == null) {
        isSync1 = true;
      }
      if (isSync1 == true) {
        let map1_zoom = sync1.current?.getZoom();
        sync2.current?.setZoom(map1_zoom);
        setSyncCenter(sync1.current, sync2.current);
        clearTimeout(time);
        time = setTimeout(() => {
          isSync1 = null;
        }, 300);
      }
    });

    // 倾斜
    sync2.current?.on('pitch', function() {
      let map2_pitch = sync2.current?.getPitch();
      sync1.current?.setPitch(map2_pitch);
    });
    sync1.current?.on('pitch', function() {
      let map1_pitch = sync1.current?.getPitch();
      sync2.current?.setPitch(map1_pitch);
    });

    // 旋转
    sync1.current?.on('rotate', function() {
      let map1_bear = sync1.current?.getBearing();
      sync2.current?.setBearing(map1_bear);
    });
    sync2.current?.on('rotate', function() {
      let map2_bear = sync2.current?.getBearing();
      sync1.current?.setBearing(map2_bear);
    });
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <div className={styles.map_box}>
      <div id="async1"></div>
      <div id="boundary"></div>
      <div id="async2"></div>
    </div>
  );
};

export default mapboxSync;
