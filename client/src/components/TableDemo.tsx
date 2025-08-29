import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { BookOpen, Pen, Trash2Icon } from "lucide-react";
import ActionButton from "./ActionButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useContext } from "react";
import CoursesContext from "@/context/ContextProvider";
import DropDown from "./DropDown";

export function TableDemo() {
  const { courses, handleDeleteCourse, handleUpdateCourse } =
    useContext(CoursesContext);

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
            {/* To come from api */}
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
                  {/* <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant={course.isActive ? "default" : "secondary"}
                        className={
                          course.isActive
                            ? "bg-primary/10 text-primary hover:bg-primary/20"
                            : "bg-muted text-muted-foreground"
                        }
                      >
                        {course.isActive ? "Active" : "Archived"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="start">
                      <DropdownMenuGroup>
                        <DropdownMenuItem>Active</DropdownMenuItem>
                        <DropdownMenuItem>Archived</DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu> */}
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
                    <Pen
                      className="h-5 w-6 text-primary cursor-pointer"
                      onClick={() => console.log("clicking")}
                    />
                    <Trash2Icon
                      className="h-5 w-6 text-primary cursor-pointer"
                      onClick={() => handleDeleteCourse(course._id)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}
