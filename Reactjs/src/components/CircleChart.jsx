import React from 'react';


import ReactApexChart from 'react-apexcharts';


function CircleCharts() {

    const completed=[  {name:'ABC',score:70,contribute:Math.round((10*100)/50)+'%'},
      {name:'xyz',score:85,contribute:Math.round((20*100)/50)+'%'},
      {name:'ghi',score:85,contribute:Math.round((30*100)/50)+'%'}
    ]
   const attempted=[
      {name:'def',score:90,contribute:Math.round((1*100)/30)+'%'},
      {name:'lmn',score:70,contribute:Math.round((5*100)/30)+'%'},
      {name:'uvw',score:70,contribute:Math.round((10*100)/30)+'%'},
      {name:'uvw',score:70,contribute:Math.round((10*100)/30)+'%'}
    ]

    
    let n1=completed.length;
    let n2=attempted.length;
    
    
   const series=[100,Math.round((n1*100)/(n1+n2)),Math.round((n2*100)/(n1+n2))]

    var options = {
       
        chart: {
        height: 100,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
            hollow:{
                size:'30%'
            },
          dataLabels: {
            name: {
              fontSize: '5px',
            },
            value: {
              fontSize: '20px',
            },
            total: {
              show: true,
              label: 'Total',
              fill:'#2e83f2',
              formatter: function () {
                 return 100 +'%'
              }
            },
            fill:{
                type:'solid',
                colors:['#2e83f2','#84a6ed','#8ed1e1']

            },
            // colors:[fiil[colors]]

            
          }
        }
      },
      labels: ['Total','Attempted','Completed'],
      };

  return (
     <>
     
           <ReactApexChart options={options} width={350} height={350} type="radialBar"series={series}/>
     </>
  )
}

export default CircleCharts
      
        