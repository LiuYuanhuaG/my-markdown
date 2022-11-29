import React from 'react';
import classs from './index.less';
import AutoScrollList from '@/Components/AutoScrollList/AutoScrollList';
const Index = () => {
  return (
    <div>
      <AutoScrollList
        fileList={Array.from(Array(600)).map((it, i) => i)}
        itemRender={(
          item:
            | string
            | number
            | boolean
            | React.ReactElement<any, string | React.JSXElementConstructor<any>>
            | React.ReactFragment
            | React.ReactPortal
            | null
            | undefined,
        ) => <div style={{ height: '80px', textAlign: 'center' }}>{item}</div>}
      ></AutoScrollList>
    </div>
  );
};

export default Index;
