(function () {
  let peer = null;
  let conn = null;
  const peerOnOpen = (id) => {
    document.querySelector('.my-peer-id').innerHTML = id;
  };

  const peerOnError = (err) => {
    console.log(err);
  }

  function printMessage(message, writer) {
    const messagesDiv = document.querySelector(".messages");
    const messageWrapper = document.createElement("div");
    const newMessageDiv = document.createElement("div");
    newMessageDiv.innerText = message;
    messageWrapper.classList.add("message");
    messageWrapper.classList.add(writer);
    messageWrapper.appendChild(newMessageDiv);
    messagesDiv.appendChild(MessageWrapper);
  }

  const myPeerId = location.hash.slice(1);
  console.log(myPeerId);

  const refresh = () => {
   // let promise = new Promise(function(resolve,reject){
    const peersEl = document.querySelector('.peers');
    peersEl.firstChild && peersEl.firstChild.remove();
    peer.listAllPeers((peers) => {
      const ul = document.createElement('ul');
      peers
        .filter((peerId) => peerId !== myPeerId)
        .forEach((peerId) => {
          const li = document.createElement('li');
          const button = document.createElement('button');
          button.innerText = peerId;
          button.classList.add("connect-button");
          button.classList.add(`peerId-${peerId}`);
          button.addEventListener('click', connectToPeerClick);
          li.appendChild(button);
          ul.appendChild(li);
        });
      peersEl.appendChild(ul);

    })
   // resolve();
  }
  

    function peerOnConnection(dataConnection)  {
    refresh();
    conn && conn.close();
    conn = dataConnection;
    console.log(dataConnection); 

    conn.on("data", (data) => {
      printMessage(data, "them");
      console.log(data);
    });
    
    const event = new CustomEvent("peer-changed",{
      detail: { peerId: dataConnection.peer },
    });
    document.dispatchEvent(event);
  };

  const connectToPeerClick = (el) => {
    const peerId = el.target.textContent;
    conn && conn.close();
    conn = peer.connect(peerId);
    conn.on('open', () => {
      console.log("connected");
      const event = new CustomEvent("peer-changed",{
          detail: { peerId: peerId },
        });
        document.dispatchEvent(event);

        conn.on("data", (data) => {
          console.log
        })
    });
  };

  peer = new Peer(myPeerId, {
    host: "glajan.com",
    port: 8443,
    path: "/myapp",
    secure: true,
    config: {
      iceServers: [
        { url: ["stun:eu-turn7.xirsys.com"] },
        {
          username:
            "1FOoA8xKVaXLjpEXov-qcWt37kFZol89r0FA_7Uu_bX89psvi8IjK3tmEPAHf8EeAAAAAF9NXWZnbGFqYW4=",
          credential: "83d7389e-ebc8-11ea-a8ee-0242ac140004",
          url: "turn:eu-turn7.xirsys.com:80?transport=udp",
        },
      ],
    },
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
  peer.on("error", peerOnError);
  peer.on("connection", peerOnConnection);


  document.querySelector('.list-all-peers-button').addEventListener('click', () => {
    refresh();
  });
  document.addEventListener('peer-changed', (e) => {
    const peerId = e.detail.peerId;
    console.log(peerId);
    let peerIdClass = '.peerId-'+peerId;
    document.querySelectorAll(".connect-button").forEach((el) => {
      el.classList.remove("connected");
    });
    document.querySelector(peerIdClass).classList.add("connected");
  })
  document.querySelector(".send-new-message-button").addEventListener("click", () => {
    let message = document.querySelector(".new-message").value;
    conn.send(message);
    console.log(message);

    printMessage(message, "me");
  })
})();