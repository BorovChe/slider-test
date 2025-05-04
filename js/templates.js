const sliderTemplate = ({ description, images }) => `<li class="slide">
          <button data-direction="prev" class="slide-btn-nav">Prev</button>
          <div class="description">
         <p>${description}</p>
          </div>
          <div class="image-wrapper"><img width='160' height='160' class='image' alt='image' src='${images[0]}'/></div>
          <button data-direction="next" class="slide-btn-nav">Next</button>
        </li>`;

const sliderIndicatorTemplate = () => `<li class='indicator'></li>`;

export { sliderTemplate, sliderIndicatorTemplate };
