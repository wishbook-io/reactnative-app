import { put } from 'redux-saga/effects';

export const TEST_ERROR_500 = 'TEST_ERROR_500';

export const testError500 = () => ({
  type: TEST_ERROR_500,
})

export const testErrorCode = (code) => ({
  type: "TEST_ERROR_CODE",
  code,
})

export const testError400 = (params) => ({
  type: "TEST_ERROR_400",
  ...params,
})

export const testErrorNotify = (params) => ({
  type: "TEST_ERROR_NOTIFY",
  ...params,
})

export const testDjangoB2b500 = () => ({
  type: 'TEST_DJANGO_B2B_500',
})

export const testMultiple400 = () => ({
  type: 'TEST_MULTIPLE_400',
})
