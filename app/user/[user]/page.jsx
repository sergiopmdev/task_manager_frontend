'use client';

import { Button } from '@/components/ui/button';
import { CheckSquare } from 'lucide-react';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useUser from '@/app/stores/user';

export default function UserPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const name = useUser((state) => state.name);

  useEffect(() => {
    if (localStorage.getItem('name')) {
      persistUserData();
      setAuth(true);
    } else {
      router.push('/login');
    }
  }, []);

  if (auth) {
    return (
      <>
        <header className="h-20 w-full">
          <div className="m-auto flex h-full max-w-[1440px] items-center justify-between px-4">
            <div className="flex cursor-pointer items-center gap-2">
              <h1 className="text-2xl font-semibold">TM</h1>
              <CheckSquare className="stroke-[3px]" />
            </div>
            <div className="flex items-center gap-4">
              <h1>{name}</h1>
              <span>|</span>
              <Button
                className="h-9"
                onClick={() => {
                  setAuth(false);
                  endUserSession(router);
                  router.push('/login');
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </header>
      </>
    );
  }
}

function persistUserData() {
  useUser.getState().setName(localStorage.getItem('name'));
  useUser.getState().setEmail(localStorage.getItem('email'));
  useUser.getState().setToken(localStorage.getItem('token'));
}

function endUserSession() {
  localStorage.clear();
  useUser.getState().setName(undefined);
  useUser.getState().setEmail(undefined);
  useUser.getState().setToken(undefined);
}
