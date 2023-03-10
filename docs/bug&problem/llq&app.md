---
title: 浏览器调起应用
order: 2

group:
  title: 问题
  order: 0
---

## 浏览器调起应用

一般应用都会生成自己对应的注册表。

我们只需要找到注册表中对应名称 以 **名称+:** 的形式作为 url 就可调起相应应用

如：微信
![在这里插入图片描述](https://img-blog.csdnimg.cn/390e169de9fc44df9903d064e9d05e5c.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/f49fdace27e74cd698a7113390b7f741.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/7ceca0653d5643c0b0f32962af53b208.png)
但若应用并无注册表信息或找不到则可以自行添加注册表信息如下：

## 方案一

### 打开注册表

1.首先按住“Windows + R”键，弹出运行对话框，在运行对话框输入“regedit”进入注册表，点击“确定”。

2.打开你需要的数值，鼠标右键该数值，点击“修改”。

3.在“数值数据”填写好你需要的数值，点击“确定”即可，可以看到数值修改成功。

4.在需要的注册表目录中，鼠标右键此项，点击“新建——项”。

5.新建好一个数值项后，点击“重命名”。

6.一个新建数值目录项，就建立好了。

### 新建数值目录项

![在这里插入图片描述](https://img-blog.csdnimg.cn/115b8c7c72e1417582e73513f78d9733.png)

依次创建相应目录

- HKEY_CLASSES_ROOT\test
  这里的 test 文件夹名称就是调起时的名称 **test:** (如 weixin:)
  新增字符串字段字段名为 URL Protocol 值为空
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/ee914e0a753b459b82c30ace7d152e05.png#pic_center)
- HKEY_CLASSES_ROOT\test\DefaultIcon
  点击文件夹右侧出现默认字段，双击添加 C:\\Users\\Administrator\\Desktop\\test.exe %1 应用所在路径
  ![随便创建了一个exe文件用作测试](https://img-blog.csdnimg.cn/48e391e9b2b84e3493ba0529f1fc7f2f.png)
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/a14a9ceeae6e42b2ae47170a93ea0485.png)
- HKEY_CLASSES_ROOT\test\shell
- HKEY_CLASSES_ROOT\test\shell\open
- HKEY_CLASSES_ROOT\test\shell\open\command

  点击文件夹右侧出现默认字段，双击添加 C:\\Users\\Administrator\\Desktop\\test.exe %1 应用所在路径
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/1a336b13981044f683027bfb0fe26b1b.png)
  在浏览器地址栏中键入 test: 然后回车
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/237ef5a514214f508834c4d89663a101.png)
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/c511d39a02e4485ab1d5e6aa259fddaa.png)

若不生效 可重启电脑可生效

## 方案二

1. 使用记事本（或其他文本编辑器）创建一个 protocal.reg 文件，并写入以下内容
   这里使用的是微信地址具体应用替换相应路径即可

   ```c
   Windows Registry Editor Version 5.00
   [HKEY_CLASSES_ROOT\Webshell]
   @="URL:Webshell Protocol Handler"
   "URL Protocol"=""
   [HKEY_CLASSES_ROOT\Webshell\DefaultIcon]
   @="C:\\Program Files (x86)\\Tencent\\WeChat\\WeChat.exe"
   [HKEY_CLASSES_ROOT\Webshell\shell]
   [HKEY_CLASSES_ROOT\Webshell\shell\open]
   [HKEY_CLASSES_ROOT\Webshell\shell\open\command]
   @="\"C:\\Program Files (x86)\\Tencent\\WeChat\\WeChat.exe\" \"%1\""
   ```

   PS:

   - 第一行一定要顶格
   - 路径一定要**双斜杠** \\\ 如上 也可为 `@="C:\\Program Files (x86)\\Tencent\\WeChat\\WeChat.exe %1"`
   - **Webshell**即为文件夹名称 也是 url 地址名称 **Webshell:**
   - @="xxx" xxx 为应用具体路径
   - "URL Protocol"="" 重要一定不要忘记

2. 双击执行该文件 protocal.reg 提示添加成功即成，报错查看写法是否出问题
3. win + R 键入 regedit 可前往找到具体目录查看
4. 在浏览器地址栏输入 Webshell: 或 window.location.href = 'Webshell:' 等即可打开相应应用
