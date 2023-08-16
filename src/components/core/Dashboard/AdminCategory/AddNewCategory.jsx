import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import {  useSelector } from "react-redux"
import React from 'react'
import { Navigate, useNavigate } from "react-router-dom"
import {
  AddCourseCategories,
} from "../../../../services/operations/courseDetailsAPI"

export default function AddNewCategory() {

    const navigate=useNavigate();
    const {
        register,
        reset,
        handleSubmit,
        formState,
        formState: { errors, isSubmitSuccessful },
      } = useForm();

      const { token } = useSelector((state) => state.auth)
      const [loading, setLoading] = useState(false)

      useEffect(() => {
        if (formState.isSubmitSuccessful) {
          reset({ categoryName: '', categoryDescription:'' });
          navigate('/dashboard/all-categories');
        }
      }, [isSubmitSuccessful]);
      // handle form submission
      const onSubmit = async (data) => {
        console.log(data)
        setLoading(true)
        let result

        result = await AddCourseCategories(
            {
              categoryName: data.categoryName,
              categoryDescription: data.categoryDescription,
            },
            token
          )
        }
    
    return (
    <div>
        <div className="space-y-10 rounded-md border-[1px] border-richblack-700 p-6">
          <p className="text-2xl font-bold text-richblack-600">Add Category</p>
          <form onSubmit={handleSubmit(onSubmit)} className="text-richblack-600 space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="categoryName">
                Category Name <sup className="text-pink-200">*</sup>
              </label>
              <input
                id="categoryName"
                disabled={loading}
                placeholder="Add a Category Name"
                {...register("categoryName", { required: true })}
                className="form-style border-2 border-richblack-200 bg-white text-richblack-600 w-full"
              />
              {errors.categoryName && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                    category name is required
                    </span>
                )}
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="categoryDescription">
                Category Description <sup className="text-pink-200">*</sup>
              </label>
              <input
                id="categoryDescription"
                disabled={loading}
                placeholder="Add a Category Description"
                {...register("categoryDescription", { required: true })}
                className="form-style border-2 border-richblack-200 bg-white text-richblack-600 w-full"
              />
              {errors.categoryDescription && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                    category Description is required
                    </span>
                )}
            </div>
            <button
                // onClick={AddCourseCategories}
                className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-yellow-100 py-[8px] px-[20px] font-semibold text-richblack-900`}
                >
                Add Category
            </button>
          </form>
    
        </div>
    </div>
        
      )
}
