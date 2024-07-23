import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
 import Bar from './Bar';
import CircleCharts from './CircleChart';
 // import ReactApexChart from './bar';
function createData(TeacherName,NoOfStudents) {
  return {
    TeacherName,
    NoOfStudents,
    Report: [
      {
        days: 20,
        student: 'xyz',
        excrise: 3,
        concepts:5,
        score:0,
        badges:'silver',
        rank:2,

      },
      {
        days: 20,
        student: 'xyz',
        excrise: 3,
        concepts:15,
        score:0,
        badges:'silver',
        rank:1,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
 
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
         
        </TableCell>
                       <TableCell align="justify" style={{position:'relative',right:'110px'}}     > {row.TeacherName}</TableCell>{console.log( row.TeacherName)}
                       <TableCell></TableCell>
                       <TableCell></TableCell>
                       <TableCell align="justify" style={{position:'relative',left:'30px'}}> {row.NoOfStudents}</TableCell>
      
      </TableRow>
   
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Student Report
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                  <TableCell align="justify" >Student</TableCell>
                    <TableCell align="justify" >Enrolled(days)</TableCell>
                    <TableCell style={{paddingLeft: '250px'}}align="justify">Exercise  History</TableCell>
                   
                    <TableCell align="justify">Concepts</TableCell>
                    <TableCell align="justify">Score</TableCell>
                    <TableCell align="justify">Badges</TableCell>
                    <TableCell align="justify">Rank</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.Report.map((ReportRow) => (
                    <TableRow key={ReportRow.student}>
                      
                       <TableCell align="justify"  style={{cursor:'default'}}  > {ReportRow.student}</TableCell>
                      <TableCell style={{paddingLeft:'50px'}} align="justify">{ReportRow.days}</TableCell>
                      <TableCell align="justify"> <Bar />
 </TableCell>
                      <TableCell style={{paddingLeft:'30px'}} align="justify">{ReportRow.concepts}/20</TableCell>
                      <TableCell align="justify">{Math.round((ReportRow.concepts*100))/20}%</TableCell>
                      <TableCell align="justify">{ReportRow.badges}</TableCell>
                      <TableCell align="justify">{ReportRow.rank}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    


    </>
    
  );
}

// Row.propTypes = {
//   // row: PropTypes.shape({
//   //   calories: PropTypes.number.isRequired,
//   //   carbs: PropTypes.number.isRequired,
//   //   fat: PropTypes.number.isRequired,
//   //   Report: PropTypes.arrayOf(
//   //     PropTypes.shape({
//   //       amount: PropTypes.number.isRequired,
//   //       student: PropTypes.string.isRequired,
//   //       date: PropTypes.string.isRequired,
//   //     }),
//   //   ).isRequired,
//   //   TeacherName: PropTypes.string.isRequired,
//   //   NoOfStudents: PropTypes.number.isRequired,


//   // }).isRequired,
// };



Row.defaultProps={

}

 
const rows = [
  createData('Teacher1', 159),
  createData('Teacher2', 237),
  createData('Teacher3', 262),
  createData('Teacher4', 305),
  createData('Teacher5', 356),
];

export default function CollapsibleTable() {
  return (
<>
<span style={{paddingTop:'0px',marginLeft:"70px"}}>
<Typography sx={{color:''}}>Home </Typography>
{/* <CircleCharts /> */}
</span>
<TableContainer style={{paddingTop:'0px', width:'95%',marginLeft:"70px",border:'2px solid #1c84c3',marginTop:'100px'}} component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
          
            <TableCell scop="row" style={{paddingLeft:'250px',fontSize:'20px',marginLeft:"100px"}}>Teacher name</TableCell>
             <TableCell style={{paddingLeft:'250px',fontSize:'20px'}}></TableCell>
            <TableCell style={{paddingLeft:'250px',fontSize:'20px'}}></TableCell>
            <TableCell style={{paddingLeft:'250px',fontSize:'20px'}}></TableCell>
            <TableCell align="right" style={{paddingRight:'250px',fontSize:'20px' ,fontFamily:'Arial, Helvetica, sans-serif' }}>No. of students</TableCell>

          </TableRow>
        
        </TableHead>
        <TableBody>
           

          {rows.map((row) => (
            <Row key={row.name} row={row} />
            
          ))}
           
        </TableBody>
      </Table>
    </TableContainer>
    
    </>
    
  );
}
 
 
function studentData()
{
  fetch('localhost:3000/studentData').then((res)=>res.json()).then((json)=>{let data= json})
  
  
}