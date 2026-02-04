import type { TaskFiltersProps,Filters  } from "../types";
import "../App.css";



export default function TaskFilters({setFilters, filters }: TaskFiltersProps) {
   return (
    <div className="filter-select">
    <select
     value={filters.priority}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            priority: e.target.value as Filters["priority"],
          }))}
    >
      <option value="All">All</option>
      <option value="Low">Low</option>
      <option value="Medium">Medium</option>
      <option value="High">High</option>
    </select>
    </div>
  );
}
