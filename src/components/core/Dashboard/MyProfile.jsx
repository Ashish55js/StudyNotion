import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { formattedDate } from "../../../utils/dateFormatter"
import IconBtn from "../../common/IconBtn"

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  return (
    <>
      <h1 className="mb-14 text-3xl font-bold text-richblack-600">
        My Profile
      </h1>
      <div className="flex items-center justify-between rounded-md border-[1px] border-yellow-100 text-richblack-600 p-8 px-12">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1 border-yellow-100 rounded-lg">
            <p className="text-lg font-semibold ">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm">{user?.email}</p>
          </div>
        </div>
        <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings")
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-yellow-100 p-8 px-12">
        <div className="flex w-full items-center justify-between border-yellow-100 rounded-lg">
          <p className="text-lg font-semibold">About</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className={`${
            user?.additionalDetails?.about
              ? "text-richblack-600"
              : "text-richblack-300"
          } text-sm font-medium`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-yellow-100 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold ">
            Personal Details
          </p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5 ">
            <div className="border border-yellow-100 p-2 rounded-lg">
              <p className="mb-2 font-bold text-sm text-richblack-600">First Name</p>
              <p className="text-sm font-medium text-richblack-500">
                {user?.firstName}
              </p>
            </div>
            <div className="border border-yellow-100 p-2 rounded-lg">
              <p className="mb-2 font-bold text-sm text-richblack-600">Email</p>
              <p className="text-sm font-medium text-richblack-500">
                {user?.email}
              </p>
            </div>
            <div className="border border-yellow-100 p-2 rounded-lg">
              <p className="mb-2 font-bold text-sm text-richblack-600">Gender</p>
              <p className="text-sm font-medium text-richblack-500">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div className="border border-yellow-100 p-2 rounded-lg">
              <p className="mb-2 text-sm font-bold text-richblack-600">Last Name</p>
              <p className="text-sm font-medium text-richblack-500">
                {user?.lastName}
              </p>
            </div>
            <div className="border border-yellow-100 p-2 rounded-lg">
              <p className="mb-2 text-sm font-bold text-richblack-600">Phone Number</p>
              <p className="text-sm font-medium text-richblack-500">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div className="border border-yellow-100 p-2 rounded-lg">
              <p className="mb-2 text-sm font-bold text-richblack-600">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-500">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}