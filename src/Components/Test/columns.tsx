import { Button, DatePicker, Form, Input, Popconfirm } from 'antd';
import moment from 'moment';
import React, { Fragment } from 'react';
import { IDataType, IEditableCellProps, IGetColumnsHandle } from './constant';
const { RangePicker } = DatePicker;

const _getInputNode = (formItemType: IEditableCellProps['formItemType']) => {
  let node = null;
  switch (formItemType) {
    case 'rangePicker':
      node = <RangePicker format="YYYY-MM-DD" />;
      break;
    default:
      node = <Input />;
      break;
  }
  return node;
};

export const getColumns = ({
  data,
  isEditing,
  editingKey,
  handleSave,
  handleEdit,
  handleCancel,
  handleDelete,
}: IGetColumnsHandle) => {
  return [
    {
      title: 'section',
      dataIndex: 'section',
      editable: true,
      render: (text: IDataType['section']) => {
        return (
          moment(text.startTime).format('YYYY-MM-DD') +
          ' ~ ' +
          moment(text.endTime).format('YYYY-MM-DD')
        );
      },
      shouldCellUpdate: () => true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: IDataType) => {
        const editable = isEditing(record);

        const editButton = (
          <Fragment>
            <Button
              type="link"
              onClick={() => handleSave(record.key)}
              style={{ marginRight: 8 }}
            >
              保存
            </Button>
            <Popconfirm title="Sure to handleCancel?" onConfirm={handleCancel}>
              <a>取消</a>
            </Popconfirm>
          </Fragment>
        );

        const ViewButton = (
          <Fragment>
            <Button
              disabled={editingKey !== ''}
              onClick={() => handleEdit(record)}
              type="link"
            >
              编辑
            </Button>
            {data.length >= 1 ? (
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => handleDelete(record.key)}
              >
                <a>删除</a>
              </Popconfirm>
            ) : null}
          </Fragment>
        );

        const OperationButton = editable ? editButton : ViewButton;

        return OperationButton;
      },
    },
  ];
};

export const EditableCell: React.FC<IEditableCellProps> = ({
  editing,
  dataIndex,
  title,
  record,
  index,
  children,
  formItemType,
  ...restProps
}) => {
  const node = _getInputNode(formItemType);
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[{ required: true, message: '必填项' }]}
        >
          {node}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
