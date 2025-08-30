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
import { EditCourseModal } from "./EditCourseModal";
import { formatDate } from "@/utils/helpers";

export function TableLayout() {
  const { courses, handleDeleteCourse, handleUpdateCourse } =
    useContext(CoursesContext);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<{
    id: string;
    name: string;
    description: string;
    lessons: number;
  } | null>(null);

  const confirmDelete = (courseId: string) => {
    setSelectedCourseId(courseId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedCourseId) handleDeleteCourse(selectedCourseId);

    setDeleteModalOpen(false);
    setSelectedCourseId(null);
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setSelectedCourseId(null);
  };

  const handleEdit = (course: {
    id: string;
    name: string;
    description: string;
    lessons: number;
  }) => {
    setSelectedCourse(course);
    setEditModalOpen(true);
  };

  const handleConfirmEdit = (updatedCourse: {
    id: string;
    name: string;
    description: string;
    lessons: number;
  }) => {
    handleUpdateCourse(updatedCourse);
    setEditModalOpen(false);
    setSelectedCourse(null);
  };

  const handleCancelEdit = () => {
    setEditModalOpen(false);
    setSelectedCourse(null);
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
                key={course._id || course?.id}
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
                  {formatDate(course.dateAdded)}
                </TableCell>
                <TableCell>
                  <div className="bg-primary/10 p-1 rounded-full w-fit">
                    <BookOpen className="h-5 w-6 text-primary" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="rounded-full w-fit flex gap-2">
                    <Pen
                      className="h-5 w-6 text-primary cursor-pointer"
                      onClick={() =>
                        handleEdit({
                          id: course._id,
                          name: course.name,
                          description: course.description,
                        })
                      }
                    />
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
        isOpen={deleteModalOpen}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />

      <EditCourseModal
        isOpen={editModalOpen}
        onCancel={handleCancelEdit}
        onConfirm={handleConfirmEdit}
        course={selectedCourse}
      />
    </>
  );
}
