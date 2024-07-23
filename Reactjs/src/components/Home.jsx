// import React,{useEffect} from 'react'
// // import Select from './Select'
// import TextField from '@mui/material/TextField';

// import { Button, Typography } from '@mui/material';
// // const addUser=()=>{
// //   e.target.
// // }
// import { useState } from 'react';
// import axios from 'axios';

// import ApiConfig from '../ApiConfig'
// // import Alert from './TransitionAlerts'
// import papa from 'papaparse';
// import { DataGrid } from '@mui/x-data-grid';

// import Box from '@mui/material/Box';
// import Alert from '@mui/material/Alert';
// import IconButton from '@mui/material/IconButton';
// import Collapse from '@mui/material/Collapse';
// import CloseIcon from '@mui/icons-material/Close';
// import { AlertTitle } from '@mui/material';
// import {AiFillFileAdd} from 'react-icons/ai'
// import CircleCharts from './CircleChart';
// import './Home.css'
// function Home() {

//    const [PublicKey, setPublicKey] = useState([]);
//    const [change,setChanege]=useState(false)
//     const [name,setClientName]=useState([]);
//    const [data, setData] = useState([]);
//    const [msg, setmsg] = useState('')
//   const [open, setOpen] = useState(false);
//   const [alert,setalert]=useState('info')

//   let uri = new ApiConfig().BaseURI
//   let Api=new ApiConfig()
// //   const publickey='baef7468287a44d8ac3634026d9fb8d1';
// // const sercetkey='181a2f3171117c1bd164c88b1171c1b83114fc1712121b12';
//  const getApiKeyDetails=async ()=>
//   {
   
     
//     let result =await axios.get(Api.addApiKey(`${Api.BaseURI}/getallapikey`))
//     // .then(result=>{
//         // console.log(result.data.result) 
//         setPublicKey([])
//      setClientName([])
//         for(let i=0;i<result.data.result.length;i++)
//         {
//             // console.log(PublicKey.indexOf(result.data.result[i].client_public_key))
//             // if(PublicKey.indexOf(result.data.result[i].client_public_key)==-1 )
//             // {
   
//                 setPublicKey(pre => pre.concat(result.data.result[i].client_public_key))
//                 setClientName(name => name.concat(result.data.result[i].client_origin))
//             // }
//         }
//     //  }) 
//   }

//     useEffect( ()=>{
       
// getApiKeyDetails()
   
//   },[change])

   


//   const columns = [
//     // {field:'id',headerName:'id',width:50},
//     { field: 'id', headerName: 'Public Key', width: 200 },
//     { field: 'name', headerName: 'Client Name', width: 200 }

//   ];
  
  
//   let rows = []
//     for (let i = 0; i < PublicKey.length; i++) {
     
//     // if (rows.indexOf(PublicKey[i])===-1  & !rows.includes(PublicKey[i]) ) {

//       rows.push({ id: PublicKey[i] ,name:name[i]})
//     // }
//   }


//   function RegenrateKeys()
//   {
//     console.log(data[0])
//     let row=[]
//     for (let i = 0; i < data.length; i++) {
//       let index = rows.findIndex(x => x.id == data[0])
//       console.log(index)
//       console.log(rows[index].role)

//       row.push(rows[index].name)
//     }
//     console.log(row)
//     if(data.length>0)
//     {
//       axios.get(Api.addApiKey(`${Api.BaseURI}/createapikey`)).then(res=>{
//           console.log(res)
//           if(change)
//           setChanege(false)
//           else
//           setChanege(true)
//       })

//     }
//     else
//     {
//       axios.get(Api.addApiKey(`${Api.BaseURI}/createapikey`)).then(res=>{
//         console.log(res)
//         if(change)
//         setChanege(false)
//         else
//         setChanege(true)
//     })
//     }
//     }
 
 
//   return (
//     <>
//       <div className='grid-container' style={{
//         position: 'absolute',
//         top: '100px',
//         height: "calc(100vh-100px)",
//         width:'100%'

//       }}>




//         <Box className='alert-box' >
//           <Collapse in={open}
//             sx={{

//               justifyItems: 'center'

//             }}
//           >
//             <Alert severity={alert}
//               action={
//                 <IconButton
//                   aria-label="close"
//                   color="inherit"
//                   size="small"
//                   onClick={() => {
//                     setOpen(false);
//                   }}
//                 >

//                   <CloseIcon fontSize="inherit" />
//                 </IconButton>
//               }
//               sx={{
//                 mb: 2, justifyContent: "center",
//               }}
//             ><AlertTitle>        {msg}
//               </AlertTitle>

//             </Alert>
//           </Collapse>
//         </Box>


//         <div className='circlechart'>
//             <span className='chart-heading'>Session users</span>
//             <div>
//               <CircleCharts/>
//             </div>
          
//           </div>
//         <div className='circlechart'>
//             <span className='chart-heading'>Overall users</span>
//             <div>
//               <CircleCharts/>
//             </div>
          
