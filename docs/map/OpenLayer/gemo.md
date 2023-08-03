报错：TopologyException: found non-noded intersection between LINESTRING ( 13022630.89845247 5279155.061076987, 13022019.402226187 5278543.81202375 ) and LINESTRING ( 13022546.663871666 5273866.515213738, 13022019.402226187 5286795.6742424425 ) [ (13022342.73927607, 5278867.01837748, NaN) ]

## 解决方法

    通过实例化jsts.gemo.GeometryFactory，根据坐标数据创建闭合线 , 通过isSimple方法判断其是否自相交。

    若其自相交则通过闭合线创建Polygon并获取其缓冲区数据 ，并获取类，若其类型为 Polygon则 获取当前缓冲区坐标数据 创建新的 Polygon返回， 若其类型为 MultiPolygon 则 遍历缓冲区每一个几何图形，然后通过union 方法将每一个几何图形融合为一个图形 并返回。

## 准备工作

引入 jsts 和 openlayer 并实例化

```javascript
import 'jsts/dist/jsts.min.js';
import {
  GeometryCollection,
  LinearRing,
  LineString,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  Point,
  Polygon,
} from 'ol/geom';
// 实例化OL解析类
const OLParser = new jsts.io.OL3Parser();

// 注入OL几何对象
OLParser.inject(
  Point,
  LineString,
  LinearRing,
  Polygon,
  MultiPoint,
  MultiLineString,
  MultiPolygon,
  GeometryCollection,
);
```

## 创建 jsts 几何处理函数

