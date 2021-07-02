
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