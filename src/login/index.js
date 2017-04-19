export default scope => (
    new Promise((resolve, reject) => {
        window.FB.login((res) => {
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
