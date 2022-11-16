import { defineConfig } from 'dumi';
const path = require('path');
const repo = 'my-markdown';

export default defineConfig({
  title: '知识海洋里的淡水鱼',
  favicon: 'https://avatars.githubusercontent.com/u/81506881?s=48&v=4',
  logo: 'https://avatars.githubusercontent.com/u/81506881?s=48&v=4',
  outputPath: 'docs-dist',
  mode: 'site', // 切换文档模式 当前为站点 还可切换为 doc模式
  hash: true,
  dynamicImport: {
    loading: '@/Loading',
  },

  // Because of using GitHub Pages
  base: `/${repo}/`,
  publicPath: `/${repo}/`,
  alias: {
    src: path.resolve(__dirname, '.', './src/'),
    public: path.resolve(__dirname, '.', './public/'),
    Components: path.resolve(__dirname, '.', 'src/Components/'),
    MyComponents: path.resolve(__dirname, '.', 'src/MyComponents/'),
    style: path.resolve(__dirname, '.', 'src/style/'),
  },
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/LiuYuanhuaG/my-markdown',
    },
  ],
  headScripts: [
    { src: 'https://cdn.bootcdn.net/ajax/libs/three.js/0.144.0/three.js' },
    { src: 'https://cdn.bootcdn.net/ajax/libs/jquery/3.6.1/jquery.js' },
  ],

  scripts: [
    {
      content: `(function(){
                  let divs = document.createElement('div');
                  divs.className = 'snow-container';
                  document.querySelector('body')?.appendChild(divs);
                })()`,
      charset: 'utf-8',
    },
    {
      src: `${process.env.NODE_ENV == 'development' ? '' : `/${repo}`}/show.js`,
    },
    // { content: 'import "./show.js"', charset: 'utf-8' },
  ],
  links: [
    { rel: 'stylesheet', type: 'text/css', href: `/${repo}/css/global.less` },
    // { rel: 'stylesheet', type: 'text/css', href: `/${repo}/css/global.less` },
  ],
  styles: [
    `.snow-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.02);
    pointer-events: none;
    z-index: 100;
  }`,
  ],
  // more config: https://d.umijs.org/config
});
