// @flow

type Options = {
  url: string,
};

export default (options: Options) => (
  window.FB.ui({
    method: 'feed',
    link: options.url,
  })
);
