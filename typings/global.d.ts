declare module '*.css';
declare module '.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module '*.xlsx';
declare module '*.less';
declare module 'howtools';
declare module '*.css';
declare module '*.png';

declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

export interface IGlobalModelState {
  theme: 'dark' | 'light';
  collapsed: boolean;
  showTagNav: boolean;
  showNotice: boolean;
  showFul1Screen: boolean;
  siderMenuState: '1' | '2';
}
