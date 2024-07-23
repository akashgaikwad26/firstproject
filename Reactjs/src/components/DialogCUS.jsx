import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import PulseLoader from "react-spinners/PulseLoader";
import DialogActions from "@mui/material/DialogActions";
import "./AdminPayments.scss"
import '../assets/styles/_Scss/_table.scss'
import './BulkUpdatePackage.scss'
export default function DialogCus({data,isopen,msg,setisopen,isLoading}) {
function getTrack(item)
  {
    //  let result=item.tracks.map((item)=>(item))
     let result2=item.map((item)=>(item.track)).join(" + ")
     console.log("res",result2)
     return result2;
}
  
  console.log('data  #########',isLoading)
    const handleClose= () => {
       isopen=false
       setisopen(false)
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
    <div>
     
      <Dialog open={isopen} style={{
        minWidth:'7rem',
        minHeight:'4rem'
      }}>
      {isLoading?
   
   <PulseLoader
       color="#1c84c3"
       loading={isLoading}
       cssOverride={override}
       size={10}
       className='pulse-loader'
       aria-label="Loading Spinner"
       data-testid="loader"
       speedMultiplier={.5}
     />:
        <DialogContent>
          <div
            style={{
              marginBottom: "0.5rem",
              fontSize: "20px",
              color: "green",
            }}
          >
            {/* {msg} */}
          </div>

          {data.length > 0 && (
            <>
              <span
              className="tabel-name"
              >All packages </span>
              <table>
                <tr>
                  <th>Package ID</th>
                  <th>Tracks</th>
                  <th>Description</th>
                  <th>Duration</th>
                  <th>Amount</th>
                </tr>
              {data.map((item) => (
                <tr>
                <td >{item.packageid}</td>
                <td> {getTrack(item.tracks)}</td>
                <td >{item.description}</td>
                <td >{item.duration}</td>
                <td >{item.amount}</td>
                </tr>
              ))}
              </table>
              <hr style={{ margin: "0.5rem 0rem 0.5rem 0rem" }}></hr>
              <div style={{ margintop: "2rem" }}></div>
            </>
          )}

          {/* {data.map((item)=>{
    <li>{item}</li>
   })} */}
        </DialogContent>
        }
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
         
    </div>
  );
}
