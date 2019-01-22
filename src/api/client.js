// a helper function to get you started fetching stuff
// from Twitch's APIs
async function twitchFetch(url) {
  const headers = new Headers({
    Accept: "https://id.twitch.tv"
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
  const url = `https://api.twitch.tv/helix/`;
  const result = await twitchFetch(url);
  return result;
}

async function getChannelById(channelId) {
  const url = `https://api.twitch.tv/helix/channels/${channelId}`;
  const result = await twitchFetch(url);
  return result;
}

export { getUserById, getChannelById };