//           </div>
//         <div className='circlechart'>
//             <span className='chart-heading'>Session users</span>
//             <div >
//               <CircleCharts/>
//             </div>
          
//           </div>

//         <Typography sx={{
//           // border:'2px solid #1c84c3',
//           width: '65%',
//           height: 550,
//           boxShadow: 8,
//           position: 'relative',
//           left: '80px',
//           top: '10px',
//           bottom: '100px',
//           borderRadius: '20px',
//           marginBottom: '0px',
//           padding: '3em'

//         }}>
          
         
//           <Typography style={{
//           position: 'relative',
//           // left:'475px',
//           bottom: '50px',
//           right: '2em',
//           // paddingLeft:'10px',
//           // paddingRight:'10px',
//           color: '#1c84c3',
//           fontWeight: 700,
//           boxShadow: 8,
//           width: '200px',
//           fontSize: '20px',
//           backgroundColor: 'white',
//           // border:'2px solid #1c84c3',
//           textAlign: 'center'
//         }}>Api Keys</Typography>
// {/* 
//           <div style={{
//             postion: 'relative', rigth: '200px', color: '#1c84c3',
//             marginLeft: '200px'
//           }}>
 


 
 



//           </div> */}
//           <DataGrid
//             rows={rows}
//             columns={columns}
//             pageSize={5}
//             rowsPerPageOptions={[3]}
//             checkboxSelection
//             sx={{
//               width: '100%',
//               height: 400,
//               postion: 'relative', top: 'em', left: '0em', boxShadow: 8,
//               border: '2px solid #1c84c3',
//             }}
//             onSelectionModelChange={item => setData(item)}
//           />
//           <Button sx={{
//             position: 'absolute',
//             left: '85%',
//             marginTop: '15px',
//             backgroundColor: '#1c84c3',
//             color: 'white',
//             "&:hover": {
//               backgroundColor: '#fff',
//               color: '#1c84c3', fontWeight: 700, border: '2px solid #1c84c3'
//             },
//           }} onClick={RegenrateKeys}  >Regenrate</Button>
//         </Typography>

//       </div>

//     </>
//   )
// }

 

// export default Home
import axios from 'axios'
import React, { useEffect, useMemo, useState, useRef } from 'react'
import { PulseLoader } from 'react-spinners'
import ApiConfig from '../ApiConfig'
import { FiRefreshCcw } from 'react-icons/fi';
import { SiMicrosoftexcel } from 'react-icons/si';
import { useDownloadExcel, DownloadTableExcel } from 'react-export-table-to-excel';
import { CSVLink, CSVDownload } from "react-csv";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Typography } from '@mui/material';
import './Home.scss'


