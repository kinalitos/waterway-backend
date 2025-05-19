const Event = require('../model/event');

exports.createEvent = async (req, res) => {
  try {
    req.body.created_by = Date.now()
    req.body.updated_by = Date.now()
    req.body.created_by = req.user.id
    if (req.body.date_end < req.body.date_start) {
      return res.status(400).json({ error: 'La fecha de inicio no puede ser mayor a la fecha de fin' });
    }
    const event = new Event(req.body)
    await event.save(event)
    res.status(201).json(event)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

exports.getAllEvents = async (req, res) => {
  try {
    const { q, page = 1, pageSize = 10, date, direction } = req.query;

    const filter = q ? {
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { location: { $regex: q, $options: 'i' } }
      ]
    } : {};

    // Filtrado por fecha opcional
    if (date && direction) {
      const refDate = new Date(date);
      if (direction === "forward") {
        filter.date_end = { ...filter.date_end, $gte: refDate };
      } else if (direction === "backward") {
        filter.date_end = { ...filter.date_end, $lt: refDate };
      }
    }

    // Trae los eventos y los participantes
    const events = await Event.find(filter)
      .limit(Number(pageSize))
      .skip((Number(page) - 1) * Number(pageSize));

    const totalEventsCount = await Event.countDocuments(filter);

    // ID del usuario autenticado (ajusta según tu auth)
    const userId = req.user?.id || req.user?._id;

    // Mapea los eventos y agrega el campo 'asistiendo'
    const eventsWithAsistiendo = events.map(ev => {
      const isAsistiendo = userId
        ? ev.participants && ev.participants.includes(userId)
        : false;
      return {
        ...ev.toObject(),
        asistiendo: isAsistiendo,
      };
    });

    res.status(200).json({
      totalPages: Math.ceil(totalEventsCount / pageSize),
      currentPage: Number(page),
      pageSize: Number(pageSize),
      results: eventsWithAsistiendo,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Not found' });
    const status = event.date_start < Date.now(0) ? 'finalizado' : 'activo';
    event.status = status;
    res.json({ event });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    req.body.updated_at = Date.now()
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ error: 'Not found' });
    res.json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const result = await Event.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Agregar imagen al evento
exports.addImage = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Not found' });
    event.images.push({ image_key: req.body.image_key });
    await event.save();
    res.json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Agregar participante al evento
exports.addParticipant = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Not found' });
    event.participants.push({ user_id: req.user.id });
    await event.save();
    res.json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.filterEvents = async (req, res) => {
  try {
    const { status, location, date_start, date_end, title } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (location) filter.location = { $regex: location, $options: "i" };
    if (title) filter.title = { $regex: title, $options: "i" };

    if (date_start || date_end) {
      filter.date_start = {};
      if (date_start) filter.date_start.$gte = new Date(date_start);
      if (date_end) filter.date_start.$lte = new Date(date_end);
    }

    const events = await Event.find(filter);
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};