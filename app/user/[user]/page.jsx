'use client';

import { Button } from '@/components/ui/button';
import { CheckSquare } from 'lucide-react';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';

export default function UserPage() {
  const router = useRouter();

  useMemo(() => {
    if (!localStorage.getItem('name')) {
      router.replace('/login');
    }
  }, []);

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
            <Button
              className="h-9"
              onClick={() => {
                localStorage.clear();
                router.replace('/login');
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
