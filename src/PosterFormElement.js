/* eslint-disable lit/binding-positions */
import { html, LitElement } from 'lit-element';

// Style Import : Main/Current Component Style
import componentStyle from './style.scss';

import 'poster-design-element';
import '@vaadin/vaadin-date-picker';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-radio-button';

// NOT SURE I NEED THAT ============================
//
// List : All the designs for Poster
// const posterDesigns = ['', 'cosmic-latte', 'deep-space-blue', 'navy', 'cosmic-love', 'blackhole', 'supernova'];

// Settings : color of the planets orbits based on the poster's background
const posterDarkOrbits = ['2', '4'];
// NOT SURE I NEED THAT ============================

// Settings : Human readable date
// const posterDateSettings = {
//   year: 'numeric',
//   month: 'long',
//   day: 'numeric',
// };

export class PosterFormElement extends LitElement {
  static get styles() {
    return [componentStyle];
  }

  static get properties() {
    return {
      posterDesign: {
        type: Number,
        reflect: true,
      },
      posterDate: {
        // type: String,
        reflect: true,
        // ,
        // converter(value) {
        //   return new Date(value);
        // }
      },

      posterPrint: {
        type: Number,
        reflect: true,
      },
      posterTitle: {
        type: String,
        reflect: true,
      },
      posterSubtitle: {
        type: String,
        reflect: true,
      },
      posterCoordinates: {
        type: String,
        reflect: true,
      },
      posterLocation: {
        type: String,
        reflect: true,
      },
      // ,
      // color: {
      //   type: String,
      //   reflect: true
      // }
    };
  }

  // connectedCallback() {
  //   super.connectedCallback();
  //   document.addEventListener('locationchange', function () {
  //     console.log('location changed!');
  //     this.updatePropsFromUrl();

  //   });

  // }

  // disconnectedCallback() {
  //   document.removeEventListener('readystatechange');
  //   super.disconnectedCallback();
  // }

  constructor() {
    super();
    // this.title = 'Hey there';
    // this.posterTitle = "yo man";

    // Getter: URL and Params for use later
    this.url = new URL(document.location);
    this.posterParams = new URLSearchParams(this.url.search);

    this.observeMe = new Proxy(this.posterParams, this.handlerMe);

    this.updatePropsFromUrl();

    this.counter = 5;
  }

  // eslint-disable-next-line class-methods-use-this
  handlerMe() {
    alert('asdasd');
  }

  firstUpdated() {
    this.updateUrlFromProps();
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    // this.color = attr === "posterDesign" ? posterDarkOrbits.includes(this.posterDesign) ? 'black' : 'white' : false;

    console.log('======');

    // console.log(attr);
    // console.log(this.color);
    if (attr === 'posterdesign') {
      this.color = posterDarkOrbits.includes(this.posterDesign) ? 'black' : 'white';
      // console.log(this.color);
    }

    this.updateUrlFromProps();

    // console.log(window.onhashchange);

    super.attributeChangedCallback(attr, oldVal, newVal);
  }

  updatePropsFromUrl() {
    this.url = new URL(document.location);
    this.posterParams = new URLSearchParams(this.url.search);

    this.posterPrint =
      this.posterParams.has('posterPrint') && this.posterParams.get('posterPrint') > 0 ? 1 : 0;
    this.posterTitle = this.posterParams.has('posterTitle')
      ? this.posterParams.get('posterTitle')
      : 'Name Of Someone You Love';
    this.posterSubtitle = this.posterParams.has('posterSubtitle')
      ? this.posterParams.get('posterSubtitle')
      : '';
    this.posterLocation = this.posterParams.has('posterLocation')
      ? this.posterParams.get('posterLocation')
      : 'Amazing Place, World Country';
    this.posterCoordinates = this.posterParams.has('posterCoordinates')
      ? this.posterParams.get('posterCoordinates')
      : '00.00000°N -000.00000°W';
    this.posterDesign = this.posterParams.has('posterDesign')
      ? this.posterParams.get('posterDesign')
      : '1';
    // eslint-disable-next-line no-nested-ternary
    this.color = this.posterParams.has('color')
      ? this.posterParams.get('color')
      : posterDarkOrbits.includes(this.posterDesign)
      ? 'black'
      : 'white';
    // eslint-disable-next-line no-restricted-globals
    this.posterDate = this.posterParams.has('posterDate')
      ? new Date(
          // eslint-disable-next-line no-restricted-globals
          isNaN(this.posterParams.get('posterDate'))
            ? this.posterParams.get('posterDate')
            : new Date(),
        )
      : new Date();
  }

