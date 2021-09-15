const controllerButtons = document.querySelector('.carousel__controllers');
const wrapper = document.querySelector('.carousel__wrapper');
let items = wrapper.querySelectorAll('.carousel__item');

const firsItemClone = items[0].cloneNode(true);
const secondItemClone = items[1].cloneNode(true);
const lastItemClone = items[2].cloneNode(true);

wrapper.insertAdjacentElement("beforeend", firsItemClone);
wrapper.insertAdjacentElement("beforeend", secondItemClone);
wrapper.insertAdjacentElement("afterbegin", lastItemClone);

items = wrapper.querySelectorAll('.carousel__item');
const lastItem = items[items.length - 1];

wrapper.insertAdjacentElement('afterbegin', lastItem);

const dotsActive = (itemOnScreen) => {
  const dots = document.querySelectorAll('.carousel__button');

  dots.forEach((button, index) => {
    button.style.transition = 'all 0.5s';

    setTimeout(() => {
      button.classList.toggle('carousel__button--active', index === Number(itemOnScreen));
    }, 100)
  });
}

const carouselDotControllers = (dotIndex, marginLeft, itemOnScreen) => {
  const startItems = wrapper.querySelectorAll('.carousel__item');
  const carouselFirstItem = startItems[startItems.length - 1];
  const carouselFirsItem = startItems[0];
  const carouselSecondItem = startItems[1];
  const carouselLastButOneItem = startItems[startItems.length - 2];

  dotsActive(dotIndex);

  wrapper.style.transform = `translateX(${marginLeft})`;
  wrapper.style.transition = 'all 0.5s';

  setTimeout(() => {
    wrapper.style.transition = 'none';
    switch (dotIndex) {
      case 0:
        if (itemOnScreen === 1) {
          wrapper.insertAdjacentElement('afterbegin', carouselFirstItem);
        } else {
          wrapper.insertAdjacentElement('afterbegin', carouselFirstItem);
          wrapper.insertAdjacentElement('afterbegin', carouselLastButOneItem);

        }

        wrapper.style.transform = `translateX(-${(100 / startItems.length) * 2}%)`

        break;

      case 1:
        if (itemOnScreen === 0) {
          next();
        } else {
          wrapper.insertAdjacentElement('afterbegin', carouselFirstItem);
          wrapper.style.transform = `translateX(-${(100 / startItems.length) * 2}%)`
        }

        break;

      case 2:
        if (itemOnScreen === 0) {
          wrapper.insertAdjacentElement('beforeend', carouselFirsItem);
          wrapper.insertAdjacentElement('beforeend', carouselSecondItem);

        } else {
          wrapper.insertAdjacentElement('beforeend', carouselFirsItem);
          wrapper.style.transform = `translateX(-${(100 / startItems.length) * 2}%)`
        }
        break;

      default:
        wrapper.insertAdjacentElement('afterbegin', carouselFirstItem);
        break;
    }
  }, 500);
}

const next = () => {
  const nextItems = wrapper.querySelectorAll('.carousel__item');
  const nextIndexItemOnScreen = Number(nextItems[nextItems.length - 3].attributes.index.value);
  const nextFistItem = nextItems[0];

  dotsActive(nextIndexItemOnScreen);

  wrapper.style.transform = `translateX(-${(100 / nextItems.length) * 2 + 100 / nextItems.length}%)`;
  wrapper.style.transition = 'all 0.5s';


  setTimeout(() => {
    wrapper.style.transition = 'none';
    wrapper.insertAdjacentElement('beforeend', nextFistItem);
    wrapper.style.transform = `translateX(-${(100 / nextItems.length) * 2}%)`;
  }, 500);
}

const prev = () => {
  const prevItems = wrapper.querySelectorAll('.carousel__item');
  const prevIndexItemOnScreen = Number(prevItems[prevItems.length - 2].attributes.index.value);
  const prevLastItem = prevItems[prevItems.length - 1];

  dotsActive(prevIndexItemOnScreen);

  wrapper.style.transform = `translateX(-${(100 / prevItems.length)}%)`;
  wrapper.style.transition = 'all 0.5s';

  setTimeout(() => {
    wrapper.style.transition = 'none';
    wrapper.insertAdjacentElement('afterbegin', prevLastItem);
    wrapper.style.transform = `translateX(-${(100 / prevItems.length) * 2}%)`;
  }, 500);
}

