import { useParams } from "react-router-dom"
import courses from "./course-content"
import { useState, useEffect } from "react"; // Import useEffect
import axios from "axios";
import { useToken } from "../auth/useToken";

export const CourseDetailPage = () => {
    const [token] = useToken();
    const { courseId } = useParams();
    const [isEnroll, setIsEnroll] = useState(false); // Initialize isEnroll with false

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            try {
                const response = await axios.get(`/api/user/details`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const { enrolledCourses } = response.data;
                // Check if the courseId exists in the enrolledCourses array
                setIsEnroll(enrolledCourses.includes(courseId));
            } catch (error) {
                console.error("Error fetching enrolled courses:", error);
            }
        };

        fetchEnrolledCourses(); // Call the fetchEnrolledCourses function
    }, [courseId, token]); // Add courseId and token as dependencies

    const course = courses.find(course => course.id === courseId);

    const onEnrolledClick = async () => {
        setIsEnroll(!isEnroll)
        try {
            const response = await axios.put(`/api/user/enroll/${courseId}`, {
                isEnroll: !isEnroll // Invert the value of isEnroll
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const { isSuccess } = response.data;

            if (!isSuccess) {
                setIsEnroll(!isEnroll); // Toggle the state only if the operation was successful
            }
        } catch (error) {
            console.error("Error updating enrollment status:", error);
            setIsEnroll(!isEnroll)
        }
    };

    return (
        <>
            <div className="course-enroll">
                <h1>{course.title}</h1>
                <button onClick={onEnrolledClick} className="course-enroll-button">
                    {isEnroll ? 'UnEnroll' : 'Enroll'}
                </button>
            </div>
            <p>{course.content}</p>
        </>
    );
};
