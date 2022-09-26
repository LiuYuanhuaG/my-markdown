# 快速开始

Leaflet 是领先的开源 JavaScript 库，用于移动友好的交互式地图。它只有 42 KB 的 JS 大小，拥有大多数开发人员需要的所有映射[功能。](https://leafletjs.com/#features)

Leaflet 的设计考虑了 _简单性_ 、*性能*和 _可用性_ 。它可以在所有主要的桌面和移动平台上高效运行，可以使用大量[插件](https://leafletjs.com/plugins.html)进行扩展，具有美观、易于使用且[文档齐全的 API](https://leafletjs.com/reference.html '传单 API 参考')  以及简单易读的  [源代码](https://github.com/Leaflet/Leaflet 'GitHub 上的传单源代码存储库')， 值得为之[做出贡献](https://github.com/Leaflet/Leaflet/blob/main/CONTRIBUTING.md '为 Leaflet 做贡献的指南')。

-- 转自[Leaflet](https://leafletjs.com/)官网

### 初始化一个带有图层的地图

**本例使用了 react 编写** 如需在其他框架中使用 可前往官网寻求相关实例（或等待本站站长更新示例）

首先我们需要下载 Leaflet 包

```
// npm 下载
npm install leaflet
// yarn 下载
yarn add leaflet
```

然后我们需要在 demo 中引入 leaflet 及其样式

```react
import L from 'leaflet';
// 引入leaflet样式文件
import 'leaflet/dist/leaflet.css';
const demos = () => {
  useEffect(() => {
    let map = L.map('map', {
      center: [33.76, 111.79], // 地图初始中心 leaflet 与其他地图框架有点不同 这里的x y 是相反的
      zoom: 11, // 初始化层级
      maxZoom: 22, // 框架限制最大层级 默认 无限制
      minZoom: 3, // 最小缩放层级 不设置默认为0
      // crs: L.CRS.EPSG4326, // 使用标准
    });
 //    map.on('zoom', e => { //监听地图缩放层级
 //     console.log(e.target._zoom, 'zoom');
 //   });
  }, []);
  return (
    <div id="map" style={{ position: 'relative', height: '600px ' }}></div>
  );
};

export default demos;
```

此时只会出现一个地图的原始框架是没有任何底图的

这里可以为其添加底图，我们选择不同图源 比如[天地图](http://lbs.tianditu.gov.cn/server/MapService.html)、[mapbox](https://docs.mapbox.com/api/maps/vector-tiles/)、高德等（总览中有提到在线服务），这里我选择使用天地图的图源

```react
    // 我们一起添加一个 标注地图
	let key = '3c1fa5502bab6c274c3557cea72eb9f1' // 此项是在天地图官网申请的key
    let baseMap = L.tileLayer(
      'http://{s}.tianditu.gov.cn/DataServer?T=cta_w&x={x}&y={y}&l={z}&tk=' +
        key,
      {
        maxZoom: 20,
        tileSize: 256, // 每片栅格的大小
        zIndex: 1, // 图层排列顺序
        // zoomOffset: 1,
        subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'], // 此项不可少 因访问量可能较大 避免多次访问同一节点天地图可能会屏蔽ip
          //  {s} 会自动随机获取 https://leafletjs.com/reference.html#tilelayer 查看详情
      },
    );
	baseMap.addTo(map)
```

此时运行代码地图中就出现了 标注。 我们还可以此添加影像和道路图、矢量等 具体示例如下

`<code src="./demo.tsx"></code>`