方法参考[JSTS 介绍和功能简单示例\_jts api 文档\_GIS 小虫的博客-CSDN 博客](https://blog.csdn.net/Neuromancerr/article/details/123345148)

#### 取交

    ![img](https://img-blog.csdnimg.cn/39495779c14d48a4b616f10b9d266448.png)

```javascript
/**
 * 取交
 * @param geom
 * @param geomB
 * @returns
 */
const intersects = (geom, geomB) => {
  const jstsGeom = OLParser.read(geom);
  const jstsGeomB = OLParser.read(geomB);

  if (!jstsGeom.isValid() || !jstsGeomB.isValid()) {
    console.error('几何对象出现拓扑错误,请检查修复');

    return null;
  }

  const difference = jstsGeom.intersection(jstsGeomB);

  return OLParser.write(difference);
};
```

#### 补集

    ![img](https://img-blog.csdnimg.cn/6668503516984d30a4c2758c5c5011be.png)

```javascript
/**
 * 取geom中geomB的补集
 * @param geom
 * @param geomB
 * @returns
 */
const getDifference = (geom, geomB) => {
  const jstsGeom = OLParser.read(geom);
  const jstsGeomB = OLParser.read(geomB);

  if (!jstsGeom.isValid() || !jstsGeomB.isValid()) {
    console.error('几何对象出现拓扑错误,请检查修复');

    return null;
  }

  const difference = jstsGeom.difference(jstsGeomB);

  return OLParser.write(difference);
};
```

#### 融合

![img](https://img-blog.csdnimg.cn/10d7ee18e279458aa9f189f28486165a.png)

```javascript
/**
 * 融合
 * @param geom
 * @param geomB
 * @returns
 */
const union = (geom, geomB) => {
  const jstsGeom = OLParser.read(geom);
  const jstsGeomB = OLParser.read(geomB);

  if (!jstsGeom.isValid() || !jstsGeomB.isValid()) {
    console.error('几何对象出现拓扑错误,请检查修复');

    return null;
  }

  const difference = jstsGeom.union(jstsGeomB);

  return OLParser.write(difference);
};
```

#### 对等差分

![img](https://img-blog.csdnimg.cn/24e776afcbf54ee29996a3f9900e5412.png)

```javascript
/**
 * 对等差分
 * @param geom
 * @param geomB
 * @returns
 */
const symDifference = (geom, geomB) => {
  const jstsGeom = OLParser.read(geom);
  const jstsGeomB = OLParser.read(geomB);

  if (!jstsGeom.isValid() || !jstsGeomB.isValid()) {
    console.error('几何对象出现拓扑错误,请检查修复');

    return null;
  }

  const difference = jstsGeom.symDifference(jstsGeomB);

  return OLParser.write(difference);
};
```

## 创建解决自相交处理函数

```javascript
/**
 *  jsts相交处理
 *
 * @param {[number,number][]} coordinates
 * @return {Polygon|MultiPolygon}
 */
function jstsIntersect(coordinates) {
  // 返回结果实例
  let mergeMultiPolygon;
  // 实例化几何操作工厂类
  let geomFactory = new jsts.geom.GeometryFactory();
  // 转换坐标Coordinate
  let jstsCoordinates = coordinates.map(function (pt) {
    return new jsts.geom.Coordinate(pt[0], pt[1]);
  });
  // 创建一个闭合线几何
  let linearRing = geomFactory.createLinearRing(jstsCoordinates);

  // 查看是否是一个简单几何, 是否自相交
  if (!linearRing.isSimple()) {
    //若要拆分它并查明它是否自相交，请使用缓冲区 buffer(0) 0 为缓冲区宽度

    let jstsPolygon = geomFactory.createPolygon(linearRing).buffer(0);

    if (jstsPolygon.getGeometryType() !== 'MultiPolygon') {
      // 获取闭合线几何数据创建面
      let _coordinates = jstsPolygon._shell._points._coordinates.map(function (
        pr,
      ) {
        return [pr.x, pr.y];
      });

      // 这里目前限制为 Polygon
      mergeMultiPolygon = new Polygon([_coordinates]);
    } else {
      let list = [];

      // 遍历每个面 处理数据的结构
      for (let i = 0; i < jstsPolygon._geometries.length; i++) {
        let item = jstsPolygon._geometries[i];

        let p = item._shell._points._coordinates.map(function (pr) {
          return [pr.x, pr.y];
        });

        list.push(p);
      }

      // 合并融合每一个面 变成一个简单几何
      mergeMultiPolygon = list.reduce((accumulator, currentValue) => {
        if (accumulator) {
          return union(accumulator, new Polygon([currentValue]));
        } else {
          return new Polygon([currentValue]);
        }
      }, null);
    }
  }

  return mergeMultiPolygon;
}
```

## 综合示例

```javascript
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import React, { useRef } from 'react';
// import * as ol from 'ol';
import { Feature, Map, View } from 'ol';
import * as format from 'ol/format';
import * as olLayer from 'ol/layer';
// import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import * as turf from '@turf/turf';
import * as geom from 'ol/geom';
import * as olSource from 'ol/source';
import { useEffect, useState } from 'react';
import styless from './index.module.less';
// import jsts from 'jsts';
import { message } from 'antd';
import 'jsts/dist/jsts.min.js';
import {
  GeometryCollection,
  LinearRing,
  LineString,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  Point,
  Polygon,
} from 'ol/geom';
import Draw from 'ol/interaction/Draw';
import 'ol/ol.css';

let integrationLayers, ilSource, lineString, sketch;

// 合并图形几何 对象
let mergeGeom;
// 实例化OL解析类
const OLParser = new jsts.io.OL3Parser();

// 注入OL几何对象
OLParser.inject(
  Point,
  LineString,
  LinearRing,
  Polygon,
  MultiPoint,
  MultiLineString,
  MultiPolygon,
  GeometryCollection,
);

const ModelSampling = () => {
  const mapRef = useRef();
  // const [isDraw, setIsDraw] = useState(false);
  const isDraw = useRef(false);
  const isDrag = useRef(false);
  const types1 = useRef();
  const [types, setTypes] = useState();

  function init() {
    const map = new Map({
      target: 'mapContainer',
      view: new View({
        center: [13090048.3574, 5182909.5998],
        zoom: 9,
        minZoom: 3,
        maxZoom: 20,
      }),
      layers: [
        new olLayer.Tile({
          source: new olSource.OSM(),
        }),
      ],
    });
    //
    const lineSource = new olSource.Vector();
    const vectorSource = new olSource.Vector();
    const lineVector = new olLayer.Vector({
      source: lineSource,
      style: new Style({
        stroke: new Stroke({
          color: 'red',
          width: 2,
        }),
        fill: new Fill({
          color: '#ff0',
          // width: 2,
        }),
      }),
    });

    ilSource = new olSource.Vector();

    integrationLayers = new olLayer.Vector({
      source: ilSource,
      style: new Style({
        stroke: new Stroke({
          color: 'red',
          width: 2,
        }),
        fill: new Fill({
          color: '#ff03',
          // width: 2,
        }),
      }),
    });

    map.addLayer(integrationLayers);
    map.addLayer(lineVector);

    let pointerMoveHandler = function (evt) {
      if (!sketch || !isDraw.current) return;

      if (evt.originalEvent.buttons === 4) {
        let coordinates = sketch.getGeometry().getCoordinates();

        coordinates.push(evt.coordinate);
        sketch.getGeometry().setCoordinates(coordinates);
      }
    };

    map.on('pointermove', pointerMoveHandler);

    map.on('pointerdown', function (evt) {
      // 鼠标中键
      if (evt.originalEvent.button === 1) {
        if (!sketch && isDraw.current) {
          sketch = new Feature(new geom.LineString([]));
          sketch.setId('paths');
          lineSource.addFeature(sketch);
        }
      }
    });

    map.on('dblclick', function (e) {
      if (!sketch) return;

      let coordinates = sketch.getGeometry().getCoordinates();
      coordinates.push(coordinates[0]);

      // let geomFactory = new jsts.geom.GeometryFactory();

      // // 转换坐标Coordinate
      // let jstsCoordinates = coordinates.map(function (pt) {
      //   return new jsts.geom.Coordinate(pt[0], pt[1]);
      // });

      // let linearRing = geomFactory.createLinearRing(jstsCoordinates);

      let mergeMultiPolygon = jstsIntersect(coordinates);
      console.log(mergeMultiPolygon, 'mergeMultiPolygon');
      if (mergeGeom) {
        let fn = types1.current === 1 ? union : getDifference;

        let _geom = fn(mergeGeom, mergeMultiPolygon);

        if (_geom) {
          mergeGeom = _geom;
          sketch = new Feature(_geom);
        } else {
          message.warning('绘画几何对象出现拓扑错误,请检查修复');
        }
      } else {
        // mergeGeom = new Polygon([coordinates]);
        console.log(mergeMultiPolygon, 'mergeMultiPolygon');
        mergeGeom = mergeMultiPolygon ?? new Polygon([coordinates]);

        let jstsGeom = OLParser.read(mergeGeom);

        sketch = new Feature(mergeGeom);

        if (!jstsGeom.isValid()) {
          message.warning('绘画几何对象出现拓扑错误,请检查修复');
          mergeGeom = null;
          sketch = null;
        }
      }

      // 清除 画线源
      lineSource.clear();
      // 清除结果 面
      ilSource.clear();

      ilSource.addFeature(new Feature(mergeGeom));

      let features = ilSource.getFeatures();
      // 创建一个 GeoJSON 格式的对象
      let geojsonFormat = new format.GeoJSON();

      // 将要素转换为 GeoJSON 字符串
      let geojsonStr = geojsonFormat.writeFeatures(features);

      console.log(turf.toWgs84(JSON.parse(geojsonStr)));
      sketch = null;
    });
    // drawClick(map, vectorSource);
    mapRef.current = map;
  }

  /**
   *  jsts相交处理
   *
   * @param {[number,number][]} coordinates
   * @return {Polygon|MultiPolygon}
   */
  function jstsIntersect(coordinates) {
    // 返回结果实例
    let mergeMultiPolygon = new Polygon([coordinates]);
    // 实例化几何操作工厂类
    let geomFactory = new jsts.geom.GeometryFactory();
    // 转换坐标Coordinate
    let jstsCoordinates = coordinates.map(function (pt) {
      return new jsts.geom.Coordinate(pt[0], pt[1]);
    });
    // 创建一个闭合线几何
    let linearRing = geomFactory.createLinearRing(jstsCoordinates);

    // 查看是否是一个简单几何, 是否自相交
    if (!linearRing.isSimple()) {
      //若要拆分它并查明它是否自相交，请使用缓冲区 buffer(0) 0 为缓冲区宽度

      let jstsPolygon = geomFactory.createPolygon(linearRing).buffer(0);

      if (jstsPolygon.getGeometryType() !== 'MultiPolygon') {
        // 获取闭合线几何数据创建面
        let _coordinates = jstsPolygon._shell._points._coordinates.map(
          function (pr) {
            return [pr.x, pr.y];
          },
        );

        // 这里目前限制为 Polygon
        mergeMultiPolygon = new Polygon([_coordinates]);
      } else {
        let list = [];

        // 遍历每个面 处理数据的结构
        for (let i = 0; i < jstsPolygon._geometries.length; i++) {
          let item = jstsPolygon._geometries[i];

          let p = item._shell._points._coordinates.map(function (pr) {
            return [pr.x, pr.y];
          });

          list.push(p);
        }

        // 合并融合每一个面 变成一个简单几何
        mergeMultiPolygon = list.reduce((accumulator, currentValue) => {
          if (accumulator) {
            return union(accumulator, new Polygon([currentValue]));
          } else {
            return new Polygon([currentValue]);
          }
        }, null);
      }
    }

    return mergeMultiPolygon;
  }
  // 点选绘制
  function drawClick(map, vectorSource) {
    // 创建一个绘制交互对象
    let draw = new Draw({
      source: vectorSource, // 矢量数据源
      type: 'Polygon', // 绘制类型为面
    });

    // 添加绘制交互到地图中
    map.addInteraction(draw);

    // 监听绘制完成事件
    draw.on('drawend', function (event) {
      let feature = event.feature; // 获取绘制的要素

      // 可以在这里对要素进行进一步处理，或者将其保存到数据库等操作
      console.log(feature, feature.getGeometry().getCoordinates(), 'feature');
      vectorSource.addFeature(feature);
      let vectors = new olLayer.Vector({
        source: vectorSource,
        style: new Style({
          stroke: new Stroke({
            color: 'red',
            width: 2,
          }),
          fill: new Fill({
            color: '#ff03',
            // width: 2,
          }),
        }),
      });

      map.addLayer(vectors);
      // 停止绘制交互
      map.removeInteraction(draw);
    });
  }

  /**
   * 取交
   * @param geom
   * @param geomB
   * @returns
   */
  const intersects = (geom, geomB) => {
    const jstsGeom = OLParser.read(geom);
    const jstsGeomB = OLParser.read(geomB);

    if (!jstsGeom.isValid() || !jstsGeomB.isValid()) {
      console.error('几何对象出现拓扑错误,请检查修复');

      return null;
    }

    const difference = jstsGeom.intersection(jstsGeomB);

    return OLParser.write(difference);
  };

  /**
   * 取geom中geomB的补集
   * @param geom
   * @param geomB
   * @returns
   */
  const getDifference = (geom, geomB) => {
    const jstsGeom = OLParser.read(geom);
    const jstsGeomB = OLParser.read(geomB);

    if (!jstsGeom.isValid() || !jstsGeomB.isValid()) {
      console.error('几何对象出现拓扑错误,请检查修复');

      return null;
    }

    const difference = jstsGeom.difference(jstsGeomB);

    return OLParser.write(difference);
  };

  /**
   * 融合
   * @param geom
   * @param geomB
   * @returns
   */
  const union = (geom, geomB) => {
    const jstsGeom = OLParser.read(geom);
    const jstsGeomB = OLParser.read(geomB);

    if (!jstsGeom.isValid() || !jstsGeomB.isValid()) {
      console.error('几何对象出现拓扑错误,请检查修复');

      return null;
    }

    const difference = jstsGeom.union(jstsGeomB);

    return OLParser.write(difference);
  };

  /**
   * 对等差分
   * @param geom
   * @param geomB
   * @returns
   */
  const symDifference = (geom, geomB) => {
    const jstsGeom = OLParser.read(geom);
    const jstsGeomB = OLParser.read(geomB);

    if (!jstsGeom.isValid() || !jstsGeomB.isValid()) {
      console.error('几何对象出现拓扑错误,请检查修复');

      return null;
    }

    const difference = jstsGeom.symDifference(jstsGeomB);

    return OLParser.write(difference);
  };

  const handlerTool = (type) => {
    setTypes(type);

    if (types1.current === type) {
      isDraw.current = !isDraw.current;
    } else {
      isDraw.current = true;
    }

    types1.current = type;
  };

  useEffect(() => {
    if (!mapRef.current) {
      init();
      window.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.keyCode === 90) {
          console.log(e, 'ctrl Z');
        }

        if (e.ctrlKey) {
          console.log(e, 'ctrl');
        }
      });
    }
  }, []);

  return (
    <div className={styless.opRoot}>
      <div className="tool">
        <button type="button" onClick={() => handlerTool(1)}>
          融合
        </button>
        <button type="button" onClick={() => handlerTool(2)}>
          删除
        </button>
      </div>
      <div id="mapContainer" style={{ height: '100%' }}></div>
    </div>
  );
};

export default ModelSampling;
```

效果

![img](https://img-blog.csdnimg.cn/c5e65ccde86b4391a4201a6fd725b705.gif)
