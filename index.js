const createFbRootEl = () => {
    const fbRoot = document.createElement('div');
    fbRoot.id = 'fb-root';
    document.body.appendChild(fbRoot);
};

const loadFbSDK = (language) => {
    ((d, s, id) => {
        const element = d.getElementsByTagName(s)[0];
        const fjs = element;
        let js = element;
        if (d.getElementById(id)) {
            return;
        }

        js = d.createElement(s);
        js.id = id;
        js.src = `//connect.facebook.net/${language}/all.js`;
        fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
};

const addFbLoadCompleteListener = (key, options, promiseResolve) => {
    window.fbAsyncInit = () => {
        window.FB.init({
            appId: key,
            xfbml: options.xfbmlEnabled,
            cookie: options.cookieEnabled,
            version: `v${options.version}`,
        });

        promiseResolve();
    };
};

export const init = (key, options) => {
    return new Promise((resolve) => {
        createFbRootEl();
        addFbLoadCompleteListener(key, options, resolve);
        loadFbSDK(options.language);
    });
};

export const login = scope => (
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

export function share(options) {
    window.FB.ui({
        method: 'feed',
        link: options.url,
        picture: options.image,
        name: options.title,
        description: options.info,
    });
}
