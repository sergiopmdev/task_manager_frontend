'use client';

import { Button } from '@/components/ui/button';
import { CheckSquare } from 'lucide-react';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useUser from '@/app/stores/user';

import checkUserAuth from '@/app/services/checkUserAuth';
import logoutUser from '@/app/services/logoutUser';

export default function UserPage() {
  const router = useRouter();
  const authenticated = useUser((state) => state.authenticated);

  useEffect(() => {
    const setAuthenticated = useUser.getState().setAuthenticated;
    if (localStorage.getItem('name')) {
      setAuthenticated('authenticated');
    } else {
      setAuthenticated('unauthenticated');
    }
    if (checkUserAuth() === 'unauthenticated') {
      router.push('/login');
    }
  }, []);

  if (authenticated === 'authenticated') {
    return (
      <>
        <header className="h-20 w-full">
          <div className="m-auto flex h-full max-w-[1440px] items-center justify-between px-4">
            <div className="flex cursor-pointer items-center gap-2">
              <h1 className="text-2xl font-semibold">TM</h1>
              <CheckSquare className="stroke-[3px]" />
            </div>
            <div className="flex items-center gap-4">
              <h1>{localStorage.getItem('name')}</h1>
              <span>|</span>
              <Button className="h-9" onClick={() => logoutUser(router)}>
                Logout
              </Button>
            </div>
          </div>
        </header>
      </>
    );
  }
}
