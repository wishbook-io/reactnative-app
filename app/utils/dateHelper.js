import moment from 'moment'

export const formatDate = (date, format, outFormat) => {
  if(!format) {
    return moment().format(date)
  }
  if(!outFormat) {
    return moment(date).format(format)
  }
  return moment(date, format).format(outFormat)
}

export const formatDateForServer = (dateObj) => {
  const formatted = formatDate(dateObj, 'YYYY-MM-DD')
  return formatted;
}

export const formatDateFromServer = (serverDate, outputFormat='DD MMM YYYY', adjustTimeZone=false) => {
  let serverDateObj = moment(serverDate)
  if(adjustTimeZone) {
    serverDateObj = moment(serverDate).utc().local(true)
  } else {
    serverDateObj = moment(serverDate)
  }
  return serverDateObj.format(outputFormat)
}