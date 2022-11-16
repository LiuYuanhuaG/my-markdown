import { Form, Table } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { EditableCell, getColumns } from './columns';
import { IDataType, IFormValuesType, originData } from './constant';

const App: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<IDataType[]>([]);
  const [key, setKey] = useState(0);
  const [editingKey, setEditingKey] = useState('');

  useEffect(() => {
    setData(originData);
    setKey(originData.length + 1);
  }, []);

  const isEditing = (record: IDataType) => record.key === editingKey;
  const handleSave = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as IDataType;
      const _row = _.cloneDeep(row);
      console.log(_row, '_row');

      const newData = [...data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        // const item = newData[index];
        // newData.splice(index, 1, {
        //   key: item.key,
        //   section: {
        //     startTime: moment(row.section.startTime).format('YYYY-MM-DD'),
        //     endTime: moment(row.section.endTime).format('YYYY-MM-DD'),
        //   }
        // });

        console.log(await form.validateFields());
        newData[index].section = {
          startTime: moment(row.section.startTime).format('YYYY-MM-DD'),
          endTime: moment(row.section.startTime).format('YYYY-MM-DD'),
        };

        console.log(
          moment(_row.section.startTime).format('YYYY-MM-DD'),
          moment(_row.section.startTime).format('YYYY-MM-DD'),
          moment(undefined).format('YYYY-MM-DD'),
        );

        setData([...newData]);
        setEditingKey('');
      } else {
        newData.push(row);
        setData([...newData]);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const handleCancel = () => setEditingKey('');
  const handleDelete = (key: React.Key) => {
    const newData = data.filter((item: IDataType) => item.key !== key);
    setData(newData);
  };

  const handleGetFormItemType = (dataIndex: string) => {
    let str = '';
    switch (dataIndex) {
      case 'section':
        str = 'rangePicker';
        break;
      default:
        str = 'input';
        break;
    }
    return str;
  };

  const handleAdd = () => {
    const newData: IDataType = {
      key: key + '',
      section: {
        startTime: moment()
          .add(1, 'days')
          .format('YYYY-MM-DD'),
        endTime: moment()
          .add(1, 'days')
          .format('YYYY-MM-DD'),
      },
    };
    setData([...data, newData]);
    setKey(key + 1);
  };

  const handleEdit = (record: IFormValuesType & { key: React.Key }) => {
    console.log(record, form.getFieldsValue());
    // form.setFieldsValue({
    //   ...record,
    //   section: {
    //     startTime: moment(),
    //     endTime: moment()
    //   },
    // });
    setEditingKey(record.key);
  };

  const handleGetColumns = () => {
    return getColumns({
      data,
      isEditing,
      editingKey,
      handleSave,
      handleEdit,
      handleCancel,
      handleDelete,
    }).map(col => {
      if (!col.editable) return col;
      return {
        ...col,
        onCell: (record: IDataType) => ({
          record,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
          formItemType: handleGetFormItemType(col.dataIndex),
        }),
      };
    });
  };

  return (
    <Form form={form} component={false}>
      <button onClick={() => handleAdd()}>handleAdd</button>
      <Table
        components={{ body: { cell: EditableCell } }}
        bordered
        dataSource={data}
        columns={handleGetColumns()}
        rowClassName="editable-row"
        pagination={{ onChange: handleCancel }}
      />
      <button
        onClick={() => {
          form.validateFields();
          console.log(data);
        }}
      >
        getData
      </button>
    </Form>
  );
};

export default App;
