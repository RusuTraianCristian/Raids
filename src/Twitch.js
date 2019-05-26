export let onAuthorized;
if(window.Twitch.ext) {
    window.Twitch.ext.onAuthorized(auth => {
        onAuthorized = auth;
    });
}
