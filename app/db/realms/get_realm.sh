#!/bin/bash
PACKAGE_NAME="com.wishbook.catalogone.sales"
DB_NAME="default.realm"
DESTINATION_PATH="${DB_NAME}"
NOT_PRESENT="List of devices attached"
ADB_FOUND=`adb devices | tail -2 | head -1 | cut -f 1 | sed 's/ *$//g'`
if [[ ${ADB_FOUND} == ${NOT_PRESENT} ]]; then
    echo "Make sure a device is connected"
else
    adb exec-out run-as ${PACKAGE_NAME} cat files/${DB_NAME} > ${DESTINATION_PATH}
    echo "Database exported to ${DESTINATION_PATH}"
fi