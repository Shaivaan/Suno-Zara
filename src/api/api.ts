const base_url = 'https://saavn.dev/api/search/'
const search_songs_api = base_url + 'songs?query=';
const search_albums_api = base_url + 'albums?query=';
const search_artists_api = base_url + 'artists?query=';
const search_playlist_api = base_url + 'playlists?query=';
const trending_now_api = 'https://www.jiosaavn.com/api.php?__call=webapi.getLaunchData&api_version=4&_format=json';
const trending_artist_api = 'https://www.jiosaavn.com/api.php?__call=social.getTopArtists&api_version=4&_format=json';
const allOriginsProxy = 'https://api.allorigins.win/get?url=';

export {search_albums_api,search_artists_api,search_playlist_api,search_songs_api,trending_now_api, allOriginsProxy, trending_artist_api};