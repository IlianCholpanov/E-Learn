import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "./Input";

interface EditCourseModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: (updatedCourse: {
    id: string;
    name: string;
    description: string;
    lessons: number;
  }) => void;
  course: {
    id: string;
    name: string;
    description: string;
    lessons: number;
  } | null;
}

export function EditCourseModal({
  isOpen,
  onCancel,
  onConfirm,
  course,
}: EditCourseModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [lessons, setLessons] = useState(0);

  useEffect(() => {
    if (isOpen && course) {
      setName(course.name);
      setDescription(course.description);
      setLessons(course.lessons || 0);
    }
  }, [isOpen, course]);

  const handleConfirm = () => {
    if (course) {
      onConfirm({ id: course.id, name, description, lessons });
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onCancel}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Course</AlertDialogTitle>
          <AlertDialogDescription>
            Update the details of the course.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Course Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Course Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            placeholder="Course Lessons"
            value={lessons}
            onChange={(e) => setLessons(Number(e.target.value) || 0)}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>Save</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
