#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 删除旧的文件
rm -rf docs-dist

# 生成新的压缩文件
npm run docs:build

# 进入生成的文件夹
cd docs-dist

# 复制一个 index.html并命名为 404.html 解决 historyAPI 404问题
cp index.html 404.html

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploys'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/LiuYuanhuaG/my-markdown.git master:gh-pages
cd -
