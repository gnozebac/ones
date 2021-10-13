import React from "react";
import Navbar from '../components/Navbar'
import FormUpdate from '../components/FormUpdate'
import { useLocation } from "react-router-dom";

function CustomerUpdate (){

    const location = useLocation()
    const { systemId } = location.state

  /*  const query  = useQuery();
    const systemId=query.get('id');*/

    return(        
        <React.Fragment>    
            <Navbar />
            <FormUpdate systemIdc = {systemId}/>                    
        </React.Fragment>
    );
}

export default CustomerUpdate;