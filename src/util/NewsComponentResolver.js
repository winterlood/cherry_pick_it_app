export const NEWS_SOURCE_SPINNER = (source) => {
  switch (source) {
    case 'https://techneedle.com':
      return '테크니들';
    case 'https://www.itworld.co.kr':
      return 'ITWorld Korea';
    case 'https://woowabros.github.io':
      return '우아한형제들 기술블로그';
    case 'https://tech.kakao.com/blog/':
      return '카카오 기술블로그';
    case 'http://www.inews24.com/':
      return '아이뉴스24';
    case 'https://velog.io/':
      return 'Velog';
    case 'https://it.donga.com':
      return 'IT동아';
    case 'https://http://www.itnews.or.kr/':
      return 'ITNEWS';
    default:
      return source;
  }
};
