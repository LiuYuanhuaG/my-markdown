---
order: 2
nav:
  title: Article
  path: /article
---

## git 命令及 git-commit 规范

### init / query

| 基本命令            | 描述                 |
| ------------------- | -------------------- |
| git clone           |                      |
| git log             | q 退出日志           |
| git init            |                      |
| git status -s       |                      |
| git reflog          | 查看所有的日志       |
| git diff <filePath> | 查看修改后的内容差异 |
|                     |                      |

### Add

| 新增命令                  | 描述               |
| ------------------------- | ------------------ |
| git add .                 | 工作区 => 暂存区   |
| git commit -m '<summary>' | 暂存区 => 本地仓库 |
| git commit -a             | 工作区 => 本地仓库 |

### Remove cancel version

| 删除命令                    | 描述                                |
| --------------------------- | ----------------------------------- |
| git checkout <filePath>     | 撤销工作区修改                      |
| git reset HEAD --hard       | 撤销 git add 命令                   |
| git reset --hard 'CommitID' | 版本跳转到指定提交版本的 git 仓库   |
| rm -rf .git                 | 只移除本地仓库 不移除文件           |
| git rm -f <fileName>        | 移除文件 => 本地仓库 && 工作区      |
| git rm --cached <fileName>  | 移除文件 => 本地仓库 [不移除工作区] |
|                             |                                     |

### branch

| branch                                                                   | 描述                                           |
| ------------------------------------------------------------------------ | ---------------------------------------------- |
| git branch                                                               | 查看分支列表                                   |
| git branch <branchName>                                                  | 创建新的分支                                   |
| git checkout <branchName>                                                | 切换分支                                       |
| git checkout -b <branchName>                                             | 创建新分支 立即切换到新分支上                  |
| git branch -d <branchName>                                               | 删除分支                                       |
| git push origin --delete <branchName>                                    | 删除远程仓库分支                               |
| git merge <branch>                                                       | [需要先切换到当前分支]将指定分支合并到当前分支 |
| git remote show <remoteRepositoryName> git branch -r                     | 查看远程仓库分支信息                           |
| git checkout <remoteBranchName>                                          | 下载远程分支                                   |
| git checkout -b <localBranchName> <remoteReposityoryName>/<remoteBranch> | 跟踪分支 => 将远程分支下载到本地仓库 并重命名  |
| git push <remoteRepositoryName> --delete <remoteBranchName>              | 删除远程仓库的指定分支                         |
| git push -u origin 'BranchName'                                          | 将分支推送到远程仓库                           |

### push pull

| 提交命令                      | 描述                     |
| ----------------------------- | ------------------------ |
| git push                      |                          |
| git pull                      |                          |
| git remote add                | 添加远端仓库             |
| git push -u origin main -f    | 强制 push 本地仓库到远程 |
| git pull --rebase origin main | 冲突合并                 |
|                               |                          |

### Other command

| 命令            | 描述             |
| --------------- | ---------------- |
| git help <verb> | 查看帮助         |
| git <verb> -h   | 查看某个命令参考 |

### tag

```js
# add
git tag -a v1.0 -m "my version 1.0"
# 删除
git push origin :refs/tags/[tagName]
```

### git cherry-pick

```js
#
切换到main分支 如果想要别的分支的某次提交记录
git cherry-pick 提交记录的hash
如果有冲突自己merge or rebase
```

### stash

```js
git stash 隐藏修改内容
git stash apply 恢复修改的内容(弹出合并的框)
- git pop (修改恢复的内容 并删除本地的隐藏记录)
git reset --merge 清除上次 git stash apply
// 只要 stash 记录没删 就能一直重复操作
// 这个操作唯一前提是 你没有 commit
// 请在 commit 之前先隐藏存储代码
```

```js
git checkout -- *
git merge --abort     回到冲突之前的状态
git reset --merge     清除合并


git stash save 'xxx'
git stash list
git stash show
git stash show stash@{0} -p
git stash apply stash@{0}      应用,不会删除
git stash pop stash@{0}       恢复并删除
git stash drop stash@{0}       删除
git stash clear                删除所有
```

### git merge

```js
一般使用 --squash

# fast-forward
// 不可选 有记录 销毁分支后无记录
git merge 分支

# --no-ff
// 不可选 有记录 直接销毁分支
git merge 分支 --no-ff

# --no-ff --no-commit
// 可选 无记录 无分支
git merge 分支 --no-ff --no-commit

# --squash
// 可选 分支还在
git merge origin/feature/xc-11-05 --squash

```

