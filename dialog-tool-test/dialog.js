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

const Transform = {
  scale: +localStorage.getItem('scale') || 1,

  drag(
    targetElement,
    movingElement = targetElement,
    ignoreScale = true,
    mousedownFunc = () => { },
    mouseupFunc = () => { },
    mousemoveFunc = () => { }
  ) {
    let dragable = false;
    let offset = { x: 0, y: 0 };
    let pos = { x: 0, y: 0 };

    targetElement.addEventListener('mousedown', (e) => {
      if (e.target === targetElement) {
        dragable = true;

        pos = { x: e.clientX, y: e.clientY };
        if (!ignoreScale) pos = { x: pos.x / this.scale, y: pos.y / this.scale };

        offset.x = movingElement.offsetLeft - pos.x;
        offset.y = movingElement.offsetTop - pos.y;

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

        pos = { x: e.clientX, y: e.clientY };
        if (!ignoreScale) pos = { x: pos.x / this.scale, y: pos.y / this.scale };

        const coordinate = { x: pos.x + offset.x + 'px', y: pos.y + offset.y + 'px' };
        movingElement.style.left = coordinate.x;
        movingElement.style.top = coordinate.y;

        mousemoveFunc();
      }
    }, true);
  },

  zoom(
    targetElement,
    movingElement = targetElement,
    minScale = 0.125,
    maxScale = 4,
    zoomSpeed = 0.01
  ) {
    let pointer = { x: 0, y: 0 };
    let target = { x: 0, y: 0 };
    let pos = { x: 0, y: 0 };

    targetElement.addEventListener('wheel', (e) => {
      e.preventDefault();

      pointer.x = e.clientX - movingElement.offsetLeft;
      pointer.y = e.clientY - movingElement.offsetTop;

      target.x = (pointer.x - pos.x) / this.scale;
      target.y = (pointer.y - pos.y) / this.scale;

      this.scale = Math.min(Math.max(
        this.scale + e.deltaY * -zoomSpeed,
        minScale), maxScale
      );

      pos.x = -target.x * this.scale + pointer.x;
      pos.y = -target.y * this.scale + pointer.y;

      movingElement.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(${this.scale})`;
      localStorage.setItem('scale', this.scale);
    }, true);
  }
};


class Card {
  constructor(content, parent) {
    this.content = content;
    this.parent = parent;

    this.content.style.position = 'absolute';

    Transform.drag(this.content, undefined, false, () => {
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


let canvas = document.querySelector('#canvas');
canvas.outerHTML = localStorage.getItem('save')
canvas = document.querySelector('#canvas');

for (const card of canvas.children) {
  const newCard = new Card(card, canvas);
}

Transform.drag(document.body, canvas, undefined, undefined, () => {
  document.body.style.cursor = 'default';
}, () => {
  document.body.style.cursor = 'move';
}, true);

Transform.zoom(document.body, canvas);

const save2localStorage = new MutationObserver(() => {
  localStorage.setItem('save', canvas.outerHTML);
});

save2localStorage.observe(canvas,
  { attributes: true, childList: true, subtree: true }
);

// const templateList = document.querySelector('#tpl-div');
// const responseDialogTPL = templateList.querySelector('.dialog.response');
// const replyDialogTPL = templateList.querySelector('.dialog.reply');

// for (const dialog of dialogDict) {
//   let content;
//   if ('choice' in dialog) {
//     content = document.createElement('ul');
//     content.classList.add('reply-panel', 'card');

//     for (const choice of dialog.choice) {
//       const newChoice = replyDialogTPL.cloneNode(true);
//       newChoice.querySelector('.msg').innerText = choice.msg;
//       content.appendChild(newChoice);
//     }

//   } else {

//     content = responseDialogTPL.cloneNode(true);
//     content.querySelector('.msg').innerText = dialog.msg;
//   }

//   const newCard = new Card(content, canvas);
//   canvas.append(newCard.content);
// }