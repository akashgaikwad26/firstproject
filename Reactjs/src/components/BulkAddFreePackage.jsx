import React from 'react'
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import { DataGrid } from '@mui/x-data-grid';
import * as moment from 'moment';
import Apiconfig from '../ApiConfig';
import PulseLoader from "react-spinners/PulseLoader";
import './BulkAdduserDetails.css';
import axios from 'axios';
import DialogBox, { usergroup1 } from './DialogBox';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './Home.scss'
import {  useEffect,useAlert } from 'react';
  import Alert from '@mui/material/Alert';
import papa from 'papaparse'
import xlfile from './sample_add_free_package.xlsx'



import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { AlertTitle } from '@mui/material';

import { AiFillFileAdd } from 'react-icons/ai'
import FormHelperText from '@mui/material/FormHelperText';
import zIndex from '@mui/material/styles/zIndex';
import Table from './Table';

export default function BulkAddFreePackage() {


    const [userid, setUserid] = useState([])
    const [role, setRole] = useState([])
    const [usergroup, setUserGroup] = useState('');
    const [usergroups, setUserGroups] = useState([])
    const [selectedFile, setSelectedFile] = useState();
    const [open, setOpen] = useState(false)
    const [data, setData] = useState([])
    const [msg, setmsg] = useState('')
    const [alert, setalert] = useState('')
   const [exceldata,setdata]=useState([])
   const [cols,setColums]=useState([])
   
   const [type,settype]=useState('')
// console.log(exceldata)

const [isLoading, setIsLoading] = useState(false);

const [dataselected,setselectedRows]=useState([]);

let rows=[];
    const columns = [
        // {field:'id',headerName:'id',width:50},
        { field: 'userid', headerName: 'Userid', width: 130 },
        { field: 'startDate', headerName: 'Start Date', width: 130 },
        { field: 'packageid', headerName: 'Package ID', width: 200 },
        // { field: 'packageid', headerName: 'Package ID', width: 130 },
       
        
      
      ];
    const changeHandler=async(e)=>{
        console.log(e);
        const file=e.target.files[0];
        const data=await file.arrayBuffer();
        const workbook=XLSX.read(data)
        console.log("length",workbook.SheetNames.length);
        // console.log(workbook.Sheets[workbook.SheetNames[3]])
        const worksheet=workbook.Sheets[workbook.SheetNames[0]]
        const jsondata=XLSX.utils.sheet_to_json(worksheet);
        setdata(jsondata)
      //  console.log(jsondata)
      // //  setColums(Object.keys(jsondata[0])) 
      // console.log(cols,Object.keys(jsondata[0]))
      
    }
    if(exceldata.length>0){
 
        // console.log("exceldata",exceldata);
      for (let i = 0; i < exceldata.length; i++) {

        // let j=0
        // console.log(exceldata[i][cols[j]])
        // rows.push({ id: exceldata[i][cols[j]],startDate:moment(exceldata[i][cols[j=j+1]]).format("DD-MM-YYYY")})
   
            rows.push({ userid: exceldata[i].Email,startDate:moment(exceldata[i].start_date).format("YYYY-MM-DD"),packageid:exceldata[i].packageid})
      
        }
      }
    
const addPackage=async ()=>{
    setIsLoading(true)
    console.log(dataselected)
    let api = new Apiconfig()
    let data=dataselected
    
    let result= await axios.post(api.addApiKey(`${api.BaseURI}/bulkaddfreepackge`),{data})
    console.log(result)
    setIsLoading(false)
    setalert(true)
    setmsg(result.data.message)
    settype('success')
    setTimeout(()=>{
        setalert(false)
    },5000)
}
useEffect(() => {
  

  return () => {
    rows=[]
  }
}, [exceldata])
const override = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20px",
    // borderColor: "olive",
    // backgroundColor: "red",
    // width: "100%",
  };
  return (
    <>
      <Typography sx={{
        width: '88%',
        height: 610, //625
        boxShadow: 8,
        position: 'relative',
        left: '80px',
        top: '120px',
        bottom: '100px',
        marginBottom: '200px',
        padding: '50px',
        borderRadius: '20px',

      }}>
{alert && <div style={{position:'fixed',zIndex:'10'}}>
    <Alert severity={type}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setalert(false);
                  }}
                  
                >

                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{
                mb: 2, justifyContent: "center",
              }}
            ><AlertTitle>        {msg}
              </AlertTitle>

            </Alert></div>}

        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '50px'
        }}> 
            

        <Typography style={{
                    position: 'relative',
                    // right: '1em',
                    color: '#1c84c3',
                    //bottom: '50px',
                    fontWeight: 700,
                    //width: '110px',
                    fontSize: '20px',
                    backgroundColor: 'white',
                    textAlign: 'center',
                    borderRadius: '10px',
                    //marginTop: '40px'
        }}>Add Free Packages</Typography>
        
