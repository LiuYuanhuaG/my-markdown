import { useRef, useState } from 'react';
import styles from './index.module.less';
import TreeItem from './TreeItem';
export default function CustomTree() {
  const [treeData, setTreeData] = useState([
    {
      name: '1',
      child: [
        { name: '2', child: [{ name: '1' }, { name: '2' }] },
        { name: '1', child: [{ name: '1' }, { name: '2' }] },
      ],
    },
  ]);
  const xRef = useRef();
  const yRef = useRef();
  // 拖拽移动
  function move(e) {
    const odiv = e.currentTarget; // 获取元素
    console.log(odiv);

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
  return (
    <div className={styles.tree}>
      <div className="tree-content" onMouseMove={move}>
        {/* <tree-item tree-data={treeData} tree-first="true" /> */}
        <TreeItem treeData={treeData} treeFirst="true"></TreeItem>
      </div>
    </div>
  );
}
