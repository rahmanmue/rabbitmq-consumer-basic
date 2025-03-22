const mapDBPlaylistSongsToModel = (rows) => {
  const { id, name } = rows[0];

  const songs = rows
    .filter(({ title }) => title !== null)
    .map(({ songId, title, performer }) => ({
      id: songId,
      title,
      performer,
    }));

  const playlist = {
    playlist: { id, name, songs },
  };

  return playlist;
};

module.exports = mapDBPlaylistSongsToModel;
