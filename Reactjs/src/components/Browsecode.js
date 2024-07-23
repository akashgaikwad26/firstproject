import { useState } from "react";
import './BrowserCode.css'
import { Button } from '@mui/material';

import axios from 'axios';
import Apiconfig from '../ApiConfig';
function BrowseCode(){
    let Api=new Apiconfig();
    const [exid,setExid]=useState("");
  const [track,setSelectedTrack]=useState("C");
  const [code,SetCode]=useState({});
  const [assertCode1,setAssert]=useState({});
    async function handleClick(e){
    e.preventDefault();
   await axios.get(Api.addApiKey(`${Api.BaseURI}/code?exercise=${exid}`)).then((result)=>{SetCode(result.data)})
   await axios.get(Api.addApiKey(`${Api.BaseURI}/asserts?exercise=${exid}&track=${track}`)).then((result1)=>{ setAssert(result1.data.assertCode)})
   
   
    }
    return(
        <div style={{ height: 400, width: '80%',boxShadow:8, marginBottom: 0, position: 'relative',
        top:'8rem',
        marginLeft: '100px' }}>
            <div style={{fontSize:'13px',marginLeft:'5rem'}} >
            <label>Excercise Id</label>
            <input style={{height:'24px', padding: '18px', marginLeft: '10px', borderRadius: '3px'}} type='text' value={exid} onChange={(e)=>setExid(e.target.value)}/>      &nbsp;&nbsp;&nbsp; 
            <label>Select Language</label>
            <select style={{width:'200px', marginLeft: '10px', position: 'absolute'}} onChange={(e)=>setSelectedTrack(e.target.value)}>
            {/* height:'24px', */}
                <option value='C'>C</option>
                <option value='Python'>Python</option>
            </select>
            </div>
            <div style={{marginTop:'2rem',marginLeft:'5rem',fontSize:'20px'}}>

              
          <Button sx={{
            position: 'relative',
            //left: '55em',
            //margin: '55px 525px',
            bottom: '1rem',
            boxShadow: 8, 
            marginTop: '15px',
            backgroundColor: '#1c84c3',
            color: 'white',
            "&:hover": {
              backgroundColor: '#fff',
              color: '#1c84c3', fontWeight: 600, border: '2px solid #1c84c3'
            },
          }} onClick={(e)=>handleClick(e)} >Show Code</Button>

              {/* <button onClick={(e)=>handleClick(e)} style={{fontSize:'13px'}}>Show Code</button> */}
            </div>
            <div style={{marginTop:'1rem',marginLeft:'5rem',wordSpacing:'26rem',color:'red',fontSize:'17  px '}}>Code: AssertCode:</div>
            <div className="wrapper" style={{marginTop:'1rem',marginLeft:'5rem',display:'inline-block'
        
        
        }}>
              <div className="left-div"> 
           
               <textarea className="my-textarea" spellcheck="false" value={code}></textarea></div>
              <div  className="right-div">
             
                 <textarea className="my-textarea" spellcheck="false" value={assertCode1}></textarea></div>
            </div>
     </div>

    )
}
export default BrowseCode;