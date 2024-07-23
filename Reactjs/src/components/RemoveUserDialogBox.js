 
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
 import { HiUserRemove } from "react-icons/hi";
import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import ApiConfig from '../ApiConfig';
import axios from 'axios';

import Alert from '@mui/material/Alert'; 
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { AlertTitle } from '@mui/material';


function RemoveUserDialogBox() {
    const [open, setOpen] =useState(false);
    const [alert,setalert]=useState(false)
    const [msg,setmsg]=useState('')
    const [type,settype]=useState('')
    const [userid,setUserid]=useState('');

    let Api =new ApiConfig()
    const handleClickOpen = () => {
        setOpen(true);
      //   console.log("user group",user_group,"type ",user_group_type)
    };


   async function inactivate() {
     if(userid=='')
     {
       setalert(true)
       setmsg('please enter the userid')
       settype('warning')
     }
     else
     {

     
       let uri= new ApiConfig().BaseURI
       
       let result= await axios.delete(Api.addApiKey(`${Api.BaseURI}/singleuser/deleteuser?userid=${userid}`))
       console.log(result)
       if(result.data.status==204)
       {
         setalert(true)
         setmsg(`user ${userid} inactivated`)
         settype('success')
        }
        setTimeout(()=>{

          handleClose()
        },1000)
      }

    }
    const handleClose = () => {
    
      setOpen(false);
      setalert(false)
      console.log("userid ",userid)
  
    };
  return (
      <div style={{marginBottom:'0px'}}>
<Button variant="outlined"sx={{
            padding:'11px',
            
          // position: 'absolute',
         borderRadius: '10px',
        // marginBottom: '125px',
        backgroundColor: '#1c84c3',
        color: 'white',
        fontWeight: 600, border: '2px solid #1c84c3',
        "&:hover": {
          backgroundColor: '#fff',
          color: '#1c84c3', fontWeight: 600, border: '2px solid #1c84c3'
        },
        }}onClick={handleClickOpen}>
      <HiUserRemove style={{}}/>
      </Button>
      <Dialog open={open} onClose={handleClose}
        sx={{boxShadow:8,
        
        
        }}
      >
        <DialogTitle>Inactivate User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>

          <Box sx={{
          width: '100%',
          justifyItems: 'center',
          position: 'relative',
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

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter User ID"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=>setUserid(e.target.value.replace(/^\s+|\s+$/gm,''))}
          />

          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={inactivate}>Inactivate</Button>
        </DialogActions>
      </Dialog>
      {/* {usergroup} */}
    </div>
 
    )
}

export default RemoveUserDialogBox