import { sliderRef, sliderIndicatorsRef } from "./refs.js";

import slides from "./data.js";
import { sliderTemplate, sliderIndicatorTemplate } from "./templates.js";

const slideMarkup = slides.map((slide) => sliderTemplate(slide)).join(" ");
sliderRef.insertAdjacentHTML("afterbegin", slideMarkup);

const sliderIndicatorMarkup = slides.map(sliderIndicatorTemplate).join(" ");
sliderIndicatorsRef.insertAdjacentHTML("afterbegin", sliderIndicatorMarkup);
