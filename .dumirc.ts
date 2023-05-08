import { defineConfig } from 'dumi';
import path from 'path';
const repo = 'my-markdown';
const scriptPath =
  process.env.NODE_ENV == 'development' ? `/${repo}` : `/${repo}`;
const publicPath =
  process.env.NODE_ENV == 'development' ? `/${repo}/` : `/${repo}/`;
const basePath =
  process.env.NODE_ENV == 'development' ? `/${repo}/` : `/${repo}/`;

export default defineConfig({
  outputPath: 'docs-dist',

  themeConfig: {
    name: '知识海洋里的淡水鱼',
    logo: 'https://avatars.githubusercontent.com/u/81506881?s=48&v=4',
    navs: [
      null,
      {
        title: 'GitHub',
        path: 'https://github.com/LiuYuanhuaG/my-markdown',
      },
    ],
  },

  favicons: ['https://avatars.githubusercontent.com/u/81506881?s=48&v=4'],
  resolve: {
    docDirs: ['docs'], // 2.0 默认值
    atomDirs: [
      { type: '@', dir: '/public' },
      { type: 'component', dir: 'src/Components' },
    ],
  },
  hash: true,
  // dynamicImport: {
  //   loading: '@/Loading',
  // },

  // Because of using GitHub Pages
  base: basePath,
  publicPath: publicPath,
  // runtimePublicPath: {},
  alias: {
    src: path.resolve(__dirname, '.', './src/'),
    public: path.resolve(__dirname, '.', './public/'),
    Components: path.resolve(__dirname, '.', 'src/Components/'),
    MyComponents: path.resolve(__dirname, '.', 'src/MyComponents/'),
    style: path.resolve(__dirname, '.', 'src/style/'),
  },

  headScripts: [
    { src: 'https://cdn.bootcdn.net/ajax/libs/three.js/0.144.0/three.js' },
    { src: 'https://cdn.bootcdn.net/ajax/libs/jquery/3.6.1/jquery.js' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/less.js/3.8.1/less.min.js' },
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
      src: `${scriptPath}/js/show.js`,
    },
    // { content: 'import "./show.js"', charset: 'utf-8' },
  ],
  links: [
    {
      rel: 'stylesheet/less',
      type: 'text/css',
      href: `/${repo}/css/global.less`,
    },
    // { rel: 'stylesheet', type: 'text/css', href: `/${repo}/css/global.less` },
  ],
  styles: [
    `.snow-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.02);
    pointer-events: none;
    z-index: 100;
  }`,
  ],
  locales: [
    { id: 'zh-CN', name: '中文' },
    { id: 'en-US', name: 'English' },
  ],
});
