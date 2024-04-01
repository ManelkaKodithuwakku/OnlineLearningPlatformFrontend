import CourseList from "../components/CourseList"
import { useCourses } from "../hooks/useCourses"

export const CourseListPage = () => {
    const courses = useCourses();
    return (
        <>
            <h1>Courses</h1>
            <CourseList courses={courses} />
        </>
    )
}