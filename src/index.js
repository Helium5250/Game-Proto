const responseMsgList = [
  'I know it can build perfectly capable desktop games',
  'I made a basic dialogue box before I can fix that up for this game',
  'sim ... eu vou melhorar isso, parecer com um jogo',
  'are you considering actually making the game with website technology?'
];

const selfMsgList = [
  [
    'yeah Im learning that right now, its relevant to me',
    'hey do you by chance know CSS and HTML?',
    'Your decision'
  ],
  [
    'By assumption it doesn\'t look too advance',
    'have you ever made any application in JS?',
    'just beginner project',
    'The game is offline right?'
  ],
  [
    'but doing in JS have any possibility to download?',
    'in fact many apps you use are made with JS',
    'desktop and mobile'
  ],
  [
    'which engine does this with JS?',
    'preview of the game... etc',
    'Just normal browser'
  ]
];

const chatPanel = document.querySelector('#chat-panel');
const replyPanel = document.querySelector('#chat-reply');
const msgTPL = document.querySelector('#msg-tpl');

function newMsg(type, msg) {
  const newMsg = msgTPL.cloneNode(true);
  newMsg.classList.add(type);
  newMsg.querySelector('.msg').innerText = msg;
  chatPanel.append(newMsg);
}

function chat(i) {

  newMsg('response', responseMsgList[i]);

  for (const reply of selfMsgList[i]) {
    const newReply = document.createElement('li');
    newReply.innerText = reply;
    replyPanel.append(newReply);

    newReply.onclick = () => {
      newMsg('reply', reply);
      replyPanel.innerHTML = '';
      setTimeout(() => {
        chat(i + 1);
      }, 1500);
    };
  }
}

chat(0);