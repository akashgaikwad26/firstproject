import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { HiUserAdd } from "react-icons/hi";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios'
import ApiConfig from '../ApiConfig';



var usergroup1;
export default function AddUserGroupDialogBox({setLoading,setUSersGroups}) {




  const [open, setOpen] =useState(false);
  const [user_group,setUserGroup]=useState(undefined);
  const [user_group_type,setUserGroupType]=useState(undefined);
let uri = new ApiConfig().BaseURI

 async  function addUsergroup()
{
  handleClose()
  
  let data={type:user_group_type,user_group:user_group}
  usergroup1=user_group; 
  let Api=new ApiConfig()
  let result=await axios.post(Api.addApiKey(`${Api.BaseURI}/usergroup/addusergroup`),data)
  console.log(result.data)
  if(setLoading!==undefined)
{

  setLoading(true)
} 


}


const handleClickOpen = () => {
      setOpen(true);
   };

  const handleClose = () => {
    setOpen(false);

  
      console.log("user group",user_group,"type ",user_group_type)

  };

  return (
    <div>
      <Button variant="outlined"sx={{
            // position: 'relative',
            // left: '450px',
            // marginTop: '15px',
            padding: '20px 15px',
            backgroundColor: '#1c84c3',
            borderRadius:'10px',
            fontWeight: 800,
            border: '3px solid #1c84c3',
            color: 'white',
            "&:hover": {
              backgroundColor: '#fff',
              color: '#1c84c3', fontWeight: 800, border: '3px solid #1c84c3'
            },
        }}onClick={handleClickOpen}>
      <HiUserAdd/>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add User Group</DialogTitle>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter new user group"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=>setUserGroup(e.target.value)}
          />
    
            
<Box sx={{ width: 230 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select User Group</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={user_group_type}
          label="user group type "
          onChange={(e)=>setUserGroupType(e.target.value)}
        >
          <MenuItem value={'internal'}>internal</MenuItem>
          <MenuItem value={'corporate'}>corporate</MenuItem>
          <MenuItem value={'academics'}>academics</MenuItem>
          
        </Select>
      </FormControl>
    </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addUsergroup}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export {usergroup1}
