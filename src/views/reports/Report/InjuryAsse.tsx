import {  Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Wrapper from 'components/Card/Wrapper';
import React, {useState, useEffect} from 'react';
import ReactApexChart from 'react-apexcharts';
import axiosServices from 'utils/axiosServices';
import { injuriesCount } from 'utils/Helpers';
// import { injuriesCount } from 'utils/Helpers';




const InjuryAsse = () => {
  const [rows, setRows] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(true)
  const graphData = injuriesCount(rows)
  
  const series:any = [{
    name: 'Light Injuries',
    data: graphData.light
  }, {
    name: 'Moderate Injuries',
    data: graphData.moderate
  }, {
    name: 'Severe Injuries',
    data: graphData.severe
  }]

    


const options:any = {
    chart: {
      type: 'bar',
      height: 500,
      width:'20%',
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          total: {
            enabled: false,
            offsetX: 0,
          }
        }
      },
    },
    stroke: {
      width: 1,
      colors: ['#f0f']
    },
    title: {
      text: ''
    },
    xaxis: {
      categories: ["First aid provided at the scene, but without the need for transportation to a hospital", "Injuries requiring a visit to a hospital but without the need for admission", "Injuries requiring hospital admission"],
      labels: {
        formatter: function (val:any) {
          return val 
        },
        style: {
          colors: [],
          fontSize: '12px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 400,
          cssClass: 'apexcharts-xaxis-label',
      }
      },
    },
    yaxis: {
      title: {
        text: undefined
      },
      labels: {
        maxWidth: 500,
     }
    },
    tooltip: {
      y: {
        formatter: function (val:any) {
          return val
        }
      }
    },
    fill: {
      opacity: 1
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetX: 40,
    }
  }




  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const response = await axiosServices.post(
          `report/injuryAssessment`
        );
        if (response.status === 200) {
          setRows(response.data)
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    init();
  }, []);



    return (
        <Wrapper title='Injury Assesment'>    
            <div id="chart">
                <ReactApexChart options={options} series={series} type="bar" height={450} />
            </div> 
            <Box sx={{ marginTop: 5 }}>
            <Table>
              <TableBody>
                <TableRow >
                  <TableCell colSpan={1}></TableCell>
                  <TableCell colSpan={1}></TableCell>
                  <TableCell colSpan={4}><Typography color={"black"} style={{fontWeight:600}}>First Responder Assessment of Injury Severity</Typography></TableCell>
                </TableRow>
                
                <TableRow >
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell><Typography color={"black"} style={{fontWeight:600}}>Light Injuries</Typography></TableCell>
                  <TableCell><Typography color={"black"} style={{fontWeight:600}}>Moderate Injuries</Typography></TableCell>
                  <TableCell><Typography color={"black"} style={{fontWeight:600}}>Severe Injuries</Typography></TableCell>
                  <TableCell><Typography color={"black"} style={{fontWeight:600}}>Grand Total</Typography></TableCell>
                </TableRow>

                

                {
                  Object.keys(rows).map((item:any, index)=>
                  <TableRow >
                  {index === 0 ? <TableCell rowSpan={Object.keys(rows).length}><Typography color={"black"}>Clinical Outcome</Typography></TableCell>: ''}
                  <TableCell><Typography color={"black"}>{item}</Typography></TableCell>
                  <TableCell>{rows[item].light}</TableCell>
                  <TableCell>{rows[item].moderate}</TableCell>
                  <TableCell>{rows[item].severe}</TableCell>
                  <TableCell>{rows[item].total}</TableCell>
                </TableRow>
                )
                }

              </TableBody>
          </Table>
            </Box>   
        </Wrapper>
    );
};

export default InjuryAsse;