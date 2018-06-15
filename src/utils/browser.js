export const passiveSupported = (() => {
  // 浏览器是否支持 passive
  let passiveSupported = false;

  try {
    const opt = Object.defineProperty({}, 'passive', {
      get: () => {
        passiveSupported = true;
      },
    });

    window.addEventListener('test', null, opt);
    window.removeEventListener('test', null, opt);
  } catch (error) {
    passiveSupported = false;
  }

  return passiveSupported;
})();