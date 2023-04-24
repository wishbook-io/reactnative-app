export const SHOW_TOAST_ACTION = 'SHOW_TOAST_ACTION';
export const POP_TOAST_ACTION = 'POP_TOAST_ACTION';
export const CLEAR_TOAST_ACTION = 'CLEAR_TOAST_ACTION';

export const showToastAction = (message, duration = 1500) => ({
  type: SHOW_TOAST_ACTION,
  message,
  duration,
});

export const popToastAction = () => ({
  type: POP_TOAST_ACTION,
});

export const clearToastAction = () => ({
  type: CLEAR_TOAST_ACTION,
})