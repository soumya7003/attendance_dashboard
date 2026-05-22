<<<<<<< HEAD
import { createContext, useContext, useReducer, useCallback } from 'react';

// Action types
const ADD_ENTRY = 'ADD_ENTRY';
const UPDATE_STATS = 'UPDATE_STATS';
const SET_SESSION = 'SET_SESSION';
const CLEAR_LIVE = 'CLEAR_LIVE';
const INITIALIZE_ENTRIES = 'INITIALIZE_ENTRIES';

// Initial state
const initialState = {
  sessionId: null,
  liveEntries: [],      // { id, rollNo, name, status, timestamp }
  stats: {
    present: 0,
    late: 0,
    absent: 0,
    total: 0,
  },
};

// Reducer function
function attendanceReducer(state, action) {
  switch (action.type) {
    case SET_SESSION:
      return {
        ...state,
        sessionId: action.payload.sessionId,
        liveEntries: [],
        stats: { present: 0, late: 0, absent: 0, total: 0 },
      };

    case INITIALIZE_ENTRIES:
      return {
        ...state,
        liveEntries: action.payload.entries,
        stats: action.payload.stats,
      };

    case ADD_ENTRY: {
      const newEntry = action.payload.entry;
      // Avoid duplicate entries (same student in same session)
      const exists = state.liveEntries.some(
        (e) => e.rollNo === newEntry.rollNo && e.id === newEntry.id
      );
      if (exists) return state;

      const updatedEntries = [newEntry, ...state.liveEntries];

      // Update stats based on new entry's status
      const updatedStats = { ...state.stats };
      switch (newEntry.status) {
        case 'present':
          updatedStats.present += 1;
          break;
        case 'late':
          updatedStats.late += 1;
          break;
        case 'absent':
          updatedStats.absent += 1;
          break;
        default:
          break;
      }

      return {
        ...state,
        liveEntries: updatedEntries,
        stats: updatedStats,
      };
    }

    case UPDATE_STATS:
      return {
        ...state,
        stats: action.payload.stats,
      };

    case CLEAR_LIVE:
      return {
        ...state,
        liveEntries: [],
        stats: { present: 0, late: 0, absent: 0, total: state.stats.total }, // keep total enrollment
      };

    default:
      return state;
  }
}

const AttendanceContext = createContext(null);

export function AttendanceProvider({ children }) {
  const [state, dispatch] = useReducer(attendanceReducer, initialState);

  // Set active session (clears previous live data)
  const setActiveSession = useCallback((sessionId) => {
    dispatch({ type: SET_SESSION, payload: { sessionId } });
  }, []);

  // Initialize entries from API/WebSocket on session load
  const initializeEntries = useCallback((entries, stats) => {
    dispatch({ type: INITIALIZE_ENTRIES, payload: { entries, stats } });
  }, []);

  // Add a single attendance entry (called by WebSocket)
  const addEntry = useCallback((entry) => {
    dispatch({ type: ADD_ENTRY, payload: { entry } });
  }, []);

  // Manually update stats (e.g., after bulk changes)
  const updateStats = useCallback((stats) => {
    dispatch({ type: UPDATE_STATS, payload: { stats } });
  }, []);

  // Clear live entries (but keep session)
  const clearLive = useCallback(() => {
    dispatch({ type: CLEAR_LIVE });
  }, []);

  const value = {
    sessionId: state.sessionId,
    liveEntries: state.liveEntries,
    stats: state.stats,
    setActiveSession,
    initializeEntries,
    addEntry,
    updateStats,
    clearLive,
  };

  return (
    <AttendanceContext.Provider value={value}>
=======
import { createContext, useContext, useState, useCallback } from "react";

const AttendanceContext = createContext(null);

// Status constants
export const ATTENDANCE_STATUS = {
  PRESENT: "present",
  LATE: "late",
  ABSENT: "absent",
};

// Mock initial live session data
const MOCK_ACTIVE_SESSION = {
  id: "sess_001",
  course: "CS101 – Introduction to Computer Science",
  courseCode: "CS101",
  room: "Room 101",
  startTime: "09:00 AM",
  endTime: "10:30 AM",
  date: new Date().toISOString().split("T")[0],
  totalEnrolled: 32,
};

const MOCK_LIVE_RECORDS = [
  { id: "r_001", roll: "S001", name: "Alice Johnson",   status: "present", time: "09:01 AM" },
  { id: "r_002", roll: "S002", name: "Bob Smith",       status: "late",    time: "09:14 AM" },
  { id: "r_003", roll: "S003", name: "Clara Davis",     status: "present", time: "09:02 AM" },
  { id: "r_004", roll: "S004", name: "Daniel Lee",      status: "present", time: "09:03 AM" },
  { id: "r_005", roll: "S005", name: "Eva Martinez",    status: "absent",  time: null },
];

export function AttendanceProvider({ children }) {
  const [activeSession, setActiveSession] = useState(MOCK_ACTIVE_SESSION);
  const [liveRecords, setLiveRecords] = useState(MOCK_LIVE_RECORDS);
  const [isSessionActive, setIsSessionActive] = useState(true);

  // Derived stats
  const stats = {
    present: liveRecords.filter((r) => r.status === ATTENDANCE_STATUS.PRESENT).length,
    late:    liveRecords.filter((r) => r.status === ATTENDANCE_STATUS.LATE).length,
    absent:  liveRecords.filter((r) => r.status === ATTENDANCE_STATUS.ABSENT).length,
    enrolled: activeSession?.totalEnrolled ?? 0,
  };

  // Add or update a tap record (called by WebSocket or TapSimulator)
  const recordTap = useCallback((tap) => {
    // tap: { roll, name, status, time }
    setLiveRecords((prev) => {
      const exists = prev.find((r) => r.roll === tap.roll);
      if (exists) {
        return prev.map((r) =>
          r.roll === tap.roll ? { ...r, status: tap.status, time: tap.time } : r
        );
      }
      return [
        ...prev,
        { id: `r_${Date.now()}`, ...tap },
      ];
    });
  }, []);

  const startSession = useCallback((session) => {
    setActiveSession(session);
    setLiveRecords([]);
    setIsSessionActive(true);
  }, []);

  const endSession = useCallback(() => {
    setIsSessionActive(false);
  }, []);

  return (
    <AttendanceContext.Provider
      value={{
        activeSession,
        liveRecords,
        isSessionActive,
        stats,
        recordTap,
        startSession,
        endSession,
      }}
    >
>>>>>>> aa3a4ba6a433ca7f7d2f915da5b18db865688e0a
      {children}
    </AttendanceContext.Provider>
  );
}

<<<<<<< HEAD
export const useAttendance = () => {
  const context = useContext(AttendanceContext);
  if (!context) {
    throw new Error('useAttendance must be used within an AttendanceProvider');
  }
  return context;
};
=======
export function useAttendanceContext() {
  const ctx = useContext(AttendanceContext);
  if (!ctx)
    throw new Error("useAttendanceContext must be used within AttendanceProvider");
  return ctx;
}
>>>>>>> aa3a4ba6a433ca7f7d2f915da5b18db865688e0a
