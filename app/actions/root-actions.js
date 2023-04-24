export const PROGRESS = "PROGRESS";


export function controlProgress(isShowing) {
  return {
    type: PROGRESS,
    progress: isShowing
  }
}