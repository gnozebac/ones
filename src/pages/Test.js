import React from "react";
import { useEffect, useState } from "react";
import { useFormik } from "formik";

function ChatRoomPage() {
  const loadCustomer = {
    id:'',
    systemId:'',
    firstname:'',
    lastname:'',
    height:''

  }
  const [customer, setCustomer]= useState(loadCustomer)

  useEffect(()=>{
    fetch(`https://besport.herokuapp.com/customers/2`)
    .then(response => response.json())
    .then(data => setCustomer(data));     
  },[]);

  const formik = useFormik(
    {
      initialValues: customer
      ,
      onSubmit: values => console.log(values),
      enableReinitialize: true,
      
    }
  )
 
  return (
    <form onSubmit={formik.handleSubmit}>
      <label>
      </label>
        <input 
        name = 'firstname'
        type = 'text'
        onChange= {formik.handleChange}
        value={formik.values.firstname}
        />
    </form>
  );
}
export default ChatRoomPage;