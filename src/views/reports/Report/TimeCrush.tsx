import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Wrapper from 'components/Card/Wrapper';
import BasicDataTable, { ColumnType } from 'components/common/BasicDataTable';
import React,{useState, useEffect} from 'react';
import ReactApexChart from 'react-apexcharts';
import axiosServices from 'utils/axiosServices';
import { crashTimeCount } from 'utils/Helpers';
import langString from 'utils/langString';








  const Crash = [
    {
        id:'1',
        timeRange:'6-10',
        number_of_patients:371,
        cum_number:371,
        cum_percent:"20%"
    },
    {
        id:'2',
        timeRange:'11-20 ',
        number_of_patients:626,
        cum_number:997,
        cum_percent:"53%"
    },
    {
        id:'3',
        timeRange:'21-30',
        number_of_patients:454,
        cum_number:1451,
        cum_percent:"76%"
    },
    {
        id:'4',
        timeRange:'31-40',
        number_of_patients:225,
        cum_number:1676,
        cum_percent:"88%"
    },
    {
        id:'5',
        timeRange:'41-50',
        number_of_patients:87,
        cum_number:1763,
        cum_percent:"93%"
    },
    {
        id:'6',
        timeRange:'51-60',
        number_of_patients:56,
        cum_number:1819,
        cum_percent:"96%"
    },
    {
        id:'7',
        timeRange:'> 60',
        number_of_patients:80,
        cum_number:1899,
        cum_percent:"100%"
    },
    ,
    {
        id:'8',
        number_of_patients:1899,
    },
  ]
  

const TimeCrush = () => {

  const [rows, setRows] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(true)
    const graphData = crashTimeCount(rows)

    const Columns: ColumnType[] = [
        {
          header: "Time from Incident to Hospital/Clinic",
          accessor: "time",
          content:(item:any)=> {
            if(item.minTime===61){
              return <Typography textAlign={"left"}>{` > ${item.minTime}`}</Typography>
            }
            else if(item.minTime){
              return <Typography textAlign={"left"}>{`${item.minTime} - ${item.maxTime}`}</Typography>
            }
            else {
              return ""
            }
          }
        },
        {
          header: "Number of Patients",
          accessor: "location",
          content: (item: any) => <Typography>{item.count || item.count === 0 ? item.count : item.total}</Typography>
        },
        {
          header: "Cum Number",
          accessor: "injured",
          content: (item: any) => <Typography>{item.cumulativeCount}</Typography>
        },
        {
          header: "Cum Percent",
          accessor: "responders",
          content: (item: any) => <Typography>{item.cumulativePercent}</Typography>,
        }
      ];



      useEffect(() => {
        const init = async () => {
          setLoading(true);
          try {
            const response = await axiosServices.post(
              `report/hospitalArrivalReport`
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



      const labelFormatter = (value:any)=> {
        let val: any = Math.abs(value);
        if (val >= 1000000) {
          val = (val / 1000000).toFixed(1) + " %";
        }
        return val;
      };
    
    
    const options:any = {
        chart: {
        height: 350,
        type: 'line',
      },
      stroke: {
        width: [0, 3]
      },
      title: {
        text: 'Time Between Crash and Arrival at Hospital'
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1]
      },
      labels: ['6-10', '11-20', '21-30', '31-40', '41-50','51-60',"> 60"],
      xaxis: {
        type: 'text'
      },
      yaxis: [{
        title: {
          text: 'Number of Incidents',
        },
        labels: {
            formatter: labelFormatter
        }
      
      }, {
        opposite: true,
        labels: {
            formatter: labelFormatter
        }
      }]
      };
      const series:any = [{
        name: 'Number of Incidents',
        type: 'column',
        data: graphData.count
      }, {
        name: 'Cumulative Percentage of Patients',
        type: 'line',
        data: graphData.cumulativePercent,
        labelFormatter:(value:any)=> {
            let val: any = Math.abs(value);
            if (val >= 1000000) {
              val = (val / 1000000).toFixed(1) + " %";
            }
            return val;
          }
      }]

    return (
        <Wrapper title={`${langString("Reports")} `}>
        <div id="chart">
           <ReactApexChart options={options} series={series} type="line" height={600} />
       </div>

       <Box sx={{ marginTop: 1 }}>
        <BasicDataTable
                    columns={Columns}
                    rows={rows}
                    page={1}
                    rowsPerPage={10} count={0} setPage={function (value: number): void {
                        throw new Error('Function not implemented.');
                    } } setRowsPerPage={function (value: number): void {
                        throw new Error('Function not implemented.');
                    } }/>
      </Box>
   </Wrapper>
    );
};

export default TimeCrush;