  updateUrlFromProps() {
    this.url = new URL(document.location);
    this.posterParams = new URLSearchParams(this.url.search);

    // this.posterParams.set("color", this.color);
    this.posterParams.set('posterSize', '9x12');

    // this.posterParams.set('posterPrint', this.posterPrint);
    // this.posterParams.set('posterDesign', this.posterDesign);
    // this.posterParams.set(
    //   'posterDate',
    //   `${this.posterDate.getFullYear()}-${this.posterDate.toLocaleString('default', {
    //     month: 'short',
    //   })}-${this.posterDate.getDate()}`,
    // );
    // this.posterParams.set('posterTitle', this.posterTitle);
    // this.posterParams.set("posterSubtitle", this.posterSubtitle);
    // this.posterParams.set('posterLocation', this.posterLocation);
    // this.posterParams.set('posterCoordinates', this.posterCoordinates);

    // window.history.replaceState({}, 'Updating poster Design', `?${this.posterParams.toString()}`);
  }

  onInputChange(event) {
    const input = event.target || event.srcElement;

    if (input.getAttribute('data-property_name') === 'posterDate') {
      console.log('Date Update ------>');

      this[input.getAttribute('data-property_name')] = input.value;
      // this[input.getAttribute('data-property_name')] = new Date(input.value);
      // this.posterFormatedDate = this.posterDate;
    } else {
      this[input.getAttribute('data-property_name')] = input.value;
    }
  }

