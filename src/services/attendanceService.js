// Mock attendance records
const MOCK_ATTENDANCE_RECORDS = [
  {
    id: 'att_001',
    studentId: 'std_001',
    studentName: 'Alice Johnson',
    courseId: 'crs_001',
    courseName: 'Introduction to Computer Science',
    sessionId: 'sess_001',
    status: 'present',
    timestamp: '2025-01-15T09:01:00Z',
  },
  {
    id: 'att_002',
    studentId: 'std_002',
    studentName: 'Bob Smith',
    courseId: 'crs_001',
    courseName: 'Introduction to Computer Science',
    sessionId: 'sess_001',
    status: 'late',
    timestamp: '2025-01-15T09:14:00Z',
  },
  {
    id: 'att_003',
    studentId: 'std_003',
    studentName: 'Clara Davis',
    courseId: 'crs_002',
    courseName: 'Calculus II',
    sessionId: 'sess_002',
    status: 'present',
    timestamp: '2025-01-16T11:05:00Z',
  },
  {
    id: 'att_004',
    studentId: 'std_004',
    studentName: 'Daniel Lee',
    courseId: 'crs_001',
    courseName: 'Introduction to Computer Science',
    sessionId: 'sess_001',
    status: 'absent',
    timestamp: null,
  },
  {
    id: 'att_005',
    studentId: 'std_005',
    studentName: 'Eva Martinez',
    courseId: 'crs_003',
    courseName: 'Physics for Engineers',
    sessionId: 'sess_003',
    status: 'present',
    timestamp: '2025-01-17T13:20:00Z',
  },
];

let attendanceRecords = [...MOCK_ATTENDANCE_RECORDS];

const attendanceService = {
  async getAttendance(params = {}) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    let filtered = [...attendanceRecords];
    if (params.courseId) {
      filtered = filtered.filter((a) => a.courseId === params.courseId);
    }
    if (params.studentId) {
      filtered = filtered.filter((a) => a.studentId === params.studentId);
    }
    if (params.startDate) {
      filtered = filtered.filter((a) => a.timestamp && a.timestamp >= params.startDate);
    }
    if (params.endDate) {
      filtered = filtered.filter((a) => a.timestamp && a.timestamp <= params.endDate);
    }
    return { data: filtered };
  },

  async getAttendanceStats(courseId, dateRange = {}) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Mock stats – compute from filtered records in real version
    const stats = {
      present: 42,
      late: 8,
      absent: 5,
      total: 55,
      percentage: 76.4,
    };
    return { data: stats };
  },

  async recordAttendance(tapData) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const newRecord = {
      id: `att_${Date.now()}`,
      ...tapData,
      timestamp: new Date().toISOString(),
    };
    attendanceRecords.push(newRecord);
    return { data: newRecord };
  },
};

export default attendanceService;