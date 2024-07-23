
import React, { useEffect } from 'react'
import { Button, Typography } from '@mui/material';
import DialogBox, { usergroup1 } from './DialogBox';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import { useState, useAlert } from 'react';
  import Alert from '@mui/material/Alert';
import papa from 'papaparse'
import { DataGrid } from '@mui/x-data-grid';
import * as XLSX from 'xlsx';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { AlertTitle } from '@mui/material';
import ApiConfig from '../ApiConfig';
import { AiFillFileAdd } from 'react-icons/ai'
import FormHelperText from '@mui/material/FormHelperText';
import xlfile from './bulk_add_users.xlsx'
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import PulseLoader from "react-spinners/PulseLoader";
import DialogActions from "@mui/material/DialogActions";
import Table from './Table';

function BulkAddUsers() {
  const [userid, setUserid] = useState([])
  const [role, setRole] = useState([])
  const [usergroup, setUserGroup] = useState('');
  const [usergroups, setUserGroups] = useState([])
  const [selectedFile, setSelectedFile] = useState();
  const [open, setOpen] = useState(false)
  const [data, setData] = useState([])
  const [selectData,setSelected]=useState([])
  const [msg, setmsg] = useState('')
  const [alert, setalert] = useState('')
  const [exceldata,setdata]=useState([])
  const [cols,setCols]=useState([])
  const [dialog,setdialog]=useState(false)
const [invalidusername, setInvaildusername] = useState([])
const [duplicateid,setDuplicateid]=useState([])
const [duplicatemsg,setmessage]=useState('')
  let file
  let Api =new ApiConfig()
  // function changeHandler(event) {
  //   setSelectedFile(event.target.files[0]);

  //   console.log(event.target.files[0])
  //   file = selectedFile
  //   console.log('file', file)

  //   console.log(selectedFile)
  //   papa.parse(event.target.files[0], {
  //     header: true,
  //     skipEmptyLines: true,
  //     complete: function (res) {
  //       console.log(res.data)
  //       for (let i = 0; i < res.data.length; i++) {
  //         setUserid(userid => userid.concat(res.data[i].userid.replace(/^\s+|\s+$/gm,'')));
  //         setRole(role => role.concat(res.data[i].role.replace(/^\s+|\s+$/gm,'')));

  //       }
  //     }
  //   })

  // }
  ;

  const changeHandler=async(e)=>{
    console.log(e);
    setSelectedFile(e.target.files[0])
    const file=e.target.files[0];
    const data=await file.arrayBuffer();
    const workbook=XLSX.read(data)
    console.log("length",workbook.SheetNames.length);
    // console.log(workbook.Sheets[workbook.SheetNames[3]])
    const worksheet=workbook.Sheets[workbook.SheetNames[0]]
    const jsondata=XLSX.utils.sheet_to_json(worksheet);
    setdata(jsondata)
    // console.log(jsondata)
    console.log(Object.keys(jsondata[0]))
    setCols(Object.keys(jsondata[0]))
   console.log(jsondata)
  
  
}

  let uri = new ApiConfig().BaseURI



const handleClose=()=>{
setdialog(false)
}
  useEffect(() => {
    axios.get(Api.addApiKey(`${Api.BaseURI}/getusergroups`)).then(res => {
      console.log(res.data.length)
      setUserGroups([])
      for (let i = 0; i < res.data.length; i++) {
        console.log("include", usergroups.includes(res.data[i].user_group))
        if (!usergroups.includes(res.data[i].user_group) & usergroups.indexOf(res.data[i].user_group == -1)) {
          console.log(res.data[i].user_group)

          setUserGroups(usergroups => usergroups.concat(res.data[i].user_group))
        }
       }
    })
  }, [dialog])


  function addUserGroup() {
    if (usergroup1 !== undefined & usergroups.indexOf(usergroup1) === -1) {
      setUserGroups(usergroups => usergroups.concat(usergroup1))
    }
  }

  const columns = [
     { field: 'id', headerName: 'User ID', width: 200 },
    { field: 'role', headerName: 'Role', width: 130 },
    {field:'first_name',headerName:'Firstname',width:150},
    {field:'last_name',headerName:'Lastname',width:150},
    {field:'gender',headerName:'Gender',width:120},
    {field:'contact',headerName:'mobile',with:160},
  ];



  let rows = [];

  console.log(cols)
  for (let i = 0; i < exceldata.length; i++) {
    if (rows.indexOf(exceldata[i].userid === -1)) {

      rows.push({ id: exceldata[i][cols[0]], role: exceldata[i].role,first_name:exceldata[i].Firstname,last_name:exceldata[i].Lastname,gender:exceldata[i].Gender,contact:exceldata[i].Mobile})
    }
  }
  console.log("rows", rows)

  async function addUsers() {

    if(usergroup=='')
    {
      setmsg('please select usergroup')
      setOpen(true)
      setalert('warning')
    }
    else if(selectedFile==undefined)
    {
      setmsg('please choose file')
      setOpen(true)
      setalert('warning')
    }
    else{
      
      console.log(usergroup)
      var file = selectedFile.name
      console.log(file)
      if (selectData.length > 0) {
        console.log(data) 
        let row = []
        for (let i = 0; i < data.length; i++) {
          // let index = rows.findIndex(x => x.id == data[0])
          // console.log(index)
          console.log(data)
          row.push({ id: data[i].id, role: data[i].role,firstname:data[i].first_name,lastname:data[i].last_name,contact:"+91"+data[i].contact,gender:data[i].gender })
        }
         console.log(row)
        // let result = await axios.get(Api.addApiKey(`${Api.BaseURI}/bulkUserCreate?user_group=${usergroup}&data=${JSON.stringify(row)}`))
        let result = await  axios.post(
          Api.addApiKey(`${Api.BaseURI}/bulkUserCreate`),
          {
            user_group: usergroup,
            data: selectData,
          }
        )
        setSelected([])
        console.log('data',result.data.message)
        if (result.data.statusCode == 201) {
          setmsg(result.data.message)
          setOpen(true)
          setalert('info')
          window.scrollTo(0, 0);
        }
        else if(result.data.statusCode===405){
          // setmsg(result.data.message)
     
            // setLoading(false);
            // handleAlert(res.data.message, "warning", dataarray);
          // handlstate()
          let dataarray=[]
          setdialog(true);
          // setinfirstname({update:true,index:null})
          // setinlastname({update:true,index:null})
          // setinMobile({update:true,index:null})
      if(result.data.duplicateuserid!==undefined && result.data.duplicateuserid.length>0){
              // <Modal open={true}>Following Email found duplicate</Modal>
              // toast.warning("Following Email found duplicate"+result.data.duplicateuserid)

              // console.log("inside function");
              // <Dialogjs />
            
              setDuplicateid(result.data.duplicateuserid)
              setInvaildusername(result.data.invalidUsername)
              setmessage(result.data.message)
              // setinfirstname({ update: true, index: null })
              // setinlastname({ update: true, index: null })
              // setinMobile({update:true,index:null})


            }
            else if (result.data.invalidUsername !== undefined && result.data.invalidUsername.length > 0) {
              // <Modal open={true}>Following Email found duplicate</Modal>
              // toast.warning("Following Email found duplicate"+result.data.duplicateuserid)

              // console.log("inside function");
              // <Dialogjs />
              // setdialog(true);
              setDuplicateid(result.data.duplicateuserid)
              setInvaildusername(result.data.invalidUsername)
              setmessage(result.data.message)
              // setinfirstname({ update: true, index: null })
              // setinlastname({ update: true, index: null })
              // setinMobile({update:true,index:null})


            }

          
          console.log(result.data)
          // setOpen(true)
          // setalert('info')
        }
        else {
          setmsg(result.data.message)
          setOpen(true)
          setalert('info')
          window.scrollTo(0, 0);
        }
      }
      else {
  
  
        let result = await axios.get(Api.addApiKey(`${Api.BaseURI}/bulkUserCreate?user_group=${usergroup}&data=${JSON.stringify(rows)}`))
        console.log(result.data)
        if (result.data.statusCode == 201) {

          setmsg(result.data.message)
          setOpen(true)
          setalert('sucess')
        }
        else if(result.data.statusCode===405){
          // setmsg(result.data.message)
     
            // setLoading(false);
            // handleAlert(res.data.message, "warning", dataarray);
          // handlstate()
          let dataarray=[]
          setdialog(true);
          // setinfirstname({update:true,index:null})
          // setinlastname({update:true,index:null})
          // setinMobile({update:true,index:null})
      if(result.data.duplicateuserid!==undefined && result.data.duplicateuserid.length>0){
              // <Modal open={true}>Following Email found duplicate</Modal>
              // toast.warning("Following Email found duplicate"+result.data.duplicateuserid)

              // console.log("inside function");
              // <Dialogjs />
            
              setDuplicateid(result.data.duplicateuserid)
              setInvaildusername(result.data.invalidUsername)
              setmessage(result.data.message)
              // setinfirstname({ update: true, index: null })
              // setinlastname({ update: true, index: null })
              // setinMobile({update:true,index:null})


            }
            else if (result.data.invalidUsername !== undefined && result.data.invalidUsername.length > 0) {
              // <Modal open={true}>Following Email found duplicate</Modal>
              // toast.warning("Following Email found duplicate"+result.data.duplicateuserid)

              // console.log("inside function");
              // <Dialogjs />
              // setdialog(true);
              setDuplicateid(result.data.duplicateuserid)
              setInvaildusername(result.data.invalidUsername)
              setmessage(result.data.message)
              // setinfirstname({ update: true, index: null })
              // setinlastname({ update: true, index: null })
              // setinMobile({update:true,index:null})


            }

          
          console.log(result.data)
          // setOpen(true)
          // setalert('info')
        }
        else {
          setmsg(result.data.message)
          setOpen(true)
          setalert('info')
        }
      }


    }

    
  }
  return (
    <>

      <Box sx={{
        width: '80%',
        justifyItems: 'center',
        position: 'relative',
        left: '150px',
        top: '80px'
        // bottom:'50px'
      }}>
        <Collapse in={open}
          sx={{

            justifyItems: 'center'

          }}
        >
          <Alert severity={alert}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
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

          </Alert>
        </Collapse>
      </Box>

      <Typography sx={{
        width: '88%',
        height: 685, //625
        boxShadow: 8,
        position: 'relative',
        left: '80px',
        top: '120px',
        bottom: '100px',
        marginBottom: '200px',
        padding: '50px',
        borderRadius: '20px',

      }}>


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
                }}>Add users</Typography>

              
        </div>

        <div style={{
          postion: 'relative', rigth: '200px', color: '#1c84c3',
          marginLeft: '00px'
        }}>

          
          <span style={{
            //marginLeft: '40px',
            //paddingLeft: '30px',
            position: 'relative',
            bottom: '.5.5rem',
            // top: '.5rem'
          }} > Select User Group</span>

          <span style={{
            display: 'flex',
            //marginLeft: '40px',
            //paddingLeft: '40px',
            position: 'relative',
            bottom: '5.5em',
            top: '0em',
            left: '0em',
          }}  >

            <Box sx={{
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
            </Box>

            <span style={{
              position: 'absolute',
              left: '35em',
              bottom: '3rem'
            }}>

              <DialogBox />
            </span>
          </span>

          <div className='select-file'>
          <div
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
          <span className='select-text' >Select users from file</span>

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
          </div>
          <a
                        href={xlfile}
                        download="Sample_Add_Users"
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
          {dialog && (
          <Dialog open={dialog}>
            <DialogContent>
              <div
                style={{
                  marginBottom: "0.5rem",
                  fontSize: "20px",
                  color: "green",
                }}
              >
                {duplicatemsg}
              </div>
              {invalidusername?.length > 0 && (
                <>Following usernames are invalid
                  {/* <hr style={{ margin: "0.5rem 0rem 0.5rem 0rem" }}></hr> */}
                  {invalidusername.map((item) =>
                    (<li style={{ color: "red" }}>{item}</li>)
                  )}
                </>
              )}
              
              {duplicateid.length > 0 && <><span>Following users are not added:</span>

                {duplicateid.map((item) => (
                  <li style={{ color: "red" }}>{item}</li>
                ))}
                <hr style={{ margin: "0.5rem 0rem 0.5rem 0rem" }}></hr>
                <div style={{ margintop: "2rem" }}>
                  E-mail address you are trying to use is already in use. Please
                  contact Pravi support, in case you would like to re-register
                  using the same
                </div></>}
              
              {/* {duplicateid.map((item)=>{
            <li>{item}</li>
           })} */}
            </DialogContent>
            <DialogActions sx={{ marginLeft: "20px" }}>
              <button
                className="primary-button"
                style={{ marginBottom: "1rem", marginRight: "1rem" }}
                onClick={handleClose}
              >
                Close
              </button>
            </DialogActions>
          </Dialog>
        )}
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
          onSelectionModelChange={item => setData(item)}
        /> */}
        <Table
        rows={rows}
        headers={columns}
        setSelected={setSelected}
        data={selectData}

        />

          <Button
          className='button primary'
           sx={{
            position: 'relative',
            //left: '55em',
            margin: '15px 525px',
            bottom: '1rem',
            boxShadow: 8, 
            //marginTop: '15px',
            // backgroundColor: '#1c84c3',
            // color: 'white',
            // "&:hover": {
            //   backgroundColor: '#fff',
            //   color: '#1c84c3', fontWeight: 600, border: '2px solid #1c84c3'
            // },
          }} 
          onClick={addUsers}>Create</Button>

        </div>

      </Typography>

    </>
  )
}

export default BulkAddUsers