const Publication = require('../model/publication');

exports.createPublication = async (req, res) => {
  try {

    req.body.created_by = req.user.id

    const publication = new Publication(req.body);
    await publication.save();
    res.status(201).json(publication);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllPublications = async (req, res) => {
  try {
    const publications = await Publication.find();
    res.json(publications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPublicationById = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    if (!publication) return res.status(404).json({ error: 'Not found' });
    res.json(publication);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePublication = async (req, res) => {
  try {
    const publication = await Publication.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!publication) return res.status(404).json({ error: 'Not found' });
    res.json(publication);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deletePublication = async (req, res) => {
  try {
    const result = await Publication.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};