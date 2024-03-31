import { useState, useEffect } from "react";
import { useToken } from "../auth/useToken";
import { useUser } from "../auth/useUser";
import axios from "axios";

export const EnrollPage = () => {

    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const user = useUser();
    const [token] = useToken()


    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            try {
                const response = await axios.get(`/api/user/details`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const { enrolledCourses } = response.data;
                setEnrolledCourses(enrolledCourses);
                
            } catch (error) {
                console.error("Error fetching enrolled courses:", error);
            }
        };

        fetchEnrolledCourses(); // Call the fetchEnrolledCourses function
    }, [token]); // Add courseId and token as dependencies

    return (
        <>
            <h1>{`${user.username} Courses`}</h1>
            <div className="course-container">
                {
                    enrolledCourses.map((course,index) => (
                        <div key={index} className="course-row">
                            <div>{course}</div>
                            <div>Enrolled</div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}