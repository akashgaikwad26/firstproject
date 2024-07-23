 
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { HiUserAdd } from "react-icons/hi";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import ApiConfig from '../ApiConfig';
import DialogBox, { usergroup1 } from './DialogBox';
import axios from 'axios';
import Alert from '@mui/material/Alert'; 
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { AlertTitle } from '@mui/material';





export default function AddUserDialogBox() {
  let uri = new ApiConfig().BaseURI
  const [usergroups, setUserGroups] = useState([])
  const [alert,setalert]=useState(false)
  const [type,settype]=useState('')
  const [msg,setmsg]=useState('')
  let Api=new ApiConfig()
  useEffect( ()=>{
    
    axios.get(Api.addApiKey(`${Api.BaseURI}/getusergroups`)).then(res=>{
      console.log(res.data.length)
      setUserGroups([])
      for(let i=0;i<res.data.length;i++)
      {
        console.log("include",usergroups.includes(res.data[i].user_group))
        if(!usergroups.includes(res.data[i].user_group) & usergroups.indexOf(res.data[i].user_group==-1))
        {
          console.log(res.data[i].user_group)
          
          setUserGroups(usergroups=> usergroups.concat(res.data[i].user_group))
        }
        // ug.push(res.data[i].user_group)
      }
      
      
    })
    
  },[])
  const [open, setOpen] = useState(false);
  const [userid, setUserID] = useState('')
  const [role, setRole] = useState('')
  const [usergroup, setUserGroup] = useState('')
  const [roles, setRoles] = useState(['admin', 'corporate admin', 'student', 'teacher', 'individual'])
 
 

  function addUserGroup() {
    if (usergroup1 !== undefined & usergroups.indexOf(usergroup1) === -1) {
      setUserGroups(usergroups => usergroups.concat(usergroup1))
    }
  }
    




   function addUser() {

    if(userid=='')
    {
      setalert(true)
      setmsg("plesase enter userid")
      settype('warning')
    }
    else if(role=='')
    {
      setalert(true)
      setmsg("plesase enter role")
      settype('warning')
    }
    else if(usergroup=='')
    {
      setalert(true)
      setmsg("plesase enter user group")
      settype('warning')
    }
    else{

    console.log(userid)

    let setpass = () => {
      let pass = Math.random().toString(36).slice(2) + Math.random().toString(36).toUpperCase().slice(2)
  
      return pass;
    }
    
    console.log("Userid", typeof (userid), " Role ", role, ' User group ', usergroup, 'Password ', setpass())
    const password=setpass()
    // setUserID(userid.replace(/^\s+|\s+$/gm,''))
     let data = { userid, role, password, usergroup }
     let Api=new ApiConfig()
     console.log('Api.addApiKey(`${Api.BaseURI}',Api.addApiKey(`${Api.BaseURI}/singleuser/newuser`))
     axios.post(Api.addApiKey(`${Api.BaseURI}/singleuser/newuser`), data).then(res=>{
      console.log(res.data)
      if(res.data.status==201)
      {
        setalert(true)
        setmsg('user created successfully')
        settype('success')
      }
      else{
        setmsg('user already exist')
        setalert(true)
        settype('error')
      }
      setTimeout(() => {
        
        handleClose()
      }, (1000));
    })
  }
  }


  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setalert(false)

  };

  return (
    <>
    
      <div>
        <Button variant="outlined" sx={{
          // position: 'absolute',
          // boxShadow:20,
          // marginTop:'20px',
          padding: '11px',
          // left: '440px',
          // bottom: '1px',
          backgroundColor: '#1c84c3',
          borderRadius: '10px',
          color: 'white',
          fontWeight: 600, border: '1px solid #1c84c3',
          "&:hover": {
            backgroundColor: '#fff',
            color: '#1c84c3', fontWeight: 600, border: '1px solid #1c84c3'
          },
        }} onClick={handleClickOpen}>
          <HiUserAdd />
        </Button>
        <Dialog open={open}
          sx={{ width: '100%', height: '100%',boxShadow:8, }}
          onClose={handleClose}>
          <DialogTitle>Add User</DialogTitle>
          <DialogContent>
            <DialogContentText>


            <Box sx={{
          width: '80%',
          justifyItems: 'center',
          // position: 'relative',
          // left: '100px',
          // bottom:'50px'
        }}>
          <Collapse in={alert}
            sx={{

              justifyItems: 'center'

            }}
          >
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

            </Alert>
          </Collapse>
        </Box>

              <Typography style={{


                width: '570px',
                height: '100%',


              }}>

                <div style={{
                  marginLeft: '0px',
                  marginTop:'20px'
                }}>
                  <span style={{

                    padding: '20px'

                  }} > Enter The User ID  :</span>

                  <TextField
                    label="Enter The User ID"
                    id="outlined-size-small"

                    size="small"
                    style={{
                      marginLeft:'33px'

                    }}
                    onChange={(e) => setUserID(e.target.value.replace(/^\s+|\s+$/gm,''))}
                  />

                  <br />


                  <span style={{
                    display: 'flex',
                    margin: '20px'
                  }} >
                    <span style={{
                      marginTop:'10px'
                    }}>
                    Select The Role :
                      </span> 

                    <Box sx={{
                      width: 230,
                      marginLeft: '65px'

                    }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select Role</InputLabel>
                        <Select
                        sx={{height:'50px',}}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={role}
                          label="select role"
                          onChange={(e) => setRole(e.target.value)}
                        >{roles.map((data, index) => (

                          <MenuItem key={index} value={data}>{data}</MenuItem>
                        ))}

                        </Select>
                      </FormControl>
                    </Box>
                  </span>


                  <br />

                  <span style={{
                    marginLeft:'20px',
                    display: 'flex'
                  }}  >
                    <span style={{

                    }} > Select User Group</span>
                    <Box sx={{
                      width: 230,
                      height:'10px',
                       marginLeft:'60px'
                    }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select User Group</InputLabel>
                        <Select
                        sx={{
                          height:'50px',
                      }}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={usergroup}
                          label="select usergroup"
                          onChange={(e) => { setUserGroup(e.target.value); }
                          }
                          onMouseOver={addUserGroup}
                        >
                          {usergroups.map((data, index) => (
                            <MenuItem key={index} value={data}>{data}</MenuItem>

                          )
                          )}
                        </Select>
                      </FormControl>
                    </Box>
                    <span style={{ padding: '20px' }}>

                      <DialogBox />
                    </span>

                  </span>
                  <span style={{
                    padding: '20px'

                  }}>

                  </span>
                </div>
              </Typography>

            </DialogContentText>

          </DialogContent>
          <DialogActions sx={{
            marginLeft: '20px'
          }}>
            <Button sx={{
              margin: '20px',

              backgroundColor: '#1c84c3',
              color: 'white',
              "&:hover": {
                backgroundColor: '#fff',
                color: '#1c84c3', fontWeight: 600, border: '1px solid #1c84c3'
              },
            }} onClick={handleClose}>Cancel</Button>
            <Button sx={{
              margin: '20px',

              backgroundColor: '#1c84c3',
              color: 'white',
              "&:hover": {
                backgroundColor: '#fff',
                color: '#1c84c3', fontWeight: 600, border: '1px solid #1c84c3'
              },
            }} onClick={addUser}>Create</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

//     </>
//   );
// }
