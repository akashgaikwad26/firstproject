import { CgPassword } from 'react-icons/cg';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from 'react';
import { Typography } from '@mui/material';
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import Collapse from "@mui/material/Collapse";

// import './manage.scss'
// import ResetPassword from '../ResetPassword/ResetPassword';
import { toast } from 'react-toastify';
// import ApiConfig from '../../../ApiConfig';
import ApiConfig from '../ApiConfig';
import axios from 'axios';
import { HiVariable } from 'react-icons/hi';
import AlertDialogSlide from './Modal/Confirmation';
function Forgotpassword(props) {
    console.log(props.selected)
    let Api = new ApiConfig()
  const [open, setOpen] = useState(false);
  // const [value, setValue] = useState('')
    const [password, setPassword] = useState('');
    const [repassword, setrePassword] = useState('');
const[collaspse,setcollapse]=useState(false)
  // const [isAlert, setIsAlert] = useState(true);
    const [msg, setmsg] = useState('');
    const [msg1, setmsg1] = useState('');
    const [submitMsg, setSubmitMsg] = useState('');
  const [isAlert, setIsAlert] = useState(true);
    const [variable,setVariable]=useState(true)
    const [continuemodal,setcontinue]=useState(false)
  // setValue(props.selected)
  console.log("value", password);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
        setPassword('')
        setrePassword('')

  };

    function timeoutfunction(){
      setVariable(false)
      setTimeout(()=>{
       setVariable(true)
      },3000)
  }
  async function handleResetPassword(userid) {
        if ((password.length == 0 &&password !=='' && variable) ) {
          
      timeoutfunction();
      return toast.warning("please Enter the Password", {
        position: "top-center",
                hideProgressBar:true
            })
        }
        else if (password.length < 8 && variable ) {
      // setVariable(true)
      timeoutfunction();
      return toast.warning("Password Must be 8 characters", {
        position: "top-center",
                hideProgressBar:true
            })
        }
        else if (password.includes('#')&& variable){
      timeoutfunction();
            return toast.warning("Do not use a '#' in your password",{position:'top-center',hideProgressBar:true})
        }

        else if (password !== repassword && variable ) {
            
      timeoutfunction();
      return toast.warning("Password and Confirm password is not Match", {
        position: "top-center",
                hideProgressBar:true
      });
        }

        else if(password.includes(" ") && variable){
      timeoutfunction();
            return toast.warning("Password can't contain white spaces",{
                position:"top-center",
                hideProgressBar:true
            })
        }

        else if((password.length>0  && (password === repassword) )&& password.includes(' ')===false) {
            let useridarr=userid.map((item)=>item.id)
            const responseDataPromises = useridarr.map(async (userId) => {
                try {
                    console.log("userid",userId)
                  const response = await axios.get(Api.addApiKey(`${Api.BaseURI}/resetpassword?userid=${userId}&currentPassword=Admin&password=${password}&override=true`));
                  return response.data;
                } catch (error) {
                  console.error(`Error fetching data for user ${userId}:`, error);
                  return null;
                }
              });
              const responseData = await Promise.all(responseDataPromises);
            //   console.log(responseData.filter(data => data.status !== null));
            let passwordnotupdated=responseData.filter((item)=>item.status!=204)
            if(passwordnotupdated.length>0){
                let passwordnotlist=passwordnotupdated.map((item)=>item.id)
                alert("This Users password not updated",passwordnotlist)
            }
            else{

                alert("All users password updated successfully")
            }
            setOpen(false)
            setPassword('')
            setrePassword('')
            setcontinue(false)
            
                
    }



  }


  return (
    <div>

      <button
        title="Admin password"
        className={`icon-button ${props.selected.length < 1 && "disabled"}`}
        style={{padding:'11px',backgroundColor:'#1c84c3',borderRadius:'10px',color:'white',fontWeight:600
           ,border:'1px solid #1c84c3'
    }}
        //   className={
        //     props.selected !== undefined && props.selected.length == 1
        //       ? "addUserbutton manage_item1"
        //       : "addUserbutton disabled manage_item1"
        //   }
        onClick={handleClickOpen}
      >
        <CgPassword size={props.size} />
      </button>

      <Dialog
        open={open}
        sx={{ width: "100%", height: "100%", boxShadow: 8 }}
        maxWidth={"xs"}
        PaperProps={{
          style: { borderRadius: 14 },
        }}
        onClose={handleClose}
      >
              <DialogTitle style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'6px'}}>
                 <span style={{marginLeft:'1.5rem'}}>
                  Reset Password
                </span>
                <IconButton onClick={handleClose}>
                <CloseIcon />
               </IconButton>
                 
                 </DialogTitle>
        <DialogContent
          PaperProps={{
            style: { padding: "6px 24px" },
          }}
        >
          <DialogContentText>
            <Box
              sx={{
                width: "80%",
                justifyItems: "center",
                position: "relative",
                left: "100px",
                // bottom:'50px'
              }}
            ></Box>
            <div className="Mainclass" style={{minWidth:'22rem'}}>
             
              <label className="label_add_us">Password</label>
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (e.target.value.length < 8 && e.target.value != "") {
                    setmsg1("Password must contain 8 character");
                  } else {
                    setmsg1("");
                  }
                }}
              ></input>
              <span
                style={{ marginTop: "1rem", color: "red" }}
                className="User_forgotmsg"
              >
                {msg1}
              </span>
              <br />
              <label className="label_add_us">Confirm Password</label>

              <span>{submitMsg}</span>

              <input
                type="password"
                className="input"
                value={repassword}
                onChange={(e) => {
                  setrePassword(e.target.value);
                  if (e.target.value != password && e.target.value != "") {
                    setmsg("Confirm password and password is not match");
                  } else {
                    setmsg("");
                  }
                }}
              ></input>
              <span className="User_forgotmsg" style={{ color: "red" }}>
                {msg}
              </span>
              <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#fbfafc",
            }}
            onClick={() => setcollapse(!collaspse)}
          >
            <label>{`Users(${props.selected.length})`}</label>
            <span style={{ marginTop: "0.3rem" }}>
              {collaspse ? (
                <MdOutlineKeyboardArrowUp size={30} />
              ) : (
                <MdKeyboardArrowDown size={30} />
              )}
            </span>
          </div>
          <Collapse in={collaspse}>
            <div className="table-box1" style={{ height: "11rem" }}>
              <table>
                <thead>
                  {/* <th>
                    {" "}
                    <Checkbox
                      type="checkbox"
                      name="selectAll"
                      id="selectAll"
                      handleClick={handleSelectAll}
                      isChecked={isCheckAll}
                    />
                  </th> */}
                   <th>#</th>
                  <th>userid</th>
                </thead>
                <tbody>
                   {props.selected.map((item,index) => (
                    <tr>
                      {/* <td>
                        {" "}
                        <Checkbox
                          type="checkbox"
                          name={item.exid}
                          id={item.exid}
                          handleClick={(e) => handlecheckbox(e, item)}
                          isChecked={isCheck.includes(item)}
                        />
                      </td> */}
                   <td>{index+1}</td>
                      <td>{item.id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Collapse>
              {/* <label className="label_add_us">User ids</label> */}
              {/* <input
                className="input"
                style={{ marginBottom: "0.5rem" }}
                value={
                  props.selected.length > 0 && props.selected !== undefined
                    ? props.selected[0].id
                    : ""
                }
                disabled
              ></input> */}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <button
            className="button primary"
            style={{ marginRight: "1rem" }}
            onClick={(e) => {
                setcontinue(true)
            //   handleResetPassword(e, props.selected);
            }}
          >
            Reset
          </button>
          <button
            className="button"
            style={{ marginRight: "0.5rem" }}
            onClick={handleClose}
          >
            Cancel
          </button>
     
        </DialogActions>
      </Dialog>
      {continuemodal  && <AlertDialogSlide open={continuemodal} onClose={()=>setcontinue(false)} onClick={()=>{
         handleResetPassword(props.selected)
      }}/>}
    </div>
  );
}
export default Forgotpassword;
