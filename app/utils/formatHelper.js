import moment from 'moment';
// testing in console:
// "stitching_type".replace(/([a-zA-Z0-9]+)(_)?/g, function(match, p1, p2){space = p2? ' ': '';return p1.charAt(0).toUpperCase()+p1.substr(1) + space})
export const formatStringFromServer = (string) => {
  const formatted = string.replace(/([a-zA-Z0-9]+)(_)?/g, (match, p1, p2) => {
    // p1 matches the word
    // p2 matches the underscore
    const space = p2? ' ': '';
    return p1.charAt(0).toUpperCase()+p1.substr(1) + space
  })  
  return formatted;
}

export const formatSlugString = (key) => {
  return key.split('_').map((word) => word.charAt(0).toUpperCase() + word.substr(1)).join(' ');
}

// {"items":[{"display_amount":["This field may not be null."]},{"display_amount":["This field may not be null."]},{"display_amount":["This field may not be null."]}]}
export const formatErrorFromServer = (error) => {
  console.log("[formatErrorFromServer]", {error})
  if(error === undefined || error === null) {
    return [{
      title: "Invalid Details",
      message: "Please provide valid information"
    }]
  }

  const objKeys = (typeof error === 'object') && (error !== null) && Object.keys(error)
  if(objKeys.length >= 1 && !error.length) {
    // most likely an input validation message
    return objKeys.map((key) => ({ key, title: formatSlugString(key), message: Array.isArray(error[key])? error[key].join(', ') : error[key] }))
  }
  return [{ title: "Error", message: (error + '').substring(0, 50) }]
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

export const formatDateToPostServer = (dateObj) => {
  const formatted = moment(dateObj).format('YYYY-MM-DD')
  return formatted;
}

export const formatUnicodeString = (string) => {
  const formatted = string.replace(/&#([0-9]+);/g, (match, p1) => {
    // console.log("[formatUnicodeString]", { match, p1 })
    //p1 matches the decimal number

    const unicodeChar = String.fromCodePoint(p1)
    // console.log({unicodeChar})
    return unicodeChar;
  })
  return formatted;
}

export const rupeefy = (string, addSpaceAroundDash = true) => {
  // console.log("string", string)
  if(!string){
    return ''
  }
  string = string + ''
  if(addSpaceAroundDash) {
    string = string.replace('-', ' - ');
  }
  const rupeefied = string.replace(/([\d.]+)/g, (match, p1) => {
    return '₹' + p1
  })
  return rupeefied;
}
