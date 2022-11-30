import styless from './AutoScrollList.less';

import React, { useEffect, useMemo, useRef, useState } from 'react';

interface AutoScrollListType {
  fileList: any[];
  // isProgress?: boolean;
  // baseItemSize?: number | string;
  multiple?: number | string;
  children?: any;
  itemRender: any;
}

/**
 * @fileList any[];
 * @itemRender 元素渲染
 * @multiple  为列表元素高度的倍数 用于计算当前列表盒子高度
 */
const AutoScrollList = (props: AutoScrollListType) => {
  const {
    fileList,
    itemRender,

    multiple = 3,
  } = props;

  const upListEl = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  const [_startOffset, setOffset] = useState(0);

  // 每一个的高度
  const [itemSize, setItemSize] = useState(0);

  // 展示盒子的style样式
  const contentStyle = useMemo(() => {
    if (itemSize) {
      let _multiple = fileList.length < multiple ? fileList.length : multiple;
      return {
        minHeight: itemSize,
        height: itemSize * (0.1 + +_multiple),
      };
    }
    return {};
  }, [multiple, itemSize]);

  const [pos, setPos] = useState({
    start: 0,
    end: multiple,
  });
  // 用于展示的数据
  const list = useMemo(() => {
    return fileList.slice(pos.start, Math.min(+pos.end, fileList.length));
  }, [fileList, pos]);
  // 偏移量对应的style

  const getTransform = useMemo(() => {
    return `translate3d(0,${_startOffset}px,0)`;
  }, [_startOffset]);

  const onScroll = () => {
    // 当前滚动位置
    const scrollTop = upListEl.current?.scrollTop ?? _startOffset;
    const clientHeight = upListEl.current?.clientHeight ?? 0;
    // 此时的偏移量
    setOffset(scrollTop);
    const _start = Math.floor(scrollTop / itemSize);
    setPos({
      start: _start, // 此时的开始索引
      end: _start + clientHeight / itemSize, // 此时的结束索引
    });
  };

  const getScorll = () => {
    let length = fileList.length;
    let mt = length > 2 ? length + 1 : length;
    return `${mt * itemSize}px`; // 需要超出部分否则触底闪烁
  };

  useEffect(() => {
    setItemSize(itemRef.current?.offsetHeight ?? 50);
    console.log(1111);
  }, [itemRef.current]);

  useEffect(() => {
    if (list.length) {
      setItemSize(itemRef.current?.offsetHeight ?? 50);
    }
  }, [list]);

  return (
    <div
      className={styless['file-content']}
      ref={upListEl}
      style={contentStyle}
      onScroll={onScroll}
    >
      <div
        className="list-item-scroll"
        style={{ height: getScorll(), width: '100%' }}
      ></div>
      <div style={{ transform: getTransform }} className="list-tem-content">
        {list.map((item, i) => (
          <div ref={i === 0 ? itemRef : null} key={i + Math.random()}>
            {itemRender(item)}
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * @file  渲染时当前文件列表
 * @isProgress 是否展示进度
//  * @setItemFileList 控制fileList
 *
 */
export default AutoScrollList;
