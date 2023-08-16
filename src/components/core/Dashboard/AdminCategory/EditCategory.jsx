import React, { useEffect, useState } from 'react'
// import AddNewCategory from './AddNewCategory'
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryById, updateCategory } from '../../../../services/operations/courseDetailsAPI';

export default function EditCategory() {
  const navigate=useNavigate();
  const {
      register,
      reset,
      handleSubmit,
      setValue,
      getValues,
      formState,
      formState: { errors, isSubmitSuccessful },
    } = useForm();
    
    const [categoryName, setCategoryName]=useState("");
    const [categoryDescription, setCategoryDescription]=useState("");

    const {categoryId} = useParams();
    // console.log("category Id "+categoryId);
    const {token} = useSelector((state)=>state.auth);
    useEffect(()=> {
      const getSingleCategories = async () => {
        const res = await fetchCategoryById(categoryId,token);
        // dispatch(setCategories(res));
        console.log("single category "+res);
        setValue("categoryName", res.name);
        setCategoryName(res.name);
        setValue("categoryDescription", res.description);
        setCategoryDescription(res.description);
      };
      getSingleCategories();
    },[])


    const isFormUpdated = () => {
      const currentValues = getValues()
      console.log("changes after editing form values:", currentValues)
      if (
        currentValues.categoryName !== categoryName ||
        currentValues.categoryDescription !== categoryDescription 
      ) {
         return true;
      }
      else return false;
    }
  
    //   handle next button click
    const onSubmit = async (data) => {
      console.log("form data before update "+JSON.stringify(data));
      console.log("isFormUpdated "+isFormUpdated());     
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData();
        formData.append("categoryName", data.categoryName)
        formData.append("categoryDescription", data.categoryDescription);
        console.log("form data after update "+JSON.stringify(data));

        const result = await updateCategory(
          {
            categoryId:categoryId,
            categoryName: data.categoryName,
            categoryDescription: data.categoryDescription,
          },
          token
        )
        console.log("result "+result);
        if(result.success){
          navigate(-1);
        }     
      }
      else {
        toast.error("No changes made to the form")
      }
      return
    }
  
  return (
    <div className='text-richblack-600 '>
      <div>
        <div className="space-y-10 rounded-md border-[1px] border-richblack-700 p-6">
          <p className="text-2xl font-semibold">Update Category</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="categoryName">
                Category Name <sup className="text-pink-200">*</sup>
              </label>
              <input
                id="categoryName"
                // disabled={loading}
                // value={categoryName}
                placeholder="Add a Category Name"
                {...register("categoryName", { required: true })}
                className="form-style w-full text-richblack-600 border-2 border-richblack-100 bg-white"
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
                // disabled={loading}
                placeholder="Add a Category Description"
                {...register("categoryDescription", { required: true })}
                className="form-style w-full border-2 text-richblack-600 border-richblack-100 bg-white"
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
                Update Category
            </button>
          </form>
        
        </div>
    </div>
    </div>
  )
}
