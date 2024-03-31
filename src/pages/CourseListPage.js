import CourseList from "../components/CourseList"
import courses from "./course-content"

export const CourseListPage = () => {
    return (
        <>
            <h1>Courses</h1>
            <CourseList courses={courses} />
        </>
    )
}