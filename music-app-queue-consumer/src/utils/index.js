const mapDBPlaylistSongsToModel = (rows) => {
  const { playlistid, name } = rows[0];

  const songs = rows
    .filter(({ title }) => title !== null)
    .map(({ songId, title, performer }) => ({
      id: songId,
      title,
      performer,
    }));

  return { id: playlistid, name, songs };
};

module.exports = mapDBPlaylistSongsToModel;
