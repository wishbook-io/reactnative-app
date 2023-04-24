import React, { Component } from 'react'
import Modal from 'modal-enhanced-react-native-web';

import { withWebBackHandler } from 'app/utils/WebBackHandler';

const ModalWithBrowserBackHandled = withWebBackHandler(Modal);

export default ModalWithBrowserBackHandled