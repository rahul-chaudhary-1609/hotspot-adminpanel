import React, { PureComponent } from 'react';
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


function BarCharts ({
    ...props
  }){
const data = [
  {
    name: 'Jan', totalDoctors: 4000,
  },
  {
    name: 'Feb', totalDoctors: 3800,
  },
  {
    name: 'Mar', totalDoctors: 2000,
  },
  {
    name: 'Apr', totalDoctors: 2780,
  },
  {
    name: 'May', totalDoctors: 1890,
  },
  {
    name: 'June', totalDoctors: 2390,
  },
  {
    name: 'July', totalDoctors: 3490,
  },
  {
    name: 'Aug', totalDoctors: 3000,
  },
  {
    name: 'Sep', totalDoctors: 2000,
  },
  {
    name: 'Oct', totalDoctors: 2780,
  },
  {
    name: 'nov', totalDoctors: 1890,
  },
  {
    name: 'Dec', totalDoctors: 2390,
  }
];

 
    return (
      <ResponsiveContainer width="90%" height={300}>
      <BarChart
        width={900}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalDoctors" fill="#141414" />
      </BarChart>
      </ResponsiveContainer>
    );
  }
  export default BarCharts