import { CLIENT_VERSION } from './Constants.js';

const socket = io('http://3.34.53.158:3000', {
  query: {
    clientVersion: CLIENT_VERSION,
  },
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  timeout: 5000,
});

socket.on('connect_error', (error) => {
  console.log('Connection failed:', error);
});

let userId = null;
let gameAssets = null;

socket.on('response', (data) => {
  console.log('Server response:', data);
  if (data.status === 'success' && data.data && data.data.stage) {
    // 스테이지 변경 성공 시 이벤트 발생
    const event = new CustomEvent('stageChange', {
      detail: {
        stage: data.data.stage,
        score: data.data.score,
      },
    });
    window.dispatchEvent(event);
  }
});

socket.on('connection', (data) => {
  console.log('connection: ', data);
  userId = data.uuid;
});

socket.on('stagechange', (data) => {
  console.log('stagechange: ', data);
  gameAssets = data;
});

const sendEvent = (handlerId, payload) => {
  socket.emit('event', {
    userId,
    clientVersion: CLIENT_VERSION,
    handlerId,
    payload,
  });
};

export const getGameAssets = () => gameAssets;
export { sendEvent };
