import React, { useEffect } from 'react'

  
import ProSideBar from './ProSideBar'
//  import { ProSidebarProvider } from 'react-pro-sidebar';

import {BrowserRouter as Router,Routes,Route, useLocation} from 'react-router-dom'

 import CRUDTable2 from './CRUDTable2';
 import SideBar4 from './SideBar4';
import BulkAddUsers from './BulkAddUsers';
import BulkAddUserdetails from './BulkAddUserdetails';
import BulkRemoveUsers from './BulkRemoveUsers';
 import NotifyUserTest from './NotifyUserTest';
import NotifyUserCompetition from './NotifyUserCompetition';
import Home from './Home'
import Evaluation from './secondform'
import Question from './textarea'
import Login from './Login'
// import Excel from './readExcel';
  function RoutesAdmin() {
      const {pathname}=useLocation()
    useEffect(()=>{

    },[pathname])
  return (
   <div>
     { console.log(sessionStorage.getItem('username') !=undefined)}
    
   { (sessionStorage.getItem('username') != undefined && pathname!=='/login')&&<SideBar4/>}
     {sessionStorage.getItem('username') != undefined?
     
   

      <Routes>
      <Route index    path='/home'element={<Home />}/>  
      {/* <Route index    path='/'element={<Home />}/>   */}
     

      <Route     path='/manageuser/bulkaddusers' element={<BulkAddUsers/>} />
      <Route path='/manageuser/adduserdetails' element={<BulkAddUserdetails/>} />
      <Route     path='/manageuser/bulkinactivateusers' element={<BulkRemoveUsers/>} />
      <Route     path='/manageuser/userlist' element={<CRUDTable2/>} />
        <Route     path='/notify/test' element={<NotifyUserTest/>} />
        <Route     path='/notify/competitoin' element={<NotifyUserCompetition/>} />
        <Route     path='/content/Question' element={<Question/>} />
        <Route     path='/content/Evaluation' element={<Evaluation/>} />
        
       <Route path='/login' element={<Login/>}></Route>
      <Route     path='/*' element={<Login/>} />
       
        </Routes>

     
      : 
      
     <Routes>
     <Route     path='/*' element={<Login/>} />
       <Route path='/login' element={<Login/>}></Route>
     </Routes>
      
  } 
 
     {/* <Excel/> */}
   </div>
  );
}

export default RoutesAdmin;
