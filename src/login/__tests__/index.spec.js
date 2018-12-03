import login from '../index';

describe('Facebook api interface: login', () => {
  it('should reject a promise if the response does not contain a authResponse property', () => {
    window.FB = {
      login: jest.fn(callback => callback({})),
    };

    return login('permission').then().catch(() => {
      expect(true).toEqual(true);
    });
  });

  it('should resolve a promise if the response contains a authResponse property', () => {
    window.FB = {
      login: jest.fn(callback => callback({ authResponse: { accessToken: '123' } })),
    };

    return login('permission').then((data) => {
      expect(data).toEqual({ token: '123' });
    });
  });
});
