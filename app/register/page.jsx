'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../validation/register';

const styles = {
  labelInputWrapper: 'relative flex flex-col gap-2',
  inputError: 'text-xs text-red-600 line-clamp-1',
};

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  function onSubmitHandler(userData) {
    console.log(userData);
  }

  const errorsExists = errors.name || errors.email || errors.password;

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <form
        className="flex w-[22rem] flex-col gap-4 rounded-md bg-gray-100 px-6 py-7"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <h1 className="mb-4 text-3xl font-semibold">Sign up</h1>
        <div className={styles.labelInputWrapper}>
          <Label htmlFor="name">Name</Label>
          <Input
            {...register('name')}
            type="text"
            placeholder="Put your name..."
          />
        </div>
        <div className={styles.labelInputWrapper}>
          <Label htmlFor="email">Email</Label>
          <Input
            {...register('email')}
            type="email"
            placeholder="Put your email..."
          />
        </div>
        <div className={styles.labelInputWrapper}>
          <Label htmlFor="password">Name</Label>
          <Input
            {...register('password')}
            type="password"
            placeholder="*********"
          />
        </div>
        {errorsExists && (
          <div className="pl-2">
            {errors.name?.message && (
              <p className={styles.inputError}>* {errors.name?.message}</p>
            )}
            {errors.email?.message && (
              <p className={styles.inputError}>* {errors.email?.message}</p>
            )}
            {errors.password?.message && (
              <p className={styles.inputError}>* {errors.password?.message}</p>
            )}
          </div>
        )}
        <Button className="mt-4 bg-gray-700" type="submit">
          Send
        </Button>
      </form>
    </div>
  );
}
