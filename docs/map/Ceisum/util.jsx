import {
  buildModuleUrl,
  CameraEventType,
  Color,
  createWorldTerrainAsync,
  KeyboardEventModifier,
  TileMapServiceImageryProvider,
  Viewer,
  WebMapTileServiceImageryProvider,
} from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
let map;
/**
 * 服务负载子域
 */
export const subdomains = ['0', '1', '2', '3', '4', '5', '6', '7'];
/**
 *初始化 cesium 地图
 *
 * @export
 * @return {*}
 */
export async function CesiumMapInit(ID) {
  window.CESIUM_BASE_URL = '../Cesium/';
  map = new Viewer(ID, {
    // https://community.cesium.com/t/how-to-disable-the-error-of-access-token-when-run-offline/12449
    // 如何禁用离线运行时的访问令牌错误?
    imageryProvider: new TileMapServiceImageryProvider({
      url: buildModuleUrl('Assets/Textures/NaturalEarthII'),
    }),
    homeButton: false, // 主页视角按钮
    animation: false, // 关闭左下角动画组件
    baseLayerPicker: false, // 关闭底图图层切换组件
    geocoder: false, // 关闭搜索定位
    timeline: false, // 时间线部件
    navigationHelpButton: false, // 关闭右上角导航帮助按钮
    navigationInstructionsInitiallyVisible: false, // 不显示提示
    infoBox: false, // 关闭信息框
    selectionIndicator: true, // 关闭选中指示器
    sceneModePicker: false, // 关闭二三维切换
    scene3DOnly: false, // 只渲染 3D，节省资源
    skyAtmosphere: false, // 关闭大气
    terrainExaggeration: 5, // 地形倍数
    shadows: true, // 开启阴影
    shouldAnimate: true, // 开启动画
    fullscreenButton: false, // 全屏按钮

    terrainProvider: await createWorldTerrainAsync({
      requestWaterMask: true,
      requestVertexNormals: true,
      // heightmapTerrainQuality: 2,
    }),
    // terrainProvider: new EllipsoidTerrainProvider(),
  });
  CameraEventType;
  // * 调整鼠标习惯
  map.scene.screenSpaceCameraController.zoomEventTypes = [
    CameraEventType.WHEEL,
    CameraEventType.PINCH,
  ];
  map.scene.screenSpaceCameraController.tiltEventTypes = [
    CameraEventType.PINCH,
    CameraEventType.RIGHT_DRAG,
    {
      eventType: CameraEventType.RIGHT_DRAG,
      modifier: KeyboardEventModifier.CTRL,
    },
  ];
  // 开启深度检测
  map.scene.globe.depthTestAgainstTerrain = true;
  //设置球体背景色
  map.scene.globe.baseColor = new Color(0, 0, 0, 0);
  map.imageryLayers.addImageryProvider(
    new WebMapTileServiceImageryProvider({
      url: `http://t{s}.tianditu.gov.cn/img_w/wmts?tk=${'3c1fa5502bab6c274c3557cea72eb9f1'}`,
      format: 'tiles',
      layer: 'img',
      style: 'default',
      tileMatrixSetID: 'w',
      maximumLevel: 18,
      subdomains: subdomains,
    }),
    0,
  );
  map.imageryLayers.addImageryProvider(
    new WebMapTileServiceImageryProvider({
      url: `http://t{s}.tianditu.com/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=${'3c1fa5502bab6c274c3557cea72eb9f1'}`,
      layer: 'tdtBasicLayer',
      style: 'default',
      format: 'image/jpeg',
      tileMatrixSetID: 'GoogleMapsCompatible',
      maximumLevel: 18,
      subdomains: subdomains,
      id: 'TDT_SHILIANG',
    }),
    1,
  );
  return map;
}
