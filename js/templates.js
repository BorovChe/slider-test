const sliderTemplate = ({ description, count }) => `<li class="slide">
          <button data-direction="prev" class="slide-btn-nav">Prev</button>
          <div class="description">
         <p>${description}</p>
          </div>
          <div class="image">${count}</div>
          <button data-direction="next" class="slide-btn-nav">Next</button>
        </li>`;

const sliderIndicatorTemplate = () => `<li class='indicator'></li>`;

export { sliderTemplate, sliderIndicatorTemplate };
