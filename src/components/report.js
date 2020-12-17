import React from 'react';
import { withRouter } from 'react-router';
import GlobalDateRange from '../globalComponent/layout/dateRange';
import BarChart from '../globalComponent/layout/barChart';
import GlobalFilterChart from '../globalComponent/layout/filterChart';

function Report({
    history,
    ...props
}) {


    return (
        <div className='main-content pb-16 md:pb-5 flex-1 pt-20 px-2'>
            <div className="w-full  p-5">
                <GlobalFilterChart/>
            </div>
            <BarChart/><br />
            <GlobalDateRange />
        </div>
    )
}

export default withRouter(Report)