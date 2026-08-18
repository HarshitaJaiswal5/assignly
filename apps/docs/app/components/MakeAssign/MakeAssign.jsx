import { TaskCard } from '../TaskCard/TaskCard';
import { tasks } from "../../../constants/tasks";

export const MakeAssign = ()  => {
  return (
    <div>
      {/* search, filters, heading, etc. */}

      <div className="bg-white grid grid-cols-1 gap-2.5 lg:grid-cols-2">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
          />
        ))}
      </div>
    </div>
  );
}