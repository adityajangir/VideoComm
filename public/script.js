const socket = io('/');
const mypeer = new Peer(undefined, {
    host: '/',
    port: '3001'
})
const videoGrid = document.querySelector("#video-grid");


const myvideo = document.createElement("video");
myvideo.muted = true;

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    addVideoStream(myvideo, stream);
    mypeer.on('call', call => {
        call.answer(stream);
        const video = document.createElement('video');
        // call.on('stream', userVideoStream => {
        //     addVideoStream(video, userVideoStream);
        // })
    })
    socket.on('user-connected', userId => {
        addNewUser(userId, stream);
    })
})
mypeer.on('open', id => {
    socket.emit('join-room', roomId, id); 
})
socket.on('user-connected', userId => {
    console.log(userId);
})

function addNewUser(userId, stream){
    const call = mypeer.call(userId, stream);
    // call.on('stream', userVideoStream => {
    //     const video = document.createElement('video');
    //     addVideoStream(video, userVideoStream);
    // });
    // call.on('close', () => {
    //     video.remove();
    // })
}

function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
      video.play()
    })
    videoGrid.append(video)
  }


// const socket = io('/')
// const videoGrid = document.getElementById('video-grid')
// const myPeer = new Peer(undefined, {
//     host: '/',
//     port: '3001'
// })
// const myVideo = document.createElement('video')
// myVideo.muted = true
// const peers = {}
// navigator.mediaDevices.getUserMedia({
//   video: true,
//   audio: true
// }).then(stream => {
//   addVideoStream(myVideo, stream)

//   myPeer.on('call', call => {
//     call.answer(stream)
//     const video = document.createElement('video')
//     call.on('stream', userVideoStream => {
//       addVideoStream(video, userVideoStream)
//     })
//   })

//   socket.on('user-connected', userId => {
//     connectToNewUser(userId, stream)
//   })
// })

// socket.on('user-disconnected', userId => {
//   if (peers[userId]) peers[userId].close()
// })

// myPeer.on('open', id => {
//   socket.emit('join-room', ROOM_ID, id)
// })

// function connectToNewUser(userId, stream) {
//   const call = myPeer.call(userId, stream)
//   const video = document.createElement('video')
//   call.on('stream', userVideoStream => {
//     addVideoStream(video, userVideoStream)
//   })
//   call.on('close', () => {
//     video.remove()
//   })

//   peers[userId] = call
// }

// function addVideoStream(video, stream) {
//   video.srcObject = stream
//   video.addEventListener('loadedmetadata', () => {
//     video.play()
//     videoGrid.append(video)
//   })
// }