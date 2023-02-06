import { Form } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import _ from 'lodash';
import React, { useRef, useState } from 'react';
import classs from './demo.less';
import FileListItem from './FileListItem';
interface Props {
  form: FormInstance<any>;
  name: string;
  rules?: { required: boolean; message: string }[];
  ItemOp?: any;
}

const Updata = ({ form, name, ...ItemOp }: Props) => {
  const [yxFileList, setYXFileList] = useState<File[]>([]);
  const fileRef = useRef(null);
  const fileChange = ({ target }) => {
    let { files } = target;
    console.log(target);
    let FileList = _.cloneDeep([
      ...yxFileList,
      ...Array.from(files ?? [])?.map((item) => item.originFileObj ?? item),
    ]);
    setYXFileList(FileList); // 储存值
    form.setFieldsValue({ [name]: FileList }); // 设置表单值
  };

  const handleClickFile = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    fileRef.current && fileRef.current?.click();
  };

  return (
    <Form.Item name={name} {...ItemOp}>
      {/* 储存值 */}
      <input style={{ display: 'none' }} />
      {/* 真正文件上传 */}
      <input
        type="file"
        ref={fileRef}
        multiple
        onChange={fileChange}
        style={{ display: 'none' }}
      ></input>

      <span className={classs.up_box}>
        <FileListItem fileList={yxFileList}></FileListItem>
        <div
          style={{ backgroundColor: 'red', width: '30px' }}
          onClick={handleClickFile}
        >
          1
        </div>
      </span>
    </Form.Item>
  );
};

export default Updata;
