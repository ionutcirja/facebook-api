import share from '../index';

describe('Facebook api interface: share', () => {
  beforeEach(() => {
    window.FB = {
      ui: jest.fn(),
    };
  });

  it('should call fb ui method with the proper params', () => {
    const shareOptions = {
      url: 'http://localhost',
    };
    share(shareOptions);
    expect(window.FB.ui).toHaveBeenCalledWith({
      method: 'feed',
      link: shareOptions.url,
    });
  });
});
