
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from './Table'
import ApiConfig from '../ApiConfig'
import AddUserGroupDialogBox from './DialogBox'
import './UserGroupInfo.scss'
export default function UserGroupInfo() {
    const [userGroups,setUSersGroups]=useState([])
   const [data, setdata] = useState([])
   const [islaoding, setislaoding] = useState(false)
//    const [colums, setcolums] = useState([])


    useEffect(()=>{
        getUserGroup()
    },[islaoding])
    const colums=[
        { field: 'user_group', headerName: 'User Group', width: 200 },
        { field: 'type', headerName: 'Group Type ', width: 200 },
        { field: 'date_created', headerName: 'Date Created ', width: 200 },
        { field: 'status', headerName: 'Status ', width: 200 },
    ]
    const getUserGroup=async ()=>{
        let Api=new ApiConfig()
        let result=await axios.get(Api.addApiKey(`${Api.BaseURI}/getusergroups`))
        // console.log(result.data)
        setUSersGroups(result.data)
        setislaoding(false)
        // console.log('colums',colums,userGroups[0],Object.keys(userGroups[0]))
        // setcolums(Object.keys(userGroups[0]))
     
    }
  return (
    <div className='user-group-page'>
        <p style={{ fontSize: '30px', color: '#1c84c3' }}>User Group Information</p>
        <AddUserGroupDialogBox 
        setLoading={setislaoding}
        setUSersGroups={setUSersGroups}
        />
        <Table
        rows={userGroups}
        headers={colums}
        isLoading={islaoding}
        data={data}
        setSelected={setdata}
        isCheckBox={false}
        />
    </div>
  )
}
