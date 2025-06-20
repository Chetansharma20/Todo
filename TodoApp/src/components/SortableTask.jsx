import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableTask = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
    marginBottom: '8px',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div>{task.TaskTitle}</div>
    </div>
  );
};

export default SortableTask;
