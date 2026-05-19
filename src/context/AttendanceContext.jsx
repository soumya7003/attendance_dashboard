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
      {children}
    </AttendanceContext.Provider>
  );
}

export const useAttendance = () => {
  const context = useContext(AttendanceContext);
  if (!context) {
    throw new Error('useAttendance must be used within an AttendanceProvider');
  }
  return context;
};