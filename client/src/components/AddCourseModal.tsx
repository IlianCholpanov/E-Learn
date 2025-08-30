import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddCourseModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: (newCourse: {
    id: string;
    name: string;
    description: string;
    lessons: number;
    isActive: boolean;
    image: string;
  }) => void;
  course: {
    id: string;
    name: string;
    description: string;
    lessons: number;
    isActive: boolean;
    image: string;
  } | null;
}

export function AddCourseModal({
  isOpen,
  onCancel,
  onConfirm,
  course,
}: AddCourseModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [lessons, setLessons] = useState(0);
  const [status, setStatus] = useState(true);
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (course) {
      setName(course.name);
      setDescription(course.description);
      setLessons(course.lessons);
    }
  }, [course]);

  const handleConfirm = () => {
    if (course) {
      onConfirm({ id: course.id, name, description, lessons });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Course</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleConfirm();
          }}
        >
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Course name</Label>
              <Input
                placeholder="Course Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Description</Label>
              <Input
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="lessons-1">Lessons</Label>
              <Input
                placeholder="Lessons"
                value={lessons}
                onChange={(e) => setLessons(Number(e.target.value))}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
