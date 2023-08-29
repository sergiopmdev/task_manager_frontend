'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const styles = {
  labelInputWrapper: 'relative flex flex-col gap-2',
};

export default function LoginPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <form className="relative flex w-[22rem] flex-col gap-4 rounded-md bg-gray-100 px-6 py-7">
        <h1 className="mb-4 text-3xl font-semibold">Sign in</h1>
        <div className={styles.labelInputWrapper}>
          <Label htmlFor="email">Email</Label>
          <Input type="text" placeholder="Put your email..." />
        </div>
        <div className={styles.labelInputWrapper}>
          <Label htmlFor="password">Password</Label>
          <Input type="password" placeholder="*********" />
        </div>
        <Button className="mt-4 bg-gray-700" type="submit">
          Send
        </Button>
      </form>
    </div>
  );
}
