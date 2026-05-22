const MOCK_SESSIONS = [
  {
    id: 'sess_001',
    date: '2025-01-15',
    courseId: 'crs_001',
    courseName: 'Introduction to Computer Science',
    room: 'Room 101',
    startTime: '09:00',
    endTime: '10:30',
    presentCount: 28,
    totalEnrolled: 32,
  },
  {
    id: 'sess_002',
    date: '2025-01-16',
    courseId: 'crs_002',
    courseName: 'Calculus II',
    room: 'Room 203',
    startTime: '11:00',
    endTime: '12:30',
    presentCount: 24,
    totalEnrolled: 28,
  },
];

let sessions = [...MOCK_SESSIONS];

const sessionService = {
  async getSessions(params = {}) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    let filtered = [...sessions];
    if (params.courseId) {
      filtered = filtered.filter((s) => s.courseId === params.courseId);
    }
    if (params.startDate) {
      filtered = filtered.filter((s) => s.date >= params.startDate);
    }
    if (params.endDate) {
      filtered = filtered.filter((s) => s.date <= params.endDate);
    }
    if (params.room) {
      filtered = filtered.filter((s) => s.room === params.room);
    }
    return { data: filtered };
  },

  async createSession(sessionData) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const newSession = {
      id: `sess_${Date.now()}`,
      ...sessionData,
      presentCount: 0,
    };
    sessions.push(newSession);
    return { data: newSession };
  },

  async deleteSession(id) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    sessions = sessions.filter((s) => s.id !== id);
    return { success: true };
  },
};

export default sessionService;