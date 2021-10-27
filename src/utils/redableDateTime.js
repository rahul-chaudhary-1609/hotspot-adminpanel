
// export const formatDateWithTime = (dateString) => {
//   const options = { 
//         year: "numeric", 
//         month: "numeric",
//         day: "numeric" ,
//         hour12 : true,
//         hour:  "numeric",
//         minute: "numeric"
//     }
//   return new Date(dateString.length > 10 ? dateString.substring(0, dateString.length - 1) : dateString).toLocaleDateString("en-US", options)
// }


export const formatDateWithTime = (dateString) => {
  const options = { 
        year: "numeric", 
        month: "numeric",
        day: "numeric" ,
        hour12 : true,
        hour:  "numeric",
        minute: "numeric"
    }
  return new Date(dateString).toLocaleDateString("en-US", options)
}

export const formatTime = (dateString) => {
  const options = { 
        hour12 : true,
        hour:  "numeric",
        minute: "numeric"
    }
  return new Date(dateString).toLocaleTimeString("en-US", options)
}

export const formatDate = (dateString) => {
  const options = { 
        year: "numeric", 
        month: "numeric",
        day: "numeric" ,
    }
  return new Date(dateString).toLocaleDateString("en-US", options)
}