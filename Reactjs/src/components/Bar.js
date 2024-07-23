import React, { useEffect, useState } from 'react'
//git Bar branchncsdlknvksndvldbnfbnfdnbnsfnbnfkbfnbnfnbnfnb
import ReactApexChart from 'react-apexcharts' 
export default function Bar() {

  let [completed,setCompleted]=useState('')
  let [ready,setResdy]=useState('')
  const [inprogress,setInprogress]=useState('')
  const [totalexercises,setTotalExercises]=useState('')
const [Remaining,setRemaining]=useState('')


  useEffect(()=>
  {
    fetch(`https://hammerhead-app-ntdmr.ondigitalocean.app/api/usermoduleprogress?userid=Amit.Scholar@gmail.com`).then((result => {
      result.json().then((res) => {
        console.log(res)
        console.log(res[1].total_ex_completed,res[1].total_ex_ready,res[1].total_ex_inprogress);
        setCompleted(res[1].total_ex_completed)
        setResdy(res[1].total_ex_ready)
        setInprogress(res[1].total_ex_inprogress)
        // setUserGroup(undefined)
        // setDebugQues(res)
      })
    })) 


    fetch('https://hammerhead-app-ntdmr.ondigitalocean.app/api/modulesummary').then(result=>{
      result.json().then((res)=>{
        console.log(res[0].total_exercises)
        setTotalExercises(res[0].total_exercises)
      })
    })
setRemaining(totalexercises-(completed+inprogress+ready))
    
  })
  
    var series= [{
      name: 'Completed',
      data: [completed]
    },
    {
      name: 'ready',
      data: [ready]
    },
    {
    name: 'Remaining',
    data: [Remaining]
  },
  {
    name: 'inprogress',
    data: [inprogress]
  },
  ]
 
    
    const options= {
      chart: {
        // id: 'apexchart-example',
        type: 'bar',
        height: 10,
        stacked: true,
        stackType: '100%'
      },
      dataLabels: {
        style: {
          // colors: ['green', '#E91E63', '#9C27B0']
         
        },
        fill: {
          // colors: ['green', '#E91E63', '#9C27B0']
        }
        },


      
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 1,
            //  colors: ['green', '#E91E63', '#9C27B0']
      },
      title: {
        // text: '100% Stacked Bar'
      },
      xaxis: {
        // categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "%"
          }
        }
      },
      fill: {
        opacity: 1
        
        
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 0
      }
    }
    
    return (
      <div>
        {/* <Chart options={options} type="bar" series={series} width="30%" /> */}
        <ReactApexChart options={options} series={series} type="bar" width={550} height={110} />{/** type is type of the bar we can select  */}
</div>
    
    
    );
  }
  
  
  
  
  // class Bar extends Component {
    //     constructor(props) {
    //   export default Bar;
  //       super(props);
    
  //       this.state = {
  //         options: {
  //           chart: {
  //             id: 'apexchart-example'
  //           },
  //           xaxis: {
  //             categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
  //           }
  //         },
  //         series: [{
  //           name: 'series-1',
  //           data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
  //         }]
  //       }
  //     }
  //     render() {
  //       return (
  //         <Chart options={this.state.options} series={this.state.series} type="bar" width={500} height={320} />
  //       )
  //     }
  //   }
  
  //   export default Bar;
  
  
  // impo

// // // class ApexChart extends React.Component {
// // //     constructor(props) {
// // //       super(props);

// // //       this.state = {
      
// // //         series: [{
// // //           name: 'Marine Sprite',
// // //           data: [44, 55, 41, 37, 22, 43, 21]
// // //         } ],
// // //         options: {
// // //           chart: {
// // //             type: 'bar',
// // //             height: 350,
// // //             stacked: true,
// // //             stackType: '100%'
// // //           },
// // //           plotOptions: {
// // //             bar: {
// // //               horizontal: true,
// // //             },
// // //           },
// // //           stroke: {
// // //             width: 1,
// // //             colors: ['#fff']
// // //           },
// // //           title: {
// // //             text: '100% Stacked Bar'
// // //           },
// // //           xaxis: {
// // //             categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
// // //           },
// // //           tooltip: {
// // //             y: {
// // //               formatter: function (val) {
// // //                 return val + "K"
// // //               }
// // //             }
// // //           },
// // //           fill: {
// // //             opacity: 1
          
// // //           },
// // //           legend: {
// // //             position: 'top',
// // //             horizontalAlign: 'left',
// // //             offsetX: 40
// // //           }
// // //         },
      
      
// // //       };
// // //     }

  

// // //     render() {
// // //       return (
        

// // //   <div id="chart">
// // // <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
// // // </div>


// // //       );
// // //     }
// // //   }
// //   export default function bar(){
// //       return(

// //         <>    series: [{
// //             name: 'Marine Sprite',
// //             data: [44, 55, 41, 37, 22, 43, 21]
// //           } ],
// //           options: {
// //             chart: {
// //               type: 'bar',
// //               height: 350,
// //               stacked: true,
// //               stackType: '100%'
// //             },
// //             plotOptions: {
// //               bar: {
// //                 horizontal: true,
// //               },
// //             },
// //             stroke: {
// //               width: 1,
// //               colors: ['#fff']
// //             },
// //             title: {
// //               text: '100% Stacked Bar'
// //             },
// //             xaxis: {
// //               categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
// //             },
// //             tooltip: {
// //               y: {
// //                 formatter: function (val) {
// //                   return val + "K"
// //                 }
// //               }
// //             },
// //             fill: {
// //               opacity: 1
            
// //             },
// //             legend: {
// //               position: 'top',
// //               horizontalAlign: 'left',
// //               offsetX: 40
// //             }
// //           },
        
        
// //         };
// //       }
  
    
  
// //       </>
// //       )
// //   }

// // //   const domContainer = document.querySelector('#app');
// // //   ReactDOM.render(React.createElement(ApexChart), domContainer);