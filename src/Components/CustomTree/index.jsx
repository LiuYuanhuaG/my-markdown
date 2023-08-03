import { useEffect, useRef, useState } from 'react';
import styles from './index.module.less';
import TreeItem from './TreeItem';
export default function CustomTree() {
  const [treeData, setTreeData] = useState([
    {
      name: '1',
      key: '1',
      child: [
        {
          name: '2',
          key: '1-1',
          child: [
            { name: '1', key: '1-1-1' },
            { name: '2', key: '1-1-2' },
          ],
        },
        {
          name: '1',
          key: '1-2',
          child: [
            { name: '1', key: '1-2-1' },
            { name: '2', key: '1-2-2' },
          ],
        },
      ],
    },
  ]);
  const xRef = useRef();
  const yRef = useRef();
  // 拖拽移动
  function move(e) {
    e.stopPropagation();
    const odiv = e.currentTarget; // 获取元素

    // 算出鼠标相对元素的位置
    const disX = e.clientX - odiv.offsetLeft;
    const disY = e.clientY - odiv.offsetTop;
    document.onmousemove = (e) => {
      // 鼠标按下并移动的事件
      // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
      const left = e.clientX - disX;
      const top = e.clientY - disY;

      // 绑定元素位置到positionX和positionY上面
      xRef.current = top;
      yRef.current = left;

      // 移动当前元素
      odiv.style.left = left + 'px';
      odiv.style.top = top + 'px';
    };
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  }
  /**
   *递归处理树形数据
   *
   * @param {*} list 数据列表
   * @param {*} key
   * @param {*} type 是否是删除
   * @return {*}
   */
  function deepObj(list, key, type) {
    for (let i = 0; i < list.length; i++) {
      const node = list[i];
      if (node.key === key) {
        if (type) {
          list.splice(i, 1);
        } else {
          !(node.child instanceof Array) && (list[i].child = []);
          list[i].child.push({
            name: 1 + +(node.child[node.child.length - 1]?.name ?? 0),
            key: Math.random() * 100000,
            child: [],
          });
        }
        break;
      }
      if (node.key !== key && node.child && node.child.length) {
        list[i].child = deepObj(node.child, key, type);
      }
    }
    return list;
  }

  // 自定义添加节点设置数据
  function addChildNode(item) {
    // treeData.
    let _treeData = treeData;

    setTreeData((_) => {
      let newArr = deepObj(_, item.key);
      return [...newArr];
    });
  }
  // 自定义 删除节点 设置数据
  function delChildNode(item) {
    setTreeData((_) => {
      let newArr = deepObj(_, item.key, 'del');

      return [...newArr];
    });
  }
  useEffect(() => {
    console.log(treeData);
  }, [treeData]);
  return (
    <div className={styles.tree}>
      <div className="tree-content" onMouseDown={move}>
        {/* <tree-item tree-data={treeData} tree-first="true" /> */}
        <TreeItem
          treeData={treeData}
          treeFirst={true}
          addChildNode={addChildNode}
          delChildNode={delChildNode}
        ></TreeItem>
      </div>
    </div>
  );
}
