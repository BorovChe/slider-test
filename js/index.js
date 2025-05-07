import { sliderRef } from "./refs.js";
import slides from "./data.js";

const slideRefs = document.querySelectorAll(".slide");
const indicatorsRef = document.querySelectorAll(".indicator");
const slideImageRefs = document.querySelectorAll(".image");

const lastSlidesIndex = slides.length - 1;
const translate = { default: 0, mobile: 260, desktop: 550 };

let slidesTranslate = translate.default;
let prevIndex = 0;
let resizeTimeout;
let isMobileViewport = window.innerWidth < 1024;
let translateStep =
  window.innerWidth < 1024 ? translate.mobile : translate.desktop;

let animationInterval;
let countChangeImages = 0;

const onHandleWindowSize = () => {
  const viewport = window.innerWidth;
  isMobileViewport = viewport < 1024;
  slidesTranslate = translate.default;

  if (isMobileViewport) translateStep = translate.mobile;
  else translateStep = translate.desktop;

  indicatorsRef[0].classList.add("indicator-active");

  prevIndex !== 0 &&
    indicatorsRef[prevIndex].classList.remove("indicator-active");
  sliderRef.style.transform = `translateX(${slidesTranslate}px)`;

  const slideImages = slides[prevIndex].images;
  isMobileViewport
    ? (animationInterval = setInterval(() => {
        countChangeImages += 1;

        if (countChangeImages >= slides[prevIndex].images.length)
          countChangeImages = 0;

        slideImageRefs[prevIndex].classList.add("image-hover");
        slideImageRefs[prevIndex].src = slideImages[countChangeImages];

        slideImageRefs[prevIndex].addEventListener("animationend", () => {
          slideImageRefs[prevIndex].classList.remove("image-hover");
        });
      }, 2000))
    : null;
};

onHandleWindowSize();

const resizeThrottler = () => {
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(() => {
      resizeTimeout = null;
      clearInterval(animationInterval);
      countChangeImages = 0;
      onHandleWindowSize();
    }, 200);
  }
};

indicatorsRef[0].classList.add("indicator-active");

const handleSliderChange = (currentIndex, e) => {
  const currentDataAttribute = e.target.dataset.direction;

  if (currentDataAttribute === "next") {
    indicatorsRef[prevIndex].classList.remove("indicator-active");
    prevIndex = currentIndex + 1;

    slidesTranslate = slidesTranslate - translateStep;
    sliderRef.style.transform = `translateX(${slidesTranslate}px)`;

    if (currentIndex === lastSlidesIndex) {
      slidesTranslate = translate.default;
      sliderRef.style.transform = `translateX(${slidesTranslate}px)`;

      indicatorsRef[0].classList.add("indicator-active");
      indicatorsRef[currentIndex].classList.remove("indicator-active");

      prevIndex = 0;
    }

    currentIndex < lastSlidesIndex &&
      indicatorsRef[currentIndex + 1].classList.add("indicator-active");
    indicatorsRef[currentIndex].classList.remove("indicator-active");
  } else if (currentDataAttribute === "prev") {
    indicatorsRef[prevIndex].classList.remove("indicator-active");
    prevIndex = currentIndex - 1;

    slidesTranslate = slidesTranslate + translateStep;
    sliderRef.style.transform = `translateX(${slidesTranslate}px)`;

    if (currentIndex === 0) {
      slidesTranslate = -translateStep * lastSlidesIndex;
      sliderRef.style.transform = `translateX(${slidesTranslate}px)`;

      indicatorsRef[lastSlidesIndex].classList.add("indicator-active");
      indicatorsRef[currentIndex].classList.remove("indicator-active");

      prevIndex = lastSlidesIndex;
    }

    indicatorsRef[
      currentIndex === 0 ? currentIndex : currentIndex - 1
    ].classList.add("indicator-active");
    indicatorsRef[currentIndex].classList.remove("indicator-active");
  }
};

const handleClickOnIndicator = (currentIndex) => {
  indicatorsRef[prevIndex].classList.remove("indicator-active");
  prevIndex = currentIndex;

  slidesTranslate = -translateStep * currentIndex;
  sliderRef.style.transform = `translateX(${slidesTranslate}px)`;
  indicatorsRef[currentIndex].classList.add("indicator-active");
};

window.addEventListener("resize", resizeThrottler);

slideRefs.forEach((slide, currentIndex) =>
  slide.addEventListener("click", handleSliderChange.bind(null, currentIndex))
);

indicatorsRef.forEach((indicator, currentIndex) =>
  indicator.addEventListener(
    "click",
    handleClickOnIndicator.bind(null, currentIndex)
  )
);

export { isMobileViewport };
