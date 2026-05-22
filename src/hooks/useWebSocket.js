import { useEffect, useRef, useState, useCallback } from 'react';
import { useAttendanceContext } from '../context/AttendanceContext';
import { useNotifications } from '../context/NotificationContext';

export const useWebSocket = (sessionId = null) => {
  const { recordTap, isSessionActive } = useAttendanceContext();
  const { addNotification } = useNotifications();
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef(null);

  // Mock tap generator – simulates incoming WebSocket messages
  // In production, replace with actual WebSocket connection
  const startMockWebSocket = useCallback(() => {
    if (!isSessionActive || !sessionId) return;

    // Simulate connection established
    setIsConnected(true);
    
    // Mock tap events every 10-20 seconds (for demo)
    const mockStudents = [
      { roll: 'S006', name: 'Frank Zhang', status: 'present' },
      { roll: 'S007', name: 'Grace Lee', status: 'present' },
      { roll: 'S008', name: 'Henry Wu', status: 'late' },
    ];
    
    let mockInterval = setInterval(() => {
      if (!isSessionActive) {
        clearInterval(mockInterval);
        return;
      }
      
      const randomStudent = mockStudents[Math.floor(Math.random() * mockStudents.length)];
      const tapData = {
        ...randomStudent,
        time: new Date().toLocaleTimeString(),
      };
      
      // Simulate receiving a WebSocket message
      handleWebSocketMessage({ data: JSON.stringify(tapData) });
    }, 12000); // every 12 seconds

    const handleWebSocketMessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // Expected data: { roll, name, status, time }
        recordTap(data);
        addNotification({
          type: 'tap',
          message: `${data.name} (${data.roll}) tapped in – ${data.status}`,
        });
      } catch (err) {
        console.error('Failed to parse WebSocket message:', err);
      }
    };

    // Cleanup interval on unmount or session change
    return () => clearInterval(mockInterval);
  }, [sessionId, isSessionActive, recordTap, addNotification]);

  // Real WebSocket implementation (commented, for production use)
  /*
  const startRealWebSocket = useCallback(() => {
    if (!sessionId) return;
    
    const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:3001/ws';
    wsRef.current = new WebSocket(`${wsUrl}?sessionId=${sessionId}`);
    
    wsRef.current.onopen = () => {
      setIsConnected(true);
    };
    
    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'tap') {
        recordTap(data.payload);
        addNotification({
          type: 'tap',
          message: `${data.payload.name} tapped in – ${data.payload.status}`,
        });
      }
    };
    
    wsRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    wsRef.current.onclose = () => {
      setIsConnected(false);
    };
    
    return () => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.close();
      }
    };
  }, [sessionId]);
  */

  useEffect(() => {
    // For development, use mock WebSocket
    const cleanup = startMockWebSocket();
    return () => {
      if (cleanup) cleanup();
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [startMockWebSocket]);

  return { isConnected };
};