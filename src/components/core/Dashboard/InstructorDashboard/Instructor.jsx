import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { getInstructorData } from '../../../../services/operations/profileAPI';
import InstructorChart from './InstructorChart';
import { Link } from 'react-router-dom';

const Instructor = () => {
    const {token} = useSelector((state)=> state.auth);
    const {user} = useSelector((state)=>state.profile);
    const [loading, setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState(null);
    const [courses, setCourses] = useState([]);

    useEffect(()=> {
        const getCourseDataWithStats = async() => {
            setLoading(true);
            
            const instructorApiData = await getInstructorData(token);
            const result = await fetchInstructorCourses(token);
            console.log("instructor course details "+result);
            console.log(instructorApiData);

            if(instructorApiData.length)
                setInstructorData(instructorApiData);

            if(result) {
                setCourses(result);
            }
            setLoading(false);
        }
        getCourseDataWithStats();
    },[])

    const totalAmount = instructorData?.reduce((acc,curr)=> acc + curr.totalAmountGenerated, 0);
    const totalStudents = instructorData?.reduce((acc,curr)=>acc + curr.totalStudentsEnrolled, 0);

  return (
    <div className='text-richblack-600 font-bold'>
      <div>
        <h1 className='text-2xl '>Hi, {user?.firstName}</h1>
      </div>

      {loading ? (<div className='spinner'></div>)
      :courses.length > 0 
        ? (<div>
            <div>
            <div>
                <InstructorChart  courses={instructorData}/>
                <div className='flex flex-row text-xl rounded-xl p-4 border border-richblack-200'>
                    <p className='text-yellow-100 text-2xl bold'>Statistics</p>
                    <div className='m-8'>
                        <p>Total Courses</p>
                        <p>{courses.length}</p>
                    </div>

                    <div className='m-8'>
                        <p>Total Students</p>
                        <p>{totalStudents}</p>
                    </div>

                    <div className='m-8'>
                        <p>Total Income</p>
                        <p>{totalAmount}</p>
                    </div>
                </div>
            </div>
        </div>
        <div>
            {/* Render 3 courses */}
            <div className='flex flex-row text-l text-center p-4'>
                <p className='text-xl'>Your Courses {">>  "}</p>
                <Link to="/dashboard/my-courses">
                    <button className='flex items-center border-2 border-yellow-100 cursor-pointer gap-x-1 rounded-md py-1 px-4 font-semibold text-yellow-100 '>View all</button>
                </Link>
            </div>
            <div className='flex flex-row'>
                {
                    courses.slice(0,3).map((course, index)=> (
                        <div className='p-4' key={index}>
                            <img className='h-44 w-12/12'
                                src={course.thumbnail}
                            />
                            <div>
                                <p>CourseName : {course.courseName}</p>
                                <div>
                                    <p>studentsEnrolled : {course.studentsEnrolled.length} students</p>
                                    <p>Price : Rs {course.price}</p>
                                </div>

                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
        </div>
        
        )
        :(<div>
            <p>You have not created any courses yet</p>
            <Link to={"/dashboard/addCourse"}>
                Create a Course
            </Link>
        </div>)}
    </div>
  )
}

export default Instructor
