import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Trash2, FileEdit, Check, RotateCw } from 'lucide-react';

import { useState } from 'react';

import { cn } from '@/lib/utils';
import deleteTask from '@/app/services/deleteTask';

export default function Task(props) {
  const task = props.task;

  const name = task.name;
  const description = task.description;
  const priority = task.priority;

  const [deletingTask, setDeletingTask] = useState(false);

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
        <Popover>
          <PopoverTrigger>
            <IconBlock type="success" icon={Check} />
          </PopoverTrigger>
          <PopoverContent className="mr-6 flex w-auto items-center gap-4">
            <span>Coming soon...</span>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger>
            <IconBlock type="edit" icon={FileEdit} />
          </PopoverTrigger>
          <PopoverContent className="mr-6 flex w-auto items-center gap-4">
            <span>Coming soon...</span>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger>
            <IconBlock type="delete" icon={Trash2} />
          </PopoverTrigger>
          <PopoverContent className="mr-6 flex w-auto items-center gap-4">
            <span>Are you sure?</span>
            <Button
              className="flex h-8 w-12"
              onClick={() => deleteTask(name, setDeletingTask)}
              disabled={deletingTask}
            >
              {deletingTask ? (
                <RotateCw className="h-4 w-4 animate-spin" />
              ) : (
                'Yes'
              )}
            </Button>
          </PopoverContent>
        </Popover>
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
