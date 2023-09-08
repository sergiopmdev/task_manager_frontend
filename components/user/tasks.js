import { RotateCw } from 'lucide-react';
import Task from './task';

export default function Tasks(props) {
  const tasks = props.tasks;

  if (tasks) {
    return (
      <div className="mt-5 w-full">
        <div className="m-auto flex max-w-[1440px] flex-col px-4">
          <h1 className="text-xl font-semibold">Tasks</h1>
          <div className="mt-2 flex flex-col gap-2">
            {tasks.map((task, key) => {
              return (
                <div key={key}>
                  <Task task={task} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return <RotateCw className="absolute left-1/2 top-1/2 animate-spin" />;
}
