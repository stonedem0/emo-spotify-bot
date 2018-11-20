const SpotifyWebApi = require('spotify-web-api-node');

const CLIENT_ID = process.env.CLIENT_ID,
      CLIENT_SECRET = process.env.CLIENT_SECRET  


const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET
});

const spotifySearch = async () => {
    const credentialData = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(credentialData.body.access_token);
    const result = await spotifyApi.getPlaylist('stonedemo', '66HUI5Q1yJ2wpjwSlLUYAT')
    const tracks = result.body.tracks.items;
    return tracks
        .map(t => t.track.external_urls.spotify)
        .filter(t => t);

}

module.exports = spotifySearch