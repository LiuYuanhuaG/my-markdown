import { Alert } from 'antd';
import React, { Children } from 'react';
import { AlertProps } from 'antd';

const AlertComponent = (props: AlertProps) => {
  return <Alert showIcon {...props} />;
};

export default AlertComponent;
