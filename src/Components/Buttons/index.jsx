import React, { Fragment } from 'react';
import './index.css';
import styles from './index.module.less';
function Buttons({ children }) {
  return (
    <Fragment>
      <div style={{ padding: '100px' }}>
        <span className={`${styles['button-root']} button-root`}>
          <a href="#" className="button button_bird">
            <div className="button_wrapper">
              <span className="button_text">{children ?? '吃席'}</span>
            </div>

            <div className="birdBox">
              <div className="bird wakeup">
                <div className="bird_face"></div>
              </div>
              <div className="bird wakeup">
                <div className="bird_face"></div>
              </div>
              <div className="bird">
                <div className="bird_face"></div>
              </div>
            </div>
          </a>
        </span>
      </div>
    </Fragment>
  );
}

export default Buttons;
