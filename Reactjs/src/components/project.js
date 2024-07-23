import Example from './Components/secondform'
import Example1 from './Components/textarea'
import { useState ,useEffect} from 'react';
// import axios from 'axios';
function Project1(){
   const [activetab,SetActive]=useState('tab1');
   function handletab(){
    SetActive('tab2')
   }
   function handletab1(){
    SetActive('tab1')
   }

    return(
        <>

        {/* {/* <button onClick={SetActive('tab1')}>tab1</button> */}
<div>
        <button onClick={()=>handletab()}>Generate Evaluation</button> 
        <button onClick={()=>handletab1()}>Generate Question</button>
     </div>
        {activetab=='tab2'?<Example /> :<Example1 />}
        </>
    )
}
export default Project1;
