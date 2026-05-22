import { api } from './api';

// Mock data for students
const MOCK_STUDENTS = [
  {
    id: 'std_001',
    roll: 'S001',
    name: 'Alice Johnson',
    email: 'alice.j@attendify.school',
    department: 'Computer Science',
    enrollmentStatus: 'active',
    cardUID: 'CARD_A1B2C3',
    avatar: null,
  },
  {
    id: 'std_002',
    roll: 'S002',
    name: 'Bob Smith',
    email: 'bob.smith@attendify.school',
    department: 'Computer Science',
    enrollmentStatus: 'active',
    cardUID: 'CARD_D4E5F6',
    avatar: null,
  },
  {
    id: 'std_003',
    roll: 'S003',
    name: 'Clara Davis',
    email: 'clara.d@attendify.school',
    department: 'Mathematics',
    enrollmentStatus: 'active',
    cardUID: 'CARD_G7H8I9',
    avatar: null,
  },
  {
    id: 'std_004',
    roll: 'S004',
    name: 'Daniel Lee',
    email: 'daniel.lee@attendify.school',
    department: 'Physics',
    enrollmentStatus: 'active',
    cardUID: 'CARD_J0K1L2',
    avatar: null,
  },
  {
    id: 'std_005',
    roll: 'S005',
    name: 'Eva Martinez',
    email: 'eva.m@attendify.school',
    department: 'Computer Science',
    enrollmentStatus: 'inactive',
    cardUID: null,
    avatar: null,
  },
];

let students = [...MOCK_STUDENTS];

export const studentService = {
  async getStudents(params = {}) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    let filtered = [...students];
    if (params.department) {
      filtered = filtered.filter((s) => s.department === params.department);
    }
    if (params.enrollmentStatus) {
      filtered = filtered.filter((s) => s.enrollmentStatus === params.enrollmentStatus);
    }
    if (params.cardAssigned !== undefined) {
      filtered = filtered.filter((s) => (params.cardAssigned ? s.cardUID : !s.cardUID));
    }
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(searchLower) ||
          s.roll.toLowerCase().includes(searchLower) ||
          s.email.toLowerCase().includes(searchLower)
      );
    }
    return { data: filtered, total: filtered.length };
  },

  async getStudentById(id) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const student = students.find((s) => s.id === id);
    if (!student) throw new Error('Student not found');
    return { data: student };
  },

  async addStudent(studentData) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const newStudent = {
      id: `std_${Date.now()}`,
      ...studentData,
      cardUID: studentData.cardUID || null,
    };
    students.push(newStudent);
    return { data: newStudent };
  },

  async updateStudent(id, updatedData) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const index = students.findIndex((s) => s.id === id);
    if (index === -1) throw new Error('Student not found');
    students[index] = { ...students[index], ...updatedData };
    return { data: students[index] };
  },

  async deleteStudent(id) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    students = students.filter((s) => s.id !== id);
    return { success: true };
  },
};