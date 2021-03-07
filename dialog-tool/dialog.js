const msgDict = [
  {
    id: 0,
    msg: 'Are you here?',
    to: 1
  },
  {
    id: 1,
    choice: [
      {
        msg: 'Hello',
        to: 2
      }
    ]
  },
  {
    id: 2,
    msg: 'Are you okay after what happened?',
    to: 3
  },
  {
    id: 3,
    choice: [
      {
        msg: 'I\'m very said...',
        to: 4
      },
      {
        msg: 'Yes, life goes on',
        to: 5
      },
      {
        msg: 'I\'m almost done here',
        to: 6
      }
    ]
  },
  {
    id: 4,
    msg: 'Fore sure Frost, I imagine how you feel',
    to: 7
  },
  {
    id: 5,
    msg: 'I knew you would get over it fast!',
    to: 8
  },
  {
    id: 6,
    msg: 'How can I help you with this?',
    to: 9
  },
  {
    id: 7,
    choice: [
      {
        msg: 'Are you sure, lucy?',
        to: 0
      },
      {
        msg: 'Thank you, that means a lot to me.',
        to: 0
      }
    ]
  },
  {
    id: 8,
    choice: [
      {
        msg: 'It seems so easy to you',
        to: 0
      },
      {
        msg: 'How could I have a choice',
        to: 0
      },
      {
        msg: 'There\'s no point getting stuck in the past.',
        to: 0
      }
    ]
  },
  {
    id: 9,
    choice: [
      {
        msg: 'Couldn\'t you have asked that question before?',
        to: 0
      },
      {
        msg: 'Everything is already too late...',
        to: 0
      }
    ]
  },
];

const templateList = document.querySelector('#tpl-div');
const responseCardTPL = templateList.querySelector('.card.response');
const replyCardTPL = templateList.querySelector('.card.reply');
const cardControl = templateList.querySelector('#card-control');
const editControl = templateList.querySelector('#edit-control');
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
  console.log(cardControl.parentElement.id);
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

for (const msg of msgDict) {
  if ('choice' in msg) {
    const newCard = document.createElement('ul');
    newCard.classList.add('reply-panel');

    for (const choice of msg.choice) {
      const newChoice = cloneCard(replyCardTPL);
      newChoice.querySelector('.msg').innerText = choice.msg;
      newCard.appendChild(newChoice);
    }

    cardGrid.appendChild(newCard);
  }

  else {
    const newCard = cloneCard(responseCardTPL);
    newCard.querySelector('.msg').innerText = msg.msg;
    cardGrid.appendChild(newCard);
  }
}

