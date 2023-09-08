import ColorThief from 'colorthief';
import React, { Fragment, useState } from 'react';
import cs from '../../../public/img/cs.png';
import shan from '../../../public/img/shan.jpg';
import xiangcun from '../../../public/img/xiangcun.png';
import xiyang from '../../../public/img/xiyang.png';
import styles from './index.module.less';

function AutoBackground(imgList) {
  const [query, setQuery] = useState('redux');
  const [selectKey, setSelectKey] = useState();
  const [maskStyle, setMaskStyle] = useState();
  const [backGroundColor, setBackGroundColor] = useState(
    'linear-gradient(to bottom, #fff, #fff)',
  );
  let _imgList = [
    {
      img: cs,
      key: 1,
    },
    {
      img: shan,
      key: 2,
    },
    {
      img: xiangcun,
      key: 3,
    },
    {
      img: xiyang,
      key: 4,
    },
  ];

  const handleOver = async (e, key) => {
    const colorThief = new ColorThief();
    let [color1, color2, color3] = await colorThief.getPalette(e.target, 3);
    setSelectKey(key);
    setBackGroundColor(
      `linear-gradient(to left top , rgba(${color1?.toString()}), rgba(${color2?.toString()}),rgba(${color3?.toString()}))`,
    );
    setMaskStyle({
      backgroundImage: `linear-gradient(to left top , rgba(${color1?.toString()}), rgba(${color2?.toString()}),rgba(${color3?.toString()}))`,
      zIndex: 2,
    });
  };

  const handleLeave = (e) => {
    setSelectKey('');

    setMaskStyle({});
  };

  return (
    <Fragment>
      <div className={styles.root} style={{ backgroundImage: backGroundColor }}>
        {_imgList.map((item) => {
          return (
            <div
              key={item.key}
              className={`box ${selectKey === item.key ? 'boxSelected' : ''}`}
            >
              <img
                className={`${selectKey === item.key ? 'selected' : ''}`}
                onMouseOver={(e) => handleOver(e, item.key)}
                onMouseLeave={(e) => handleLeave(e, item.key)}
                src={item.img}
              />
            </div>
          );
        })}
        <div className={styles.mask} style={maskStyle}></div>
      </div>
    </Fragment>
  );
}

export default AutoBackground;
