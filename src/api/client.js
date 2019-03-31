// a helper function to get you started fetching stuff
// from Twitch's APIs
const TWITCH_CLIENT_ID = "ptm1pmj69bfuceli46nae7bfhi7q8n";

window.Twitch.ext.onAuthorized(async auth => {
  window.twitchAuthObj = auth;
});



async function twitchFetch(url) {
  const headers = new Headers({
    'Client-ID': TWITCH_CLIENT_ID,
    'Accept': "application/vnd.twitchtv.v5+json",
    'Authorization': "Bearer " + window.twitchAuthObj.token
  });

  const options = { method: "GET", headers: headers };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
  return undefined;
}

async function getUserById(userId) {
    const url = `https://api.twitch.tv/helix/users?id=${userId}`;
    const result = await twitchFetch(url);
    return result;
}

async function getChannelById(channelId) {
    const url = `https://api.twitch.tv/helix/channels/${channelId}`;
    const result = await twitchFetch(url);
    return result;
}

export { getUserById, getChannelById };
