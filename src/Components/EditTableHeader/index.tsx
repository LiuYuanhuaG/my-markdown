import React, { useRef, useState } from 'react';
import { Tag } from 'antd';

type IDragEvent = React.DragEvent<HTMLDivElement>;

type IHandleCheckIsTargetEqualHandle = {
  (currentTarget: HTMLDivElement | null, target: HTMLDivElement): boolean;
};

interface IDataList {
  color: string;
  draggable: boolean;
  key: number;
  closable?: boolean;
}

const _checkIsTargetEqual: IHandleCheckIsTargetEqualHandle = (
  currentTarget,
  target,
) => currentTarget === target;

const renderTag = (data: IDataList[]) => {
  const TagsNode = data.map(item => (
    <Tag
      {...item}
      key={item.key}
      data-key={item.key}
      className="tag_item"
      color={item.color}
    >
      {item.color}
    </Tag>
  ));
  return TagsNode;
};

const DATA_LIST_DICT = [
  {
    color: 'magenta',
    draggable: true,
    key: 0,
  },
  {
    color: 'red',
    draggable: true,
    key: 1,
  },
  {
    color: 'volcano',
    draggable: true,
    key: 2,
  },
  {
    color: 'gold',
    draggable: true,
    key: 3,
  },
  {
    color: 'lime',
    draggable: true,
    key: 4,
  },
  {
    color: 'green',
    draggable: true,
    key: 5,
  },
  {
    color: 'cyan',
    draggable: true,
    key: 6,
  },
  {
    color: 'blue',
    draggable: true,
    key: 7,
  },
  {
    color: 'geekblue',
    draggable: true,
    key: 8,
  },
  {
    color: 'purple',
    draggable: true,
    closable: true,
    key: 9,
  },
];

const test = () => {
  const tagBox = useRef<HTMLDivElement>(null);
  const [startTag, setStartTag] = useState<HTMLDivElement | null>(null!);
  const [endTag, setEndTag] = useState<HTMLDivElement | null>(null!);
  const [dataList, setDataList] = useState<IDataList[]>(DATA_LIST_DICT);

  const handleDragstart = (e: IDragEvent) =>
    e.target && setStartTag(e.target as HTMLDivElement);

  const handleDragover = (e: IDragEvent) => {
    e.preventDefault();
    const target = e.target as HTMLDivElement;

    if (_checkIsTargetEqual(tagBox.current, target)) return setEndTag(null!);

    if (!_checkIsTargetEqual(endTag, target)) return setEndTag(target);
  };

  const handleDragend = (e: IDragEvent) => {
    e.preventDefault();
    if (!endTag) return false;

    let list = [...dataList];
    const endKey = (endTag?.getAttribute('data-key') as any) as number;
    const startKey = (startTag?.getAttribute('data-key') as any) as number;
    // 交换位置
    [list[startKey], list[endKey]] = [list[endKey], list[startKey]];

    setDataList([...list]);
  };

  const EventsBus = {
    onDragStart: handleDragstart,
    onDragOver: handleDragover,
    onDragEnd: handleDragend,
  };

  return (
    <div ref={tagBox} {...EventsBus}>
      {renderTag(dataList)}
    </div>
  );
};

export default test;
