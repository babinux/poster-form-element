import {
  html,
  css,
  LitElement
} from 'lit-element';

// Style Import : Main/Current Component Style
import componentStyle from './style.scss';


import 'poster-design-element';
import '@vaadin/vaadin-date-picker';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-radio-button';



// NOT SURE I NEED THAT ============================


// List : All the designs for Poster
const posterDesigns = ['', 'cosmic-latte', 'deep-space-blue', 'navy', 'cosmic-love', 'blackhole', 'supernova'];

// Settings : color of the planets orbits based on the poster's background
const posterDarkOrbits = ['2', '4'];


// NOT SURE I NEED THAT ============================

// Settings : Human readable date
const posterDateSettings = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

// Getter: URL and Params for use later
const url = new URL(document.location);
const posterParams = new URLSearchParams(url.search);



export class PosterFormElement extends LitElement {
  static get styles() {
    return [componentStyle];
  }


  static get properties() {
    return {
      posterDesign: {
        type: String,
        reflect: true
      },
      posterDate: {
        type: Object,
        reflect: true
        // ,
        // converter(value) {
        //   return new Date(value);
        // }
      },
      posterFormatedDate: {
        type: String,
        // reflect: true,
        // converter() {
        //   return new Date(this.posterDate).toLocaleDateString('en-EN', posterDateSettings);
        // }
      },
      posterPrint: {
        type: String,
        reflect: true
      },
      posterTitle: {
        type: String,
        reflect: true
      },
      posterSubtitle: {
        type: String,
        reflect: true
      },
      posterCoordinates: {
        type: String,
        reflect: true
      },
      posterLocation: {
        type: String,
        reflect: true
      }
      // ,
      // color: {
      //   type: String,
      //   reflect: true
      // }
    };
  }

  constructor() {
    super();
    // this.title = 'Hey there';
    // this.posterTitle = "yo man";
    this.updatePropsFromUrl();

    this.counter = 5;
  }

  firstUpdated() {
// const floatingLabel = new MDCFloatingLabel(this.shadowRoot.querySelector('.mdc-floating-label'));
// const lineRipple = new MDCLineRipple(this.shadowRoot.querySelector('.mdc-line-ripple'));
// const textField = new MDCTextField(this.shadowRoot.querySelector('.mdc-text-field'));

    this.updateUrlFromProps();
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    // this.color = attr === "posterDesign" ? posterDarkOrbits.includes(this.posterDesign) ? 'black' : 'white' : false;
    console.log('======');

    console.log(attr);
    console.log(this.color);
    if (attr === "posterdesign") {
      this.color = posterDarkOrbits.includes(this.posterDesign) ? 'black' : 'white';
      console.log(this.color);
    }
    super.attributeChangedCallback(attr, oldVal, newVal);
    // this.updateUrlFromProps();
  }

  updatePropsFromUrl() {
    this.posterPrint = posterParams.has("posterPrint") && posterParams.get("posterPrint") > 0 ? 1 : 0;
    this.posterTitle = posterParams.has("posterTitle") ? posterParams.get("posterTitle") : 'Name Of Someone You Love';
    this.posterSubtitle = posterParams.has("posterSubtitle") ? posterParams.get("posterSubtitle") : '';
    this.posterLocation = posterParams.has("posterLocation") ? posterParams.get("posterLocation") : 'Amazing Place, World Country';
    this.posterCoordinates = posterParams.has("posterCoordinates") ? posterParams.get("posterCoordinates") : '00.00000°N -000.00000°W';
    this.posterDesign = posterParams.has("posterDesign") ? posterParams.get("posterDesign") : '1';
    this.color = posterParams.has("color") ? posterParams.get("color") : posterDarkOrbits.includes(this.posterDesign) ? 'black' : 'white';
    this.posterDate = posterParams.has("posterDate") ? new Date(isNaN(posterParams.get("posterDate")) ? posterParams.get("posterDate") : new Date()) : new Date();
    this.posterFormatedDate = this.posterDate;
  }

  updateUrlFromProps() {
    // posterParams.set("color", this.color);
    posterParams.set("posterPrint", this.posterPrint);
    posterParams.set("posterDesign", this.posterDesign);
    posterParams.set("posterDate", `${this.posterDate.getFullYear()}-${this.posterDate.toLocaleString('default', { month: 'short' })}-${this.posterDate.getDate()}`);
    posterParams.set("posterTitle", this.posterTitle);
    // posterParams.set("posterSubtitle", this.posterSubtitle);
    posterParams.set("posterLocation", this.posterLocation);
    posterParams.set("posterCoordinates", this.posterCoordinates);

    window.history.replaceState({}, "Updating poster Design", `?${posterParams.toString()}`)
  }

  onInputChange(event) {
    let input = event.target || event.srcElement;
    console.log(input);
    // console.log(caller.name);
    // console.log(caller.id);
    console.log(input.getAttribute('data-property-name'));
    console.log(input.value);

  

    if (input.getAttribute('data-property-name') === "posterDate") {
      console.log(input.getAttribute('data-property-name'));
      console.log("+-----+");

      this[input.getAttribute('data-property-name')] = new Date(input.value);
      console.log(this[input.getAttribute('data-property-name')]);
      console.log(this.posterDate);
      console.log("+++++");

      console.log(this.posterFormatedDate);



      this.posterFormatedDate = this.posterDate;
      console.log(this.posterFormatedDate);


    } else {
      this[input.getAttribute('data-property-name')] = input.value;
    }
  }

