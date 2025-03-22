const { Pool } = require("pg");
const mapDBPlaylistSongsToModel = require("./utils");

class PlaylistSongsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistSongs(playlistId, owner) {
    const query = {
      text: `SELECT playlists.id, playlists.name,
        songs.id AS "songId", songs.title, songs.performer
        FROM playlists 
              RIGHT JOIN playlist_songs ON playlist_songs.playlist_id = playlists.id 
              LEFT JOIN songs ON playlist_songs.song_id = songs.id 
              LEFT JOIN collaborations ON collaborations.playlist_id = playlists.id
              WHERE playlists.id = $1 AND playlists.owner = $2 OR 
              collaborations.playlist_id = $1 AND collaborations.user_id = $2`,
      values: [playlistId, owner],
    };

    const result = await this._pool.query(query);
    const mappedResult = mapDBPlaylistSongsToModel(result.rows);

    return mappedResult;
  }
}

module.exports = PlaylistSongsService;
