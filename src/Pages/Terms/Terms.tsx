import axios from 'axios';
import React,{useEffect, useState} from 'react'
import apis from "../../utilities/api.js";

function Terms() {
    const [term, setTerm] = useState(null);
    const fetchterm = async () => {
      try {
        // console.log("apis:", apis.availability_venues);
        const res = await axios.get(apis.term_policy);
        console.log("res:", res?.data);
        setTerm(res?.data);
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      fetchterm();
    }, []);
  return (
     <div className="term-wrapper">
      {term && <div dangerouslySetInnerHTML={{ __html: term }} />}
    </div>
  )
}

export default Terms
