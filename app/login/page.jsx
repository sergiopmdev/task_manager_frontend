'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RotateCw, CheckSquare } from 'lucide-react';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import useLogin from '../stores/login';

import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../validation/login';

import loginUser from '../services/loginUser';

const styles = {
  labelInputWrapper: 'relative flex flex-col gap-2',
  inputError: 'text-xs text-red-600 line-clamp-1',
};

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const loading = useLogin((state) => state.loading);
  const statusCode = useLogin((state) => state.statusCode);

  useEffect(() => {
    if (statusCode === 200 && localStorage.getItem('name')) {
      router.push(`/user/${localStorage.getItem('name').toLowerCase()}`);
    }
  }, [statusCode]);

  function onSubmitHandler(userData) {
    loginUser(userData);
  }

  const errorsExists = errors.email || errors.password;
  const loadingOrSuccessful = loading || statusCode === 200;

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
        {statusCode === 401 && (
          <span className="absolute -top-8 right-0 rounded-md bg-red-600 px-2 py-1 text-xs font-semibold text-red-200">
            Wrong credentials
          </span>
        )}
        <h1 className="mb-4 text-3xl font-semibold">Sign in</h1>
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
