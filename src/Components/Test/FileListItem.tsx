import React, { useEffect, useMemo, useRef, useState } from 'react';
import classs from './FileListItem.module.less';
interface Props {
  fileList: File[];
  // itemSizeOption: { size: number; company: string | null };
  baseItemSize?: number;
  // ItemOp: any;
}
const FileListItem = ({
  fileList = [],
  baseItemSize = 50,
}: // itemSizeOption = { size: 30, company: 'px' },
// visibleCount = 2,
Props) => {
  const upListEl = useRef<HTMLDivElement>(null);
  const [_start, setStart] = useState(0);

  const [_startOffset, setOffset] = useState(0);

  // 每一个的高度
  const [itemSize, setItemSize] = useState(baseItemSize);

  // 展示的数量
  const visibleCount = useMemo(() => {
    let len = upListEl.current?.clientHeight;
    let ter = 0;
    console.log(len, itemSize, 'len');

    if (len) {
      ter = len / itemSize;
    }
    return ter;
  }, [itemSize, fileList]);
  const [_end, setEnd] = useState(visibleCount ? visibleCount : 2);

  // 用于展示的数据
  const list = useMemo(() => {
    return fileList.slice(_start, Math.min(_end, fileList.length));
  }, [fileList, _end]);
  // 偏移量对应的style

  const getTransform = useMemo(() => {
    return `translate3d(0,${_startOffset}px,0)`;
  }, [_startOffset]);

  const onScroll = (e: any) => {
    // 当前滚动位置
    const scrollTop = upListEl.current?.scrollTop ?? _startOffset;
    // 此时的开始索引
    setStart(Math.floor(scrollTop / itemSize));
    // 此时的结束索引
    setEnd(_start + visibleCount);
    // 此时的偏移量
    console.log(scrollTop % itemSize);

    setOffset(scrollTop + itemSize / 2);
  };
  // console.log(fileList, 'FileList');

  const getScorll = () => {
    return `${fileList.length * itemSize}px`;
  };

  const onLoad = (e) => {
    console.log(e, 'boxOnLoad'); // 没有这个事件
  };

  useEffect(() => {
    if (list.length) {
      setItemSize(document.querySelector('.up_list_item')?.clientHeight ?? 50);
    }
    console.log(list);
  }, [list]);

  return (
    <span
      className={classs.upList}
      ref={upListEl}
      onScroll={onScroll}
      onLoad={onLoad}
    >
      <div className="upListItemScroll" style={{ height: getScorll() }}></div>
      <div style={{ transform: getTransform }}>
        {list.map((item) => (
          <div className="upListItem">{item.name}</div>
        ))}
      </div>
    </span>
  );
};

export default FileListItem;
