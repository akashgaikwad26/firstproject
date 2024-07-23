import axios from 'axios';
import React, { useState } from 'react';
import ApiConfig from '../ApiConfig';
import { Button } from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
function Dryrunjson() {
  const [inputText, setInputText] = useState('');
  const [resultObject, setResultObject] = useState(null);
  const [questionjson,setQuestionjson]=useState();
  const [exid,setExid]=useState("");
  const [track,setSelectedTrack]=useState("C");
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };


async function Adddata(){
    let api=new ApiConfig();
    if(exid!=='' && resultObject && questionjson && track){
       console.log("insdide fo")
    let result=await axios.get(api.addApiKey(`${api.BaseURI}/addDryrunjson?resultObject=${JSON.stringify(resultObject)}&questionjson=${JSON.stringify(questionjson)}&exid=${exid}&track=${track}`))
    console.log("res",result)
    if(result.data.status==200){
        alert("information add successfully",{position:'top-center'});
    }

    else
    {
        alert("information is not valid",{position:'top-center'});
    }
   }
  else{
    {
        alert("invalid information",{position:'top-center'});
    }
  }
}










  function generateModifiedData(originalData) {
    console.log("generateModifiedData called")
    const modifiedData = {};
  for (const key in originalData) {
  if (originalData.hasOwnProperty(key)) {
  const randomIndex = getRandomIndexExcept(originalData[key].length);
  modifiedData[key] = originalData[key].map((value, index) => (index === randomIndex ? "null" : value));
  }
  }
  
   setQuestionjson(modifiedData);
          }
  
   function getRandomIndexExcept(length, excludedIndex) {
  let randomIndex = Math.floor(Math.random() * length);
  while (randomIndex === excludedIndex) {
              randomIndex = Math.floor(Math.random() * length);
       }
   return randomIndex;
  }


  const convertToObject = () => {
  
    const lines = inputText.split('\n');
    const data = {};
  
    lines.forEach((line) => {
      const [key, values] = line.split('=');
      if (key && values) {
        const parsedValues = values.split(',').map((value) => {
          if (value.includes('[')) {
            const [rowKey, colKey] = value.match(/\[(.*?)\]/g);
            const rowValue = rowKey.substring(1, rowKey.length - 1);
            const colValue = colKey.substring(1, colKey.length - 1);
            if (!data[key]) data[key] = {};
            if (!data[key][rowValue]) data[key][rowValue] = {};
            data[key][rowValue][colValue] = values.split(',').pop();
            return rowValue;
          }
          return value;
        });
  
        if (parsedValues.length === 1) {
          data[key] = parsedValues[0];
        } else {
          data[key] = parsedValues;
        }
      }
    });
    
      setResultObject(data);
      generateModifiedData(data);
    }
    
    



  return (
    <div className="App" style={{ marginTop:'7rem',display:'flex',flexDirection:'column',gap:'1rem'}}>
        <ToastContainer />
     <div style={{fontSize:'13px',display:'flex'}} >
            <label style={{alignSelf: 'center'}}>Excercise Id</label>
            <input style={{height:'24px', padding: '18px', marginLeft: '10px', borderRadius: '3px'}} type='text' value={exid} onChange={(e)=>setExid(e.target.value)}/>      &nbsp;&nbsp;&nbsp; 
            <label style={{alignSelf: 'center'}}>Select Language</label>
            <select style={{width:'200px', marginLeft: '10px'}} onChange={(e)=>setSelectedTrack(e.target.value)}>
            {/* height:'24px', */}
                <option value='C'>C</option>
                <option value='Python'>Python</option>
            </select>
            </div>



      <div style={{display:'flex'}}>

      <textarea style={{padding: '10px'}}
        rows="10"
        cols="86"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter the input "
      />
   </div>
 
 <div style={{display:'flex',gap:'1rem'}}>

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
          }} onClick={convertToObject}>Convert</Button>

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
          }} onClick={(e)=>{Adddata()}}>Add</Button>

 {/* <button onClick={convertToObject}>Convert</button>
      <button onClick={(e)=>{Adddata()}}>Add</button> */}
 </div>
    

      {/* <button onClick={(e)=>{generateModifiedData(resultObject)}}>Questions_json</button> */}
      {(resultObject&&questionjson) && (
        <div style={{display:'flex',gap:'1rem'}}>
        <span>
          <h2>Original Object:</h2>
          {JSON.stringify(resultObject)}
        </span>

          <span style={{marginBottom:'2rem'}}>
          <h2>Question Object:</h2>
         {JSON.stringify(questionjson)}
         </span>
        </div>
      )}
    </div>
  );

};
export default Dryrunjson;