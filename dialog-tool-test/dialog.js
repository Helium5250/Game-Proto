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

function drag(
  targetElement,
  movingElement = targetElement,
  offsetX = 0,
  offsetY = 0,
  mousedownFunc = () => { },
  mouseupFunc = () => { },
  mousemoveFunc = () => { }
) {
  let dragable = false;

  targetElement.addEventListener('mousedown', (e) => {
    if (e.target === targetElement) {
      dragable = true;
      offsetX = movingElement.offsetLeft - e.clientX;
      offsetY = movingElement.offsetTop - e.clientY;
      console.log(offsetX, offsetY);
      mousedownFunc();
    }
  }, true);

  document.addEventListener('mouseup', () => {
    dragable = false;
    mouseupFunc();
  }, true);

  document.addEventListener('mousemove', (e) => {
    e.preventDefault();
    if (dragable) {
      movingElement.style.left = e.clientX + offsetX + 'px';
      movingElement.style.top = e.clientY + offsetY + 'px';
      mousemoveFunc();
    }
  }, true);
}

function zoom(
  targetElement,
  movingElement = targetElement,
  minScale = 0.125,
  maxScale = 4,
  zoomSpeed = 0.01
) {
  let scale = 1;
  let pos = { x: 0, y: 0 };
  let target = { x: 0, y: 0 };
  let pointer = { x: 0, y: 0 };

  targetElement.addEventListener('wheel', (e) => {
    e.preventDefault();

    pointer.x = e.pageX - movingElement.offsetLeft;
    pointer.y = e.pageY - movingElement.offsetTop;
    target.x = (pointer.x - pos.x) / scale;
    target.y = (pointer.y - pos.y) / scale;

    // scale = Math.min(Math.max(
    //   scale + e.deltaY * -zoomSpeed,
    //   minScale), maxScale
    // );

    scale += -1 * Math.max(-1, Math.min(1, e.deltaY)) * zoomSpeed * scale;

    pos.x = -target.x * scale + pointer.x;
    pos.y = -target.y * scale + pointer.y;

    movingElement.style.transform = `scale(${scale}) translate(${pos.x}px, ${pos.y}px)`;
  }, { passive: false });
}

const templateList = document.querySelector('#tpl-div');
const responseDialogTPL = templateList.querySelector('.dialog.response');
const replyDialogTPL = templateList.querySelector('.dialog.reply');
const canvas = document.querySelector('#canvas');
class Card {
  constructor(content, parent) {
    this.content = content;
    this.parent = parent;

    this.content.style.position = 'absolute';
    this.content.style.top = 0;
    this.content.style.left = 0;

    drag(this.content, undefined, 0, 0, () => {
      this.pushToTop();
      this.content.style.cursor = 'grabbing';
    }, () => {
      this.content.style.cursor = 'grab';
    });
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

  const newCard = new Card(content, canvas);
  canvas.append(newCard.content);
}

drag(document.body, canvas, 0, 0, undefined, () => {
  document.body.style.cursor = 'default';
}, () => {
  document.body.style.cursor = 'move';
}, true);

zoom(document.body, canvas);

