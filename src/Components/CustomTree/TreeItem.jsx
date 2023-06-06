import React, { useEffect, useState } from 'react';
import styless from './TreeItem.module.less';
export default function TreeItem({
  treeData,
  treeFirst,
  // source,
  addChildNode,
  delChildNode,
}) {
  const [treeD, setTreeD] = useState([]);
  // 这里都是非必须的
  function _delChild(item, index, source) {
    // treeData.splice(index, 1);

    setTreeD((_) => {
      return _.filter((node) => {
        return node.key !== item.key;
      });
    });
  }
  // 这里都是非必须的
  function _addChild(item, index) {
    if (!treeFirst) {
    } else {
      setTreeD((_) => {
        let nodes = _.map((node) => {
          if (node.key === item.key) {
            if (node.child instanceof Array) {
              let cNode = node.child[node.child.length];

              let lastNode = cNode
                ? {
                    key: Math.random() * 1000000,
                    name: `${cNode.name} ${node.child.length + 1}`,
                    child: [],
                  }
                : {
                    key: Math.random() * 1000000,
                    name: `${node.child.length + 1}`,
                    child: [],
                  };
              node.child.push(lastNode);
            } else {
              node.child = [
                {
                  key: Math.random() * 1000000,
                  name: `${index + 1}`,
                  child: {},
                },
              ];
            }
          }
          return node;
        });

        return nodes;
      });
    }
  }
  const delChildNodes = delChildNode ? delChildNode : _delChild;
  const addChildNodes = addChildNode ? addChildNode : _addChild;
  // function setChild() {}
  useEffect(() => {
    setTreeD(treeData);
  }, [treeData]);

  return (
    <div className={styless.card}>
      <ul>
        {treeD.map((item, index) => {
          return (
            <li key={item.key}>
              <div
                className={`item ${index !== 0 ? 'line-left' : ''} ${
                  index !== treeD.length - 1 ? 'line-right' : ''
                }`}
              >
                <div
                  className={`item-name ${
                    item.child && item.child.length > 0 ? 'line-bottom' : ''
                  } ${!treeFirst ? 'line-top' : ''}`}
                >
                  {!treeFirst && (
                    <div
                      className="reduce"
                      onClick={() => {
                        // delChild(item, index, treeD);
                        delChildNodes(item, index);
                      }}
                    >
                      -
                    </div>
                  )}
                  <div>{item.name}</div>
                  <div
                    className="plus"
                    onClick={() => {
                      // addChild(item, index, treeD);
                      addChildNodes(item, index);
                    }}
                  >
                    +
                  </div>
                </div>
              </div>
              {item.child && item.child.length > 0 && (
                <TreeItem
                  treeData={item.child}
                  addChildNode={addChildNode}
                  delChildNode={delChildNode}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
