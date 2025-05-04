import { sliderRef } from "./refs.js";
import slides from "./data.js";

const slideBtnRef = document.querySelectorAll(".slide-btn-nav");
const indicatorsRef = document.querySelectorAll(".indicator");

const slidesLength = slides.length;

const DEFAULT_SLIDE_COUNT = 0;
const DEFAULT_TRANSLATE = 0;
const TRANSLATE_STEP = 550;

let slideCounter = DEFAULT_SLIDE_COUNT;
let slidesTranslate = DEFAULT_TRANSLATE;

indicatorsRef[slideCounter].classList.add("indicator-active");

const handleSliderChange = (e) => {
  if (e.target.dataset.direction === "next") {
    slideCounter += 1;
    slidesTranslate = slidesTranslate - TRANSLATE_STEP;
    sliderRef.style.transform = `translateX(${slidesTranslate}px)`;

    slideCounter < slidesLength &&
      indicatorsRef[slideCounter].classList.add("indicator-active");
    indicatorsRef[slideCounter - 1].classList.remove("indicator-active");
  } else {
    slideCounter -= 1;
    slidesTranslate = slidesTranslate + TRANSLATE_STEP;
    sliderRef.style.transform = `translateX(${slidesTranslate}px)`;

    slideCounter >= 0 &&
      indicatorsRef[slideCounter].classList.add("indicator-active");
    indicatorsRef[slideCounter + 1].classList.remove("indicator-active");
  }

  if (slideCounter === slidesLength) {
    slideCounter = DEFAULT_SLIDE_COUNT;
    slidesTranslate = DEFAULT_TRANSLATE;
    sliderRef.style.transform = `translateX(${slidesTranslate}px)`;

    indicatorsRef[slideCounter].classList.add("indicator-active");
  } else if (slideCounter < 0) {
    slideCounter = slidesLength - 1;
    slidesTranslate = -TRANSLATE_STEP * (slidesLength - 1);
    sliderRef.style.transform = `translateX(${slidesTranslate}px)`;

    indicatorsRef[slideCounter].classList.add("indicator-active");
  }
};

slideBtnRef.forEach((btn) => btn.addEventListener("click", handleSliderChange));
