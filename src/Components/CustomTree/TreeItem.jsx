import React from 'react';
import styless from './TreeItem.module.less';
export default function TreeItem({ treeData, treeFirst }) {
  function delChild() {
    this.treeData.splice(index, 1);
  }
  function addChild() {
    if (this.treeData[index].child) {
      this.treeData[index].child.push({ name: '1' });
    } else {
      this.$set(this.treeData[index], 'child', [{ name: '1' }]);
    }
  }
  console.log(treeData, 'treeData');
  return (
    <div className={styless.card}>
      <ul>
        {treeData.map((item, index) => {
          return (
            <li key={index}>
              <div
                className={`item ${index !== 0 ? 'line-left' : ''} ${
                  index != treeData.length - 1 ? 'line-right' : ''
                }`}
              >
                <div
                  className={`item-name ${
                    item.child && item.child.length > 0 ? 'line-bottom' : ''
                  } ${!treeFirst ? 'line-top' : ''}`}
                >
                  {!treeFirst && (
                    <div className="reduce" onClick={delChild(index)}>
                      -
                    </div>
                  )}
                  <div>{item.name}</div>
                  <div className="plus" onClick={addChild(index)}>
                    +
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
