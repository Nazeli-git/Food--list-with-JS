"use strict"

document.addEventListener("DOMContentLoaded", () => {
  //tabs start
  const tabHeaders = document.querySelectorAll(".tabheader__item");
  const tabHeadersParent = document.querySelector(".tabheader__items");
  const tabContents = document.querySelectorAll(".tabcontent");

  function hideTabContent() {
    tabContents.forEach(item => {
      item.classList.add("hide");
      item.classList.remove("show")
    })
    tabHeaders.forEach(item => {
      item.classList.remove("tabheader__item_active");
    })
  };

  function showTabContent(i = 0) {
    tabContents[i].classList.add("show");
    tabContents[i].classList.remove("hide")
    tabHeaders[i].classList.add("tabheader__item_active")
  };

  hideTabContent()
  showTabContent()

  tabHeadersParent.addEventListener("click", (e) => {
    if (e.target && e.target.matches(".tabheader__item")) {
      tabHeaders.forEach((item, index) => {
        if (e.target == item) {
          hideTabContent()
          showTabContent(index)
        }
      })
    }
  });
  //tabs end

  //timer start

  const deadline = "2024-09-30 24:00";

  const setZero = n => n >= 0 && n < 10 ? `0${n}` : n;

  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const total = Date.parse(endtime) - Date.parse(new Date());

    if (total <= 0) {
      days = 0,
        hours = 0,
        minutes = 0,
        seconds = 0
    } else {
      days = Math.floor(total / (1000 * 60 * 60 * 24));
      hours = Math.floor((total / (1000 * 60 * 60) % 24));
      minutes = Math.floor((total / 1000 / 60) % 60);
      seconds = Math.floor((total / 1000) % 60);
    }

    return { total, days, hours, minutes, seconds }
  }

  function setTimer(selector, endtime) {
    const timer = document.querySelector(selector);
    const daysElem = timer.querySelector("#days");
    const hoursElem = timer.querySelector("#hours");
    const minutesElem = timer.querySelector("#minutes");
    const secondsElem = timer.querySelector("#seconds");

    const timerID = setInterval(updateTimer, 1000);

    updateTimer();

    function updateTimer() {
      const { total, days, hours, minutes, seconds } = getTimeRemaining(endtime);
      daysElem.innerHTML = setZero(days);
      hoursElem.innerHTML = setZero(hours);
      minutesElem.innerHTML = setZero(minutes);
      secondsElem.innerHTML = setZero(seconds);

      if (total <= 0) {
        clearInterval(timerID)
      }
    };
  };

  setTimer(".timer", deadline)

  //timer end

  //modal start
  const modalOpenTigger = document.querySelectorAll("[data-open-modal]");
  const modalCloseTigger = document.querySelector("[data-modal-close]");
  const modal = document.querySelector(".modal");

  function showModal() {
    modal.classList.remove("hide");
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
    clearTimeout(modalTimerId)
  };

  function closeModal() {
    modal.classList.remove("show");
    modal.classList.add("hide");
    document.body.style.overflow = "auto"
  };

  modalOpenTigger.forEach(btn => btn.addEventListener("click", showModal));

  modalCloseTigger.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target && e.target === modal) {
      closeModal()
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.matches(".show")) {
      closeModal()
    }
  });

  const modalTimerId = setTimeout(showModal, 10000);

  function showModalByScroll() {
    if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 50) {
      showModal();
      window.removeEventListener("scroll", showModalByScroll)
    }
  }

  window.addEventListener("scroll", showModalByScroll)

  //modal end
})