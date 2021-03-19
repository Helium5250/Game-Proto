import Transform from '../dialog-tool/transform.js';

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

class Card {
  constructor(content, parent) {
    this.content = content;
    this.parent = parent;

    this.content.style.position = 'absolute';

    const addEdit = (element) => {
      const cardEdit = document.querySelector('#card-edit');

      element.addEventListener('mouseenter', () => {
        console.log('entered')
        element.append(cardEdit);
      });

      element.addEventListener('mouseleave', () => {
        element.removeChild(cardEdit);
      });
    };

    this.content.classList.contains('response')
      ? addEdit(this.content)
      : [...this.content.children].map(
        (child) => {console.log(child); addEdit(child)}
      );

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

if (localStorage.getItem('save')) {
  console.log('Save found. Auto save enabled');
  console.log('Last saved at:', localStorage.getItem('saveTime'));

  canvas.outerHTML = localStorage.getItem('save');
  canvas = document.querySelector('#canvas');

  for (const card of canvas.children) {
    new Card(card, canvas);
  }

} else {

  console.log('Save not found in localStorage, initialize new save');

  const responseDialogTPL = document.querySelector('.dialog.response');
  const replyDialogTPL = document.querySelector('.dialog.reply');

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
}

Transform.drag(document.body, canvas, undefined, undefined, () => {
  document.body.style.cursor = 'default';
}, () => {
  document.body.style.cursor = 'move';
}, true);

Transform.zoom(document.body, canvas);

const save2localStorage = new MutationObserver(() => {
  const date = new Date().toJSON();
  const saveTime = date.slice(0, 10) + ' ' + date.slice(11, 19);

  localStorage.setItem('saveTime', saveTime);
  localStorage.setItem('save', canvas.outerHTML);
});

save2localStorage.observe(canvas,
  { attributes: true, childList: true, subtree: true }
);

const clearBtn = document.querySelector('#clear-btn');
clearBtn.onclick = () => {
  localStorage.clear();
  window.location.reload();
};