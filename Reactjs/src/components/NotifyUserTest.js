
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
import Papa from "papaparse";
import * as XLSX from 'xlsx';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { AlertTitle } from '@mui/material';
import ApiConfig from '../ApiConfig';
import { AiFillFileAdd } from 'react-icons/ai'
import FormHelperText from '@mui/material/FormHelperText';
import { PulseLoader } from "react-spinners";
import Tabel from './Table'
import xlfile from './sample_notify_user.xlsx'
import './NotifyUser.scss'
function NotifyUserTest() {
  
  const [userid, setUserid] = useState([]);
  const [role, setRole] = useState([]);

  const [change, setChange] = useState(false);
  const [data, setData] = useState([]);
  const [alert,setAlert]=useState(false);
  const [msg,setmsg]=useState('');
  const [isLoading, setIsLoading]=useState(false)
  const [selectedFile, setSelectedFile] = useState();
  const [type,setType]=useState('');
  let rows = [];
  const override = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20px",
    // borderColor: "olive",
  };
  const columns = [
    { field: "id", headerName: "User ID", width: 200 },
    { field: "role", headerName: "Role", width: 130 },
  ];

  for (let i = 0; i < data.length; i++) {
    console.log('data',data[i])
    // if (rows.indexOf(userid === -1))
      rows.push({ id: data[i].userid, role: data[i].role });
  }

  const [open, setOpen] = useState(false);

  const [options, setOptions] = React.useState("");
  console.log({ options });

  const handleChange = (event) => {
    setOptions(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickToOpen = () => {
    setOpen(true);
  };

  let uri = new ApiConfig().BaseURI;

  const [file, setFile] = useState();

  function handleFile(e) {
    setFile(e.target.files[0]);

    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (res) {
        console.log(res.data);
        for (let i = 0; i < res.data.length; i++) {
          setUserid((userid) => userid.concat(res.data[i].userid.replace(/^\s+|\s+$/gm,'')));
          setRole((role) => role.concat(res.data[i].role));
        }
      },
    });

    // console.log(file.name);
  }
  const changeHandler=async(e)=>{
    console.log(e);
    setFile(e.target.files[0]);
    setSelectedFile(e.target.files[0])
    const file=e.target.files[0];
    const data=await file.arrayBuffer();
    const workbook=XLSX.read(data)
    console.log("length",workbook.SheetNames.length);
    // console.log(workbook.Sheets[workbook.SheetNames[3]])
    const worksheet=workbook.Sheets[workbook.SheetNames[0]]
    const jsondata=XLSX.utils.sheet_to_json(worksheet);
    setData(jsondata)
    // console.log(jsondata)
    // console.log(Object.keys(jsondata[0]))
    // setCols(Object.keys(jsondata[0]))
   console.log(data)
  
  
}
  const [select, setSelection] = React.useState([]);
  function sendMail() {
    if(options=="")
    {
      setAlert(true);
      setmsg("please select the mail type");
      setType('error')
    }
    else if(selectedFile==undefined)
    {
      setAlert(true);
      setmsg('please select the file ');
      setType('error')
    }
    else if(select.length==0)
    {
      setAlert(true);
      setmsg('please select the email id ');
      setType('error')
    }
    else{

      console.log("clicked");
      setIsLoading(true)
      // console.log(file.name);
      console.log(userid);
      let Api=new ApiConfig()
      let selected=select.map((item)=>{
        return item.id
      })

      let data={data:selected,type:options}
      axios
      .post(Api.addApiKey(`${Api.BaseURI}/sendmail`),data)
      .then((result) => {
        setIsLoading(false)
        console.log(result); 
        setAlert(true);
        setmsg(result.data.message);
        setType('info')
      });
    }
  }

  return (
    <>


<Box sx={{
        width: '80%',
        justifyItems: 'center',
        position: 'relative',
        left: '150px',
        top: '70px'
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
                  setAlert(false);
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
        height: 675, //625
        boxShadow: 8,
        position: 'relative',
        left: '80px',
        top: '120px',
        bottom: '100px',
        marginBottom: '200px',
        padding: '50px',
        borderRadius: '20px',

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
            //textAlign: 'center',
            borderRadius: '10px',
            //marginTop: '40px'
        }}>NotifyUserTest</Typography>

        <div style={{
          postion: 'relative', rigth: '200px', color: '#1c84c3',
          marginLeft: '00px', marginTop: '40px'
        }}>

{isLoading && <PulseLoader
                  color="#ff9800"
                  loading={isLoading}
                  cssOverride={override}
                  size={20}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                  speedMultiplier={0.5}
                />}
<span style={{
            //marginLeft: '40px',
            //paddingLeft: '30px',

            position: 'relative',
            bottom: '10px',
            // top: '.5rem'
          }} > Choose Mail Type</span>


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
              <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Select Mail Type:
                        </InputLabel>
                        <Select
                          sx={{
                            height: "50px",
                          }}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={options}
                          label="MailOptions"
                          onChange={handleChange}
                        >
                          <MenuItem value={"WELCOME-USER"}>
                            WELCOME-USER
                          </MenuItem>
                          <MenuItem value={"PASSWORD-CHANGE"}>
                            PASSWORD-CHANGE
                          </MenuItem>
                          {/* <MenuItem value={"GENERAL"}>GENERAL</MenuItem> */}
                        </Select>
                      </FormControl>
            </Box>

          </span>
          <div className='select-file'>
            <div>
          <span className='select-text' > Select users from file</span>


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
               
                  width: '2rem',
                  height: '2rem'
                }}
              />
            </label>
            <input style={{
              width: '1px',
              height: '1px'
            }} id='file' type='file' placeholder='eneter the filepath' onChange={changeHandler} />
            <br />
            </span>
            </div>
            <a
                        href={xlfile}
                        download="Sample_Notify_User"
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

            onSelectionModelChange={newSelection => {
              setSelection(newSelection);
          }}
          /> */}
          <Tabel
          rows={rows}
          headers={columns}
          data={select}
          setSelected={setSelection}
          />

      {!isLoading &&
          // <Button sx={{
          //   position: 'relative',
          //   left: '55em',
          //   bottom: '1rem',
          //   boxShadow: 8
          //   , marginTop: '15px',
          //   backgroundColor: '#1c84c3',
          //   color: 'white',
          //   "&:hover": {
          //     backgroundColor: '#fff',
          //     color: '#1c84c3', fontWeight: 600, border: '2px solid #1c84c3'
          //   },
          // }}onClick={sendMail}>Send</Button>

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
        }} 
        onClick={sendMail}>Send mail</Button>

      }
      </Typography>

      {/* </div> */}
    </>
  )
}

export default NotifyUserTest