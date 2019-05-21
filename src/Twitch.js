export let onAuthorized;
window.Twitch.ext.onAuthorized(auth => {
    onAuthorized = auth;
});
