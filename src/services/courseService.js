// Mock data
const MOCK_COURSES = [
  { id: 'crs_001', code: 'CS101', name: 'Introduction to Computer Science', department: 'Computer Science', enrolled: 32 },
  { id: 'crs_002', code: 'MATH202', name: 'Calculus II', department: 'Mathematics', enrolled: 28 },
  { id: 'crs_003', code: 'PHY301', name: 'Physics for Engineers', department: 'Physics', enrolled: 24 },
  { id: 'crs_004', code: 'ENG105', name: 'Academic Writing', department: 'English', enrolled: 30 },
];

let courses = [...MOCK_COURSES];

const courseService = {
  async getCourses(params = {}) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    let filtered = [...courses];
    if (params.department) {
      filtered = filtered.filter((c) => c.department === params.department);
    }
    if (params.minEnrolled) {
      filtered = filtered.filter((c) => c.enrolled >= params.minEnrolled);
    }
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.code.toLowerCase().includes(searchLower) ||
          c.name.toLowerCase().includes(searchLower)
      );
    }
    return { data: filtered };
  },

  async addCourse(courseData) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const newCourse = { id: `crs_${Date.now()}`, ...courseData, enrolled: 0 };
    courses.push(newCourse);
    return { data: newCourse };
  },

  async updateCourse(id, updatedData) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const index = courses.findIndex((c) => c.id === id);
    if (index === -1) throw new Error('Course not found');
    courses[index] = { ...courses[index], ...updatedData };
    return { data: courses[index] };
  },

  async deleteCourse(id) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    courses = courses.filter((c) => c.id !== id);
    return { success: true };
  },
};

export default courseService;