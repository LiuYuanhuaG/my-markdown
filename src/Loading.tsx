import { Spin } from 'antd';
import React from 'react';

const PageLoding = () => (
  <div
    style={{
      paddingTop: 100,
      textAlign: 'center',
    }}
  >
    <Spin size="large" />
  </div>
);

export default PageLoding;
