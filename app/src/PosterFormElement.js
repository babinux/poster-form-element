/* eslint-disable lit/no-value-attribute */
/* eslint-disable lit/binding-positions */
import { html, LitElement } from 'lit-element';

import 'poster-design-element';
import '@vaadin/vaadin-date-picker';
import '@vaadin/vaadin-text-field';
// import '@vaadin/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/vaadin-radio-group.js';

// Style Import : Main/Current Component Style
import componentStyle from '../style/style.scss';

const GoogleMapsLoader = require('google-maps'); // only for common js environments

GoogleMapsLoader.KEY = 'AIzaSyCq8BCifO8u5oCBMPcbZsh6Q4MySDX-4JQ';
GoogleMapsLoader.LIBRARIES = ['places'];

const posterSizes = [
  {
    id: `9x12-US`,
    title: `9" x 12"`,
  },
  {
    id: `12x16-US`,
    title: `12"x 16"`,
  },
  {
    id: `18x24-US`,
    title: `18"x 24"`,
  },
];

const posterDesigns = [
  {
    id: `cosmic-latte`,
    color: `black`,
    title: `Black Tea`,
  },
  {
    id: `deep-space-blue`,
    color: `white`,
    title: `Cosmic Latte`,
  },
  {
    id: `navy`,
    color: `white`,
    title: `Navy`,
  },
  {
    id: `cosmic-love`,
    color: `white`,
    title: `Cosmic Love`,
  },
  {
    id: `blackhole`,
    color: `white`,
    title: `Blackhole`,
  },
  {
    id: `supernova`,
    color: `white`,
    title: `Supernova`,
  },
  {
    id: `milk-drop`,
    color: `white`,
    title: `Milkyway`,
  },
];

