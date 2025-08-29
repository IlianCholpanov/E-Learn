import { useContext, useState } from "react";
import CoursesContext from "@/context/ContextProvider";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card } from "@/components/ui/card";
import { Button } from "./ui/button";
import { BookOpen, Pen, Trash2Icon } from "lucide-react";

import ActionButton from "./ActionButton";
import DropDown from "./DropDown";
import { DeleteModal } from "./DeleteModal";

export function TableLayout() {
  const { courses, handleDeleteCourse, handleUpdateCourse } =
    useContext(CoursesContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const confirmDelete = (courseId: string) => {
    setSelectedCourseId(courseId);
    setModalOpen(true);
  };

  const handleConfirm = () => {
    if (selectedCourseId) handleDeleteCourse(selectedCourseId);

    setModalOpen(false);
    setSelectedCourseId(null);
  };

  const handleCancel = () => {
    setModalOpen(false);
    setSelectedCourseId(null);
  };

  return (
    <>
      <ActionButton onUpdate={() => handleEdit(invoices.id)} />
      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold text-foreground">
                ID
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                Course name
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                Description
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                Lessons(count)
              </TableHead>
              <TableHead className="font-semibold text-foreground pl-6">
                State
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                Date added
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                Image
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course, _idx) => (
              <TableRow
                key={course._id}
                className="hover:bg-muted/30 transition-colors"
              >
                <TableCell className="font-medium">{_idx + 1}</TableCell>
                <TableCell className="font-medium text-foreground">
                  {course.name}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {course.description}
                </TableCell>
                <TableCell className="text-center">{course.lessons}</TableCell>
                <TableCell>
                  <DropDown course={course} />
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {course.dateAdded}
                </TableCell>
                <TableCell>
                  <div className="bg-primary/10 p-1 rounded-full w-fit">
                    <BookOpen className="h-5 w-6 text-primary" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="rounded-full w-fit flex gap-2">
                    <Pen className="h-5 w-6 text-primary cursor-pointer" />
                    <Trash2Icon
                      className="h-5 w-6 text-primary cursor-pointer"
                      onClick={() => confirmDelete(course._id)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <DeleteModal
        isOpen={modalOpen}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </>
  );
}
