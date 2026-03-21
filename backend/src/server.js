const express = require('express');
const cors = require('cors');
const { readDb, updateDb } = require('./data/store');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'aplayaccess-backend' });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  const normalized = String(email || '').trim().toLowerCase();

  const db = readDb();
  const user = db.users.find((u) => u.email === normalized && u.password === password);

  if (!user) {
    return res.status(401).json({ ok: false, error: 'Invalid credentials' });
  }

  return res.json({
    ok: true,
    user: {
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
      firstName: user.firstName,
      role: user.role
    }
  });
});

app.get('/api/reservations', (req, res) => {
  const db = readDb();
  res.json({ ok: true, data: db.reservations });
});

app.patch('/api/reservations/:id', (req, res) => {
  const id = req.params.id;
  const patch = req.body || {};

  const nextDb = updateDb((db) => {
    const reservations = db.reservations.map((r) => {
      const normalizedId = String(r.id).replace(/^#/, '');
      if (normalizedId === id || String(r.id) === id || String(r.id) === `#${id}`) {
        return { ...r, ...patch };
      }
      return r;
    });

    return { ...db, reservations };
  });

  res.json({ ok: true, data: nextDb.reservations });
});

app.delete('/api/reservations/:id', (req, res) => {
  const id = req.params.id;

  const nextDb = updateDb((db) => {
    const reservations = db.reservations.filter((r) => {
      const normalizedId = String(r.id).replace(/^#/, '');
      return !(normalizedId === id || String(r.id) === id || String(r.id) === `#${id}`);
    });

    return { ...db, reservations };
  });

  res.json({ ok: true, data: nextDb.reservations });
});

app.get('/api/walkins', (req, res) => {
  const db = readDb();
  res.json({ ok: true, data: db.walkins });
});

app.post('/api/walkins', (req, res) => {
  const entry = req.body || {};
  if (!entry.guest) {
    return res.status(400).json({ ok: false, error: 'guest is required' });
  }

  const nextDb = updateDb((db) => {
    const id = Date.now();
    const nextWalkins = [{ ...entry, id }, ...db.walkins];
    return { ...db, walkins: nextWalkins };
  });

  res.status(201).json({ ok: true, data: nextDb.walkins });
});

app.patch('/api/walkins/:id', (req, res) => {
  const id = String(req.params.id);
  const patch = req.body || {};

  const nextDb = updateDb((db) => {
    const walkins = db.walkins.map((w) => (String(w.id) === id ? { ...w, ...patch } : w));
    return { ...db, walkins };
  });

  res.json({ ok: true, data: nextDb.walkins });
});

app.get('/api/dashboard/metrics', (req, res) => {
  const db = readDb();

  const occupied =
    db.reservations.filter((r) => r.status === 'checked-in').length +
    db.walkins.filter((w) => w.status === 'Checked In').length;

  const checkins = db.reservations.filter((r) => r.status === 'checked-in').length;
  const checkouts = db.reservations.filter((r) => r.status === 'checked-out').length;
  const transactions = db.reservations.length + db.walkins.length;

  res.json({ ok: true, data: { occupied, checkins, checkouts, transactions } });
});

app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});
