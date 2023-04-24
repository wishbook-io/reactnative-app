import { PROD } from 'app/utils/const';

export const debugLog = false;
export const debugBuildId = !PROD;
export const isDev = process.env.NODE_ENV === 'development';
export const isSimulator = isDev;