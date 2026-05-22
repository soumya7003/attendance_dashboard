import { useState } from 'react';
import { useDevices } from '../../hooks/useDevices';
import { DataTable } from '../../components/table/DataTable';
import { FilterBar } from '../../components/filters/FilterBar';
import { FilterChips } from '../../components/filters/FilterChips';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { RefreshCw } from 'lucide-react';

const columns = [
  { header: 'Device ID', accessor: 'deviceId' },
  { header: 'Room', accessor: 'room' },
  {
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge status={row.status === 'online' ? 'online' : 'offline'}>
        {row.status}
      </Badge>
    ),
  },
  {
    header: 'Last Seen',
    accessor: 'lastSeen',
    cell: (row) => new Date(row.lastSeen).toLocaleString(),
  },
];

export default function Devices() {
  const [filters, setFilters] = useState({ room: '', status: '' });
  const [activeFilterChips, setActiveFilterChips] = useState([]);
  const { devices, loading, error, refetch } = useDevices(filters);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    if (value) {
      setActiveFilterChips((prev) => [...prev.filter(c => c.id !== key), { id: key, label: `${key}: ${value}` }]);
    } else {
      setActiveFilterChips((prev) => prev.filter(c => c.id !== key));
    }
  };

  const removeChip = (id) => {
    setFilters((prev) => ({ ...prev, [id]: '' }));
    setActiveFilterChips((prev) => prev.filter(c => c.id !== id));
  };

  const clearAllFilters = () => {
    setFilters({ room: '', status: '' });
    setActiveFilterChips([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gradient">Devices</h1>
          <p className="text-secondary text-sm mt-1">Manage RFID terminals and device status</p>
        </div>
        <Button variant="outline" onClick={refetch} icon={RefreshCw}>
          Refresh
        </Button>
      </div>

      <FilterBar activeFilters={activeFilterChips.length} onClearAll={clearAllFilters}>
        <select
          className="input h-9 w-40 text-sm"
          value={filters.room}
          onChange={(e) => handleFilterChange('room', e.target.value)}
        >
          <option value="">All Rooms</option>
          <option value="Room 101">Room 101</option>
          <option value="Room 203">Room 203</option>
          <option value="Lab 3">Lab 3</option>
        </select>
        <select
          className="input h-9 w-40 text-sm"
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
        >
          <option value="">All Status</option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>
      </FilterBar>

      <FilterChips filters={activeFilterChips} onRemove={removeChip} />

      <Card variant="default" className="p-0 overflow-hidden">
        <DataTable
          columns={columns}
          data={devices}
          loading={loading}
          emptyMessage="No devices found"
        />
      </Card>
    </div>
  );
}