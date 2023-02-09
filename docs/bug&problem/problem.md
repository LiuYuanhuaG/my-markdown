---
title: 问题与解决
order: 1

group:
  title: 问题与解决方案
  order: 1
---

## 1.断网处理

使用 addEventListener 监听 offline 和 online 事件

```js
window.addEventListener('online', (e) => {
  // 联网后处理逻辑
});
window.addEventListener('offline', (e) => {
  // 断网后触发  在这里处理相应逻辑
  // 1. window.location.reload() //直接刷新页面使用浏览器自带断网页面
  // 2. 路由跳转相应断网组件。 记录上一次路由路径，于联网后再次跳转之前页面
});
```
