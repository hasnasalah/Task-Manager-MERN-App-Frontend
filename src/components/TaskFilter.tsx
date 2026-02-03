import type { TaskFiltersProps,Filters  } from "../types";



export default function TaskFilters({ filters, setFilters }: TaskFiltersProps) {
  return (
    <div className="task-filters">
      <select
        value={filters.priority}
        onChange={e =>
          setFilters(prev => ({ ...prev, priority: e.target.value as Filters["priority"] }))
        }
      >
        <option value="All">All Priorities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

    </div>
  );
}
