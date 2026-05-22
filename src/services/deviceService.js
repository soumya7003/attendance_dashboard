const MOCK_DEVICES = [
  { id: 'dev_001', deviceId: 'RDR-101', room: 'Room 101', status: 'online', lastSeen: new Date().toISOString() },
  { id: 'dev_002', deviceId: 'RDR-102', room: 'Room 203', status: 'offline', lastSeen: new Date(Date.now() - 3600000).toISOString() },
  { id: 'dev_003', deviceId: 'RDR-103', room: 'Lab 3', status: 'online', lastSeen: new Date().toISOString() },
];

let devices = [...MOCK_DEVICES];

const deviceService = {
  async getDevices(params = {}) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    let filtered = [...devices];
    if (params.room) {
      filtered = filtered.filter((d) => d.room === params.room);
    }
    if (params.status) {
      filtered = filtered.filter((d) => d.status === params.status);
    }
    return { data: filtered };
  },

  async updateDeviceStatus(id, status) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const device = devices.find((d) => d.id === id);
    if (device) {
      device.status = status;
      device.lastSeen = new Date().toISOString();
    }
    return { data: device };
  },
};

export default deviceService;