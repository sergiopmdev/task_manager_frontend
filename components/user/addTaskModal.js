import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { XCircle, RotateCw } from 'lucide-react';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { yupResolver } from '@hookform/resolvers/yup';
import { taskSchema } from '@/app/validation/task';

import useTask from '@/app/stores/task';

import addTask from '@/app/services/addTask';

const styles = {
  labelInputWrapper: 'relative flex flex-col gap-2',
  inputError: 'text-xs text-red-600 line-clamp-1',
};

export default function AddTaskModal(props) {
  const router = useRouter();

  const loading = useTask((state) => state.loading);
  const statusCode = useTask((state) => state.statusCode);

  const showAddTaskModal = props.showAddTaskModal;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(taskSchema),
  });

  function onSubmitHandler(taskData) {
    addTask(taskData, router, showAddTaskModal);
  }

  const errorsExists = errors.name || errors.description || errors.priority;
  const loadingOrSuccessful = loading || statusCode === 200;

  return (
    <div className="absolute top-0 flex h-screen w-screen items-center justify-center bg-slate-500 bg-opacity-90">
      <form
        className="relative flex w-[22rem] flex-col gap-4 rounded-md bg-gray-100 px-6 py-7"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        {statusCode === 409 && (
          <span className="absolute -top-8 right-0 rounded-md bg-red-600 px-2 py-1 text-xs font-semibold text-red-200">
            Task exists
          </span>
        )}
        <h1 className="mb-4 text-3xl font-semibold">Add task</h1>
        <div className={styles.labelInputWrapper}>
          <Label htmlFor="email">Name</Label>
          <Input {...register('name')} type="text" placeholder="Task name..." />
        </div>
        <div className={styles.labelInputWrapper}>
          <Label htmlFor="description">Description</Label>
          <Input
            {...register('description')}
            type="text"
            placeholder="Task description..."
          />
        </div>
        <div className={styles.labelInputWrapper}>
          <Label htmlFor="priority">Priority</Label>
          <select
            {...register('priority')}
            className="h-10 cursor-pointer rounded-md border-[1px] border-solid border-slate-200 bg-white pl-3.5 text-sm"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        {errorsExists && (
          <div className="pl-2">
            {errors.name?.message && (
              <p className={styles.inputError}>* {errors.name?.message}</p>
            )}
            {errors.description?.message && (
              <p className={styles.inputError}>
                * {errors.description?.message}
              </p>
            )}
            {errors.priority?.message && (
              <p className={styles.inputError}>* {errors.priority?.message}</p>
            )}
          </div>
        )}
        <Button
          className="mt-4 bg-gray-700"
          type="submit"
          disabled={loadingOrSuccessful}
        >
          {loadingOrSuccessful && (
            <RotateCw className="mr-2 h-5 w-5 animate-spin" />
          )}
          {!loadingOrSuccessful ? 'Send' : 'Sending'}
        </Button>
        <XCircle
          className="absolute right-3 top-3 cursor-pointer"
          onClick={() => showAddTaskModal(false)}
        />
      </form>
    </div>
  );
}
