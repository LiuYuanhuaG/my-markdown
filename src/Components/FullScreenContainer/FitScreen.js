function useFitScreen(options) {
  const {
    // * 画布尺寸（px）
    width = 1920,
    height = 1080,
    el,
    style = '',
  } = options;

  // * 默认缩放值
  let scale = {
    widthRatio: 1,
    heightRatio: 1,
  };

  // * 需保持的比例
  const baseProportion = parseFloat((width / height).toFixed(5));
  const calcRate = () => {
    if (el) {
      // 当前比例
      const currentRate = parseFloat(
        (window.innerWidth / window.innerHeight).toFixed(5),
      );
      // 比例越大，则越宽，基准值采用高度，计算出宽度
      // 反之，则越高，基准值采用宽度，计算出高度
      // 宽高比大，宽度过长

      if (currentRate > baseProportion) {
        // 求出维持比例需要的宽度，进行计算得出宽度对应比例
        scale.widthRatio = parseFloat(
          ((window.innerHeight * baseProportion) / width).toFixed(5),
        );
        // 得出高度对应比例
        scale.heightRatio = parseFloat(
          (window.innerHeight / height).toFixed(5),
        );
      }
      // 宽高比小，高度过长
      else {
        // 求出维持比例需要的高度，进行计算得出高度对应比例
        scale.heightRatio = parseFloat(
          (window.innerWidth / baseProportion / height).toFixed(5),
        );
        // 得出宽度比例
        scale.widthRatio = parseFloat((window.innerWidth / width).toFixed(5));
      }
    }

    el.style = `${style} transform:scale(${scale.widthRatio}, ${scale.heightRatio})`;
  };

  // * 改变窗口大小重新绘制
  const resize = () => {
    window.addEventListener('resize', calcRate);
  };

  // * 改变窗口大小重新绘制
  const unResize = () => {
    window.removeEventListener('resize', calcRate);
  };

  return {
    calcRate,
    resize,
    unResize,
  };
}

export default useFitScreen;
