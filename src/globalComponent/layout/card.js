import React from 'react'

const GlobalCard = ({
  count,
  message,
  cardColor,
  iconColor,
  ...props
}) => (
    <div className="w-full md:w-1/2 lg:w-1/3 p-5">
      <div className={`card h-48 bg-${cardColor}-100 rounded-lg p-6`}>
        <div className="flex flex-row h-full items-end">
          <div className="flex-1 text-left">
            <h3 className="font-bold text-4xl leading-none">{count}</h3>
            <h5 className="text-xl text-gray-200">{message}</h5>
          </div>
          <div className="flex-shrink pr-4 mb-auto">
            <div className={`rounded-full p-4 bg-${iconColor}`}>
              <svg viewBox="0 0 20 20" fill="currentColor" className="text-white user-group w-8 h-8"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

export default GlobalCard