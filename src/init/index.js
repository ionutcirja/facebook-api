// @flow

type Options = {
  language: string,
  xfbmlEnabled: boolean,
  cookieEnabled: boolean,
  version: string,
};

const createFbRootEl = () => {
  const fbRoot: HTMLElement = document.createElement('div');
  fbRoot.id = 'fb-root';
  if (document.body) {
    document.body.appendChild(fbRoot);
  }
};

const loadFbSDK = (language: string) => {
  ((d, s, id) => {
    const element: HTMLElement = d.getElementsByTagName(s)[0];
    const fjs: HTMLElement = element;
    let js: HTMLElement = element;
    if (d.getElementById(id)) {
      return;
    }

    js = d.createElement(s);
    js.id = id;
    js.src = `//connect.facebook.net/${language}/all.js`;
    if (fjs.parentNode) {
      fjs.parentNode.insertBefore(js, fjs);
    }
  })(document, 'script', 'facebook-jssdk');
};

const addFbLoadCompleteListener = (key: string, options: Options, resolve: Function) => {
  window.fbAsyncInit = () => {
    window.FB.init({
      appId: key,
      xfbml: options.xfbmlEnabled,
      cookie: options.cookieEnabled,
      version: `v${options.version}`,
    });

    resolve();
  };
};

export default (key: string, options: Options): Promise<*> => (
  new Promise((resolve) => {
    createFbRootEl();
    addFbLoadCompleteListener(key, options, resolve);
    loadFbSDK(options.language);
  })
);
