'use client';

import { Button } from '@/components/ui/button';
import { CheckSquare } from 'lucide-react';
import Tasks from '@/components/user/tasks';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useUser from '@/app/stores/user';

import getTasks from '@/app/services/getTasks';
import endUserSession from '@/app/utils/endUserSession';

export default function UserPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const name = useUser((state) => state.name);
  const tasks = useUser((state) => state.tasks);

  useEffect(() => {
    if (localStorage.getItem('name')) {
      persistUserData();
      setAuth(true);
      getTasks(router);
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
        <Tasks tasks={tasks} />
        <Button className="absolute bottom-5 right-5">Add task</Button>
      </>
    );
  }
}

function persistUserData() {
  useUser.getState().setName(localStorage.getItem('name'));
  useUser.getState().setEmail(localStorage.getItem('email'));
  useUser.getState().setToken(localStorage.getItem('token'));
}
