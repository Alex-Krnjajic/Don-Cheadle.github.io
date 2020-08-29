const peerOnOpen = (id) => {
  document.querySelector('.my-peer-id').innerHTML = id;
};

const peerOnError = (err) => {
  console.log(err);
}

const myPeerId = location.hash.slice(1);
console.log(myPeerId);

let peer = new Peer(myPeerId, {
  host: "glajan.com",
  port: 8443,
  path: "/myapp",
  secure: true,
});

let yoshi = (size) => {
  output = "b";
  for (var i = 0; i < size; i++) {
    output += "e";
  }
  output += "g yoshi";
  document.querySelector('.yoshi').innerHTML = output
};


peer.on("open", peerOnOpen);
peer.on('error', peerOnError)

document.querySelector('.list-all-peers-button').addEventListener('click', () => {
  const peersEl = document.querySelector('.peers');
  peer.listAllPeers((peers) => {
    const ul = document.createElement('ul');
    peers.filer((peerId) => peerId !== myPeerId)
      .forEach((peerId) => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.innerText = peerId;
        button.classList.add("connect-button");
        button.classList.add(`peerId-${peerId}`);
        li.appendChild(button);
        ul.appendChild(li);
      });
    peersEl.appendChild(ul);

  })
})
