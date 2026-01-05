import axios from 'axios';
import React,{useEffect, useState} from 'react'
import apis from "../../utilities/api.js";

function Cancelation() {
     const [cancel, setcancel] = useState(null);
    const fetchcancel = async () => {
      try {
        // console.log("apis:", apis.availability_venues);
        const res = await axios.get(apis.cancel_policy);
        console.log("res:", res?.data);
        setcancel(res?.data);
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      fetchcancel();
    }, []);
  return (
     <div className="cancel-wrapper">
      {cancel && <div dangerouslySetInnerHTML={{ __html: cancel }} />}
    </div>
  )
}

export default Cancelation
