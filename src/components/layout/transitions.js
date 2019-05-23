export const duration = 250

const sideSheetTransitionStyles = {
  entering: { left: -300 },
  entered: { left: 0 },
  exiting: { left: -300 },
  exited: { left: -300 }
}

export const sideSheetStyles = state => ({
  transition: `left ${duration}ms ease-in-out`,
  left: -300,
  ...sideSheetTransitionStyles[state]
})

const overlayTransitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 }
}

export const overlayStyles = state => ({
  transition: `opacity ${duration}ms`,
  opacity: 0,
  ...overlayTransitionStyles[state]
})
