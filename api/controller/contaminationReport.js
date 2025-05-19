const ContaminationReport = require('../model/contaminationReport');

exports.createReport = async (req, res) => {
  try {
    const { title, description, lat, lng, images } = req.body;
    if (!title || !description || !lat || !lng) {
      return res.status(400).json({ error: 'Title, description, lat, and lng are required' });
    }
    const report = new ContaminationReport({
      title,
      description,
      lat,
      lng,
      images: images || [],
      created_by: req.user.id
    });
    await report.save();
    res.status(201).json(report);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all reports or reports by user (Moderator function)
exports.getAllReports = async (req, res) => {
  try {
    const { q, userId, status, page = 1, pageSize = 10 } = req.query;

    const filter = {};

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ];
    }

    if (userId) filter.created_by = userId;
    if (status) filter.status = status;

    const reports = await ContaminationReport.find(filter)
      .populate('created_by', 'name email')
      .limit(Number(pageSize))
      .skip((Number(page) - 1) * Number(pageSize));

    const totalReportsCount = await ContaminationReport.countDocuments(filter);

    res.status(200).json({
      totalPages: Math.ceil(totalReportsCount / pageSize),
      currentPage: Number(page),
      pageSize: Number(pageSize),
      results: reports,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
;

// Get report by ID
exports.getReportById = async (req, res) => {
  try {

    console.log(req.params.id)
    console.log(await ContaminationReport.find())
    const report = await ContaminationReport.findById(req.params.id).populate('created_by', 'name email');
    if (!report) return res.status(404).json({ error: 'Report not found' });
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a report (User function - edit own report)
exports.updateReport = async (req, res) => {
  try {
    const { title, description, lat, lng, images } = req.body;
    const report = await ContaminationReport.findById(req.params.id);
    if (!report) return res.status(404).json({ error: 'Report not found' });
    if (report.created_by.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized to edit this report' });
    }
    if (title) report.title = title;
    if (description) report.description = description;
    if (lat) report.lat = lat;
    if (lng) report.lng = lng;
    if (images && Array.isArray(images)) {
      report.images = images.map(img => ({
        image_key: img.image_key,
        uploaded_at: img.uploaded_at || new Date()
      }));
    }
    await report.save();
    res.json(report);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a report
exports.deleteReport = async (req, res) => {
  try {
    const report = await ContaminationReport.findById(req.params.id);
    if (!report) return res.status(404).json({ error: 'Report not found' });
    await ContaminationReport.deleteOne({ _id: req.params.id });
    res.json({ message: 'Report deleted' });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
};

// Update report status (Moderator function - accept/reject)
exports.updateReportStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pendiente', 'validado', 'falso'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Must be pendiente, validado, or falso' });
    }
    const report = await ContaminationReport.findById(req.params.id);
    if (!report) return res.status(404).json({ error: 'Report not found' });
    report.status = status;
    await report.save();
    res.json(report);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Add image to report (User function)
exports.addImage = async (req, res) => {
  try {
    const { image_key } = req.body;
    if (!image_key) return res.status(400).json({ error: 'Image key is required' });
    const report = await ContaminationReport.findById(req.params.id);
    if (!report) return res.status(404).json({ error: 'Report not found' });
    if (report.created_by.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized to add images to this report' });
    }
    report.images.push({ image_key });
    await report.save();
    res.json(report);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
