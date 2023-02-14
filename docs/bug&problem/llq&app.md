---
title: 浏览器调起应用
order: 2

group:
  title: 问题
  order: 0
---

## 浏览器调起应用

## 方案一

### 打开注册表

1.首先按住“Windows + R”键，弹出运行对话框，在运行对话框输入“regedit”进入注册表，点击“确定”。

2.打开你需要的数值，鼠标右键该数值，点击“修改”。

3.在“数值数据”填写好你需要的数值，点击“确定”即可，可以看到数值修改成功。

4.在需要的注册表目录中，鼠标右键此项，点击“新建——项”。

5.新建好一个数值项后，点击“重命名”。

6.一个新建数值目录项，就建立好了。

### 新建数值目录项

![](/img/llq-1.jpg)

依次创建相应目录

- HKEY_CLASSES_ROOT\test

  点击文件夹右侧出现默认字段，双击添加 URL:xxx (这里就是 llq 调起的接口如 weixin:)

- HKEY_CLASSES_ROOT\test\DefaultIcon

  点击文件夹右侧出现默认字段，双击添加 C:\\Users\\Administrator\\Desktop\\test.exe %1 应用所在路径

- HKEY_CLASSES_ROOT\test_gw\shell

- HKEY_CLASSES_ROOT\test_gw\shell\open

- HKEY_CLASSES_ROOT\test_gw\shell\open\command

  点击文件夹右侧出现默认字段，双击添加 C:\\Users\\Administrator\\Desktop\\test.exe %1 应用所在路径

若不生效 可重启电脑可生效

## 方案二

1. 使用记事本（或其他文本编辑器）创建一个 protocal.reg 文件，并写入以下内容

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

   ​ 1.第一行一定要顶格

   ​ 2.路径一定要**双斜杠** \\\ 如上 也可为 @="C:\\Program Files (x86)\\Tencent\\WeChat\\WeChat.exe %1"

   ​ 3.**Webshell**即为文件夹名称

   ​ 4.@="xxx" xxx 为应用具体路径

   ​ 5.@="URL:Webshell" Webshell:

2. 双击执行该文件 protocal.reg 提示添加成功即成，报错查看写法是否出问题

3. win + R 键入 regedit 可前往找到具体目录查看

4. 在浏览器地址栏输入 Webshell: 或 window.location.href = 'Webshell:' 等即可打开相应应用
