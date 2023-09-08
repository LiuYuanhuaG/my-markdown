import { Radio } from 'antd';
import React, { useRef } from 'react';

import { useEffect, useState } from 'react';
import styless from './index.module.less';

import { CesiumMapInit } from './util';

const ModelSampling = () => {
  const mapRef = useRef();
  const [radioValue, setRadioValue] = useState();
  const isDraw = useRef(false);
  const isDrag = useRef(false);
  const types1 = useRef();
  const [types, setTypes] = useState();

  async function init() {
    const map = await CesiumMapInit('mapContainerCesium');
    mapRef.current = map;
  }
  const onChange = (e) => {
    setRadioValue(e.target.value);
  };
  useEffect(() => {
    if (!mapRef.current) {
      init();
    }
  }, []);

  return (
    <div className={styless.opRoot}>
      <div className="tool">
        <Radio.Group onChange={onChange} value={radioValue}>
          <Radio value={1}>A</Radio>
          <Radio value={2}>B</Radio>
          <Radio value={3}>C</Radio>
          <Radio value={4}>D</Radio>
        </Radio.Group>
      </div>

      <div id="mapContainerCesium" style={{ height: '100%' }}></div>
    </div>
  );
};

export default ModelSampling;
