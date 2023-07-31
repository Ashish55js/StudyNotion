import React, { useState } from 'react'

import {Chart, registerables} from "chart.js"
import {Pie} from "react-chartjs-2"

Chart.register(...registerables);

const InstructorChart = ({courses}) => {

    const [currChart, setCurrChart] = useState("students");
    const [isActive, setIsActive] = useState(false);

    //functio to genertae random colors
    const getRandomColors = (numColors) => {
        const colors = [];
        for(let i=0; i<numColors; i++) {
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random()*256)},
            ${Math.floor(Math.random()*256)})`
            colors.push(color);
        }
        return colors;
    }

    //create data for chart displaying student info

    const chartDataForStudents = {
        labels: courses.map((course)=> course.courseName),
        datasets: [
            {
                data: courses.map((course)=> course.totalStudentsEnrolled),
                backgroundColor: getRandomColors(courses.length),
            }
        ]
    }


    //create data for chart displaying income info
    const chartDataForIncome = {
        labels:courses.map((course)=> course.courseName),
        datasets: [
            {
                data: courses.map((course)=> course.totalAmountGenerated),
                backgroundColor: getRandomColors(courses.length),
            }
        ]
    }


    //create options
    const options = {

    };


  return (
    <div>
      <p className='text-center font-bold text-2xl'>Visualization Of Data</p>
      <div className='flex gap-x-5'>
        <button className={`${!isActive ? 'text-white bg-yellow-200' : 'border-yellow-50'} flex items-center border border-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold`}
        onClick={() => {setIsActive(!isActive); setCurrChart("students")}}>
            Student
        </button>

        <button className={`${isActive ? 'text-yellow bg-yellow-200' : 'border-yellow-50'} flex items-center border border-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold `}
        onClick={() => {setIsActive(!isActive); setCurrChart("income")}}
        >
            Income
        </button>
      </div>
      <div className="w-8/12 h-8/12 mx-48 px-32 my-4">
        <Pie 
            data={currChart === "students" ? chartDataForStudents : chartDataForIncome}
            options={options}
        />
      </div>
    </div>
  )
}

export default InstructorChart
