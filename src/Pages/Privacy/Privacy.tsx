import axios from 'axios';
import React,{useEffect, useState} from 'react'
import apis from "../../utilities/api.js";

function Privacy() {
  const [privacy, setPrivacy] = useState(null);
    const fetchPrivacy = async () => {
      try {
        // console.log("apis:", apis.availability_venues);
        const res = await axios.get(apis.privacy_policy);
        console.log("res:", res?.data);
        setPrivacy(res?.data);
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(()=>{
      fetchPrivacy();
    },[])
  return (
    <div className="privacy-wrapper">
      {privacy && <div dangerouslySetInnerHTML={{ __html: privacy }} />}
    </div>
  );
}

export default Privacy
