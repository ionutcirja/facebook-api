# Facebook api

This is a simple utility to connect to facebook sdk.

It is work in progress and it contains just three methods, for now (the most usual I'm using in my projects): init, login and share.

Any pull request is more than welcome.

# Installing facebook-api

```
npm install facebook-api
```

# Usage

```js
import facebook from 'facebook-api';
```

## Methods

### init

Takes facebook application id and facebook options as parameters.

Returns a promise.

```js
const FACEBOOK_APP_ID = 'you facebook application id';
export const FACEBOOK_OPTIONS = {
    language: 'en_US',
    version: '2.8',
    cookieEnabled: false,
    xfbmlEnabled: false,
};

facebook.init(FACEBOOK_APP_ID, FACEBOOK_OPTIONS).then(() => {
    // try to login, maybe
}));
```

### login

Takes facebook scope as a parameter.

Returns a promise. When the promise is resolved, you can access the facebook token (if you need something else, raise a pull request).

```js
export const FACEBOOK_SCOPE = 'public_profile,email';

facebook.login(FACEBOOK_SCOPE)
        .then(
            (data) => {
                console.log(data.token);
            },
            (error) => {
                // show an error, maybe
            }
        );
```

### share

Takes as a parameter an object containing the url, image, title and info you want to share.

```js
facebook.share({
    url: 'http://host/pathname',
    image: 'http://host/image.jpg',
    title: 'Some title',
    info: 'Some info',
});
```