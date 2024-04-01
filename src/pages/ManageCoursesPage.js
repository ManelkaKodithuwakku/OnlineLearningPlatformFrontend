import { useState, useEffect } from "react";
import axios from "axios";
import { useToken } from "../auth/useToken";
import { useCourses } from "../hooks/useCourses";

export const ManageCoursesPage = () => {
    const [token] = useToken();
    const [toggle, setToggle] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [submitButtonName, setSubmitButtonName] = useState('Add new course')
    const [courseId, setCourseId]=useState(null)
    const courses = useCourses()


    useEffect(() => {
        if (showSuccessMessage) {
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);
        }
    }, [showSuccessMessage]);

    const onAddNewCourse = async () => {

        if(submitButtonName==='Add new course'){
            try{
                await axios.post('/api/admin/add/course', {
                    title: title,
                    content: content,
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setShowSuccessMessage(true)
                
            }catch(e){
                setErrorMessage(e.response.data.message)
            }
        }else{
            try{
                await axios.put(`/api/admin/update/${courseId}`, {
                    title: title,
                    content: content,
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setShowSuccessMessage(true)
                
            }catch(e){
                setErrorMessage(e.response.data.message)
            }
        }
        setTitle("");
        setContent("");
        setCourseId(null);
        setSubmitButtonName("Add new course");
        window.location.reload()
    }


    return (
        <>
            <div className="manage-course-container">
                <h1>Manage Courses</h1>
                {showSuccessMessage && <div className="success">Successfully saved course data!</div>}
                {errorMessage && <div className="fail">{errorMessage}</div>}
                {toggle && <div className="add-course-section">
                    <input 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="course title"
                    />
                    <textarea 
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        placeholder="course description"

                    />
                    <button 
                        disabled={!title || !content}
                        onClick={onAddNewCourse}>{submitButtonName}</button>
                </div>}
                <button onClick={()=>{
                    setToggle(!toggle)
                    setContent('');
                    setTitle('');
                    setSubmitButtonName('Add new course');
                    setCourseId(null);
                }}>{toggle ? '- Hide Input Form' : '+ Show Input Form'}</button>

                {
                    courses.map((course)=>
                        (
                            <div key={course.id}>
                                <div  className="course-list">
                                    <div>
                                        <h1>{course.title}</h1>
                                        <div>
                                            {course.content.substring(0,50)}...
                                        </div>
                                    </div>
                                    <button onClick={()=>{
                                        setToggle(true)
                                        setContent(course.content);
                                        setTitle(course.title);
                                        setSubmitButtonName('update course');
                                        setCourseId(course.id);
                                    }}>update</button>
                                </div>
                            </div>
                        )
                    )
                }
            </div>
        </>
    );
};