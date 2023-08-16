import React from 'react'
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
import { useEffect } from 'react';
import { useState } from 'react'
import { FiEdit } from 'react-icons/fi';
import {RiDeleteBin6Line} from 'react-icons/ri'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  deleteCategory,
  fetchCourseCategories,
} from "../../../../services/operations/courseDetailsAPI"
import ConfirmationModal from "../../../common/ConfirmationModal"


export default function ShowAllCategories() {

  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const [allCategories, setAllCategories]=useState([]);
  useEffect(()=>{
    setLoading(true);
    const getAllCategories = async () => {
      const res = await fetchCourseCategories(token);
      setAllCategories(res);
      // console.log("all category "+res);
    };
    getAllCategories();
    setLoading(false);
  },[])
  
  const handleCategoryDelete = async (categoryId) => {
    setLoading(true)
    await deleteCategory(categoryId, token)
    const result = await fetchCourseCategories(token)
    if (result) {
      setAllCategories(result)
    }
    setConfirmationModal(null)
    setLoading(false)
  }


  return (
    <div className="border border-yellow-100 rounded-xl p-4">
        <p className="text-2xl mb-8 font-semibold text-yellow-100 text-center">All Categories</p>
        {
          loading ? (<button type="button" className="bg-indigo-500 ..." disabled>
          <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
          </svg>
          Processing...
        </button>) : (
        <div className='p-4'>
          <Table>
            <Thead className='text-center text-yellow-200'>
                <Tr className="border-b-richblack-800">
                  <Th className="text-left text-lg font-bold uppercase">
                    Category Name
                  </Th>
                  <Th className="text-left text-lg font-bold uppercase">
                    Category Description
                  </Th>
                  <Th className="text-left text-lg font-bold uppercase">
                    Actions
                  </Th>
                </Tr>
          </Thead>

          <Tbody className='mt-4'>
            {
            allCategories?.length === 0 ? (
              <Tr>
                <Td className="py-10 px-12 text-center text-2xl font-medium text-richblack-600">
                  No Categories found
                </Td>
              </Tr>
            )
             : (
              allCategories?.map((category, index) => (
                <Tr
                  key={index}
                  className=" border-b border-richblack-800 text-richblack-600 mt-4"
                >
                  <Td className="flex gap-x-4">
                    <div>
                      <p className="text-lg font-semibold text-richblack-600">
                          {category?.name}
                        </p>
                    </div>
                      
                  </Td>
                  <Td>
                    {category.description}
                  </Td>
                  <Td >
                    <button
                      onClick={() => {
                        navigate(`/dashboard/edit-category/${category._id}`)
                      }}
                      title="Edit"
                      className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                    >
                    <FiEdit size={20} />
                    </button>
                    <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this category ?",
                        text2:
                          "All the data related to this category will be deleted",
                        btn1Text: !loading ? "Delete" : "Loading...  ",
                        btn2Text: "Cancel",
                        btn1Handler: !loading
                          ? () => handleCategoryDelete(category._id)
                          : () => {},
                        btn2Handler: !loading
                          ? () => setConfirmationModal(null)
                          : () => {},
                      })
                    }}
                    title="Delete"
                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                  </Td>
                </Tr>
              ))
            )}
                </Tbody>
            </Table>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
          )
        }
    </div>
  )
}
