import React, { useEffect } from 'react'
import './App.css';

  
import ProSideBar from './Components/ProSideBar'
//  import { ProSidebarProvider } from 'react-pro-sidebar';

import {BrowserRouter as Router,Routes,Route,useLocation} from 'react-router-dom'

 import CRUDTable2 from './Components/UserList';
 import SideBar4 from './Components/SideBar4';
 import Dryrunjson from './Components/Dryrunjson';
 import BrowseCode from './Components/Browsecode';
import BulkAddUsers from './Components/BulkAddUsers';
import BulkAddUserdetails from './Components/BulkAddUserdetails';
import BulkRemoveUsers from './Components/BulkRemoveUsers';
 import NotifyUserTest from './Components/NotifyUserTest';
import NotifyUserCompetition from './Components/NotifyUserCompetition';
import Home from './Components/Home'
import Evaluation from './Components/secondform'
import Question from './Components/textarea'
import Login from './Components/Login'
import AdminSubscriptions from './Components/AdminSubscriptions'
import AdminPayments from './Components/AdminPayments';
import BulkAddUpdateSubscription from './Components/BulkAddUpdateSubscription';
import BulkAddFreePackage from './Components/BulkAddFreePackage';
// import ServerInfo from './Components/ServerInfo';
import UserGroupInfo from './Components/UserGroupInfo';
// import Excel from './Components/readExcel';
  function App() {
    const {pathname}=useLocation()
    useEffect(()=>{

    },[pathname]) 
  return (
   <div>
     { console.log(sessionStorage.getItem('username') !=undefined)}
    
     { (sessionStorage.getItem('username') != undefined && pathname!=='/login')&&<SideBar4/>}
<div className='admin-app-section'>
     {sessionStorage.getItem('username') != undefined?
     
   

        <Routes>
      <Route index    path='/home'element={<Home />}/>  
     

      <Route     path='/manageuser/bulkaddusers' element={<BulkAddUsers/>} />
      <Route path='/manageuser/adduserdetails' element={<BulkAddUserdetails/>} />
      <Route     path='/manageuser/bulkinactivateusers' element={<BulkRemoveUsers/>} />
      <Route     path='/manageuser/userlist' element={<CRUDTable2/>} />
      <Route     path='/manageuser/usergroupsinfo' element={<UserGroupInfo/>} />
        <Route     path='/notify/test' element={<NotifyUserTest/>} />
        <Route     path='/notify/competitoin' element={<NotifyUserCompetition/>} />
        <Route     path='/content/Question' element={<Question/>} />
        <Route     path='/content/Evaluation' element={<Evaluation/>} />
        <Route path='/content/dryrunjson' element={<Dryrunjson/>}/>
        <Route path='/content/Browse' element={<BrowseCode/>} />
        <Route path='/managepayments' element={<AdminPayments/>} />
        <Route path='/managepayments/usersubscription' element={<AdminSubscriptions/>} />
        <Route path='/managepayments/bulkupdatepackage' element={<BulkAddUpdateSubscription/>} />
        <Route path='/managepayments/addfreepackage' element={<BulkAddFreePackage/>} />
        
       <Route path='/login' element={<Login/>}></Route>
      <Route     path='/*' element={<Home/>} />
       
        </Routes>

     
      : 
      
     <Routes>
     <Route     path='/*' element={<Login/>} />
       <Route path='/login' element={<Login/>}></Route>
     </Routes>
      
  } 
 </div>
     {/* <Excel/> */}
   </div>
  );
}

export default App;
