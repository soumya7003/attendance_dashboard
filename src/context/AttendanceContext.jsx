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
      {children}
    </AttendanceContext.Provider>
  );
}

export function useAttendanceContext() {
  const ctx = useContext(AttendanceContext);
  if (!ctx)
    throw new Error("useAttendanceContext must be used within AttendanceProvider");
  return ctx;
}
