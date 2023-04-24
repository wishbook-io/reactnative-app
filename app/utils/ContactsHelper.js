import Contacts from 'react-native-contacts'

import { checkContactsPermission } from './AndroidPermissionHelper'

/*
{
  recordID: '6b2237ee0df85980',
  company: "",
  emailAddresses: [{
    label: "work",
    email: "carl-jung@example.com",
  }],
  familyName: "Jung", ========== can be null
  givenName: "Carl", ========== can be null
  jobTitle: "",
  note: 'some text',
  urlAddresses: [{
    label: "home",
    url: "www.jung.com",
  }],
  middleName: "", ========== can be null, the order should be givenName + middleName + familyName
  phoneNumbers: [{    ========== empty array possible,
    label: "mobile",
    number: "(555) 555-5555",   ========== not sure if brackets are there
  }],
  hasThumbnail: true,
  thumbnailPath: 'content://com.android.contacts/display_photo/3',
  postalAddresses: [
    {
      street: '123 Fake Street',
      city: 'Sample City',
      state: 'CA',
      region: 'CA',
      postCode: '90210',
      country: 'USA',
      label: 'home'
    }
  ],
  birthday: {"year": 1988, "month": 0, "day": 1 }
}
*/

const cleanName = (name) => {
  if(name) {
    return name.trim();
  } else {
    return '';
  }
}

const getName = (contact) => {
  let nameArray = [contact.givenName, contact.middleName, contact.familyName]
  nameArray = nameArray.map(cleanName);
  const name = nameArray.join(' ')
  return name.trim();
}

const numberRegex = new RegExp('(\\+91)?([6789][\\d]{9})')

getValidNo = (numberObj) => {
  if(numberObj && numberObj.number) {
    const matchObj = numberObj.number.match(numberRegex)
    if(matchObj && matchObj.length === 3) {
      return matchObj[2]
    }
  }
  return null;
}

const getAllValidNos = (contact) => {
  let validNumbers = []
  if(contact.phoneNumbers && contact.phoneNumbers.length > 0) {
    contact.phoneNumbers.forEach(phoneNoObj => {
      const validNo = getValidNo(phoneNoObj);
      if(validNo) {
        validNumbers.push(validNo);
      }
    });
  }

  if(validNumbers.length > 0) {
    return validNumbers;
  }
  return null;
}

const cleanContact = (contact) => {
  const name = getName(contact)
  if(name) {
    const validNos = getAllValidNos(contact)
    if(validNos) {
      // now get name, validNos[i] pairs
      const nameNumberPairs = validNos.map((no) => ({name, phone:no}))
      return nameNumberPairs
    }
  }
  return null;
}

const cleanContacts = (contacts) => {
  const cleanedContacts = []
  contacts.forEach(element => {
    const cleaned = cleanContact(element);
    if(cleaned) {
      cleanedContacts.push(...cleaned); //because cleaned will already return an array of {name,no}
    }
  });
  if(cleanedContacts.length > 0) {
    return cleanedContacts;
  }
  return null;
}

const getAllContacts = async () => {
  console.log("[getAllContacts] Checking for permission");
  const havePermission = await checkContactsPermission()
  console.log("[getAllContacts] Permission status: ", havePermission);
  if(!havePermission) {
    console.log("[getAllContacts] Permission denied, quitting");
    return [];
  }
  return new Promise((resolve, reject) => {
    console.log("Making the call");
    Contacts.getAllWithoutPhotos((error, contacts) => {
      if(error) {
        console.log("Rejecting the promise due to error:", error);
        reject(error);
      } else {
        console.log("Resolving promise as we have received ", contacts.length);
        resolve(cleanContacts(contacts));
      }
    })
  })
}

export { getAllContacts }