const posterDarkOrbits = ['2', '4'];

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
        type: Object,

        reflect: true,
        converter: place => {
          // console.log(`Coordinate TO ${typeof place}`);
          // console.log(place[0]);
          // console.log(this.places);
          console.log(place);

          // return `${place[0].geometry.location
          //   .lat()
          //   .toFixed(5)}°N, ${this.places[0].geometry.location.lng().toFixed(5)}°W`;
          return place;
        },
      },
      posterLocation: {
        type: String,
        reflect: true,
      },
      posterSize: {
        reflect: true,
      },
      color: {
        type: String,
        reflect: true,
      },
    };
  }

  constructor() {
    super();

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

  buildButton() {
    this.buttonShopify = html`
      <div id="product-component-1579841450878"></div>
    `;
    this.scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
    if (window.ShopifyBuy) {
      if (window.ShopifyBuy.UI) {
        this.ShopifyBuyInit();
      } else {
        this.loadScript();
      }
    } else {
      this.loadScript();
    }
  }

  loadScript() {
    this.script = document.createElement('script');
    this.script.async = true;
    this.script.src = this.scriptURL;
    (
      document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]
    ).appendChild(this.script);
    this.script.onload = this.ShopifyBuyInit;
  }

  ShopifyBuyInit() {
    const client = ShopifyBuy.buildClient({
      domain: 'starry-app.myshopify.com',
      storefrontAccessToken: '18b9925870b8277b37c110870b9fee4f',
    });
    ShopifyBuy.UI.onReady(client).then((ui) => {
      ui.createComponent('product', {
        id: '4474236043308',
        node: document.getElementById('product-component-1579841450878'),
        moneyFormat: '%24%7B%7Bamount%7D%7D',
        options: {
          product: {
            styles: {
              product: {
                '@media (min-width: 601px)': {
                  'max-width': 'calc(25% - 20px)',
                  'margin-left': '20px',
                  'margin-bottom': '50px',
                },
              },
              button: {
                'font-family': 'Roboto, sans-serif',
                'font-size': '17px',
                'padding-top': '16.5px',
                'padding-bottom': '16.5px',
                ':hover': {
                  'background-color': '#3c9ddd',
                },
                'background-color': '#43aef5',
                ':focus': {
                  'background-color': '#3c9ddd',
                },
              },
              quantityInput: {
                'font-size': '17px',
                'padding-top': '16.5px',
                'padding-bottom': '16.5px',
              },
            },
            buttonDestination: 'checkout',
            contents: {
              img: false,
              title: false,
              price: false,
            },
            text: {
              button: 'Buy now',
            },
            googleFonts: ['Roboto'],
          },
          productSet: {
            styles: {
              products: {
                '@media (min-width: 601px)': {
                  'margin-left': '-20px',
                },
              },
            },
          },
          modalProduct: {
            contents: {
              img: false,
              imgWithCarousel: true,
              button: false,
              buttonWithQuantity: true,
            },
            styles: {
              product: {
                '@media (min-width: 601px)': {
                  'max-width': '100%',
                  'margin-left': '0px',
                  'margin-bottom': '0px',
                },
              },
              button: {
                'font-family': 'Roboto, sans-serif',
                'font-size': '17px',
                'padding-top': '16.5px',
                'padding-bottom': '16.5px',
                ':hover': {
                  'background-color': '#3c9ddd',
                },
                'background-color': '#43aef5',
                ':focus': {
                  'background-color': '#3c9ddd',
                },
              },
              quantityInput: {
                'font-size': '17px',
                'padding-top': '16.5px',
                'padding-bottom': '16.5px',
              },
            },
            googleFonts: ['Roboto'],
            text: {
              button: 'Add to cart',
            },
          },
          cart: {
            styles: {
              button: {
                'font-family': 'Roboto, sans-serif',
                'font-size': '17px',
                'padding-top': '16.5px',
                'padding-bottom': '16.5px',
                ':hover': {
                  'background-color': '#3c9ddd',
                },
                'background-color': '#43aef5',
                ':focus': {
                  'background-color': '#3c9ddd',
                },
              },
            },
            text: {
              total: 'Subtotal',
              button: 'Checkout',
            },
            googleFonts: ['Roboto'],
          },
          toggle: {
            styles: {
              toggle: {
                'font-family': 'Roboto, sans-serif',
                'background-color': '#43aef5',
                ':hover': {
                  'background-color': '#3c9ddd',
                },
                ':focus': {
                  'background-color': '#3c9ddd',
                },
              },
              count: {
                'font-size': '17px',
              },
            },
            googleFonts: ['Roboto'],
          },
        },
      });
    });
  }

  firstUpdated() {
    this.buildButton();

    document.addEventListener('snipcart.ready', () => {
      // You can safely use window.Snipcart here
      // alert('asdasd');
      console.log('Snipcart init');
      console.log(window.Snipcart.store.getState());

      window.Snipcart.store.getState();
      // Snipcart.events.on(...);
    });
    // this.googleMapDom = this.shadowRoot.querySelector('#map');
    this.googleMapDomInput = this.shadowRoot.querySelector('#map-input');

    GoogleMapsLoader.load(google => {
      this.initAutocomplete(google);
    });

    this.updateUrlFromProps();
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    super.attributeChangedCallback(attr, oldVal, newVal);

    // if (attr === 'posterdesign') {
    //   this.color = posterDarkOrbits.includes(this.posterDesign) ? 'black' : 'white';
    //   // console.log(this.color);
    // }

    this.updateUrlFromProps();

    // console.log(window.onhashchange);
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
      : '';
    this.posterCoordinates = this.posterParams.has('posterCoordinates')
      ? this.posterParams.get('posterCoordinates')
      : '00.00000°N -000.00000°W';
    this.posterDesign = this.posterParams.has('posterDesign')
      ? this.posterParams.get('posterDesign')
      : '1';
    this.posterSize = this.posterParams.has('posterSize')
      ? this.posterParams.get('posterSize')
      : posterSizes[0].id;
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

    // this.posterParams.set('posterSize', '9x12');
    // console.log(`update Url FromProps ------>${this.posterSize}`);

    this.posterParams.set('posterSize', this.posterSize);

    window.history.replaceState({}, 'Updating poster Design', `?${this.posterParams.toString()}`);
  }

  onInputChange(event) {
    const input = event.target || event.srcElement;
    console.log(`input changed`);

    if (input.getAttribute('data-property_name') === 'posterDate') {
      // console.log('Date Update ------>');

      this[input.getAttribute('data-property_name')] = input.value;
      // this[input.getAttribute('data-property_name')] = new Date(input.value);
      // this.posterFormatedDate = this.posterDate;
    }
    // else if (input.getAttribute('data-property_name') === 'posterSize') {
    //   // console.log(`prop ------>${input.getAttribute('data-property_name')}`);
    //   // console.log(`INPUT  val ------>${input.value}`);
    //   // this.posterSize = 'abc';
    //   this.posterSize = input.value;
    //   // console.log(`POSTER SIZE  val ------>${this.posterSize}`);

    //   // this[input.getAttribute('data-property_name')] = input.value;
    //   // this.posterParams.set('posterSize', input.value);
    //   this.updateUrlFromProps();
    // }
    else {
      // this[input.getAttribute('data-property_name')] = input.value;
      this.setAttribute(input.getAttribute('data-property_name'), input.value);
      this.updateUrlFromProps();
    }
  }

  render() {
    return html`
      <div id="mygrid">
        <div class="admin-poster-layout--block--center">
          <poster-design-element
            id="poster-design-element"
            postertitle="${this.posterTitle}"
            postersubtitle="${this.posterSubtitle}"
            posterlocation="${this.posterLocation}"
            postercoordinates="${this.posterCoordinates}"
            posterdate="${this.posterDate}"
            posterdesign="${this.posterDesign}"
          >
          </poster-design-element>
        </div>
          <div class="admin-poster-layout--block--left">
            <div class="info-design-container">


              <vaadin-radio-group
                label="#1 Poster Design"
                required
                error-message="Please select a design"
                @click="${this.onInputChange}"
              >

                ${posterDesigns.map(
                  (design, index) => html`
                    <vaadin-radio-button
                      id="radio--${design.id}"
                      value="${index + 1}"
                      name="design-${design.id}"
                      data-property_name="posterDesign"
                      ?checked=${index + 1 === Number(this.posterDesign)}
                    >
                      ${design.title}
                    </vaadin-radio-button>
                  `,
                )}

              </vaadin-radio-group>




            </div>

            <div class="info-design-container">
              <div class="map-text-design">
                <vaadin-text-field
                  @input="${this.onInputChange}"
                  label="#2 Customize the text of your moment"
                  value="${this.posterTitle}"
                  data-property_name="posterTitle"
                  placeholder="Names, Special Moment or Occasion ..."
                >
                </vaadin-text-field>
              </div>
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
                theme="custom-form"
                @change="${this.onInputChange}"
                data-property_name="posterDate"
                label="#3 Date"
                placeholder="Pick a date"
                initial-position="1990-01-01"
                .value="${this.posterDate}"
              >
              </vaadin-date-picker>
            </div>

            <div class="info-design-container">
              <vaadin-text-field
                id="map-input"
                class="controls"
                type="text"
                label="#4 Location"
                placeholder="Place | City | Country"
                data-property_name="posterLocation"
                value="${this.posterLocation}"
                @input="${this.onInputChange}"
              >
              </vaadin-text-field>
            </div>

            <div class="info-design-container">
              <vaadin-text-field
                id="posterSubtitle"
                class="controls"
                type="text"
                label="# [Subtitle ]"
                placeholder="posterSubtitle"
                data-property_name="posterSubtitle"
                @input="${this.onInputChange}"
                value="${this.posterSubtitle}"
                disabled
              >
              </vaadin-text-field>
            </div>
          </div>
          <div class="admin-poster-layout--block--right">
            <div class="info-design-container">

             <vaadin-radio-group
                label="#5 Poster Size"
                required
                error-message="Please select poster size"

              >
                ${posterSizes.map(
                  size => html`
                    <vaadin-radio-button
                      id="radio--${size.id}"
                      value="${size.id}"
                      name="size-${size.id}"
                      data-property_name="posterSize"
                      ?checked=${size.id === this.posterSize}
                      @click="${this.onInputChange}"
                    >
                      ${size.title}
                    </vaadin-radio-button>
                  `,
                )}

              </vaadin-radio-group>


               <button class="snipcart-add-item"
                data-item-id="starry-night"
                data-item-price="79.99"
                data-item-url='${this.url}'
                data-item-description="High-quality replica of The Starry Night by the Dutch post-impressionist painter Vincent van Gogh."
                data-item-image="/assets/images/starry-night.jpg"
                data-item-name="The Starry Night">
                Add to cart
              </button>



            </div>
          </div>
        </div>
      </div>
    `;
  }
  // This example adds a search box to a map, using the Google Place Autocomplete
  // feature. People can enter geographical searches. The search box will return a
  // pick list containing a mix of places and predicted search terms.

  // This example requires the Places library. Include the libraries=places
  // parameter when you first load the API. For example:
  // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

  initAutocomplete(google) {
    const input = this.googleMapDomInput;
    const searchBox = new google.maps.places.SearchBox(input);
    searchBox.addListener('places_changed', () => {
      this.places = searchBox.getPlaces();
      if (this.places.length === 0) {
        return;
      }
      this.posterLocation = this.places[0].formatted_address;

      const latitudeNorthSouthSign = this.places[0].geometry.location.lat() > 0 ? 'N' : 'S';
      const longitudeEastWestSign = this.places[0].geometry.location.lng() > 0 ? 'E' : 'W';

      const latitude =
        this.places[0].geometry.location.lat() > 0
          ? this.places[0].geometry.location.lat().toFixed(5)
          : this.places[0].geometry.location.lat().toFixed(5) * -1;
      const longitude =
        this.places[0].geometry.location.lng() > 0
          ? this.places[0].geometry.location.lng().toFixed(5)
          : this.places[0].geometry.location.lng().toFixed(5) * -1;

      const coordinates = `${latitude}°${latitudeNorthSouthSign}, ${longitude}°${longitudeEastWestSign}`;
      this.setAttribute('posterCoordinates', coordinates);
    });
  }
}
window.customElements.define('poster-form-element', PosterFormElement);
