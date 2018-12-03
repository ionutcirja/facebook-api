import init from '../index';

describe('Facebook api interface: init', () => {
  let insertNode;
  let fbInit;
  let fbScriptEl;
  const scriptEl = {
    id: 'facebook-jssdk',
    src: '//connect.facebook.net/en/all.js',
  };
  const fbOptions = {
    language: 'en',
    cookieEnabled: true,
    xfbmlEnabled: false,
    version: '2',
  };

  beforeEach(() => {
    insertNode = jest.fn();
    fbInit = jest.fn();
    fbScriptEl = {
      parentNode: {
        insertBefore: insertNode,
      },
    };
    window.FB = {
      init: fbInit,
    };
    document.createElement = jest.fn().mockImplementation(() => ({}));
    document.getElementsByTagName = jest.fn().mockImplementation(() => [fbScriptEl]);
    document.getElementById = jest.fn();
    document.body.appendChild = jest.fn();
  });

  it('should create a fb root element, load fb sdk, add a listener for sdk loading complete and', () => {
    init('123', fbOptions);
    expect(document.createElement.mock.calls[0][0]).toEqual('div');
    expect(document.body.appendChild.mock.calls[0][0]).toEqual({ id: 'fb-root' });

    expect(document.getElementsByTagName).toHaveBeenCalledWith('script');
    expect(document.createElement.mock.calls[1][0]).toEqual('script');
    expect(insertNode).toHaveBeenCalledWith(scriptEl, fbScriptEl);

    expect(typeof window.fbAsyncInit).toEqual('function');
    window.fbAsyncInit();
    expect(window.FB.init).toHaveBeenCalledWith({
      appId: '123',
      xfbml: false,
      cookie: true,
      version: 'v2',
    });
  });

  it('should resolve a promise when fb loading is complete', () => {
    const promise = init('123', fbOptions);
    window.fbAsyncInit();
    return promise.then(() => {
      expect(true).toEqual(true);
    });
  });
});
