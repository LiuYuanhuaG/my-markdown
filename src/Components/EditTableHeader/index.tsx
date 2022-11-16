import React, { useEffect, useRef, useState } from 'react';
import { Tag } from 'antd';
import _ from 'lodash';

const test = () => {
  let BaseList: any; // 用于储存tag数据
  const tagBox = useRef<HTMLDivElement | null>(null);
  const startTag = useRef<HTMLDivElement | EventTarget | null>(null!);
  const endTag = useRef<HTMLDivElement | EventTarget | null>(null!);
  // 用于视图更新
  const [dataList, setDataList] = useState<
    {
      color: string;
      draggable: boolean;
      key: string | number;
      closable?: boolean;
    }[]
  >([
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
  ]);

  useEffect(() => {
    tagBox.current?.addEventListener(
      'dragstart',
      e => {
        // e.preventDefault();
        // 元素开始拖动触发
        startTag.current = e.target;
      },
      false,
    );

    tagBox.current?.addEventListener(
      'dragover',
      e => {
        e.preventDefault();
        if (tagBox.current !== e.target) {
          if (startTag.current !== e.target) {
            endTag.current = e.target;
          }
        } else {
          endTag.current = null;
        }
      },
      false,
    );

    tagBox.current?.addEventListener(
      'dragend',
      (e: any) => {
        // 拖动结束触发
        e.preventDefault();
        if (endTag.current) {
          let list = _.cloneDeep(BaseList ? BaseList : dataList);
          // 拿到开始结束位置的key
          const endKey = endTag.current?.getAttribute('data-key');
          const startKey = startTag.current?.getAttribute('data-key');
          let endi, starti, endData, startData;
          // 获取对应key的索引和值
          list.forEach((item: any, i: any) => {
            if (item.key == endKey) {
              endi = i;
              endData = item;
            }
            if (item.key == startKey) {
              starti = i;
              startData = item;
            }
          });
          // 开始结束位置交换
          endi !== undefined && (list[endi] = startData);
          starti !== undefined && (list[starti] = endData);

          BaseList = list;
          setDataList(list);
          endTag.current = null;
        }
      },
      false,
    );
  }, []);

  return (
    <>
      <div className="tag_box" ref={tagBox}>
        {dataList.map(({ color, key, ...surplus }, _i) => (
          <Tag
            {...surplus}
            color={color}
            key={_i}
            className="tag_item"
            data-key={key}
          >
            {color}
          </Tag>
        ))}
      </div>
    </>
  );
};
export default test;
