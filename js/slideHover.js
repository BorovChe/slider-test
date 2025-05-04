import slides from "./data.js";

const slideRef = document.querySelectorAll(".slide");
const slideImageRef = document.querySelectorAll(".image");

const DEFAULT_COUNT = 0;

let mouseEnterCount = DEFAULT_COUNT;

const handleSlideMouseEnter = (i) => {
  const slideImages = slides[i].images;
  const slidesLength = slideImages.length;
  mouseEnterCount += 1;

  if (mouseEnterCount >= slidesLength) mouseEnterCount = DEFAULT_COUNT;

  slideImageRef[i].classList.add("image-hover");
  slideImageRef[i].src = slideImages[mouseEnterCount];

  slideImageRef[i].addEventListener("animationend", () => {
    slideImageRef[i].classList.remove("image-hover");
  });
};

// const handleSlideMouseLeave = (i) => {
//   //   slideImageRef[i].classList.remove("image-hover");
// };

slideRef.forEach((slide, i) =>
  slide.addEventListener("mouseenter", handleSlideMouseEnter.bind(null, i))
);

// slideRef.forEach((slide, i) =>
//   slide.addEventListener("mouseleave", handleSlideMouseLeave.bind(null, i))
// );