export default function SessionPage() {
	const [activeUsernames, setUsernames] = useState([])
	const [sessionResponseUsers, setSessionRespUsers] = useState([])
	const [sessionEvalResponse, setSessionEvalResp] = useState([])
	const [activeUsersLoader, setActiveLoader] = useState(false)
	const [resLoader, setResLoader] = useState(false)
	const [EvalLoader, setEvalLoader] = useState(false)
	const [tab, setTab] = useState('session');
	const [title, setTitle] = useState(true);
	const [date1, setDate1] = useState('');
	const [date2, setDate2] = useState('');
	const [isActive, setIsActive] = useState(false);
	const [isDateActive, setIsDateActive] = useState(false);
	const [selected, setSelected] = useState('Latest session');
	const [userresponse, setUserResponse] = useState([]);
	const [evalRespSummary, setEvalRespSummary] = useState([]);
	const [sessionSummary, setSessionSummary] = useState([]);
	const [distinctuserresponse, setDistinctUserResponse] = useState(0);
	const [distinctevalresp, setDistinctEvalResp] = useState(0);
	const [distinctsessionusers, setDistinctSessionUsers] = useState(0);
	const [option, setOption] = useState('Latest session');
	const [userGroups,setuserGroups]=useState([])
	const [userGroup,setuserGroup]=useState('')
	const [teachers,setTeachers]=useState([])
	const [teacher,setTeacher]=useState('')
    const [track,setTracks]=useState([])
	const [selectedtrack,setSelectedtrack]=useState('')
	console.log("selected track",selectedtrack)
	let Api = new ApiConfig();

	function GetUSerGroups(){
		axios.get(Api.addApiKey(`${Api.BaseURI}/getusergroups`)).then(res=>{
		  setuserGroups([])
		  for (let i = 0; i < res.data.length; i++) {
		   
			if (!userGroups.includes(res.data[i].user_group) & userGroups.indexOf(res.data[i].user_group == -1)) {
		   
	  
			  setuserGroups(userGroups => userGroups.concat(res.data[i].user_group))
			}
		   }
		})
	}
	  
	function getTeachers(){
	console.log("teacher",userGroup)
	axios.get(Api.addApiKey(`${Api.BaseURI}/getteachers?usergroup=${userGroup}`)).then(res=>{
	
		setTeachers([])
		for (let i = 0; i < res.data.length; i++) {
			
			if (!teachers.includes(res.data[i].teacher) & teachers.indexOf(res.data[i].userid == -1)) {
			console.log(res.data[i].userid)
		
	
			setTeachers(teachers => teachers.concat(res.data[i].userid))
		}
		}
		console.log(teachers)
	
	})
	}
	  
	async function getSessionInfo() {
		setActiveLoader(true)

		let activeUsers = await axios.get(Api.addApiKey(`${Api.BaseURI}/getsessionactiveusers?usergroup=${userGroup}&userid=${teacher}`))
		// .then(res => {
		// 	console.log(res.data.result)
		if (activeUsers.data.status === 200) {

			setUsernames(activeUsers.data.result)
		}

		// 	// console.log(usernames)

		// })
		setActiveLoader(false)
		// return activeUsers;
	}

	async function getUserSessionResp() {
		setResLoader(true)
		let userSessionResp = await axios.get(Api.addApiKey(`${Api.BaseURI}/getsessionuserresponse?usergroup=${userGroup}&userid=${teacher}`))
		// .then(res => {
		if (userSessionResp.data.status === 200) {
			setSessionRespUsers(userSessionResp.data.result)
		}
		// 	else {
		// 		setResLoader(false)
		// 	}


		// })
		setResLoader(false);
		// return userSessionResp;
	}

	async function getUserEvalResp() {
		setEvalLoader(true)
		let userEval = await axios.get(Api.addApiKey(`${Api.BaseURI}/getsessionuserevalresponse?usergroup=${userGroup}&userid=${teacher}`));

		if (userEval.data.status === 200) {
			setSessionEvalResp(userEval.data.result)
		}

		setEvalLoader(false);
		return userEval;
	}

	async function getUserResposneRecords(title, date1, date2, teacher) {

		setResLoader(true);
	

		// console.log("api", (Api.addApiKey(`${Api.BaseURI}/getuserresponsesummary?usergroup=${userGroup}&title=${title}&date1=${date1}&date2=${date2}&&teacher=${teacher}`)));
		await axios.get(Api.addApiKey(`${Api.BaseURI}/getuserresponsesummary?usergroup=${userGroup}&title=${title}&date1=${date1}&date2=${date2}&userid=${teacher}&track=${selectedtrack}`))
			.then(resp => {
				if (resp.data.status === 200) {
					setUserResponse(resp.data.result)
				}
				setResLoader(false)
			});

		// return userresponse
	}

	async function evalResponseSummary(title, date1, date2, teacher) {
		setEvalLoader(true);
		// console.log("first", (Api.addApiKey(`${Api.BaseURI}/getevalresponsesummary?usergroup=${userGroup}&title=${title}&date1=${date1}&date2=${date2}&teacher=${teacher}`)));
		await axios.get(Api.addApiKey(`${Api.BaseURI}/getevalresponsesummary?usergroup=${userGroup}&title=${title}&date1=${date1}&date2=${date2}&userid=${teacher}&track=${selectedtrack}`))
			.then(resp => {
				if (resp.data.status === 200) {
					console.log("resp.data.result", resp.data.result)
					setEvalRespSummary(resp.data.result);
				}
				setEvalLoader(false);
			});
	}

	async function userSessionSummary(title, date1, date2, teacher) {
		setActiveLoader(true);
		// console.log("first", (Api.addApiKey(`${Api.BaseURI}/getsessionsummary?usergroup=${userGroup}&title=${title}&date1=${date1}&date2=${date2}&teacher=${teacher}`)));
		await axios.get(Api.addApiKey(`${Api.BaseURI}/getsessionsummary?usergroup=${userGroup}&title=${title}&date1=${date1}&date2=${date2}&userid=${teacher}&track=${selectedtrack}`))
			.then(resp => {
				if (resp.data.status === 200) {
					console.log("resp.data.result", resp.data.result)
					setSessionSummary(resp.data.result);
				}
				setActiveLoader(false);
			});
	}

	async function getDistinctUserResponse(title, date1, date2, teacher) {
		setResLoader(true);
		console.log(Api.addApiKey(`${Api.BaseURI}/distinctuserresponse?usergroup=${userGroup}&title=${title}&date1=${date1}&date2=${date2}&userid=${teacher}&track=${selectedtrack}`));
		await axios.get(Api.addApiKey(`${Api.BaseURI}/distinctuserresponse?usergroup=${userGroup}&title=${title}&date1=${date1}&date2=${date2}&userid=${teacher}&track=${selectedtrack}`))
			.then(resp => {
				if (resp.data.status === 200) {
					console.log("getDistinctUserResponse", resp.data.result);
					setDistinctUserResponse(resp.data.result[0]);
				}
				setResLoader(false);
			});
	}

	async function getDistinctEvalResponse(title, date1, date2, teacher) {
		setEvalLoader(true);
		// console.log(Api.addApiKey(`${Api.BaseURI}/distinctevalresponse?usergroup=${userGroup}&title=${title}&date1=${date1}&date2=${date2}&teacher=${teacher}`))
		await axios.get(Api.addApiKey(`${Api.BaseURI}/distinctevalresponse?usergroup=${userGroup}&title=${title}&date1=${date1}&date2=${date2}&userid=${teacher}&track=${selectedtrack}`))
			.then(resp => {
				if (resp.data.status === 200) {
					console.log("getDistinctEvalResponse", resp.data.result)
					setDistinctEvalResp(resp.data.result[0]);
				}
				setEvalLoader(false);
			});
	}

	async function getDistinctSessionUsers(title, date1, date2, teacher) {
		setActiveLoader(true);
		// console.log(Api.addApiKey(`${Api.BaseURI}/distinctsessionusers?usergroup=${userGroup}&title=${title}&date1=${date1}&date2=${date2}&teacher=${teacher}`))
		await axios.get(Api.addApiKey(`${Api.BaseURI}/distinctsessionusers?usergroup=${userGroup}&title=${title}&date1=${date1}&date2=${date2}&userid=${teacher}&track=${selectedtrack}`))
			.then(resp => {
				if (resp.data.status === 200) {
					console.log("getDistinctSessionUsers", resp.data.result[0].user_count
					);
					setDistinctSessionUsers(resp.data.result[0].user_count);
				}
				setActiveLoader(false);
			});
	}

	async function GetTrack(){
		let result=await axios.get(Api.addApiKey(`${Api.BaseURI}/tracks`))
		let resultlabel=result?.data.map((item)=>item.track)
		setTracks(resultlabel);
		console.log("res",Api.addApiKey(`${Api.BaseURI}/tracks`),"datae",resultlabel)
	}

	useEffect(() => {
		console.log('username',sessionStorage.getItem('username'))
		
		GetUSerGroups();
		GetTrack();
		// getSessionInfo();
		// getUserEvalResp();
		// getUserSessionResp();
		// getDistinctUserResponse('session', '', '',teacher);
		// getDistinctEvalResponse('session', '', '',teacher);
		// getDistinctSessionUsers('session', '', '', teacher);
	}, []);

	// useEffect(()=>{

	// },[selectedtrack])

	let	teachersSelect=useMemo(()=>{
	getTeachers()

		},[userGroup])

	const tableActiveUsersTableRef = useRef(null);
	const tableResponseTableRef = useRef(null);
	const tableEvalRespTableRef = useRef(null);

	function setActiveUsersTable() {
		let activeuserarr = sessionSummary.length === 0 ? activeUsernames : sessionSummary;
		// console.log(new Date(activeuserarr[0].login))
		return (
			<>
			{/* <div className='table-exe'>
				<table className='table-exe'>
					<tr>
						<th>#</th>
						<th>Username</th>
						<th>login</th>
					</tr>

					{activeuserarr.map((items, index) =>
						<tr>
							<td>{index + 1}</td>
							<td>{items.username}</td>
							<td>{new Date(items.login).toLocaleString()}</td>
						</tr>
					)}
				</table>
			</div> */}

			<div class="container">
				<div class="table-wrap">
					<table class="table table-responsive table-borderless">
						<thead>
							<th>Index</th>
							<th>Username</th>
							<th>Login</th>
						</thead>
						<tbody>
							{activeuserarr.map((items, index) =>
								<tr class="align-middle alert border-bottom" role="alert">
									<td>{index + 1}</td>
									<td>{items.Email}</td>
									<td>{(items.Login)}</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
			</>
		)
	}



	function setResponseTable() {
		// console.log(userresponse)
		let resparr = userresponse.length === 0 ? sessionResponseUsers : userresponse;
		console.log("userresponce",userresponse)
		return (
			<>
			{/* <div className='table-exe'>
				<table className='table-exe'>
					<tr>
						<th>#</th>
						<th>Username</th>
						<th>Exercises completed</th>
						<th>Score</th>
						<th>Total marks</th>
						<th>Badge points earned</th>
					</tr>

					{resparr.map((items, index) =>
						<tr>
							<td>{index + 1}</td>
							<td>{items.userid}</td>
							<td>{items.excount}</td>
							<td>{items.score}</td>
							<td>{items.total}</td>
							<td>{items.badges}</td>
						</tr>
					)}
				</table>
			</div> */}

			<div class="container">
				<div class="table-wrap">
					<table class="table table-responsive table-borderless">
						<thead>
							<th>Index</th>
							<th>Username</th>
							<th>Exercises completed</th>
							<th>Score</th>
							<th>Total marks</th>
							<th>Badge points earned</th>
						</thead>
						<tbody>
							{resparr.map((items, index) =>
								<tr class="align-middle alert border-bottom" role="alert">
									<td>{index + 1}</td>
									<td>{items.Email}</td>
									<td>{items.Exercises_completed}</td>
									<td>{items.Score}</td>
									<td>{items.Total_marks}</td>
									<td>{items.Badge_points_earned}</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>

			</>
		)
	};

	function setEvalRespTable() {
		let evalarr = evalRespSummary.length === 0 ? sessionEvalResponse : evalRespSummary;
		return (
			<>
			{/* <div className='table-exe'>
				<table className='table-exe'>
					<tr>
						<th>#</th>
						<th>Username</th>
						<th>Evaluation name</th>
						<th>No of correct answers</th>
						<th>Total no of  questions</th>
						<th>Score</th>
						<th>Total score</th>
					</tr>

					{evalarr.map((items, index) =>
						<tr>
							<td>{index + 1}</td>
							<td>{items.userid}</td>
							<td>{items.module_name}</td>
							<td>{items.no_of_correct_answers}</td>
							<td>{items.no_of_total_questions}</td>
							<td>{items.score}</td>
							<td>{items.total_marks}</td>
						</tr>
					)}
				</table>
			</div> */}

			<div class="container">
				<div class="table-wrap">
					<table class="table table-responsive table-borderless">
						<thead>
							<th>Index</th>
							<th>Username</th>
							<th>First_name</th>
							<th>Last_name</th>
							<th>Evaluation_name</th>
							<th>Score</th>
							<th>Total marks</th>
						</thead>
						<tbody>
							{evalarr.map((items, index) =>
								<tr class="align-middle alert border-bottom" role="alert">
									<td>{index + 1}</td>
									<td>{items.Email}</td>
									<td>{items.First_Name}</td>
									<td>{items.Last_Name}</td>
									<td>{items.Evaluation_name}</td>
									<td>{items.Score}</td>
									<td>{items.Total_marks}</td>
									
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
			</>
		)
	};

	function toDownloadCsv() {
		let dataarr;
		if (tab === 'session') {
			dataarr = sessionSummary.length === 0 ? activeUsernames : sessionSummary;
		} else if (tab === 'exe') {
			dataarr = userresponse.length === 0 ? sessionResponseUsers : userresponse;
		} else if (tab === 'eval') {
			dataarr = evalRespSummary.length === 0 ? sessionEvalResponse : evalRespSummary;
		}
		return dataarr;
	}


	const ActiveUsersTable = useMemo(() => {
		setActiveLoader(false)
		return setActiveUsersTable()
	}, [activeUsernames])

	const ResponseTable = useMemo(() => {
		setResLoader(false)
		return setResponseTable();

	}, [sessionResponseUsers])

	const EvalRespTable = useMemo(() => {
		setEvalLoader(false)
		return setEvalRespTable();
	}, [sessionEvalResponse]);



	let menuRef = useRef();
	// console.log("menuRef", menuRef)
	useMemo(() => {
		const handleClickOutside = (event) => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setIsActive(false);
				setIsDateActive(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [menuRef])


	function setDropDown() {
		return (
			<>
				<div ref={menuRef} className='pyui_session'>
					<div className={`pyui_session-inner ${isActive ? "expanded" : ""}`}
						onClick={(e) => setIsActive(!isActive)}>
						<span>{selected}</span>
					</div>
					{isActive && (
						<ul className="pyui_session-list">
							<li className='pyui_session-list-item'
								onClick={(e) => {
									setSelected(e.target.textContent)

									evalResponseSummary('session', '', '', teacher);
									getUserResposneRecords('session', '', '', teacher);
									userSessionSummary('session', '', '', teacher);
									getDistinctUserResponse('session', '', '', teacher);
									getDistinctEvalResponse('session', '', '', teacher);
									getDistinctSessionUsers('session', '', '', teacher);
									setIsActive(false);
									setOption('Latest session');
									// getSessionInfo()
									// getUserEvalResp()
									// getUserSessionResp()
									setTitle(true)
								}}
							>
								Latest session
							</li>
							<li className='pyui_session-list-item'
								onClick={(e) => {
									setSelected(e.target.textContent)
									// getUserResposneRecords();

									evalResponseSummary('today');

									getUserResposneRecords('today');
									userSessionSummary('today')
									getDistinctUserResponse('today');
									getDistinctEvalResponse('today');
									getDistinctSessionUsers('today');
									setOption('today');
									setIsActive(false);
									setTitle(false);
								}}
							>
								Today
							</li>
							<li className='pyui_session-list-item'
								onClick={(e) => {
									// setTitle('7days')
									setSelected(e.target.textContent);

									evalResponseSummary('7days')

									getUserResposneRecords('7days');
									userSessionSummary('7days');
									getDistinctUserResponse('7days');
									getDistinctEvalResponse('7days');
									getDistinctSessionUsers('7days');
									setOption('7days');
									setIsActive(false);
									setTitle(false);
								}}
							>
								Last 7 days
							</li>
							<li className='pyui_session-list-item'
								onClick={(e) => {
									// setTitle('15days');
									setSelected(e.target.textContent);

									evalResponseSummary('15days')

									getUserResposneRecords('15days');
									userSessionSummary('15days');
									getDistinctUserResponse('15days');
									getDistinctEvalResponse('15days');
									getDistinctSessionUsers('15days');
									setOption('15days');
									setIsActive(false);
									setTitle(false);
								}}
							>
								Last 15 days
							</li>
							<li className='pyui_session-list-item'
								onClick={(e) => {
									// setTitle('30days');
									setSelected(e.target.textContent);

									evalResponseSummary('30days')

									getUserResposneRecords('30days');
									userSessionSummary('30days');
									getDistinctUserResponse('30days');
									getDistinctEvalResponse('30days');
									getDistinctSessionUsers('30days');
									setOption('30days');
									setIsActive(false);
									setTitle(false);
								}}
							>
								Last 30 days
							</li>
							<li className={`pyui_session-list-item-date ${isDateActive ? "expand" : ""}`}
								onClick={(e) => {
									setIsDateActive(!isDateActive);
									// setTitle('custom');
									// getUserResposneRecords()
									setSelected(e.target.textContent);
									setTitle(false);
								}}
							>
								<span className='date-picker-title'>Custom date range</span>
							</li>
							{isDateActive && (
								<li className='pyui_session-list-date'>
									<div className='custom-date'>
										<input className='date-input-field' value={date1} onChange={e => setDate1(e.target.value)} type="date" />
										to
										<input className='date-input-field' value={date2} onChange={e => {
											setDate2(e.target.value);
										}} type="date" />
										<button className='primary-button' onClick={() => {
											evalResponseSummary('custom', date1, date2);
											getUserResposneRecords('custom', date1, date2);
											userSessionSummary('custom', date1, date2);
											getDistinctUserResponse('custom', date1, date2);
											getDistinctEvalResponse('custom', date1, date2);
											getDistinctSessionUsers('custom', date1, date2);
											setOption('custom');
											setIsActive(false);
											setIsDateActive(!isDateActive);
											// setTitle(false);
										}}>Get details</button>
									</div>
								</li>
							)}
						</ul>
					)}
				</div>
			</>
		)
	}

	function setSummaryTitle(user_count) {
		// console.log("user_count", user_count);
		// let user_count = usercount.user_count;
		let title = '';
		let user = user_count > 1 ? 'users' : 'user'
		if (tab === 'session') {
			if (option === 'Latest session') {
				title = `Total ${user_count} ${user} logged in during latest session.`;
			} else if (option === 'today') {
				title = `Total ${user_count} ${user} logged in during today's session.`;
			} else if (option === '7days') {
				title = `Total ${user_count} ${user} logged in during last 7 days.`;
			} else if (option === '15days') {
				title = `Total ${user_count} ${user} logged in during last 15 days.`;
			} else if (option === '30days') {
				title = `Total ${user_count} ${user} logged in during last 30 days.`;
			} else if (option === 'custom') {
				title = `Total ${user_count} ${user} logged in between ${date1} and ${date2}.`;
			}
		}
		return title;
	}

	function setExerciseSumTitle(distinctuserresponse) {
		// console.log("distinctuserresponse", distinctuserresponse);
		let distinct_excount = parseInt(distinctuserresponse.distinct_excount) || 0;
		let user_count = parseInt(distinctuserresponse.user_count) || 0;
		let excount = parseInt(distinctuserresponse.excount) || 0;
		// console.log("distinct_excount", distinct_excount);
		// console.log("user_count", user_count);
		// console.log("excount", excount);
		let title = '';
		let user = user_count > 1 ? 'users' : 'user';
		let exercises = distinct_excount > 1 ? 'exercises' : 'exercise';
		if (tab === 'exe') {
			if (option === 'Latest session') {
				title = `Total ${user_count} distinct ${user} have submitted ${distinct_excount} distinct ${exercises} out of ${excount} exercises during latest session`;
			} else if (option === 'today') {
				title = `Total ${user_count} distinct ${user} have submitted ${distinct_excount} distinct ${exercises} out of ${excount} exercises during today's session.`;
			} else if (option === '7days') {
				title = `Total ${user_count} distinct ${user} have submitted ${distinct_excount} distinct ${exercises} out of ${excount} exercises during last 7 days.`;
			} else if (option === '15days') {
				title = `Total ${user_count} distinct ${user} have submitted ${distinct_excount} distinct ${exercises} out of ${excount} exercises during last 15 days.`;
			} else if (option === '30days') {
				title = `Total ${user_count} distinct ${user} have submitted ${distinct_excount} distinct ${exercises} out of ${excount} exercises during last 30 days.`;
			} else if (option === 'custom') {
				title = `Total ${user_count} distinct ${user} have submitted ${distinct_excount} distinct ${exercises} out of ${excount} exercises between ${date1} and ${date2}.`;
			}
		}
		// console.log("title", title);
		return title;
	}

	function setEvalSumTitle(distinctevalresp) {
		console.log("distinctevalresp", distinctevalresp);
		let distinct_mdcount = parseInt(distinctevalresp.distinct_mdcount) || 0;
		let user_count = parseInt(distinctevalresp.user_count) || 0;
		let module_count = parseInt(distinctevalresp.module_count) || 0;
		// console.log("distinct_mdcount", distinct_mdcount);
		// console.log("user_count", user_count);
		// console.log("module_count", module_count);
		let title = '';
		let user = user_count > 1 ? 'users' : 'user';
		let modules = distinct_mdcount > 1 ? 'evaluations' : 'evaluation';
		if (tab === 'eval') {
			if (option === 'Latest session') {
				title = `Total ${user_count} ${user} submitted ${module_count} ${modules} out of which ${distinct_mdcount} are distinct`;
			} else if (option === 'today') {
				title = `Total ${user_count} ${user} submitted ${module_count} ${modules} out of which ${distinct_mdcount} are distinct today`;
			} else if (option === '7days') {
				title = `Total ${user_count} ${user} submitted ${module_count} ${modules} out of which ${distinct_mdcount} are distinct during last 7 days.`;
			} else if (option === '15days') {
				title = `Total ${user_count} ${user} submitted ${module_count} ${modules} out of which ${distinct_mdcount} are distinct during last 15 days.`;
			} else if (option === '30days') {
				title = `Total ${user_count} ${user} submitted ${module_count} ${modules} out of which ${distinct_mdcount} are distinct during last 30 days.`;
			} else if (option === 'custom') {
				title = `Total ${user_count} ${user} submitted ${module_count} ${modules} out of which ${distinct_mdcount} are distinct between ${date1} and ${date2}.`;
			}
		}
		return title;
	}

	function csvLink(filename) {
		if (tab === 'session') {
			return (
				<>

				</>
			)
		}
	}

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
		<div className='content' style={{ marginTop:100, display:'flex'}}>  { /* //marginLeft:100 */}
					<Box sx={{ width: 230, height:50, marginLeft: '30px', marginBottom:2 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select group</InputLabel>
                        <Select
                        sx={{height:'50px',}}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={userGroup}
                          label="select role"
                          onChange={(e) => setuserGroup(e.target.value)}
                        >{userGroups.map((data, index) => (

                          <MenuItem key={index} value={data}>{data}</MenuItem>
                        ))}
                        </Select>
                      </FormControl>
                    </Box>

                    {/* {teachersSelect} */}
					<Box sx={{width: 270, height:50, marginLeft: '30px', marginBottom:2}}>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">Select teacher/admin</InputLabel>
							<Select
							sx={{height:'50px',}}
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={teacher}
								label="select role"
								onChange={(e) => setTeacher(e.target.value)}
							>{teachers.map((data, index) => (

								<MenuItem key={index} value={data}>{data}</MenuItem>
							))}

							</Select>
						</FormControl>
  					</Box>	

					  <Box sx={{width: 270, height:50, marginLeft: '30px', marginBottom:2}}>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">Track</InputLabel>
							<Select
							sx={{height:'50px',}}
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={selectedtrack}
								label="select role"
								onChange={(e) => setSelectedtrack(e.target.value)}
							>{track.map((data, index) => (

								<MenuItem key={index} value={data}>{data}</MenuItem>
							))}

							</Select>
						</FormControl>
  					</Box>	

					<span className='select-interval'>
						<span className='interval-title'>Select interval</span>
						{setDropDown()}
						<button title='Refresh' onClick={() => {
							getSessionInfo();
							getUserSessionResp();
							getUserEvalResp();
							getDistinctUserResponse('session', '', '', teacher);
							getDistinctEvalResponse('session', '', '', teacher);
							getDistinctSessionUsers('session', '', '', teacher);
						}} style={{ padding: '0.9rem 1rem' }} className={title === true ? 'primary-button' : 'primary-button disabled'}>
							<FiRefreshCcw />
						</button>
					</span>	
		</div>

		<div className='content' style={{ marginBottom:100}}>  { /* //marginLeft:100 */}
			<section className="pyui_main-content-section">

				{/* <span className='select-interval'>
					<span className='interval-title'>Select interval</span>
					{setDropDown()}
					<button title='Refresh' onClick={() => {
						getSessionInfo();
						getUserSessionResp();
						getUserEvalResp();
						getDistinctUserResponse('session', '', '', teacher);
						getDistinctEvalResponse('session', '', '', teacher);
						getDistinctSessionUsers('session', '', '', teacher);
					}} style={{ padding: '0.5rem 1rem' }} className={title === true ? 'primary-button' : 'primary-button disabled'}>
						<FiRefreshCcw />
					</button>
				</span> */}

				<span className='session-tabs'>

					<p className={tab === 'session' ? 'tab-selected' : 'pyui_main-tabs2'} onClick={() => { setTab('session') }} >Session summary</p>
					<p className={tab === 'exe' ? 'tab-selected' : 'pyui_main-tabs2'} onClick={() => { setTab('exe') }}>Exercises completed</p>
					<p className={tab === 'eval' ? 'tab-selected' : 'pyui_main-tabs2'} onClick={() => { setTab('eval') }}>Evalutions completed</p>
				</span>
				{tab === 'session' && (
					<>
						<div className='pyui-download-buttons'>
							<h3>{setSummaryTitle(distinctsessionusers)}</h3>

							{/* <button title='Refresh' onClick={() => { getSessionInfo() }} style={{ padding: '0.5rem 1rem' }} className='primary-button'>
								<FiRefreshCcw />
							</button> */}
							{/* <DownloadTableExcel
								filename="Logged in students table"
								sheet="Logged in students"
								currentTableRef={tableActiveUsersTableRef.current}
							>
								<button title='Excel' style={{ padding: '0.5rem 1rem' }} className='primary-button'><SiMicrosoftexcel /></button>
							</DownloadTableExcel> */}
							<button title='Excel' style={{ padding: '0.9rem 1rem' }} className={sessionSummary.length === 0 && activeUsernames.length === 0 ? 'primary-button disabled' : 'primary-button'}>
								<CSVLink data={toDownloadCsv()} filename={'logged_in_users.csv'}>
									<SiMicrosoftexcel color='white' />
								</CSVLink>
							</button>
						</div>
						{activeUsersLoader ?
							<p className='formloader-spinner'>
								Loading
								<PulseLoader
									color="#1c84c3"
									loading={activeUsersLoader}
									cssOverride={override}
									size={3}
									className="pulse-loader"
									aria-label="Loading Spinner"
									data-testid="loader"
									speedMultiplier={0.5}
								/>
							</p>
							:
							<>
								{setActiveUsersTable()}
							</>
						}
					</>
				)}
				{tab === 'exe' && (
					<>
						<div className='pyui-download-buttons'>
							<h3>{setExerciseSumTitle(distinctuserresponse)} </h3>


							{/* 
							<button title='Refresh' onClick={() => {
								getUserSessionResp()
								// console.log("title", title);
								// setTitle(title);
								// userReponse();
							}} style={{ padding: '0.5rem 1rem' }} className='primary-button'><FiRefreshCcw /></button> */}

							{/* <DownloadTableExcel
								filename="Exercises completed"
								sheet="Exercises"
								currentTableRef={tableResponseTableRef.current}
							>
								<button title='Excel' style={{ marginRight: '1rem', padding: '0.5rem 1rem' }} className='primary-button' ><SiMicrosoftexcel /></button>
							</DownloadTableExcel> */}
							<button title='Excel' style={{ padding: '0.9rem 1rem' }} className={userresponse.length === 0 && sessionResponseUsers.length === 0 ? 'primary-button disabled' : 'primary-button'}>
								<CSVLink data={toDownloadCsv()} filename={'Exercises_completed.csv'}>
									<SiMicrosoftexcel color='white' />
								</CSVLink>
							</button>
						</div>
						{resLoader ?
							<p className='formloader-spinner'>
								Loading
								<PulseLoader
									color="#1c84c3"
									loading={resLoader}
									cssOverride={override}
									size={3}
									className="pulse-loader"
									aria-label="Loading Spinner"
									data-testid="loader"
									speedMultiplier={0.5}
								/>
							</p>
							:
							<>

								{setResponseTable()}
							</>
						}
					</>
				)}
				{tab === 'eval' && (
					<>
						<div className='pyui-download-buttons'>
							<h3 >{setEvalSumTitle(distinctevalresp)}</h3>
							{/* <button title='Refresh' onClick={() => { getUserEvalResp() }} style={{ padding: '0.5rem 1rem' }} className='primary-button'><FiRefreshCcw /></button> */}

							{/* <DownloadTableExcel
								filename="Evaluations completed"
								sheet="Evaluations"
								currentTableRef={tableEvalRespTableRef.current}
							>
								<button title='Excel' style={{ marginRight: '1rem', padding: '0.5rem 1rem' }} className='primary-button'><SiMicrosoftexcel /></button>
							</DownloadTableExcel> */}

							<button title='Excel' style={{ padding: '0.9rem 1rem' }} className={evalRespSummary.length === 0 && sessionEvalResponse.length === 0 ? 'primary-button disabled' : 'primary-button'}>
								<CSVLink data={toDownloadCsv()} filename={'Evaluations_completed.csv'}>
									<SiMicrosoftexcel color='white' />
								</CSVLink>
							</button>
						</div>
						{EvalLoader ?
							<p className='formloader-spinner'>
								Loading
								<PulseLoader
									color="#1c84c3"
									loading={EvalLoader}
									cssOverride={override}
									size={3}
									className="pulse-loader"
									aria-label="Loading Spinner"
									data-testid="loader"
									speedMultiplier={0.5}
								/>
							</p>
							:
							<>

								{setEvalRespTable()}
							</>
						}</>
				)}


			</section>
		</div>
		</>
	)
}
