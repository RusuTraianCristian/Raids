const ath = {};
export const getAuth = () => {
    if (window.Twitch.ext) {
        window.Twitch.ext.onAuthorized(auth => {
            Object.assign(ath, auth);
        });
    }
    return ath;
}
//export const onAuthorized = getAuth();

const ctx = {};
export const getContext = () => {
    if (window.Twitch.ext) {
        window.Twitch.ext.onContext(context => {
            Object.assign(ctx, context);
        });
    }
    return ctx;
}
//export const onContext = getContext();
