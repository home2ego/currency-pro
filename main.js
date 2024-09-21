// TABS

// add UI tabs
let isScrolled = false;
let lastIndex = 0;

const tabs = document.querySelectorAll('.tabs__tab');
const tabsContent = document.querySelectorAll('.tabs__tab-content');
const tabsContentWrapper = document.querySelector('.tabs__content-wrapper');
const tabsList = document.querySelector('.tabs__list');

const setActiveTab = (tab) => {
  document.querySelector('.tabs__tab.active').classList.remove('active');
  tab.classList.add('active');
};

tabsList.addEventListener('click', (event) => {
  const clickedTab = event.target.closest('.tabs__tab');

  if (!clickedTab) {
    // ignore clicks outside the `.tabs__tab`
    return;
  }

  const index = [...tabs].indexOf(clickedTab);

  if (lastIndex === index) {
    // skip the rest of the code if `lastIndex` matches `index`
    return;
  }

  lastIndex = index;

  isScrolled = true;

  tabsContentWrapper.scrollTo({
    left: tabsContent[index].offsetLeft,
    behavior: 'smooth',
  });

  setActiveTab(clickedTab);
});

tabsContentWrapper.addEventListener('scrollend', () => {
  // Reset the `isScrolled` after the scroll finishes
  isScrolled = false;
});

// reset UI tabs by scrolling tabs or swiping across tabs on mobile devices

tabsContentWrapper.addEventListener(
  'scroll',
  () => {
    if (isScrolled) {
      return;
    }

    const index = Math.round(tabsContentWrapper.scrollLeft / tabsContentWrapper.offsetWidth);

    if (lastIndex === index) {
      // skip the rest of the code if `lastIndex` matches `index`
      return;
    }

    lastIndex = index;

    setActiveTab(tabs[index]);
  },
  { passive: true }
);

// reset UI tabs by clicking the `About us` link

const about = document.querySelector('#about-link');

about.addEventListener('click', () => {
  if (lastIndex === 0) {
    // skip the rest of the code if `lastIndex` matches `0`
    return;
  }

  tabsContentWrapper.scrollTo({
    left: 0,
  });

  setActiveTab(tabs[0]);
});
