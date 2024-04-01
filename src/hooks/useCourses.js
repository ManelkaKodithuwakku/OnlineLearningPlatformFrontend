import { useToken } from "../auth/useToken";
import { useEffect, useState } from "react"
import axios from "axios";

export const useCourses = () => {
    const [token] = useToken();
    const [courses, setCourses] = useState([]);

    useEffect(()=>{
        const fetchAllCourses = async () => {

            try {
                const response = await axios.get(`/api/get/courses`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const { courses } = response.data;
                setCourses(courses);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        fetchAllCourses(); 
    },[token])

    return courses;
}