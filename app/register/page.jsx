'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RotateCw, CheckSquare } from 'lucide-react';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import useRegister from '../stores/register';

import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../validation/register';

import registerUser from '../services/registerUser';

const styles = {
  labelInputWrapper: 'relative flex flex-col gap-2',
  inputError: 'text-xs text-red-600 line-clamp-1',
};

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const loading = useRegister((state) => state.loading);
  const statusCode = useRegister((state) => state.statusCode);

  useEffect(() => {
    if (statusCode === 201) {
      router.push('/login');
    }
  }, [statusCode]);

  function onSubmitHandler(userData) {
    registerUser(userData);
  }

  const errorsExists = errors.name || errors.email || errors.password;
  const loadingOrSuccessful = loading || statusCode === 201;

  return (
    <div className="relative m-auto flex h-screen w-screen max-w-[1440px] items-center justify-center">
      <div className="absolute left-5 top-5 flex cursor-pointer items-center gap-2">
        <h1 className="text-2xl font-semibold">TM</h1>
        <CheckSquare className="stroke-[3px]" />
      </div>
      <form
        className="relative flex w-[22rem] flex-col gap-4 rounded-md bg-gray-100 px-6 py-7"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        {statusCode === 409 && (
          <span className="absolute -top-8 right-0 rounded-md bg-red-600 px-2 py-1 text-xs font-semibold text-red-200">
            User already exists
          </span>
        )}
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
            type="text"
            placeholder="Put your email..."
          />
        </div>
        <div className={styles.labelInputWrapper}>
          <Label htmlFor="password">Password</Label>
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
      </form>
    </div>
  );
}
