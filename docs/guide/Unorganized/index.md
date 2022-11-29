---
title: 未整理
order: 1
nav:
  title: 前端之路
  order: 1
---

# 未整理

- [前端学习路线](http://h5.dooring.cn/blog/guides/afrontend)
- [写给初中级前端的高级进阶指南](https://juejin.cn/post/6844904103504527374#heading-43)
- [vue 源码解密](https://ustbhuangyi.github.io/vue-analysis/)
- [react 源码解密](https://react.jokcy.me/)
- [reactDOM 原生节点](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/1349b640d4d07f40aa7c1c6931f18e3fbf667f3a/types/react/index.d.ts#L223)
- [前端实现 word、excel、pdf、ppt、mp4、图片、文本等文件的预览](https://juejin.cn/post/7071598747519549454#heading-2)
- [前端复杂表格导出 excel，一键导出 Antd Table 看这篇就够了（附源码）](https://juejin.cn/post/7071882317953761316?share_token=188c01b6-5d42-4421-8465-7499eda0c73b)
- [eslint 使用总结](https://github.com/Hibop/Hibop.github.io/issues/34)
- [自定义截取任意区域地图数据](https://geojson.io/#map=8/67.200/39.894)
- [获取中国下钻地图数据](http://datav.aliyun.com/portal/school/atlas/area_selector)
- [react 自定义 HOOK](https://usehooks-ts.com/react-hook/use-intersection-observer)
- [react 常用的库](https://github.com/MrXujiang/frontend-developer-roadmap/blob/main/React.md)
- [JSON Schema 规范（中文版）](https://json-schema.apifox.cn/)
- [JavaScript 前端和 Java 后端的 AES 加密和解密(转) ](https://www.cnblogs.com/loong-hon/p/11225407.html)

## **React**

- [实现 React requestIdleCallback 调度能力](https://juejin.cn/post/7021506472232583199#heading-8)

## Vue

- [使用$attrs $listeners](https://cn.vuejs.org/v2/api/#vm-attrs)
- [vue-promised](https://github.com/posva/vue-promised#readme)
- [vue 性能优化技巧](https://mp.weixin.qq.com/s?__biz=MzIxNDc4MjEzNw==&mid=2247484346&idx=1&sn=ca9c3c752c96ce99f5370919ac3354bb&chksm=97a31a6ca0d4937abb4c446498c29ab380d486c141cf0a937124c2d5aa2eb54030e9305b5ef9&token=866091504&lang=zh_CN#rd)
- [vue 封装的埋点指令思路](https://juejin.cn/post/7040649951923142687)
- [vue 版本的点击跳转到代码的插件（只支持 vite）](https://github.com/webfansplz/vite-plugin-vue-inspector)

## js

- [组织架构树组件编写思路](https://juejin.cn/post/6872213286729973774)
- [HTML5 中手势原理分析与数学知识的实践](https://juejin.cn/post/6844903752168636423)
- echarts 示例网站
  - http://analysis.datains.cn/finance-admin/index.html#/chartLib/all
  - http://ppchart.com/#/
  - http://www.isqqw.com/
  - https://madeapie.com/#/
  - http://chart.majh.top/

## gis

- [gis 相关概念](http://marsgis.cn/doc/study-gis.pdf)
- [坐标转换](http://epsg.io/transform#s_srs=4326&t_srs=3857)
- [GeoJSON 格式规范说明](https://www.oschina.net/translate/geojson-spec?cmp)
- [GeoServer](https://docs.geoserver.org/latest/en/user/tutorials/cql/cql_tutorial.html)
- [WMS 参考](https://docs.geoserver.org/latest/en/user/services/wms/reference.html#benefits-of-wms)

### 地图遇到数据不显示时

```
属性查询一般使用EPSG:4326
获取wms源(栅格raster)使用EPSG: 3857 (为了在web端地图上展示, mapboxgl就是只遵循3857, 不支持4326)
EPSG:3857（投影）：数据的可读性差和数值大存储比较占用内存。
EPSG:4326（地理）：使用此坐标系会导致页面变形。
通常：数据存储在EPSG:4326中，显示在EPSG:3857中
```

## 其他

- [前端监控 SDK 的一些技术要点原理分析](https://juejin.cn/post/7017974567943536671)
- [文件上传攻略](https://juejin.cn/post/6844903968338870285)
- [树状数据操作](https://juejin.cn/post/7008340119681761288)
- [复杂 web 动画（选择 web Animations API）](https://juejin.cn/post/7023903552946995214?share_token=071e3952-4c04-4d06-969d-188253825358)
- [纯 js 实现图片裁剪工具](https://juejin.cn/post/7026896668817621028)
- [用户登录设计之双 token 设计](https://juejin.cn/post/7035280102636126244)
- [CSS 自适应内容宽度的输入框](https://segmentfault.com/a/1190000041032322)
- [reduce 实现 filter,map 数组扁平化](https://juejin.cn/post/6844903833844482056)
- [构建大型前端业务项目的一点经验](https://juejin.cn/post/7016948081321050148?share_token=6a9496ec-d3f2-478e-aa19-991cff6c2276)
- [antd 表格性能差的解决方案](https://juejin.cn/post/7063332320339099678)
- [页面性能优化问题复盘](https://juejin.cn/post/7064405926035324964)
- [前端复杂表格导出 excel](https://juejin.cn/post/7071882317953761316?share_token=188c01b6-5d42-4421-8465-7499eda0c73b)
- [如何让 Vue、React 代码的调试变得更爽](https://juejin.cn/post/7071219293249077256)
- [前端复杂带交互动画的 lottie-web 方案实现](https://zhuanlan.zhihu.com/p/234703627)
- [设计稿转代码的思路和方案（公开课）](https://live.juejin.cn/4354/256219?utm_source=bannner&utm_medium=bannner&utm_campaign=sheji419)

## 可视化入门

### canvas 教程

- https://juejin.cn/post/7008064185972031524
- https://juejin.cn/post/7008811592733655077
- https://github.com/827652549/CanvasStudy

### svg 教程

- https://juejin.cn/post/7012099738380009502
- https://juejin.cn/post/6844903593212903431#heading-7

### d3 教程

- [各个模块](https://github.com/d3)
- [官方文档](https://github.com/d3/d3/blob/main/API.md)
- [中文版文档](https://iowiki.com/d3js/d3js_index.html)
- https://d3js.org.cn/
- [入门教程](https://juejin.cn/post/6982089492991574047#heading-0)
- [入门教程](https://observablehq.com/@d3/learn-d3?collection=@d3/learn-d3)
- [使用 D3.js 实现数据可视化](https://zhuanlan.zhihu.com/p/21897086)
- [d3-demo](https://github.com/1522017075/d3Study)

### webGL

- [webGL1 中文版](https://webglfundamentals.org/webgl/lessons/zh_cn/)
- [webGL2 中文版](https://webgl2fundamentals.org/webgl/lessons/zh_cn/)
- [webGL 电子书](http://www.webgl3d.cn/WebGL/)

### threejs

- [官方文档](https://threejs.org/docs/index.html#manual/zh/introduction/Creating-a-scene)
- [入门教程](https://github.com/puxiao/threejs-tutorial)
- [threejs 电子书](http://www.webgl3d.cn/Three.js/)
- [中文教程](https://techbrood.com/threejs/docs/)

### 工具

- [在线将 svg 转 png](https://10015.io/tools/svg-blob-generator)

### 其他链接

- [28 个 canvas 知名的库](https://juejin.cn/post/7038267477121302542#heading-4)
- [canvas 资源大全(200+)](https://github.com/chinaBerg/awesome-canvas)
