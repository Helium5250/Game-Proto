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
    let pos = JSON.parse(localStorage.getItem(movingElement.id + 'Pos')) || { x: 0, y: 0 };

    targetElement.addEventListener('wheel', (e) => {
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
      localStorage.setItem(movingElement.id + 'Pos', JSON.stringify(pos));
      localStorage.setItem('scale', this.scale);
    }, true);
  }
};

export default Transform;