// @flow

type Response = {
  authResponse: {
    accessToken: string,
  },
};

export default (scope: string): Promise<*> => (
  new Promise((resolve, reject) => {
    window.FB.login((res: Response) => {
      const authRes = res.authResponse;
      if (!authRes || !authRes.accessToken) {
        reject();
        return;
      }

      resolve({
        token: authRes.accessToken,
      });
    }, { scope });
  })
);
