export interface Data {
  type: 'new/state';
  payload: any;
}

export default defineWebSocketHandler({
  open(peer) {
    peer.subscribe("update/state");
  },
  message(peer, message) {
    const data: Data = JSON.parse(message.text());

    const options: Record<Data['type'], () => void> = {
      "new/state": () => peer.publish('update/state', data.payload),
    }

    options[data.type]();
  },
});
