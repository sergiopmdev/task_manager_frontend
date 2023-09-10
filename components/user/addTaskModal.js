import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

const styles = {
  labelInputWrapper: 'relative flex flex-col gap-2',
};

export default function AddTaskModal(props) {
  return (
    <div className="absolute top-0 flex h-screen w-screen items-center justify-center bg-slate-500 bg-opacity-90">
      <form className="relative flex w-[22rem] flex-col gap-4 rounded-md bg-gray-100 px-6 py-7">
        <h1 className="mb-4 text-3xl font-semibold">Add task</h1>
        <div className={styles.labelInputWrapper}>
          <Label htmlFor="email">Name</Label>
          <Input type="text" placeholder="Task name..." />
        </div>
        <div className={styles.labelInputWrapper}>
          <Label htmlFor="description">Description</Label>
          <Input type="description" placeholder="Task description..." />
        </div>
        <Select>
          <Label htmlFor="priority">Priority</Label>
          <SelectTrigger>
            <SelectValue placeholder="Select a priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="apple">High</SelectItem>
              <SelectItem value="banana">Medium</SelectItem>
              <SelectItem value="blueberry">Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button className="mt-4 bg-gray-700" type="submit">
          Send
        </Button>
        <XCircle
          className="absolute right-3 top-3 cursor-pointer"
          onClick={() => props.showAddTaskModal(false)}
        />
      </form>
    </div>
  );
}
