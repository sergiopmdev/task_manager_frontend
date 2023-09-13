import { Trash2, FileEdit, Check } from 'lucide-react';

import { cn } from '@/lib/utils';

export default function Task(props) {
  const task = props.task;

  const name = task.name;
  const description = task.description;
  const priority = task.priority;

  return (
    <div className="relative flex h-24 flex-col justify-center rounded-sm bg-slate-50 pl-4">
      <h1 className="text-xl font-semibold">{name}</h1>
      <p>{description}</p>
      <span
        className={cn('absolute right-2 top-2 rounded-sm px-1 py-0.5 text-xs', {
          'bg-red-300 text-red-600': priority == 'High',
          'bg-yellow-300 text-yellow-600': priority == 'Medium',
          'bg-blue-300 text-blue-600': priority == 'Low',
        })}
      >
        {priority}
      </span>
      <div className="absolute bottom-2 right-2 flex gap-1">
        <IconBlock type="success" icon={Check} />
        <IconBlock type="edit" icon={FileEdit} />
        <IconBlock type="delete" icon={Trash2} />
      </div>
    </div>
  );
}

function IconBlock(props) {
  const Icon = props.icon;
  const type = props.type;

  return (
    <div
      className={cn(
        'flex h-7 w-6 cursor-pointer items-center justify-center rounded-lg hover:bg-opacity-80',
        {
          'bg-red-700': type == 'delete',
          'bg-blue-700': type == 'edit',
          'bg-green-700': type == 'success',
        }
      )}
    >
      <Icon
        className={cn('w-3.5', {
          'text-red-300': type == 'delete',
          'text-blue-300': type == 'edit',
          'text-green-300': type == 'success',
        })}
      />
    </div>
  );
}
