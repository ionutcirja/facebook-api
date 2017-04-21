# Facebook api

This is a simple utility to connect to facebook sdk.
It is a work in progress and it contains just three methods for now (the most usual I'm using in my projects): init, login and share.
Any pull request is more than welcome.

# Installing facebook-api

```
npm install facebook-api
```

# Usage

```js
import * as facebookApi from 'facebook-api';
```

## Methods

### init

Takes facebook application id and facebook options as parameters.
Returns a promise when facebook sdk is initialised.

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

```js

```

### share

```js

```
