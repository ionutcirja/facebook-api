// @flow

type Options = {
  href?: string,
  link?: string,
};

export default (method: string, options: Options) => (
  window.FB.ui({
    method,
    ...options,
  })
);
