---
title: 总览
nav:
  path: /map
  title: 地图
  order: 2
---

# 常用的前端地图框架（WebGIS 框架）

1. ### Leaflet

   ​ [Leaflet](https://leafletjs.com/) 是最著名的前端地图[可视化](https://so.csdn.net/so/search?q=可视化&spm=1001.2101.3001.7020)库，它开源、体积小、结构清晰、简单易用。

2. ### Mapbox GL JS

   ​ [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/api/) 是目前最新潮的前端地图库，它的矢量压缩、动态样式和三维性能令人印象深刻。它本身是开源的，但一般依赖于 Mapbox 公司提供的底图服务。

3. ### [ArcGIS](https://so.csdn.net/so/search?q=ArcGIS&spm=1001.2101.3001.7020) API for JS

   ​ [ArcGIS API for JS](https://developers.arcgis.com/javascript/) 是较为学院派的前端地图库，它是 ArcGIS 开发套件中的一部分，和桌面端和服务器端 ArcGIS 软件有较好的协作。它不开源且收费不低，在学术场景下较为常用。(并不建议用在商业用途,数据量大容易出现阻塞问题)

4. ### Openlayers

   ​ [Openlayers](https://openlayers.org/) 也是常用的前端地图库，它开源，相比于 Leaflet 更加复杂和完备。

5. ### Cesium

   ​ [Cesium](https://www.cesium.com/) 是三维地理(3D)可视化的常用库，在大尺度的可视化（地形、建筑、地球）中十分常用。

6. ### 百度地图 JS [API](https://so.csdn.net/so/search?q=API&spm=1001.2101.3001.7020) /百度地图 API GL

   ​ [百度地图 JS API](http://lbsyun.baidu.com/index.php?title=jspopular3.0) 是传统的二维地图，[百度地图 API GL](http://lbsyun.baidu.com/index.php?title=jspopularGL) 是三维地图，它们依赖百度地图提供的后台服务。除了地图服务外还有检索、导航、实时交通等关联服务。开发者有免费的限额。(但使用国际标准图层时需要进行纠偏，百度提供了相应 api 解决)

7. ### 高德地图 JS API

   ​ [高德地图 JS API](https://lbs.amap.com/api/javascript-api/summary) 与百度类似。

8. ### Google Maps JS API

   ​ [谷歌地图 JS API](https://developers.google.com/maps/documentation/javascript/overview) 在境外有更好的数据。

9. ### AntV L7

   ​ [AntV L7](https://antv.vision/zh) 是空间数据可视化库，它可以使用高德地图等协作构建地图可视化。

# 下面是收集到的一些在线地图服务的 url 供参考。

1、国外一些地图 url：

​ 　 Google Maps：https://mt{0-3}.google.com/vt/lyrs=r&x={x}&y={y}&z={z}

​ 　 Google Terrain：https://mt{0-3}.google.com/vt/lyrs=t&x={x}&y={y}&z={z}

Google Roads：https://mt{0-3}.google.com/vt/lyrs=h&x={x}&y={y}&z={z}

Google Satellite https://mt{0-3}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}

Google Streets https://mt{0-3}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}

cartocdn dark nolabel：http://basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png

cartocdn light nolabels：https://basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png

ESRI World Imagery：https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}

ESRI World Light Gray Base：https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}

ESRI World Topo Map：https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}

memomaps tilegen：http://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png

openstreetmap：https://tile.openstreetmap.org/{z}/{x}/{y}.png

openstreetmap br：https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png

openstreetmap cyclosm：https://a.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png

openstreetmap hot：https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png

stamen terrain：http://a.tile.stamen.com/terrain/{z}/{x}/{y}.png

stamen watercolor：https://stamen-tiles-c.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg

thunderforest cycle：https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=41f4f936f1d148f69cbd100812875c88

thunderforest pioneer：https://tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=41f4f936f1d148f69cbd100812875c88

wmflabs bw-mapnik：http://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png

2、高德地图 url：

影像: 'http://webst0{1-4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'

矢量: 'http://webrd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'

路网标注: 'http://webst0{1-4}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}'

3、天地图 url：

影像: 'http://t{0-7}.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=你的密钥'

路网标注: 'http://t{0-7}.tianditu.gov.cn/DataServer?T=cta_w&x={x}&y={y}&l={z}&tk=你的密钥'

标注: 'http://t{0-7}.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=你的密钥'

矢量: 'http://t{0-7}.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=你的密钥'

地形: 'http://t{0-7}.tianditu.gov.cn/DataServer?T=ter_w&x={x}&y={y}&l={z}&tk=你的密钥‘

​ 影像标注：'http://t4.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=你的密钥'

注意：

## 　　上面的 {0-3}、{1-4}、{0-7} 这些表示该区间内的数值，任取一个即可。（在 openlayers 里面加载直接这样写可以，在 QGIS 里需要取一个值）

QGIS-01：加载在线地图
https://blog.51cto.com/u_15127609/4340737
