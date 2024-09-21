// add UI tabs

const tabs = document.querySelectorAll('.tabs__tab');
const tabsContent = document.querySelectorAll('.tabs__tab-content');
const tabsContentWrapper = document.querySelector('.tabs__content-wrapper');
const tabsList = document.querySelector('.tabs__list');

const setActiveTab = (tab) => {
  document.querySelector('.tabs__tab.active').classList.remove('active');
  tab.classList.add('active');
};

let lastIndex = 0;

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

  tabsContentWrapper.scrollTo({
    left: tabsContent[index].offsetLeft,
    behavior: 'smooth',
  });

  setActiveTab(clickedTab);
});

// reset UI tabs by clicking the `About us` link

const about = document.querySelector('#about-link');

about.addEventListener('click', () => {
  if (lastIndex === 0) {
    // skip the rest of the code if `lastIndex` matches `0`
    return;
  }

  lastIndex = 0;

  tabsContentWrapper.scrollTo({
    left: tabsContent[0].offsetLeft,
  });

  setActiveTab(tabs[0]);
});
