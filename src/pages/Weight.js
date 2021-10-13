import React from "react";
import { useParams, useLocation } from "react-router-dom";
import Navbar from '../components/Navbar'
import FormWeight from '../components/FormWeight'

function Weight (){

   const { current } = useParams()
   const location = useLocation()
   const { code } = location.state

   console.log('code ss: ', code, ' url ', current);
    return(        
        <React.Fragment>    
        <Navbar />
            <FormWeight codeCustomer={code}/>                    
        </React.Fragment>    
    );
}

export default Weight;