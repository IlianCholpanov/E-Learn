import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface Course {
  id: string;
  name: string;
  description: string;
  lessons: number;
  isActive: boolean;
  image: string;
}

interface CoursesContextType {
  courses: Course[];
  handleDeleteCourse: (id: string) => Promise<void>;
  handleUpdateCourse: (updatedCourse: Course) => Promise<void>;
  handleUpdateStatus: (id: string, newStatus: boolean) => Promise<void>;
}

export const CoursesContext = createContext<CoursesContextType>({
  courses: [],
  handleDeleteCourse: async () => {},
  handleUpdateCourse: async () => {},
  handleUpdateStatus: async () => {},
});

interface CoursesProviderProps {
  children: ReactNode;
}

export const CoursesProvider: React.FC<CoursesProviderProps> = ({
  children,
}) => {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: boolean) => {
    try {
      await axios.patch(`http://localhost:3000/courses/${id}`, {
        isActive: newStatus,
      });
      setCourses((prev) =>
        prev.map((c) => (c._id === id ? { ...c, isActive: newStatus } : c))
      );
    } catch (error) {
      console.error("Error updating course status:", error);
    }
  };

  const handleUpdateCourse = async (updatedCourse: Course) => {
    try {
      await axios.patch(`http://localhost:3000/courses/${id}`);
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course._id === updatedCourse._id ? updatedCourse : course
        )
      );
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const handleDeleteCourse = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/courses/${id}`);
      // await axios.delete(`${API_URL}/${id}`);
      setCourses(courses.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <CoursesContext.Provider
      value={{
        courses,
        handleDeleteCourse,
        handleUpdateCourse,
        handleUpdateStatus,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};

export default CoursesContext;
