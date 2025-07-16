import slides from "./data.js";

class SwitchSlide {
  constructor(sliderRef, slideLength) {
    this.sliderRef = sliderRef;
    this.slideLength = slideLength;
    this.maxIndex = slideLength - 1;
    this.counter = 0;

    this.indicators = [];
    this.prevBtn = document.querySelector(".prev-btn");
    this.nextBtn = document.querySelector(".next-btn");

    this.onSlideChange = null;
  }

  prev() {
    this.counter = this.counter > 0 ? this.counter - 1 : this.maxIndex;
    this.updateSlide();
    this.updateIndicators();
  }

  next() {
    this.counter = this.counter < this.maxIndex ? this.counter + 1 : 0;
    this.updateSlide();
    this.updateIndicators();
  }

  init() {
    this.prevBtn.addEventListener("click", () => this.prev());
    this.nextBtn.addEventListener("click", () => this.next());

    this.renderNavigation();
  }

  renderNavigation() {
    const navContainer = document.createElement("div");
    navContainer.className = "indicators";

    for (let i = 0; i < this.slideLength; i += 1) {
      const inditator = document.createElement("span");
      inditator.className = "indicator";

      if (i === 0) inditator.classList.add("indicator-active");

      inditator.addEventListener("click", () => {
        this.counter = i;
        this.updateSlide();
        this.updateIndicators();
      });

      navContainer.append(inditator);
      this.indicators.push(inditator);
    }

    this.sliderRef.parentElement.appendChild(navContainer);
  }

  updateIndicators() {
    this.indicators.forEach((indicator, index) => {
      indicator.classList.toggle("indicator-active", index === this.counter);
    });
  }

  updateSlide() {
    const computedStyle = window.getComputedStyle(this.sliderRef);
    const gap = parseFloat(computedStyle.getPropertyValue("gap"));

    const slide = this.sliderRef.firstChild;
    const slideWidth = slide.offsetWidth;
    const totalOffset = (slideWidth + gap) * this.counter;

    this.sliderRef.style.transform = `translateX(-${totalOffset}px)`;

    this.onSlideChange?.(this.counter);
  }
}

class SlideItem {
  imageCounter = 0;

  constructor({ description, images }, isMobile) {
    this.isMobile = isMobile;
    this.description = description;
    this.images = images;
    this.intervalId = null;
  }

  createDynamicImage(dynamicImage) {
    const image = document.createElement("img");
    image.classList = "image";
    image.width = 160;
    image.height = 160;
    image.src = this.images[dynamicImage];
    image.alt = "Image";

    return image;
  }

  initImageCarousel(imageRef) {
    this.intervalId = setInterval(() => {
      this.imageCounter += 1;
      if (this.imageCounter >= this.images.length) {
        this.imageCounter = 0;
      }

      imageRef.classList.add("fade-out");
      setTimeout(() => {
        imageRef.src = this.images[this.imageCounter];
        imageRef.classList.remove("fade-out");
      }, 800);
    }, 1600);
  }

  stopImageCarousel() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  render(isMobile, currentIndex, activeSlideIndex) {
    this.isMobile = isMobile;

    const slideItem = document.createElement("li");
    slideItem.className = "slide";
    const descr = document.createElement("div");
    descr.classList = "description";
    descr.textContent = this.description;

    const imageWrapper = document.createElement("div");
    imageWrapper.classList = "image-wrapper";
    const imageEl = this.createDynamicImage(this.imageCounter);
    imageWrapper.append(imageEl);

    if (!this.isMobile) {
      this.stopImageCarousel();
      slideItem.addEventListener("mouseenter", () =>
        this.initImageCarousel(imageEl)
      );
      slideItem.addEventListener("mouseleave", () => this.stopImageCarousel());
    } else {
      activeSlideIndex === currentIndex
        ? this.initImageCarousel(imageEl)
        : this.stopImageCarousel();
    }

    slideItem.append(descr, imageWrapper);
    return slideItem;
  }
}

class SlideList {
  constructor(slides) {
    this.container = null;
    this.isMobile = window.innerWidth <= 1024;
    this.slidesData = slides;
    this.activeIndex = 0;
    this.slides = slides.map((slide) => new SlideItem(slide, this.isMobile));

    window.addEventListener("resize", () => this.handleResize());
  }

  handleResize() {
    const currentIsMobile = window.innerWidth <= 1024;

    if (currentIsMobile !== this.isMobile) {
      this.isMobile = currentIsMobile;
      this.activeIndex = 0;
      this.container.innerHTML = "";
      this.render(this.container);
    }
  }

  render(container) {
    this.container = container;

    const slidelist = document.createElement("ul");
    slidelist.className = "slider";

    this.slides.forEach((slide, index) => {
      slidelist.append(slide.render(this.isMobile, index, this.activeIndex));
    });

    container.append(slidelist);

    const switchSlider = new SwitchSlide(slidelist, slides.length);
    switchSlider.init();

    switchSlider.onSlideChange = (index) => {
      this.activeIndex = index;
      this.updateSlideActivity();
    };
  }

  updateSlideActivity() {
    const ul = this.container.querySelector(".slider");
    ul.innerHTML = "";

    this.slides.forEach((slide, index) => {
      ul.append(slide.render(this.isMobile, index, this.activeIndex));
    });
  }
}

class App {
  constructor(rootSelector) {
    this.root = document.querySelector(rootSelector);
  }

  init() {
    const slidesList = new SlideList(slides);
    slidesList.render(this.root);
  }
}

const app = new App("#slider-wrapper");
app.init();
