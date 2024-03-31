import { Link } from "react-router-dom"

const CourseList = ({courses}) =>{
    return (
        <>
            {
                courses.map(course =>(
                    <Link key={course.id} to={`/courses/${course.id}`} className="course-list-item">
                        <h3>{course.title}</h3>
                        <p>{course.content.substring(0,150)}...</p>
                    </Link>   
                ))
            }
        </>
    )
}

export default CourseList;