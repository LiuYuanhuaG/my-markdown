import { Button, Form, Input, Select, Table } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import Updata from './demo';

const App = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<[]>([]);
  const [key, setKey] = useState(0);

  const [editingKey, setEditingKey] = useState('');

  useEffect(() => {}, []);
  const onFinish = val => {
    console.log(val);
  };

  return (
    <Form
      name="complex-form"
      form={form}
      onFinish={onFinish}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
    >
      <Form.Item label="Username">
        <Form.Item
          name="username"
          noStyle
          rules={[
            {
              required: true,
              message: 'Username is required',
            },
          ]}
        >
          <Input
            style={{
              width: 160,
            }}
            placeholder="Please input"
          />
        </Form.Item>
      </Form.Item>

      <Form.Item
        label="BirthDate"
        style={{
          marginBottom: 0,
        }}
      >
        <Updata
          name="cs"
          form={form}
          rules={[
            {
              required: true,
              message: 'Username is required',
            },
          ]}
        ></Updata>
      </Form.Item>
      <Form.Item label=" " colon={false}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;