  // get inputEl() {
  //   return this.shadowRoot.getElementById('name');
  // }

  render() {
    return html `

  <style>
  #mygrid{
    display:flex;
    /* flex-direction: row-reverse; */
  }
  form{
    max-width:300px;
  }
  poster-design-element{
    max-width: 400px;
    max-height: 600px;

    order: 2;
    margin-left: 20px;
  }
  </style>

<div id="mygrid">



  <poster-design-element postertitle="${this.posterTitle}" postersubtitle="${this.posterSubtitle}"
    posterlocation="${this.posterLocation}" postercoordinates="${this.posterCoordinates}"
    posterdesign="${this.posterDesign}" color="${this.color}" posterdate="${this.posterDate}"
    posterformateddate="${this.posterFormatedDate}">
  </poster-design-element>


  <form id="Form-Design-Settings" name="wf-form-Settings" data-property-name="Settings" method="get" class="form">
    <div class="info-design-container">
      <label for="mySubtitle" class="">
        #1 Select Your Design
      </label>

      <div class="div-block-53">
        <div class="map-design-selector">

          <vaadin-radio-group label="Poster Design" >
            <vaadin-radio-button id="radio--cosmic-latte" value="1" data-property-name="posterDesign" @change="${this.onInputChange}" >Cosmic Latte</vaadin-radio-button>
            <vaadin-radio-button id="radio--deep-space-blue" value="2" data-property-name="posterDesign" @input="${this.onInputChange}">Deep Space Blue</vaadin-radio-button>
            <vaadin-radio-button id="radio--navy" value="3" data-property-name="posterDesign" @input="${this.onInputChange}" >Navy</vaadin-radio-button>
            <vaadin-radio-button id="radio--cosmic-love" value="4" data-property-name="posterDesign" @input="${this.onInputChange}" >Cosmic Love</vaadin-radio-button>
            <vaadin-radio-button id="radio--blackhole" value="5" data-property-name="posterDesign" @input="${this.onInputChange}" >Blackhole</vaadin-radio-button>
            <vaadin-radio-button id="radio--supernova" value="6" data-property-name="posterDesign" @input="${this.onInputChange}" >Supernova</vaadin-radio-button>
          </vaadin-radio-group>

          <br><hr>

          <label class="theme-selection-radio w-radio">
            <input type="radio" id="cosmic-latte" 
            value="1" 
            @input="${this.onInputChange}" 
            name="Design"
              data-property-name="posterDesign" class="design-radio-button w-radio-input" />
            <span for="cosmic-latte" id="select-cosmic-latte"
              class="design-radio-label radio-label-image-cosmic-latte w-form-label">
              <span class="design-radio-label-text">
                Cosmic Latte
              </span>
            </span>
          </label>


          <label class="theme-selection-radio w-radio">
            <!-- <input type="radio" id="deep-space-blue" name="Design" value="deep-space-blue"
                data-property-name="Design" class="design-radio-button w-radio-input" /> -->
            <input type="radio" id="deep-space-blue" value="2" @input="${this.onInputChange}" name="Design"
              data-property-name="posterDesign" class="design-radio-button w-radio-input" />
            <span for="deep-space-blue" id="select-deep-space-blue"
              class="design-radio-label radio-label-image-deep-space-blue w-form-label">
              <span class="design-radio-label-text">
                Deep Space Blue
              </span>
            </span>
          </label>


          <label class="theme-selection-radio w-radio">
            <input type="radio" id="navy" value="3" @input="${this.onInputChange}" name="Design"
              data-property-name="posterDesign" class="design-radio-button w-radio-input" /><span for="navy"
              id="select-navy" class="design-radio-label radio-label-image-navy w-form-label"><span
                class="design-radio-label-text">
                Navy
              </span>
            </span>
          </label>



          <label class="theme-selection-radio w-radio">
            <input type="radio" id="cosmic-love" value="4" @input="${this.onInputChange}" name="Design"
              data-property-name="posterDesign" class="design-radio-button w-radio-input" /><span for="cosmic-love"
              id="select-cosmic-love" class="design-radio-label radio-label-image-cosmic-love w-form-label"><span
                class="design-radio-label-text">
                Cosmic Love
              </span></span>
          </label>


          <label class="theme-selection-radio w-radio">
            <input type="radio" id="blackhole" value="5" @input="${this.onInputChange}" name="Design"
              data-property-name="posterDesign" class="design-radio-button w-radio-input" /><span for="blackhole"
              id="select-blackhole" class="design-radio-label radio-label-image-blackhole w-form-label"><span
                class="design-radio-label-text">Blackhole</span></span>
          </label>


          <label class="theme-selection-radio w-radio">
            <input type="radio" id="supernova" name="Design" value="6" @input="${this.onInputChange}" name="Design"
              data-property-name="posterDesign" class="design-radio-button w-radio-input" />
              <span for="supernova"
              id="select-supernova" class="design-radio-label radio-label-image-supernova w-form-label">
              <span
                class="design-radio-label-text">Supernova</span></span>
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

      <input value="${this.posterLocation}" @input="${this.onInputChange}" type="text" class="" name="posterLocation"
        data-property-name="posterLocation" placeholder="Choose Location" id="posterLocation" required="" /> -->


        <vaadin-text-field @input="${this.onInputChange}" label="#2 Location"
          value="${this.posterLocation}" data-property-name="posterLocation"
          placeholder="Location">
        </vaadin-text-field>

    </div>
    <div class="info-design-container">

      <vaadin-date-picker @change="${this.onInputChange}" data-property-name="posterDate" label="#3 Date"
        placeholder="Pick a date" value="${this.posterDate}">
      </vaadin-date-picker>


      <!-- 
        <div class="div-block-47"><select id="Day" name="Day" data-property-name="Day" required=""
            class="field-day app-menu-text-field w-select">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
            <option value="31">31</option>
          </select><select id="Month" name="Month" data-property-name="Month" required=""
            class="app-menu-text-field field-month w-select">
            <option value="0">January</option>
            <option value="1">February</option>
            <option value="2">March</option>
            <option value="3">April</option>
            <option value="4">May</option>
            <option value="5">June</option>
            <option value="6">July</option>
            <option value="7">August</option>
            <option value="8">September</option>
            <option value="9">October</option>
            <option value="10">November</option>
            <option value="11">December</option>
          </select><select id="Year" name="Year" data-property-name="Year" required=""
            class="field-year app-menu-text-field w-select">
            <option value="1970">1970</option>
            <option value="1971">1971</option>
            <option value="1972">1972</option>
            <option value="1973">1973</option>
            <option value="1974">1974</option>
            <option value="1975">1975</option>
            <option value="1976">1976</option>
            <option value="1977">1977</option>
            <option value="1978">1978</option>
            <option value="1979">1979</option>
            <option value="1980">1980</option>
            <option value="1981">1981</option>
            <option value="1982">1982</option>
            <option value="1983">1983</option>
            <option value="1984">1984</option>
            <option value="1985">1985</option>
            <option value="1986">1986</option>
            <option value="1987">1987</option>
            <option value="1988">1988</option>
            <option value="1989">1989</option>
            <option value="1990">1990</option>
            <option value="1991">1991</option>
            <option value="1992">1992</option>
            <option value="1993">1993</option>
            <option value="1994">1994</option>
            <option value="1995">1995</option>
            <option value="1996">1996</option>
            <option value="1997">1997</option>
            <option value="1998">1998</option>
            <option value="1999">1999</option>
            <option value="2001">2000</option>
            <option value="2001">2001</option>
            <option value="2002">2002</option>
            <option value="2003">2003</option>
            <option value="2004">2004</option>
            <option value="2005">2005</option>
            <option value="2006">2006</option>
            <option value="2007">2007</option>
            <option value="2008">2008</option>
            <option value="2009">2009</option>
            <option value="2010">2010</option>
            <option value="2011">2011</option>
            <option value="2012">2012</option>
            <option value="2013">2013</option>
            <option value="2014">2014</option>
            <option value="2015">2015</option>
            <option value="2016">2016</option>
            <option value="2017">2017</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select></div>
      </div> -->


    </div>




    <div class="info-design-container">
      <div class="map-text-design">

        <!-- <label for="posterTitle" class="">
          #4
          Customize the text of your moment
        </label> -->




        <!-- <input id="posterTitle" value="${this.posterTitle}" @input="${this.onInputChange}" type="text" name="posterTitle" data-property-name="posterTitle"
          placeholder="Names, Special Moment or Occasion ..." id="Title" required="true"  /> -->

        <vaadin-text-field @input="${this.onInputChange}" label="#4 Customize the text of your moment"
          value="${this.posterTitle}" data-property-name="posterTitle"
          placeholder="Names, Special Moment or Occasion ...">
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
            <input type="radio" id="size-9x12-US" name="Size" value="size-9x12-US" data-property-name="Size" required=""
              class="size-radio-select w-radio-input" /><span for="size-9x12-US"
              class="size-radio-button-label label-8x10 w-form-label">9&quot; x
              12&quot;<br /></span>
          </label>


          <label data-size="12x16" class="size-selection-radio w-radio">
            <input type="radio" id="size-12x16-US" name="Size" value="size-12x16-US" data-property-name="Size"
              required="" class="size-radio-select w-radio-input" /><span for="size-12x16-US"
              class="size-radio-button-label label-12x16 w-form-label">12&quot; x
              16&quot;<br /></span>
          </label>


          <label data-size="18x24" class="size-selection-radio w-radio">
            <input type="radio" id="size-18x24-US" name="Size" value="size-18x24-US" data-property-name="Size"
              class="size-radio-select w-radio-input" /><span for="size-18x24-US"
              class="size-radio-button-label label-18x24 w-form-label">18&quot; x
              24&quot;<br /></span>
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
