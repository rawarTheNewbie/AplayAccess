const DEMO_USERS = [
  {
    email: 'frontdesk@aplayaccess.com',
    password: 'Aplaya123!',
    firstName: 'Frontdesk',
    lastName: 'Staff',
    role: 'frontdesk'
  },
  {
    email: 'admin@aplayaccess.com',
    password: 'Aplaya123!',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin'
  },
  {
    email: 'owner@aplayaccess.com',
    password: 'Aplaya123!',
    firstName: 'Owner',
    lastName: 'User',
    role: 'owner'
  }
];

const DEFAULT_RESERVATIONS = [
  { id: '#4567', guest: 'Robert Chen', room: '305 - Deluxe Ocean View', dates: 'Jun 12 - Jun 18, 2023', status: 'confirmed' },
  { id: '#4566', guest: 'Maria Garcia', room: '412 - Family Suite', dates: 'Jun 12 - Jun 15, 2023', status: 'checked-in' },
  { id: '#4565', guest: 'James Wilson', room: '208 - Standard Garden View', dates: 'Jun 12 - Jun 14, 2023', status: 'pending' },
  { id: '#4564', guest: 'Emma Thompson', room: '-', dates: 'Jun 10 - Jun 12, 2023', status: 'cancelled' },
  { id: '#4563', guest: 'David Kim', room: '301 - Deluxe Ocean View', dates: 'Jun 8 - Jun 11, 2023', status: 'checked-out' }
];

const DEFAULT_WALKINS = [
  { id: 1, guest: 'Lisa Thompson', room: '207 - Standard Garden View', dates: 'Jun 12 - Jun 14, 2023', status: 'Checked In' },
  { id: 2, guest: 'John Smith', room: '301 - Deluxe Ocean View', dates: 'Jun 10 - Jun 15, 2023', status: 'Checked In' },
  { id: 3, guest: 'Emma Wilson', room: 'Pending Assignment', dates: 'Jun 15 - Jun 17, 2023', status: 'Pending' }
];

function initialData() {
  return {
    users: DEMO_USERS,
    reservations: DEFAULT_RESERVATIONS,
    walkins: DEFAULT_WALKINS
  };
}

module.exports = {
  initialData
};
