import { useState } from "react";

import ApiConfig from '../ApiConfig'

import pravnyamlogo from "../assets/Pravinyam_Logo_big.svg";
import dslLogo from "../assets/dslLogo1.png";
import { useLocation, useNavigate } from "react-router-dom";
// import { ErrorCode, ErrorHandlerFunc } from '../ErrorWrappers/ErrorHandler'

import "./Login.scss";
import axios from "axios";
let session = false
const Login = ({ response }) => {
 sessionStorage.clear()

  // console.log("Experimental = " + process.env['showExperimental']);
  // console.log("Debug = " + process.env['enableDebug']);
  // console.log("Solver = " + process.env['enableSolver']);

  const [toState, setToState] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({});

  const [errormsg, seterrorMsg] = useState("");

  const { state } = useLocation();
  // console.log("resp", state.response.message);
  const navigate = useNavigate();

  // const userid = sessionStorage.getItem('username');

  let login = new ApiConfig();
  let BaseUri = new ApiConfig().BaseURI;
  let errorarray = [];
  function getdetails() {

    let Api = new ApiConfig()
    axios.get(Api.addApiKey(`${Api.BaseURI}/adminLogin?username=${username}&password=${password}`)).then((res) => {
      // result.json().then((res) => {
        console.log(res)
        // if (ErrorCode.includes(res.status)) {
        //   // console.log("error");

        //   navigate('/login', { state: { response: res.data, type: 'error' } })
        //   axios.get(Api.addApiKey(`${Api.BaseURI}/userLogout?username=${username}`)).then(res => {
        //     console.log(res)
        //   });
        //   sessionStorage.removeItem('username');
        //   sessionStorage.clear();
        //   localStorage.clear();
        // } else {
          handleSubmit(res.data);
        // }
        // handleSubmit(res);
        console.log(res)
        // console.log("res", res);
        return res;
      }).catch(error => {
        console.log("error", error)
      })
    // });
  }


  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      getdetails();
    }
  };

  const errormessage = "Please enter valid username & password";
  const handleSubmit = (resp) => {
 
   

    if (username === "" && password === "") {
      errorarray.push(errormessage);
    } else if (username === "" && password !== "") {
      errorarray.push(errormessage);
    } else if (username !== "" && password === "") {
      errorarray.push(errormessage);
    } else if (resp.status === 406) {
      errorarray.push(errormessage);
    } else if (resp.status === 403) {
      errorarray.push(resp.message);
    } else if (resp.status === 408) {
      errorarray.push(resp.message);
    } else if (resp.status === 500) {
      errorarray.push(resp.message);
    }else if(resp.status==200)
    {
      console.log('username',username,resp.role)
      // sessionStorage.setItem('usernmae','username')
    }else{
      errorarray.push(resp.message)
    }
    
    if (errorarray.length < 1) {
      setToState(true);
    
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('role',resp.role)
      console.log(sessionStorage.getItem('username') != undefined,sessionStorage.getItem('username'))
// sessionStorage.setItem('role',resp.role)
      // sessionStorage.setItem('seconds',resp.seconds);
      // sessionStorage.setItem('minutes',resp.minutes);
      // sessionStorage.setItem('hours',resp.hours);
      // console.log(resp.seconds!=undefined)
   if(resp.role=='admin')
   {

     navigate('/home')
    }else
    {
      navigate('/content/Question')
    }
    } else {
      seterrorMsg(errorarray);
      setToState(false);
    }
  };

  return (
    <>
      {/* {toState ? (
        <Home />
      ) : ( */}
      <main className="pyui_login">
        {
          (state !== undefined) && (state !== null) ?
            <p className="passresetmessage">
              <div className="reset-msg">
                <label className={`pyui-msg ${state.type}`}>
                  {state.response.message}
                  <br />
                  Please login again!
                </label>
              </div>
            </p> :
            ""}
        <div className="pyui_container">
          <section className="pyui_login-panel_logo">
            <article className="pyui_wrapper">
              <img
                className="pyui_login-logo"
                src={pravnyamlogo}
                alt="Logo"
              />
              <span className="tag-line">
                Practice the right way
              </span>
            </article>
          </section>
          <section className="pyui_powered-by">
            <p className="text">Powered By</p>
            <img className="dsl-logo" src={dslLogo} alt="Logo" />
          </section>
          <section className="pyui_loginform">
            {/* <img className="pyui_login-logo" src={pravnyamlogo} alt="Logo" /> */}
            <div className="form-group-1">
              <div className="pyui_loginform-title">
                {/* <BiLock id="lock-icon" size={40} /> */}
                Sign in to <span>Pravinyam</span>
              </div>

              {/* <div className="login-form"> */}
              {/* <FontAwesomeIcon icon="fa-solid fa-user" /> */}
              <input
                className="login_input"
                onChange={(e) => setUsername(e.target.value.replace(/\s/g, ""))}
                type="text"
                name="username"
                // value={username}
                placeholder="Username"
                onKeyDown={onKeyDown}
                id="one"
                autoComplete="off"
              />
              {/* <FontAwesomeIcon icon="fa-solid fa-lock" /> */}
              <input
                className="login_input"
                onChange={(e) => setPassword(e.target.value.replace(/\s/g, ""))}
                type="password"
                name="password"
                onKeyDown={onKeyDown}
                // value={password}
                placeholder="Password"
                id="two"
                autoComplete="off"
              />
              <div className="error-msg">
                <label className="message">{errormsg}</label>
              </div>
              <button
                className="submit-button"
                onClick={()=>{getdetails();seterrorMsg('')}}
                onKeyDown={onKeyDown}
              >
                LOGIN
              </button>
            </div>
            {/* </div> */}
            {/* </Paper>   */}
          </section>
        </div>
      </main>
      {/* //  ) */}
      {/* } */}
    </>
  );
};

export default Login;
export { session }