// ACTION CLICK ON DOT CONTROLS

document.querySelectorAll('.carousel__button').forEach((button, index) => button.addEventListener('click', () => {
  switch (button.id) {
    case 'dot1':
      const dot1Items = wrapper.querySelectorAll('.carousel__item');
      const dot1ItemsOnScreen = Number(dot1Items[dot1Items.length - 4].attributes.index.value);
      const indexDot1 = 0;

      if (dot1ItemsOnScreen === index) {
        dotsActive(dot1ItemsOnScreen);
        return;
      };

      const dot1MarginLeft = dot1ItemsOnScreen === 2 && dot1ItemsOnScreen !== 0 ? 0 : `-${(100 / 6)}%`;

      carouselDotControllers(indexDot1, dot1MarginLeft, dot1ItemsOnScreen);

      break;

    case 'dot2':
      const dot2Items = wrapper.querySelectorAll('.carousel__item');
      const dot2ItemsOnScreen = Number(dot2Items[dot2Items.length - 4].attributes.index.value);
      const indexDot2 = 1;

      if (dot2ItemsOnScreen === index) {
        dotsActive(dot2ItemsOnScreen);
        return;
      };

      const dot2MarginLeft = dot2ItemsOnScreen === 0 && dot2ItemsOnScreen !== 1 ? `-${(100 / 6) * 3}%` : `-${(100 / 6)}%`;

      carouselDotControllers(indexDot2, dot2MarginLeft, dot2ItemsOnScreen);

      break;

    case 'dot3':
      const dot3Items = wrapper.querySelectorAll('.carousel__item');
      const dot3ItemsOnScreen = Number(dot3Items[dot3Items.length - 4].attributes.index.value);
      const indexDot3 = 2;

      if (dot3ItemsOnScreen === index) {
        dotsActive(dot3ItemsOnScreen);
        return;
      };

      const dot3MarginLeft = dot3ItemsOnScreen === 0 && dot3ItemsOnScreen !== 2 ? `-${(100 / 6) * 4}%` : `-${(100 / 6) * 3}%`;

      carouselDotControllers(indexDot3, dot3MarginLeft, dot3ItemsOnScreen);
    default:
      break;
  }
}));


// DRAGGING SLIDE

let initialPosition = null;
let moving = false;
let transform = 0;

const transformMatrix = () => {
  const transformMatrix = window.getComputedStyle(wrapper).getPropertyValue('transform');

  if (transformMatrix !== 'none') {
    return parseInt(transformMatrix.split(',')[4].trim());
  }
}

const gestureStart = (e) => {
  initialPosition = e.pageX;
  moving = true;
  transform = transformMatrix();
}

const gestureMove = (e) => {
  if (moving) {
    const currentPosition = e.pageX;
    const diff = currentPosition - initialPosition;
    wrapper.style.transform = `translateX(${transform + diff}px)`;
  }
};

const gestureEnd = () => {
  moving = false;
  const itemsLength = items.length;
  const scrollWidth = wrapper.scrollWidth;
  const atualPosition = transformMatrix();
  const scrollWidthPercentual = (100 * atualPosition) / scrollWidth + (100 / itemsLength) * 2;
  if (scrollWidthPercentual < scrollWidthPercentual / 2) {
    next();
  } else if (scrollWidthPercentual > scrollWidthPercentual / 2) {
    prev();
  }
}

if (window.PointerEvent) {
  wrapper.addEventListener('pointerdown', gestureStart);

  wrapper.addEventListener('pointermove', gestureMove);

  wrapper.addEventListener('pointerup', gestureEnd);
} else {
  wrapper.addEventListener('touchdown', gestureStart);

  wrapper.addEventListener('touchmove', gestureMove);

  wrapper.addEventListener('touchup', gestureEnd);

  wrapper.addEventListener('mousedown', gestureStart);

  wrapper.addEventListener('mousemove', gestureMove);

  wrapper.addEventListener('mouseup', gestureEnd);
}


// AUTOPLAY
setInterval(() => {
    next();
  }, 5000);