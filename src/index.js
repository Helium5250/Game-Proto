const recipientMsgList = [
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
const recipientMsgTPL = document.querySelector('#recipient-msg-tpl');
const selfMsgTPL = document.querySelector('#self-msg-tpl');

const replyBtns = document.querySelector('#chat-reply');

for (const btn of replyBtns.children) {
  btn.onclick = () => {
    const msg = btn.innerText;
    newMsg(selfMsgTPL, msg);
  };
}

chat(0);

function newMsg(template, msg) {
  const newMsg = template.cloneNode(true);
  newMsg.querySelector('.msg').innerText = msg;
  chatPanel.append(newMsg);
}

function chat(i) {
  newMsg(recipientMsgTPL, recipientMsgList[i]);

  for (const reply of selfMsgList[i]) {
    const newReply = document.createElement('li');
    newReply.innerText = reply;
    replyBtns.append(newReply);
    newReply.onclick = () => {
      newMsg(selfMsgTPL, reply);
      replyBtns.innerHTML = '';
      return true;
    };
  }
}