const getFileUrl = (req) => {
  const url = `${req.protocol}://${req.get('host')}`;

  return `${url}/images/${req.file.filename}`;
};

module.exports = {
  getFileUrl,
};
