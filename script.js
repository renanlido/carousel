const controllerButtons = document.querySelector('.carousel__controllers');
const wrapper = document.querySelector('.carousel__wrapper');
let items = wrapper.querySelectorAll('.carousel__item');

let firsItemClone = items[0].cloneNode(true);
let secondItemClone = items[1].cloneNode(true);
let lastItemClone = items[2].cloneNode(true);

wrapper.insertAdjacentElement("beforeend", firsItemClone);
wrapper.insertAdjacentElement("beforeend", secondItemClone);
wrapper.insertAdjacentElement("afterbegin", lastItemClone);

items = wrapper.querySelectorAll('.carousel__item');
const lastItem = items[items.length - 1];

wrapper.insertAdjacentElement('afterbegin', lastItem);

const DotsActive = (itemOnScreen) => {
  const dots = document.querySelectorAll('.carousel__button');

  dots.forEach((button, index) => {
    button.style.transition = 'all 0.5s';

    setTimeout(() => {
      button.classList.toggle('carousel__button--active', index === Number(itemOnScreen));
    },100)
  });
}

CarouselDotControllers = (dotIndex, marginLeft, itemOnScreen) => {
  const startItems = wrapper.querySelectorAll('.carousel__item');
  let lastItem = startItems[startItems.length - 1];
  let penultItem = startItems[startItems.length -2];
  let firstItem = startItems[0];
  let secondItem = startItems[1];

  DotsActive(dotIndex);
  
  wrapper.style.transform = `translateX(${marginLeft})`;
  wrapper.style.transition = 'all 0.5s';

  setTimeout(() => {
    wrapper.style.transition = 'none';
    switch (dotIndex) {
      case 0:
        if(itemOnScreen === 1) {
          wrapper.insertAdjacentElement('afterbegin', lastItem);
        } else {
          wrapper.insertAdjacentElement('afterbegin', lastItem);
          wrapper.insertAdjacentElement('afterbegin', penultItem);

        }

        // wrapper.style.marginLeft = '-200%';
        wrapper.style.transform = `translateX(-${(100/startItems.length)*2}%)`

        break;

      case 1:
        if(itemOnScreen === 0) {
          Next();
        } else {
          wrapper.insertAdjacentElement('afterbegin', lastItem);
          wrapper.style.transform = `translateX(-${(100/startItems.length)*2}%)`
        }

        break;

      case 2:
        if(itemOnScreen === 0) {
          wrapper.insertAdjacentElement('beforeend', firstItem);
          wrapper.insertAdjacentElement('beforeend', secondItem);
          
        } else {
          wrapper.insertAdjacentElement('beforeend', firstItem);
        }
        wrapper.style.transform = `translateX(-${(100/startItems.length)*2}%)`
        break;
    
      default:
        wrapper.insertAdjacentElement('afterbegin', lastItem);
        break;
    }
  },500);
}

Next = () => {
  const nextItems = wrapper.querySelectorAll('.carousel__item');
  const nextIndexItemOnScreen = Number(nextItems[nextItems.length - 3].attributes.index.value);
  const firsItem = wrapper.querySelectorAll('.carousel__item')[0];
 
  DotsActive(nextIndexItemOnScreen);

  wrapper.style.transform = `translateX(-${(100/nextItems.length)*2 + 100/nextItems.length}%)`;
  wrapper.style.transition = 'all 0.5s';

  
  setTimeout(() => {
    wrapper.style.transition = 'none';
    wrapper.insertAdjacentElement('beforeend', firsItem);
    wrapper.style.transform = `translateX(-${(100/nextItems.length)*2}%)`;
  },500);
}


  
document.querySelectorAll('.carousel__button').forEach((button, index) => button.addEventListener('click', () => {
  switch (button.id) {
    case 'dot1':
      const dot1Items = wrapper.querySelectorAll('.carousel__item');
      const dot1ItemsOnScreen = Number(dot1Items[dot1Items.length - 4].attributes.index.value);
      const indexDot1 = 0;

      if(dot1ItemsOnScreen === index) {
        DotsActive(dot1ItemsOnScreen);
        return;
      };

      const dot1MarginLeft = dot1ItemsOnScreen === 2 && dot1ItemsOnScreen !== 0 ? 0 : `-${(100/6)}%`;

      CarouselDotControllers(indexDot1, dot1MarginLeft, dot1ItemsOnScreen);
 
      break;
    
    case 'dot2':
      const dot2Items = wrapper.querySelectorAll('.carousel__item');
      const dot2ItemsOnScreen = Number(dot2Items[dot2Items.length - 4].attributes.index.value);
      const indexDot2 = 1;

      if(dot2ItemsOnScreen === index) {
        DotsActive(dot2ItemsOnScreen);
        return;
      };

      const dot2MarginLeft = dot2ItemsOnScreen === 0 && dot2ItemsOnScreen !== 1 ? `-${(100/6)*3}%` : `-${(100/6)}%`;

      CarouselDotControllers(indexDot2, dot2MarginLeft, dot2ItemsOnScreen);
      
      break;

    case 'dot3':
      const dot3Items = wrapper.querySelectorAll('.carousel__item');
      const dot3ItemsOnScreen = Number(dot3Items[dot3Items.length - 4].attributes.index.value);
      const indexDot3 = 2;

      if(dot3ItemsOnScreen === index) {
        DotsActive(dot3ItemsOnScreen);
        return;
      };

      const dot3MarginLeft = dot3ItemsOnScreen === 0 && dot3ItemsOnScreen !== 2 ? `-${(100/6)*4}%`  : `-${(100/6)*3}%`;

      CarouselDotControllers(indexDot3, dot3MarginLeft, dot3ItemsOnScreen);
    default:
      break;
  }
}));

window.addEventListener('load', () => {
  setInterval(() => {
    Next();
  }, 5000)
})