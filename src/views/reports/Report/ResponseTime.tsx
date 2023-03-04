import Wrapper from 'components/Card/Wrapper';
import React,{ useState, useEffect } from 'react';
import langString from 'utils/langString';
import ReactApexChart from 'react-apexcharts';
import axiosServices from 'utils/axiosServices';
import { parsePatientCount } from 'utils/Helpers';


const ResponseTime = () => {

  const [response, setResponse] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(true)


  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const response = await axiosServices.post(
          `report/responseReport`
        );
        if (response.status === 200) {
          setResponse(response.data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    init();
  }, []);


  const respon = parsePatientCount(response);
  

  const options:any = {
    chart: {
    height: 350,
    type: 'line',
  },
  stroke: {
    width: [0, 4]
  },
  title: {
    text: 'Response Time to Crash Scene'
  },
  dataLabels: {
    enabled: true,
    enabledOnSeries: [1]
  },
  labels: ['0-1 minutes', '2-3 minutes', '6-10 minutes', '11-15 minutes', '> 15 minutes'],
  xaxis: {
    type: 'text'
  },
  yaxis: [{
    title: {
      text: 'Number of Incidents',
    },
  
  }, {
    opposite: true,
    title: {
      text: 'Cumulative Percent of Incidents'
    }
  }]
  };

  const series:any = [{
    name: 'Number of Incidents',
    type: 'column',
    data: respon.cout
  }, {
    name: 'Cumulative Percent of Incidents',
    type: 'line',
    data: respon.percentage
  }]








    return (
        <Wrapper title={`${langString("Response Times")} `}>
             <div id="chart">
             <ReactApexChart options={options} series={series} type="line" height={600} />
            </div>
        </Wrapper>
    );
};

export default ResponseTime;

