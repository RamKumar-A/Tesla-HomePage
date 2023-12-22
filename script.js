'use strict';

const model = document.querySelector('.models');
const btns = document.querySelectorAll('.btns');
const navLink = document.querySelector('.navs');
const navLinks = document.querySelectorAll('.nav_list > a');
const nav = document.querySelector('.hh');
const navHeight = nav.getBoundingClientRect().height;
const header = document.querySelector('.header');
const content = document.querySelectorAll('.content-1');

const contentHeight = Array.from(
  content,
  (el) => el.getBoundingClientRect().height
);

function animateContent(index, entryClass, btnIndex) {
  if (!entryClass[0].isIntersecting) {
    content[index].classList.add('hide');
    content[index].classList.remove('display');
    btns[btnIndex].classList.remove('hide');
    btns[btnIndex].classList.add('display-btn');
    if (index > 0) btns[btnIndex - 1].classList.add('nextContent');
  } else {
    content[index].classList.add('display');
    content[index].classList.remove('hide');
    if (index > 0) {
      btns[btnIndex - 1].classList.remove('nextContent');
    }
    btns[btnIndex].classList.remove('display-btn');
    btns[btnIndex].classList.add('hide');
  }
}

function intersectingObserverCallBack(index) {
  const observer = new IntersectionObserver(
    (entries) => {
      console.log(entries);
      animateContent(index, entries, index);
    },
    {
      root: null,
      threshold: 0,
      rootMargin: `${contentHeight[index]}px`,
    }
  );
  observer.observe(content[index]);
  return observer;
}

const observers = Array.from(content, (_, index) =>
  intersectingObserverCallBack(index, `content-${index}`, index)
);
function stickyNavBar(entries) {
  const [entry] = entries;
  const isIntersecting = !entry.isIntersecting;
  nav.classList.toggle('sticky', isIntersecting);
  navLink.style.color = isIntersecting ? '#000' : '#fcfcfc';
  navLinks.forEach((el) => {
    el.style.color = isIntersecting ? '#000' : '#fcfcfc';
  });
}

const navbarObserver = new IntersectionObserver(stickyNavBar, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
navbarObserver.observe(header);