### rebase

```js
1.master分支
git pull --rebase
2.切换到自己的分支
git rebase master // 拉取最新的代码并处理冲突
合并冲突
git merge xxx -- squash
# 修改信息
// 修改上一次的
git commit --amend
// 修改其他的 先切换到对应的HEAD
git rebase -i HEAD~3
vim编辑 只更改最前面的状态 pick 为reword 保存
在这里修改文案 然后保存就可以了

#
pick：保留该commit（缩写:p）
reword：保留该commit，但我需要修改该commit的注释（缩写:r）
edit：保留该commit, 但我要停下来修改该提交(不仅仅修改注释)（缩写:e）
squash：将该commit和前一个commit合并（缩写:s）
fixup：将该commit和前一个commit合并，但我不要保留该提交的注释信息（缩写:f）
exec：执行shell命令（缩写:x）
drop：我要丢弃该commit（缩写:d）
```

### 查看提交行数

使用 git bush here 打开相应项目 执行以下代码

```
git log --format='%aN' | sort -u | while read name; do echo -en "$name\t"; git log --author="$name" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -; done
```



## 2. commit 规范

## Augular 规范

- `Header` 是必需的，`Body` 和 `Footer` 可以省略。

```js
<type>(<scope>): <subject> #header
// 空一行
<body>
// 空一行
<footer>
```

## 格式讲解

### Header

- `Header`部分只有一行，包括三个字段：`type`（必需）、`scope`（可选）和`subject`（必需）。

### type

用于说明本次`commit`的类别，只允许使用下面`7`个标识

- `feat`：新功能（`feature`）
- `fix`：修补`bug`
- `docs`：文档（`documentation`）
- `style`： 格式（不影响代码运行的变动）
- `refactor`：重构（即不是新增功能，也不是修改`bug`的代码变动）
- `test`：增加测试
- `chore`：构建过程或辅助工具的变动

```
如果type为feat和fix，则该 commit 将肯定出现在 Change log 之中。
其他情况（docs、chore、style、refactor、test）由你决定，要不要放入 Change log，建议是不要。
```

### scope

- 用于说明 `commit` 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同

### subject

- 是 `commit` 目的的简短描述，不超过`50`个字符。

### Body

- 有两个注意点：
  - 使用第一人称现在时，比如使用`change`而不是`changed`或`changes`。
  - 应该说明代码变动的动机，以及与以前行为的对比。
- 用于对本次 `commit` 的详细描述，可以分成多行。下面是一个范例。

```js
More detailed explanatory text, if necessary.  Wrap it to
about 72 characters or so.

Further paragraphs come after blank lines.

- Bullet points are okay, too
- Use a hanging indent
```

### Footer

- `Footer` 部分只用于两种情况。

#### 不兼容变动

- 如果当前代码与上一个版本不兼容
- 则 `Footer` 部分以`BREAKING CHANGE`开头，后面是对变动的描述、以及变动理由和迁移方法。

```js
BREAKING CHANGE: isolate scope bindings definition has changed.

To migrate the code follow the example below:

Before:

scope: {
  myAttr: 'attribute',
}

After:

scope: {
  myAttr: '@',
}

The removed `inject` wasn't generaly useful for directives so there should be no code using it.
```

#### 关闭 Issue

- 如果当前 `commit` 针对某个`issue`，那么可以在 `Footer` 部分关闭这个 `issue` 。

```
Closes #234
Closes #123, #245, #992
```

### Revert（可忽视）

- 还有一种特殊情况，如果当前 `commit` 用于撤销以前的 `commit`，则必须以`revert:`开头，后面跟着被撤销 `Commit` 的 `Header`。

```js
revert: feat(pencil): add 'graphiteWidth' option

This reverts commit 667ecc1654a317a13331b17617d973392f415f02.
```

```
Body部分的格式是固定的，必须写成This reverts commit <hash>.，
其中的hash是被撤销 commit 的 SHA 标识符。

如果当前 commit 与被撤销的 commit，在同一个发布（release）里面，
那么它们都不会出现在 Change log 里面。如果两者在不同的发布，
那么当前 commit，会出现在 Change log 的Reverts小标题下面。
```

### 提交频率

- 关于什么时候提交一次：
- 每次你写完一个功能的时候，就应该做一次提交（这个提交是提交到本地的 git 库中）

### 参考链接

- https://www.jianshu.com/p/c7e40dab5b05
- https://jiongks.name/blog/git-commit/
- https://www.npmjs.com/package/commitizen
