import React, { useEffect, useMemo, useState } from 'react'


import { DataGrid } from '@mui/x-data-grid';
import { Button, Typography } from '@mui/material';
import 'reactjs-popup/dist/index.css';

import {LoaderUtility1} from './LoaderUtility';
import AddUserDialogBox from './AddUserDialogBox';
 import RemoveUserDialogBox from './RemoveUserDialogBox';
import ApiConfig from '../ApiConfig'
import axios from 'axios';

import Alert from '@mui/material/Alert';
import Table from './Table';
import FilterComponet from './Filtercomponent';
import SearchComponent from './Searchcomponent';
import PulseLoader from "react-spinners/PulseLoader";
import Forgotpassword from './ForgotPassword';







// let uri = 'https://hammerhead-app-ntdmr.ondigitalocean.app/api'
// let uri2 = 'http://localhost:8090/api'

function CRUDTable2() {

  const [userid, setUserid] = useState([])
  const [role, setRole] = useState([])
  const [userGroup, setUserGroup] = useState([])
  const [date, setDate] = useState([])
  const [status, setStatus] = useState([])
  const [change, setChange] = useState(false)
  const [data, setData] = useState([])
  const [isLoading,setIsLoading]=useState(false)
  const [filteredData, setFilteredData] = useState([]);
  const [isloading1,setIsLoading1]=useState(true);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const override = {
    display: "inline",
    alignItems: "end",
    justifyContent: "center",
    marginTop: "5rem",
  };
  // const [isLoading,setIsLoading]=useState(false)
  const [rowsdata,setrowsdata]=useState([]);
  console.log("rowsdata",rowsdata)
const uri=new ApiConfig().BaseURI
let Api=new ApiConfig()
 async function removeUser() {
    for (let i = 0; i < data.length; i++) {

      // fetch(`${uri}/api/singleuser/deleteuser?userid=${data[i]}`, { method: 'DELETE' }).then(result => {
      //   result.json().then(res => console.log(res))
      // })
      let result =await axios.delete(Api.addApiKey(`${Api.BaseURI}/api/singleuser/deleteuser?userid=${data[i]}`))
      console.log(result.data)
    }
    setChange(!change)


  }
  const filters = {
    'All': () => true,
    'Last 30 days': (item) => {
      const last30Days = new Date();
      last30Days.setDate(last30Days.getDate() - 30);
      return new Date(item.date) >= last30Days;
    },
    'Last 15 days': (item) => {
      const last15Days = new Date();
      last15Days.setDate(last15Days.getDate() - 15);
      return new Date(item.date) >= last15Days;
    },
    '1 week': (item) => {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return new Date(item.date) >= oneWeekAgo;
    },
  };


  async function inactivateUser() {
    setIsLoading(true)
    for (let i = 0; i < data.length; i++) {
      let result=await axios.get(Api.addApiKey(`${Api.BaseURI}/setuserstatus?userid=${data[i].id}&status=in-active`))
      console.log(result.data)
    }
    setIsLoading(false)
     if (change)
      setChange(false)
    else
      setChange(true)

    
  }

   useEffect(()=>{
    
    setFilteredData(rowsdata?.filter(filters[selectedFilter]));
    console.log("fe",rowsdata?.filter(filters[selectedFilter]))
},[selectedFilter])
  

  let rows = [];
  async function activateUser() {
    let cnt=0

    setIsLoading(true)
    for (let i = 0; i < data.length; i++) {
    let result= await   axios.get(Api.addApiKey(`${Api.BaseURI}/setuserstatus?userid=${data[i].id}&status=active`))
    console.log(result.data)

    }
    setIsLoading(false)
    if (change)
      setChange(false)
    else
      setChange(true)

  }



  useEffect(() => {
    setIsLoading(true)
    axios.get(Api.addApiKey(`${Api.BaseURI}/userlist`)).then(res => {
      setUserGroup([])
      setUserid([])
      setRole([])
      setData([])
      setStatus([])
      setIsLoading1(false)

      // console.log(res.data)
   setrowsdata(res?.data?.map((item)=>({
        id:item.userid,
        role:item.role,
         usergroup:item.user_group,
         date:item.date_created,
        status:item.status
      })))
    setFilteredData(res?.data?.map((item)=>({
      id:item.userid,
      role:item.role,
       usergroup:item.user_group,
       date:item.date_created,
      status:item.status
    })))
      //  for (let i = 0; i < res.data.length; i++) {

      //   setUserid(userid => userid.concat(res.data[i].userid))
      //   setRole(role => role.concat(res.data[i].role))
      //   setUserGroup(userGroup => userGroup.concat(res.data[i].user_group))
      //   setDate(date => date.concat(res.data[i].date_created))
      //   setStatus(status => status.concat(res.data[i].status))
  
      // }
    })
    setIsLoading(false)

  }, [change])

 

  // const columns = [
  //   // {field:'id',headerName:'id',width:50},
  //    'userid', 'role', 'usergroup','date',
  //     'status',

  // ];
  // const columns = [
  //   // {field:'id',headerName:'id',width:50},
  //   { field: 'userid', headerName: 'User ID', width: 200 },
  //   { field: 'role', headerName: 'Role', width: 130 },
  //   { field: 'usergroup', headerName: 'User Group', width: 130 },
  //   {
  //     field: 'date',
  //     headerName: 'Registered Date',
  //     width: 200,
  //   },
  //   { field: 'status', headerName: 'Status', width: 100 },

  // ];
  const columns = [
    // {field:'id',headerName:'id',width:50},
    { field: 'id', headerName: 'User ID', width: 200 },
    { field: 'role', headerName: 'Role', width: 130 },
    { field: 'usergroup', headerName: 'User Group', width: 130 },
    {
      field: 'date',
      headerName: 'Registered Date',
      width: 200,
    },
    { field: 'status', headerName: 'Status', width: 100 },

  ];



  // for (let i = 0; i < userid.length; i++) {
  //   if (rows.indexOf(userid === -1))
  //     rows.push({ id: userid[i], role: role[i], usergroup: userGroup[i], date: date[i], status: status[i] })
  // }
  

// useEffect(()=>{
//   return <Table
    
//   rows={filteredData}
//   headers={columns}
//   setSelected={setData}
//   data={data}
//   />
// },[selectedFilter])
  return (
    <div style={{ height: 400, width: '80%',boxShadow:8, marginBottom: 0, position: 'relative',
    top:'8rem',
    marginLeft: '75px' }}>
      <Typography sx={{ fontSize: '30px', color: '#1c84c3' }}>User List</Typography>
      <div className='action-btn'>
      {/* <span style={{
        position: 'relative',
        marginLeft: '10px',
        marginTop:'20px',
        right: '28em',
        top: '2em',
      }}> */}

        <AddUserDialogBox />

      {/* </span> */}
      {/* <span style={{
        marginLeft: '1em',
        position: 'absolute',
        left: '4.55em',
        bottom:'20.9rem'
      }}> */}

        <RemoveUserDialogBox />
      {/* </span> */}
         
     <Forgotpassword  selected={data} size={24} />
      {/* <Typography sx={{
        position: 'relative',
        top: '11em',
        right: '2em'
      }}> */}
        <Button variant="outlined" sx={{
          // position: 'absolute',

          // bottom: '3em',
          // left: '15em',

          backgroundColor: '#1c84c3',
          borderRadius: '10px',
          color: 'white',
          "&:hover": {
            backgroundColor: '#fff',
            color: '#1c84c3', fontWeight: 600, border: '2px solid #1c84c3'
          },
        }} onClick={activateUser}>activate</Button>



        <Button variant="outlined" sx={{
          // position: 'absolute',
          // left: '24em',
          //  margineLeft:'10px',
          // bottom: '3em',
          backgroundColor: '#1c84c3',
          borderRadius: '10px',
          color: 'white',
          "&:hover": {
            backgroundColor: '#fff',
            color: '#1c84c3', fontWeight: 600, border: '2px solid #1c84c3'
          },
        }} onClick={inactivateUser}>inactivate</Button>



      {/* </Typography> */}
      </div>
      <div style={{display:"flex",flexDirection:'row',gap:'1rem',width:'100%'}}>
      <div>
      <FilterComponet label={'Registered Date'} selectedFilter={selectedFilter} updateState={(res)=>setSelectedFilter(res)}/>
      </div>
      <div>
      <SearchComponent data={rowsdata} updateState={(res)=>setFilteredData(res)} />
      </div>
      </div>
        {/* <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        sx={{ postion: 'relative', top: '4em',boxShadow:8,
        border: '2px solid #1c84c3',
          }}
        onSelectionModelChange={item => setData(item)}
      /> */}

    

    <div>
   {isloading1 ? <LoaderUtility1 isLoading={isloading1}/> :
   <Table
     style={{ postion: 'relative', top: '4em',boxShadow:8,
     border: '2px solid #1c84c3',
       }}
    rows={filteredData}
    headers={columns}
    setSelected={setData}
    data={data}
    
      
 />}
 </div>
    {console.log('data   ####',filteredData)}


      


    </div>
  );
}





export default CRUDTable2;