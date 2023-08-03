import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const pageStyles = {
  labelInputWrapper: 'flex flex-col gap-2',
};

export default function RegisterPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <form className="flex w-[22rem] flex-col gap-4 rounded-md bg-gray-100 px-6 py-7">
        <h1 className="mb-4 text-3xl font-semibold">Sign up</h1>
        <div className={pageStyles.labelInputWrapper}>
          <Label htmlFor="name">Name</Label>
          <Input type="text" placeholder="Your name..." />
        </div>
        <div className={pageStyles.labelInputWrapper}>
          <Label htmlFor="email">Email</Label>
          <Input type="email" placeholder="Your email..." />
        </div>
        <div className={pageStyles.labelInputWrapper}>
          <Label htmlFor="password">Name</Label>
          <Input type="password" placeholder="*********" />
        </div>
        <Button className="mt-4 bg-gray-700" type="submit">
          Send
        </Button>
      </form>
    </div>
  );
}
