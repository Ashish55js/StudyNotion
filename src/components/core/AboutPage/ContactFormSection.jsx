import React from "react";
import ContactUsForm from "../../ContactPage/ContactUsForm";

const ContactFormSection = () => {
  return (
    <div className="mx-auto x-12 p-12 border rounded-xl border-yellow-100">
      <h1 className="text-center text-yellow-100 text-4xl font-semibold">Get in Touch</h1>
      <p className="text-center text-richblack-500 mt-3">
        We&apos;d love to here for you, Please fill out this form.
      </p>
      <div className="mt-4">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactFormSection;