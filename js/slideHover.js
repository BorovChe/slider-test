import slides from "./data.js";
import { isMobileViewport } from "./index.js";

const slideRefs = document.querySelectorAll(".slide");
const slideImageRefs = document.querySelectorAll(".image");

const ANIMATION_INTERVAL = 2000;
const DEFAULT_IMAGE_COUNT = 0;

let countChangeImages = DEFAULT_IMAGE_COUNT;
let animationInterval;

const handleSlideMouseEnter = (currentIndex) => {
  const slideImages = slides[currentIndex].images;
  const slidesLength = slideImages.length;

  !isMobileViewport
    ? (animationInterval = setInterval(() => {
        countChangeImages += 1;
        if (countChangeImages >= slidesLength)
          countChangeImages = DEFAULT_IMAGE_COUNT;

        slideImageRefs[currentIndex].classList.add("image-hover");
        slideImageRefs[currentIndex].src = slideImages[countChangeImages];

        slideImageRefs[currentIndex].addEventListener("animationend", () => {
          slideImageRefs[currentIndex].classList.remove("image-hover");
        });
      }, ANIMATION_INTERVAL))
    : null;
};

const handleSlideMouseLeave = () => {
  clearInterval(animationInterval);
  countChangeImages = DEFAULT_IMAGE_COUNT;
};

slideRefs.forEach((slide, currentIndex) =>
  slide.addEventListener(
    "mouseenter",
    handleSlideMouseEnter.bind(null, currentIndex)
  )
);

slideRefs.forEach((slide) =>
  slide.addEventListener("mouseleave", handleSlideMouseLeave)
);
