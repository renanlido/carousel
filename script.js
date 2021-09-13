const wrapper = document.querySelector('.carousel__wrapper');
const carousel = document.querySelector('.carousel');

carousel.addEventListener('scroll', () => console.log('scroll'))
wrapper.addEventListener('animationiteration', () => console.log('iteration'))

const item = document.querySelector('.carousel__item');

console.log(item.id)


// const activeClass = (clickedElement) => {
//   const allElements = document.querySelectorAll('.carousel__button');
//   const wrapper = document.querySelector('.carousel__wrapper');

//   prevNextItem(clickedElement);

//   const scrollValue = wrapper.attributes[0].ownerElement.scrollLeft;

//   console.log(scrollValue)

//   allElements.forEach((element) => {
//     element.classList.toggle('carousel__button--active', element === clickedElement);
//   });
// }

// const prevNextItem = (clickedElement) => {
//   const wrapper = document.querySelector('.carousel__wrapper');

//   const itemId = clickedElement.id;

//   switch (itemId) {
//     case 'item1':
//       wrapper.scrollTo(0, 0);
//       break;

//     case 'item2':
//       wrapper.scrollTo(1000, 0);
//       break;

//     case 'item3':
//       wrapper.scrollTo(2000, 0);
//       break;

//     default:
//       break;
//   }
// }

// const wrapper = document.querySelector('.carousel__wrapper');

// // wrapper.addEventListener('transitionend', () => {
// //   console.log('ok')

// //   setTimeout(() => {
// //     container.style.transition = 'all 0.5s';
// //   })
// // }, false)

// const autoPlay = setInterval(()=>{
//   const windowWidth = window.innerWidth;

//   const container = document.querySelector('.carousel__container');
//   const wrapper = document.querySelector('.carousel__wrapper');

//   let scrollValue = wrapper.scrollLeft;
//   wrapper.scrollLeft = 0;

//   container.appendChild(container.firstElementChild);
  
//  if(windowWidth < 1000 ){
//   wrapper.scrollTo(scrollValue + windowWidth, 0);

//   // console.log(wrapper.scrollWidth);

//  } else {
//   wrapper.scrollTo(scrollValue + 1000, 0);
//  }
// },6000);
