// const base_url = 'https://saavn.dev/api/search/'
const base_url = 'https://saavn.sumit.co/api/search/'
const search_songs_api = base_url + 'songs?query=';
const search_albums_api = base_url + 'albums?query=';
const search_artists_api = base_url + 'artists?query=';
const search_playlist_api = base_url + 'playlists?query=';
const allOriginsProxy = 'https://api.allorigins.win/get?url=';
// const get_album_using_id = 'https://saavn.dev/api/albums?id=';
const get_album_using_id = 'https://saavn.sumit.co/api/albums?id=';
const get_playlist_using_id = 'https://jiosavan-api2.vercel.app/api/playlists?id=';
const get_artist_using_id = 'https://jiosavan-api2.vercel.app/api/artists?id=';

const cors_fix = 'https://thingproxy.freeboard.io/fetch/';

const trending_stuff = 'https://jiosaavn-trending.arnab-xd.workers.dev/trending';

export {cors_fix, search_albums_api,search_artists_api,search_playlist_api,search_songs_api,trending_stuff, allOriginsProxy,get_album_using_id, get_playlist_using_id,get_artist_using_id};