</div>


        <div style={{
          postion: 'relative', rigth: '200px', color: '#1c84c3',
          marginLeft: '00px'
        }}>

          
{/* <span style={{
            marginLeft: '40px',
            paddingLeft: '30px',
            position: 'relative',
            bottom: '.5.5rem',
            // top: '.5rem'
          }} > Select User Group</span> */}


          <span style={{
            display: 'flex',
            //marginLeft: '40px',
            //paddingLeft: '40px',
            position: 'relative',
            bottom: '5.5em',
            top: '0em',
            left: '0em'
          }}  >

            {/* <Box sx={{
              width: 230,
              
              position: 'relative', bottom: '3rem',
              left: '14em'
            }}>
              <FormControl required fullWidth>
                <InputLabel id="demo-simple-select-required-label">user groups</InputLabel>
                <Select
                
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={usergroup}
                  label="user group *"
                  onChange={(e) => setUserGroup(e.target.value)}
                  onMouseOver={addUserGroup}
                >
                  {usergroups.map((data, index) => (

                    <MenuItem value={data} key={index}>{data}</MenuItem>
                  ))}
                </Select>
 
              </FormControl>
            </Box> */}

            {/* <span style={{
              position: 'absolute',
              left: '35em',
              bottom: '4rem'
            }}>

              <DialogBox />
            </span> */}
          </span>
          <div  className='select-file'>

      <div>
          <span className='select-text'
           style={{
            //marginLeft: '40px',
            // paddingLeft: '14px',
            // position: 'relative',
            // bottom: '3rem',
            // right:'.9rem'
          }} >Select users from file</span>

          <span
            style={{
              // margin: '0px',
              // padding: '0px',
              // // marginLeft: '40px',
              // //         paddingLeft: '40px',
              // borderRadius: '10px',
              // position: 'relative',
              // bottom: '2.2rem',
              // left: '2rem'
            }}>

            <label htmlFor='file'>
              <AiFillFileAdd
                style={{
                  // margin: '0px',
                  // padding: '0px',
                  width: '2rem',
                  height: '2rem'
                }}
              />
            </label>

            <input style={{
              width: '1px',
              height: '1px'
              // marginLeft: '40px',
              // paddingLeft: '40px',
              // borderRadius: '10px',
              // position: 'relative',
              // bottom: '30px'
            }} id='file' type='file' placeholder='eneter the filepath' onChange={changeHandler} />
            <br />
          </span>
          </div>
          <a
                href={xlfile}
                download="Sample_Add_Free_Package"
                target="_blank"
                rel="noreferrer"
              >
                <button
                  style={{ display: "flex", alignItems: "center" }}
                  className="link-button small"
                >
                  {/* <CgAsterisk color="red"/>-All Fields Required */}
                  Download sample file
                </button>
              </a>
          </div>
        </div>
       {isLoading&&
       <PulseLoader
       color="#1c84c3"
       loading={isLoading}
       cssOverride={override}
       size={10}
       className='pulse-loader'
       aria-label="Loading Spinner"
       data-testid="loader"
       speedMultiplier={.5}
     />}
       {/* <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          sx={{
            width: "100%",
            height: 380,
            postion: 'relative', bottom: '1.5rem', left: '0em', boxShadow: 8,
            border: '2px solid #1c84c3',
          }}
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRows = rows.filter((row) =>
              selectedIDs.has(row.id),
            );
    
            setselectedRows(selectedRows);}}
        /> */}
        <Table
          rows={rows}
          headers={columns}
          setSelected={setselectedRows}
          data={dataselected}
        />
        <Button 
        className='button primary'
        sx={{
            position: 'relative',
            //left: '55em',
            margin: '15px 503px',
            bottom: '1rem',
            boxShadow: 8, 
            //marginTop: '15px',
            // backgroundColor: '#1c84c3',
            // color: 'white',
            // "&:hover": {
            //   backgroundColor: '#fff',
            //   color: '#1c84c3', fontWeight: 600, border: '2px solid #1c84c3'
            // },
        }} onClick={addPackage}>Add package</Button>

{/* <button className='admin-btn' style={{
            // position: 'relative',
            // padding:'0.5rem',
            // borderRadius:'1rem',
            // left: '50em',
            // bottom: '1rem',
            // boxShadow: 8
            // , marginTop: '15px',
            // backgroundColor: '#1c84c3',
            // color: 'white',
            // "&:hover": {
            //   backgroundColor: '#fff',
            //   color: '#1c84c3', fontWeight: 600, border: '2px solid #1c84c3'
            // },
          }} onClick={addPackage}>Add package</button> */}
      </Typography>
    </>
  )
}
