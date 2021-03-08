const dialogDict = [
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
const responseDialogTPL = templateList.querySelector('.dialog.response');
const replyDialogTPL = templateList.querySelector('.dialog.reply');
const cardGrid = document.querySelector('#card-grid');

class Card {
  constructor(content, parent) {
    this.content = content;
    this.parent = parent;

    this.content.style.position = 'absolute';
    this.content.style.top = 0;
    this.content.style.left = 0;

    let dragable = false;
    let offsetX = 0;
    let offsetY = 0;

    this.content.addEventListener('mousedown', (e) => {
      dragable = true;
      this.pushToTop();
      offsetX = this.content.offsetLeft - e.clientX,
      offsetY = this.content.offsetTop - e.clientY
    }, true);

    document.addEventListener('mouseup', () => {
      dragable = false;
    }, true);

    document.addEventListener('mousemove', (e) => {
      e.preventDefault();
      if (dragable) {
        this.content.style.top = e.clientY + offsetY + 'px';
        this.content.style.left = e.clientX + offsetX + 'px';
      }
    }, true);
  }

  pushToTop() {
    this.content.remove();
    this.parent.insertBefore(this.content, parent.firstChild);
  }
}

for (const dialog of dialogDict) {
  let content;
  if ('choice' in dialog) {
    content = document.createElement('ul');
    content.classList.add('reply-panel', 'card');

    for (const choice of dialog.choice) {
      const newChoice = replyDialogTPL.cloneNode(true);
      newChoice.querySelector('.msg').innerText = choice.msg;
      content.appendChild(newChoice);
    }

  } else {

    content = responseDialogTPL.cloneNode(true);
    content.querySelector('.msg').innerText = dialog.msg;
  }

  const newCard = new Card(content, cardGrid)
  cardGrid.append(newCard.content);
}

