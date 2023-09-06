import { Button } from '@/components/ui/button';

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
      <Button className="absolute bottom-2 right-2 h-7">Edit</Button>
    </div>
  );
}