  render() {
    return html`
      <style>
        #mygrid {
          display: flex;
          /* flex-direction: row-reverse; */
        }
        form {
          max-width: 300px;
        }
        poster-design-element {
          max-width: 400px;
          max-height: 600px;

          order: 2;
          margin-left: 20px;
        }
      </style>

      <div id="mygrid">
        <poster-design-element
          postertitle="${this.posterTitle}"
          postersubtitle="${this.posterSubtitle}"
          posterlocation="${this.posterLocation}"
          postercoordinates="${this.posterCoordinates}"
          posterdesign="${this.posterDesign}"
          posterdate="${this.posterDate}"
        >
        </poster-design-element>

        <form
          id="Form-Design-Settings"
          name="wf-form-Settings"
          data-property_name="Settings"
          class="posterFormContainer"
        >
          <div class="info-design-container">
            <label for="mySubtitle" class="">
              #1 Select Your Design
            </label>

            <div class="div-block-53">
              <div class="map-design-selector">
                <vaadin-radio-group label="Poster Design">
                  <vaadin-radio-button
                    id="radio--cosmic-latte"
                    value="1"
                    data-property_name="posterDesign"
                    @change="${this.onInputChange}"
                  >
                    Cosmic Latte
                  </vaadin-radio-button>
                  <vaadin-radio-button
                    id="radio--deep-space-blue"
                    value="2"
                    data-property_name="posterDesign"
                    @input="${this.onInputChange}"
                  >
                    Deep Space Blue
                  </vaadin-radio-button>
                  <vaadin-radio-button
                    id="radio--navy"
                    value="3"
                    data-property_name="posterDesign"
                    @input="${this.onInputChange}"
                  >
                    Navy
                  </vaadin-radio-button>
                  <vaadin-radio-button
                    id="radio--cosmic-love"
                    value="4"
                    data-property_name="posterDesign"
                    @input="${this.onInputChange}"
                  >
                    Cosmic Love
                  </vaadin-radio-button>
                  <vaadin-radio-button
                    id="radio--blackhole"
                    value="5"
                    data-property_name="posterDesign"
                    @input="${this.onInputChange}"
                  >
                    Blackhole
                  </vaadin-radio-button>
                  <vaadin-radio-button
                    id="radio--supernova"
                    value="6"
                    data-property_name="posterDesign"
                    @input="${this.onInputChange}"
                  >
                    Supernova
                  </vaadin-radio-button>
                </vaadin-radio-group>

                <br />
                <br />

                <label class="theme-selection-radio w-radio">
                  <input
                    type="radio"
                    id="cosmic-latte"
                    value="1"
                    @input="${this.onInputChange}"
                    name="Design"
                    data-property_name="posterDesign"
                    class="design-radio-button w-radio-input"
                  />
                  <span
                    for="cosmic-latte"
                    id="select-cosmic-latte"
                    class="design-radio-label radio-label-image-cosmic-latte w-form-label"
                  >
                    <span class="design-radio-label-text">
                      Cosmic Latte
                    </span>
                  </span>
                </label>

                <label class="theme-selection-radio w-radio">
                  <!-- <input type="radio" id="deep-space-blue" name="Design" value="deep-space-blue"
                data-property_name="Design" class="design-radio-button w-radio-input" /> -->
                  <input
                    type="radio"
                    id="deep-space-blue"
                    value="2"
                    @input="${this.onInputChange}"
                    name="Design"
                    data-property_name="posterDesign"
                    class="design-radio-button w-radio-input"
                  />
                  <span
                    for="deep-space-blue"
                    id="select-deep-space-blue"
                    class="design-radio-label radio-label-image-deep-space-blue w-form-label"
                  >
                    <span class="design-radio-label-text">
                      Deep Space Blue
                    </span>
                  </span>
                </label>

                <label class="theme-selection-radio w-radio">
                  <input
                    type="radio"
                    id="navy"
                    value="3"
                    @input="${this.onInputChange}"
                    name="Design"
                    data-property_name="posterDesign"
                    class="design-radio-button w-radio-input"
                  />
                  <span
                    for="navy"
                    id="select-navy"
                    class="design-radio-label radio-label-image-navy w-form-label"
                  >
                    <span class="design-radio-label-text">
                      Navy
                    </span>
                  </span>
                </label>

                <label class="theme-selection-radio w-radio">
                  <input
                    type="radio"
                    id="cosmic-love"
                    value="4"
                    @input="${this.onInputChange}"
                    name="Design"
                    data-property_name="posterDesign"
                    class="design-radio-button w-radio-input"
                  /><span
                    for="cosmic-love"
                    id="select-cosmic-love"
                    class="design-radio-label radio-label-image-cosmic-love w-form-label"
                    ><span class="design-radio-label-text">
                      Cosmic Love
                    </span></span
                  >
                </label>

                <label class="theme-selection-radio w-radio">
                  <input
                    type="radio"
                    id="blackhole"
                    value="5"
                    @input="${this.onInputChange}"
                    name="Design"
                    data-property_name="posterDesign"
                    class="design-radio-button w-radio-input"
                  /><span
                    for="blackhole"
                    id="select-blackhole"
                    class="design-radio-label radio-label-image-blackhole w-form-label"
                    ><span class="design-radio-label-text">Blackhole</span></span
                  >
                </label>

                <label class="theme-selection-radio w-radio">
                  <input
                    type="radio"
                    id="supernova"
                    name="Design"
                    value="6"
                    @input="${this.onInputChange}"
                    data-property_name="posterDesign"
                    class="design-radio-button w-radio-input"
                  />
                  <span
                    for="supernova"
                    id="select-supernova"
                    class="design-radio-label radio-label-image-supernova w-form-label"
                  >
                    <span class="design-radio-label-text">Supernova</span></span
                  >
                </label>
              </div>
            </div>
          </div>
          <div class="info-design-container">
            <!--

      <label for="mySubtitle" class="">
        #2 Location
      </label>


      <label for="Location-3" class="app-menu-label sub-label">
        Location / Place / City
      </label>

      // eslint-disable-next-line lit/binding-positions
      // eslint-disable-next-line lit/binding-positions
      <input value="${this.posterLocation}" @input="${this
              .onInputChange}" type="text" class="" name="posterLocation"
        data-property_name="posterLocation" placeholder="Choose Location" id="posterLocation" required="" /> -->

            <vaadin-text-field
              @input="${this.onInputChange}"
              label="#2 Location"
              value="${this.posterLocation}"
              data-property_name="posterLocation"
              placeholder="Location"
            >
            </vaadin-text-field>
          </div>
          <div class="info-design-container">
            <dom-module id="custom-date-picker-testme" theme-for="vaadin-date-picker">
              <template>
                <style>
                  :host([theme~='custom']) {
                    font-family: monospace;
                    /* opacity: 0; */
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    left: 0;
                    top: 0;
                    display: block;
                    background-color: transparent;
                    /* background-color: cyan; */
                  }
                </style>
              </template>
            </dom-module>
            <vaadin-date-picker
              theme="custom2"
              @change="${this.onInputChange}"
              data-property_name="posterDate"
              label="#3 Date"
              placeholder="Pick a date"
              .value="${this.posterDate}"
            >
            </vaadin-date-picker>
          </div>

          <div class="info-design-container">
            <div class="map-text-design">
              <!-- <label for="posterTitle" class="">
          #4
          Customize the text of your moment
        </label> -->

              <!-- <input id="posterTitle" value="${this.posterTitle}" @input="${this
                .onInputChange}" type="text" name="posterTitle" data-property_name="posterTitle"
          placeholder="Names, Special Moment or Occasion ..." id="Title" required="true"  /> -->

              <vaadin-text-field
                @input="${this.onInputChange}"
                label="#4 Customize the text of your moment"
                value="${this.posterTitle}"
                data-property_name="posterTitle"
                placeholder="Names, Special Moment or Occasion ..."
              >
              </vaadin-text-field>

              <vaadin-text-field
                @input="${this.onInputChange}"
                label="#4 Customize the text of your moment"
                value="${this.posterTitle}"
                data-property_name="posterTitle"
                placeholder="Names, Special Moment or Occasion ..."
              >
              </vaadin-text-field>
            </div>
          </div>
          <div class="info-design-container">
            <label for="mySubtitle" class="">
              #5 Select Size
            </label>

            <div class="div-block-45">
              <div class="div-block-63">
                <label data-size="9x12" class="size-selection-radio w-radio">
                  <input
                    type="radio"
                    id="size-9x12-US"
                    name="Size"
                    value="size-9x12-US"
                    data-property_name="Size"
                    required=""
                    class="size-radio-select w-radio-input"
                  /><span for="size-9x12-US" class="size-radio-button-label label-8x10 w-form-label"
                    >9" x 12"<br
                  /></span>
                </label>

                <label data-size="12x16" class="size-selection-radio w-radio">
                  <input
                    type="radio"
                    id="size-12x16-US"
                    name="Size"
                    value="size-12x16-US"
                    data-property_name="Size"
                    required=""
                    class="size-radio-select w-radio-input"
                  /><span
                    for="size-12x16-US"
                    class="size-radio-button-label label-12x16 w-form-label"
                    >12"x 16"<br
                  /></span>
                </label>

                <label data-size="18x24" class="size-selection-radio w-radio">
                  <input
                    type="radio"
                    id="size-18x24-US"
                    name="Size"
                    value="size-18x24-US"
                    data-property_name="Size"
                    class="size-radio-select w-radio-input"
                  /><span
                    for="size-18x24-US"
                    class="size-radio-button-label label-18x24 w-form-label"
                    >18"x 24"<br
                  /></span>
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
    `;
  }
}
window.customElements.define('poster-form-element', PosterFormElement);
