import {NEWS_SOURCE_IMGS} from '~/img/ImageResolver';

export const NEWS_SOURCE_SPINNER = (source) => {
  switch (source) {
    case 'https://techneedle.com':
      return '테크니들';
    case 'https://www.itworld.co.kr':
      return 'IT월드';
    case 'https://woowabros.github.io':
      return '우아한 형제들 기술블로그';
    case 'https://tech.kakao.com/blog/':
      return '카카오 기술블로그';
    case 'http://www.inews24.com/':
      return 'inews24';
    case 'https://velog.io/':
      return 'velog';
    default:
      return '알수없음';
  }
};

export const NEWS_DEFAULT_IMAGE = (source) => {
  switch (source) {
    case 'https://techneedle.com':
      return NEWS_SOURCE_IMGS.IMG_TECHNEDDLE;
    case 'https://www.itworld.co.kr':
      return NEWS_SOURCE_IMGS.IMG_ITWORLD;
    case 'https://woowabros.github.io':
      return NEWS_SOURCE_IMGS.IMG_WOOWABROS;
    case 'https://tech.kakao.com/blog/':
      return NEWS_SOURCE_IMGS.IMG_KAKAO;
    case 'http://www.inews24.com/':
      return NEWS_SOURCE_IMGS.IMG_INEWS24;
    case 'https://velog.io/':
      return NEWS_SOURCE_IMGS.IMG_VELOG;
    default:
      return {
        uri:
          'https://images.unsplash.com/photo-1599508704512-2f19efd1e35f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80',
      };
  }
};