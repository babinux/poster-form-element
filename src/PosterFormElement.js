import {
  html,
  css,
  LitElement
} from 'lit-element';

// Style Import : Main/Current Component Style
import componentStyle from './style.scss';

// Element Import : Planet Clock, required for poster design (style included)
import '../node_modules/planet-clock-element/index.js';

import '../node_modules/poster-design-element/index.js';



// NOT SURE I NEED THAT ============================


// List : All the designs for Poster
const posterDesigns = ['', 'cosmic-latte', 'deep-space-blue', 'navy', 'cosmic-love', 'blackhole', 'supernova'];

// Settings : color of the planets orbits based on the poster's background
const posterDarkOrbits = ['2', '4'];


// NOT SURE I NEED THAT ============================




export class PosterFormElement extends LitElement {
  static get styles() {
    return [componentStyle];
  }


  static get properties() {
    return {
      title: {
        type: String
      },
      counter: {
        type: Number
      },
    };
  }

  constructor() {
    super();
    this.title = 'Hey there';
    this.counter = 5;
  }

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

              <poster-design-element></poster-design-element>
  



  <form id="Form-Design-Settings" name="wf-form-Settings" data-name="Settings" method="get" class="form">
    <div class="info-design-container">
      <label for="mySubtitle" class="app-menu-label create-label"> 
        #1 Select Your Design
      </label>

      <div class="div-block-53">
        <div class="map-design-selector">

            <label class="theme-selection-radio w-radio">
              <input type="radio" id="cosmic-latte" name="Design" value="cosmic-latte" data-name="Design"
                  class="design-radio-button w-radio-input" />
                <span for="cosmic-latte" id="select-cosmic-latte" class="design-radio-label radio-label-image-cosmic-latte w-form-label">
                  <span class="design-radio-label-text">
                    Cosmic Latte
                  </span>
                </span>
            </label>


            <label class="theme-selection-radio w-radio">
              <input type="radio" id="deep-space-blue" name="Design" value="deep-space-blue"
                data-name="Design" class="design-radio-button w-radio-input" />
                <span for="deep-space-blue"	id="select-deep-space-blue" class="design-radio-label radio-label-image-deep-space-blue w-form-label">
                  <span class="design-radio-label-text">
                    Deep Space Blue
                  </span>
                </span>
            </label>


            <label class="theme-selection-radio w-radio">
              <input type="radio" id="navy" name="Design" value="navy" data-name="Design"
                class="design-radio-button w-radio-input" /><span for="navy" id="select-navy"
                class="design-radio-label radio-label-image-navy w-form-label"><span
                  class="design-radio-label-text">
                  Navy
                </span>
              </span>
            </label>

          

          <label class="theme-selection-radio w-radio">
            <input type="radio" id="cosmic-love" name="Design" value="cosmic-love" data-name="Design"
              class="design-radio-button w-radio-input" /><span for="cosmic-love" id="select-cosmic-love"
              class="design-radio-label radio-label-image-cosmic-love w-form-label"><span
                class="design-radio-label-text">
                Cosmic Love
              </span></span>
          </label>


          <label class="theme-selection-radio w-radio">
            <input type="radio" id="blackhole" name="Design" value="blackhole" data-name="Design"
              class="design-radio-button w-radio-input" /><span for="blackhole" id="select-blackhole"
              class="design-radio-label radio-label-image-blackhole w-form-label"><span
                class="design-radio-label-text">Blackhole</span></span>
          </label>


          <label class="theme-selection-radio w-radio">
            <input type="radio" id="supernova" name="Design" value="supernova" data-name="Design"
              class="design-radio-button w-radio-input" /><span for="supernova" id="select-supernova"
              class="design-radio-label radio-label-image-supernova w-form-label"><span
                class="design-radio-label-text">Supernova</span></span>
          </label>

        </div>
      </div>
    </div>
    <div class="info-design-container">


      <label for="mySubtitle" class="app-menu-label create-label">
        #2 Location
      </label>


      <label for="Location-3" class="app-menu-label sub-label">
        Location / Place / City
      </label>

      <input type="text" class="app-menu-text-field w-input" maxlength="256" name="Location" data-name="Location"
        placeholder="Choose Location" id="Location" required="" />
    </div>
    <div class="info-design-container">

      <label for="mySubtitle" class="app-menu-label create-label">
        
      #3 Date
      </label>

      <div class="div-block-42">

        <div class="div-block-47"><select id="Day" name="Day" data-name="Day" required=""
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
          </select><select id="Month" name="Month" data-name="Month" required=""
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
          </select><select id="Year" name="Year" data-name="Year" required=""
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
      </div>


    </div>
    <div class="info-design-container">
      <div class="map-text-design">

        <label for="mySubtitle" class="app-menu-label create-label">
          #4
          Customize the text of your moment
        </label>


        <label for="Title-3" class="app-menu-label">Name of the person,
          note or message
        </label>



        <input type="text" class="app-menu-text-field w-input" maxlength="256" name="Title" data-name="Title"
          placeholder="Names, Special Moment or Occasion ..." id="Title" required="" />

      </div>
    </div>
    <div class="info-design-container">

      <label for="mySubtitle" class="app-menu-label create-label">
        #5 Select Size
      </label>

      <div class="div-block-45">
        <div class="div-block-63">

          <label data-size="9x12" class="size-selection-radio w-radio">
            <input type="radio" id="size-9x12-US" name="Size" value="size-9x12-US" data-name="Size" required=""
              class="size-radio-select w-radio-input" /><span for="size-9x12-US"
              class="size-radio-button-label label-8x10 w-form-label">9&quot; x
              12&quot;<br /></span>
          </label>


          <label data-size="12x16" class="size-selection-radio w-radio">
            <input type="radio" id="size-12x16-US" name="Size" value="size-12x16-US" data-name="Size"
              required="" class="size-radio-select w-radio-input" /><span for="size-12x16-US"
              class="size-radio-button-label label-12x16 w-form-label">12&quot; x
              16&quot;<br /></span>
          </label>


          <label data-size="18x24" class="size-selection-radio w-radio">
            <input type="radio" id="size-18x24-US" name="Size" value="size-18x24-US" data-name="Size"
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
