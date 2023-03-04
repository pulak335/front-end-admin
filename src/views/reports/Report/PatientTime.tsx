import { Box, Typography } from '@mui/material';
import Wrapper from 'components/Card/Wrapper';
import BasicDataTable, { ColumnType } from 'components/common/BasicDataTable';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axiosServices from 'utils/axiosServices';
import { genderPatientCount } from 'utils/Helpers';
import langString from 'utils/langString';




const PatientTime = () => {

  const [rows, setRows] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(true)

    const Columns: ColumnType[] = [
        {
          header: "Age",
          accessor: "Age",
          content:(item:any)=>{
            if(item.minAge === 71){
              return <Typography>{` > ${item.minAge}`}</Typography>
            }
            else if(!item.minAge && !item.maxAge){
              return <Typography>Total</Typography>
            }
            else{
              return <Typography>{`${item.minAge} - ${item.maxAge}`}</Typography>
            }
          },
        },
        {
          header: "Male",
          accessor: "male",
          content: (item: any) => <Typography>{item.male}</Typography>
        },
        {
          header: "Female",
          accessor: "Female",
          content: (item: any) => <Typography>{item.female}</Typography>
        },
        {
          header: "Total",
          accessor: "total",
          content: (item: any) => <Typography>{item.total}</Typography>,
        }
      ];


      useEffect(() => {
        const init = async () => {
          setLoading(true);
          try {
            const response = await axiosServices.post(
              `report/patientGender`
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

      const count = genderPatientCount(rows)


      const series:any= [{
        name: 'Male',
        data: count.male
      }, {
        name: 'Female',
        data: count.female
      }]
    
      const options:any= {
        chart: {
          type: 'bar',
          height: 500
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['0-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61-70', ' > 70'],
        },
        yaxis: {
          title: {
            text: 'Number of Patients'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val: any) {
              return val + " Patients"
            }
          }
        }
      }

    return (
        <Wrapper title={`${langString("Age of Patients by Gender")} `}>
                   <div id="chart">
                        <ReactApexChart options={options} series={series} type="bar" height={350} />
                    </div>
      <Box sx={{ marginTop: 5 }}>
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

export default PatientTime;