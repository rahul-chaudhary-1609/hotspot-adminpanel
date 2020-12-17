import React from 'react'
import { PieChart } from 'react-minimal-pie-chart';

const Piechart = ({
    ...props
}) => (
        <div className="w-full p-5">
            
            <div className="card h-50 bg-white-100 rounded-lg p-6">

                <div className="flex flex-row h-full items-end ht-pie" >
                    <PieChart
                        data={[
                            { title: 'Total Doctors', value: 60, color: '#667eea', },
                            { title: 'Total Users', value: 16, color: '#e461a5' },
                            { title: 'Total Ads View', value: 43, color: '#9e9e9e' },
                        ]}
                    /> </div></div></div>
    );

export default Piechart