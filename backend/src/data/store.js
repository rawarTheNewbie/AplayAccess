const fs = require('fs');
const path = require('path');
const { initialData } = require('./seed');

const DATA_FILE = path.join(__dirname, '..', '..', 'data', 'db.json');

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData(), null, 2), 'utf8');
  }
}

function readDb() {
  ensureDataFile();
  const raw = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(raw);
}

function writeDb(nextDb) {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(nextDb, null, 2), 'utf8');
  return nextDb;
}

function updateDb(updater) {
  const current = readDb();
  const next = updater(current);
  return writeDb(next);
}

module.exports = {
  readDb,
  writeDb,
  updateDb
};
