import { keyframes } from '@emotion/react'

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

const popInFromBottom = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, 50%) scale(0.75);
  }
  75% {
    opacity: 1;
    transform: translate(-50%, -47%) scale(1.0);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%);
  }`

const popOutToBottom = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0px) scale(1.0);
  }
  100% {
    opacity: 0;
    transform: translateY(400px) scale(0.75);
  }`

const popIn = keyframes`
  0% {
    opacity: 0.7;
    transform: scale3d(0.8, 0.8, 1);
  }
  100% {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
`

const slideUp = keyframes`
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0%);
  };
`

const slideDown = keyframes`
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(100%);
  };
`

const shake = keyframes`
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
`

const transitions = {
  fadeIn,
  fadeOut,
  popInFromBottom,
  popOutToBottom,
  popIn,
  slideUp,
  slideDown,
  shake,
}

export default transitions
