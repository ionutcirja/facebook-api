export default options =>
    window.FB.ui({
        method: 'feed',
        link: options.url,
        picture: options.image,
        name: options.title,
        description: options.info,
    });
