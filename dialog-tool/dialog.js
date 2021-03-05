const msgDict = [
  {
    id: '1',
    isReply: false,
    msg: 'Are you here?',
    to: ['2']
  },
  {
    id: '2',
    isReply: true,
    msg: 'Hello',
    to: ['3']
  },
  {
    id: '3',
    isReply: false,
    msg: 'Are you okay after what happened?',
    to: ['4', '5', '6']
  },
  {
    id: '4',
    isReply: true,
    msg: 'I\'m very said...',
    to: ['7']
  },
  {
    id: '5',
    isReply: true,
    msg: 'Yes, life goes on',
    to: ['8']
  },
  {
    id: '6',
    isReply: true,
    msg: 'I\'m almost done here',
    to: ['9']
  },
  {
    id: '7',
    isReply: false,
    msg: 'Fore sure Frost, I imagine how you feel',
    to: ['10']
  },
  {
    id: '8',
    isReply: false,
    msg: 'I knew you would get over it fast!',
    to: ['11']
  },
  {
    id: '9',
    isReply: false,
    msg: 'How can I help you with this?',
    to: ['12']
  },
  {
    id: '10',
    isReply: true,
    msg: 'Are you sure, lucy?',
    to: ['0']
  },
  {
    id: '11',
    isReply: true,
    msg: 'It seems so easy to you',
    to: ['0']
  },
  {
    id: '12',
    isReply: true,
    msg: 'Couldn\'t you have asked that question before?',
    to: ['0']
  },
];

const templateList = document.querySelector('#tpl-div');
const cardControl = templateList.querySelector('#card-control');
const editControl = templateList.querySelector('#edit-control');
const responseCardTPL = templateList.querySelector('.card.response');
const replyCardTPL = templateList.querySelector('.card.reply');
const cardGrid = document.querySelector('#card-grid');

function cloneCard(card) {
  const newCard = card.cloneNode(true);

  newCard.addEventListener('mouseenter', () => {
    cardControl.show(newCard);
  });

  newCard.addEventListener('mouseleave', () => {
    cardControl.hide(newCard);
  });

  return newCard;
}

cardControl.show = (card) => {
  card.append(cardControl);
};

cardControl.hide = (card) => {
  card.removeChild(cardControl);
};

cardControl.querySelector('#edit').onclick = () => {
  editControl.show(cardControl.parentElement);
};

editControl.show = (element) => {
  const msg = element.querySelector('.msg');
  element.insertBefore(editControl, msg.nextSibling);
  editControl.style.marginTop = '-1.5em';
  editControl.querySelector('textarea').value = msg.innerText;
};

editControl.hide = (element) => {
  element.removeChild(editControl);
};

editControl.querySelector('#edit-confirm').onclick = () => {
  const msg = cardControl.parentElement.querySelector('.msg');
  msg.innerText = editControl.querySelector('textarea').value;

  for (const i in msgDict) {
    if (msgDict[i].id === cardControl.parentElement.id) {
      msgDict[i].msg = msg.innerText;
    }
  }

  editControl.hide(cardControl.parentElement);
  console.log(msgDict);
};

editControl.querySelector('#edit-cancel').onclick = () => {
  editControl.hide(cardControl.parentElement);
};

cardControl.querySelector('#delete').onclick = () => {
  console.log(cardControl.parentElement.id)
  for (const i in msgDict) {
    if (msgDict[i].id === cardControl.parentElement.id) {
      msgDict.splice(i, 1);
    }
  }
  cardControl.parentElement.remove();
  console.log(msgDict);
};

cardControl.querySelector('#add-response').onclick = () => {
  const newCard = cloneCard(replyCardTPL);
  newCard.id = msgDict.length;
  msgDict.push({
    id: newCard.id,
    isReply: false,
    msg: newCard.msg,
    to: [0]
  });
  cardGrid.insertBefore(newCard, cardControl.parentElement.nextSibling);
  editControl.show(newCard);
};

cardControl.querySelector('#add-reply').onclick = () => {
  const newCard = cloneCard(replyCardTPL);
  newCard.id = msgDict.length;
  msgDict.push({
    id: newCard.id,
    isReply: true,
    msg: newCard.msg,
    to: [0]
  });
  cardGrid.insertBefore(newCard, cardControl.parentElement.nextSibling);
  editControl.show(newCard);
};

for (const i in msgDict) {
  let newCard;

  if (msgDict[i].isReply) {
    newCard = cloneCard(replyCardTPL);
  }
  else {
    newCard = cloneCard(responseCardTPL);
  }

  newCard.id = +i + 1;
  newCard.querySelector('.msg').innerText = msgDict[i].msg;
  cardGrid.appendChild(newCard);
}

