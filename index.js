const listTabs = document.querySelector(".tabs__list");
const checkbox = document.querySelector("#check");
const buttonAdd = document.querySelector(".btn");
const crossBtn = document.querySelector(".cross__btn");
const tabsInput = document.querySelector(".tabs__input");
const tabsInputHTML = tabsInput.innerHTML;

const arrTabs = [];

const addTabs = (title, description, array) => {
  const tab = {
    id: Date.now(),
    title: title,
    description: description,
  };
  array.push(tab);
};

const isNotHaveTab = (title, list) => {
  let isNotHave = true;

  list.forEach((el) => {
    if (el.title === title) {
      alert(`Вкладка(${title}) уже существует!`);
      isNotHave = false;
    }
  });
  return isNotHave;
};

const renderTabs = (list) => {
  listTabs.innerHTML = "";
  list.forEach((el) => {
    const title = el.title.length > 6 ? el.title.slice(0, 6) + "..." : el.title;
    const tabHTML = `<li class="tab" id="${el.id}"><p>${title}</p> <span class="cross__btn">×</span></li>`;
    listTabs.insertAdjacentHTML("beforeend", tabHTML);
  });
};



const deleteTab = (id, list) => {
  list.forEach((tab, idx) => {
    if (tab.id == id) {
      list.splice(idx, 1);
    }
  });
  tabsInput.innerHTML = tabsInputHTML;
  const tabs__home = document.querySelector(".tabs__home")
  if(tabs__home) {
    tabs__home.remove()
  }
};

const renderDescrTab = (list, id) => {
  let html = "";
  list.forEach((el) => {
    if (id == el.id) {
      html += `
            <h1 class="tab__title">${el.title}</h1>
            <p>Описание: ${el.description}</p>
          `;
    }
  });

  if (
    !document
      .querySelector(".tabs-wrapper")
      .contains(document.querySelector(".tabs__home"))
  ) {
    tabsInput.insertAdjacentHTML(
      "afterend",
      '<div class="tabs__home"><img src="home.svg" alt="home"/></div>'
    );
    const tabsHome = document.querySelector(".tabs__home");
    tabsHome.addEventListener("click", (e) => {
      e.preventDefault();
      tabsInput.innerHTML = tabsInputHTML;
      e.target.classList.contains("tabs__home")
        ? e.target.remove()
        : e.target.parentElement.remove();
    });
  }
  tabsInput.innerHTML = html;
};


tabsInput.addEventListener("click", (e) => {
  e.preventDefault();
  const tabTitle = document.querySelector(".input-title");
  const tabDescr = document.querySelector(".input-description");
  if (e.target.classList.contains("btn")) {
    if (
      tabTitle.value &&
      tabDescr.value &&
      isNotHaveTab(tabTitle.value, arrTabs)
    ) {
      addTabs(tabTitle.value, tabDescr.value, arrTabs);
      console.log(arrTabs);
      tabTitle.value = "";
      tabDescr.value = "";
      renderTabs(arrTabs);
    }
  }
});

listTabs.addEventListener("click", (e) => {
  e.preventDefault();
  const target = e.target;
  if (
    target.classList.contains("tab") ||
    target.parentElement.classList.contains("tab")
  ) {
    if (target.classList.contains("cross__btn")) {
      const tabId = target.parentElement.getAttribute("id");
      deleteTab(tabId, arrTabs);
      renderTabs(arrTabs);
    } else {
      const tabId = target.getAttribute("id");
      renderDescrTab(
        arrTabs,
        tabId ? tabId : target.parentElement.getAttribute("id")
      );
    }
  }
});
