import React from 'react';
import { withRouter } from 'react-router';
import Piechart from '../../globalComponent/layout/piechart.js'
import GlobalCard from '../../globalComponent/layout/card' 
function Dashboard({
  history,
  ...props
}) {
  return (
    <>
          <div className='main-content pb-16 md:pb-5 flex-1 pt-20 px-2'>
            <div className="flex flex-wrap">
              <GlobalCard count={60} message="Total Doctors" cardColor='blue' iconColor='blue-500'/>
              <GlobalCard count={16} message="Total Users" cardColor='pink' iconColor='pink-500'/>
              <GlobalCard count={43} message="Total Ads View" cardColor='gray' iconColor='gray-200'/>
              <Piechart />
            </div>
            <div className="text-center"> <span className="dot dot1"></span>Total Doctors{' '}
              <span className="dot dot2"></span>Total Users{' '}
              <span className="dot dot3"></span>Total Ads View</div>
          </div>
    </>
  )
}

export default withRouter(Dashboard)