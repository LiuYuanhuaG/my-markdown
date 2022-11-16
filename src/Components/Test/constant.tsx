import moment from 'moment';

export interface IDataType {
  key: string;
  section: {
    startTime: string;
    endTime: string;
  };
}

export interface IFormValuesType {
  key: string;
  section: {
    startTime: moment.MomentInput;
    endTime: moment.MomentInput;
  };
}

export interface IEditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  record: IDataType;
  formItemType: 'input' | 'rangePicker';
  index: number;
  children: React.ReactNode;
}

export interface IGetColumnsHandle {
  data: IDataType[];
  isEditing: (record: IDataType) => boolean;
  editingKey: string;
  handleSave: (key: React.Key) => void;
  handleEdit: (record: IFormValuesType & { key: React.Key }) => void;
  handleCancel: () => void;
  handleDelete: (key: React.Key) => void;
}

export const originData: IDataType[] = [];
for (let i = 0; i < 5; i++) {
  originData.push({
    key: i.toString(),
    section: {
      startTime: moment()
        .add(i, 'days')
        .format('YYYY-MM-DD'),
      endTime: moment()
        .add(i, 'days')
        .format('YYYY-MM-DD'),
    },
  });
}
