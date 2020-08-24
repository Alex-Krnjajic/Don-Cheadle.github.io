
const peerOnOpen = (id) => {
  document.querySelector('.my-peer-id').innerHTML(id);
}

const myPeerId = location.hash;
console.log(myPeerId);
let peer = new Peer(null, {
  host: "glajan.com",
  port: 8443,
  path:"/myapp",
  secure: true,
  });

peer.on("open", peerOnOpen)
