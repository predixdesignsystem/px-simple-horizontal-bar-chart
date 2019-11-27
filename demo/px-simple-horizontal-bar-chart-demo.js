/*
Copyright (c) 2018, General Electric

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/* Common imports */
/* Common demo imports */
/* Imports for this component */
/* Demo DOM module */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import 'px-demo/px-demo-header.js';
import 'px-demo/px-demo-api-viewer.js';
import 'px-demo/px-demo-footer.js';
import 'px-demo/px-demo-configs.js';
import 'px-demo/px-demo-props.js';
import 'px-demo/px-demo-interactive.js';
import 'px-demo/px-demo-code-editor.js';
import 'px-demo/px-demo-component-snippet.js';
import '../px-simple-horizontal-bar-chart.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
    <!-- Header -->
    <px-demo-header module-name="px-simple-horizontal-bar-chart" description="The Simple Horizontal Bar Chart provides a quick way to visualize data in bars.
      Each series is represented by a sequence of verically aligned bars, the length of
      each proportionally representing a value.
      It uses the data visualization color palette by default, but this can be overridden with configuration. The height and
      width are configurable, as are the legend labels – if none are provided, the legend will not be shown.
      We recommend using the default settings as they are designed for proper performance." mobile="" tablet="" desktop="">
    </px-demo-header>

    <!-- Interactive -->
    <px-demo-interactive>
      <!-- Configs -->
      <px-demo-configs slot="px-demo-configs" configs="[[configs]]" props="{{props}}" chosen-config="{{chosenConfig}}"></px-demo-configs>

      <!-- Props -->
      <px-demo-props slot="px-demo-props" props="{{props}}" config="[[chosenConfig]]"></px-demo-props>

      <!-- Code Editor -->
      <px-demo-code-editor slot="px-demo-code-editor" props="{{props}}"></px-demo-code-editor>

      <!-- Component ---------------------------------------------------------->
      <px-demo-component slot="px-demo-component">
        <px-simple-horizontal-bar-chart chart-data="{{props.chartData.value}}" width="{{props.width.value}}" height="{{props.height.value}}" bar-labels="{{props.barLabels.value}}" legend-labels="{{props.legendLabels.value}}">
        </px-simple-horizontal-bar-chart>
      </px-demo-component>
      <!-- END Component ------------------------------------------------------>

      <px-demo-component-snippet slot="px-demo-component-snippet" element-properties="{{props}}" element-name="px-simple-horizontal-bar-chart" scripts-includes="[[scriptsIncludes]]">
      </px-demo-component-snippet>
    </px-demo-interactive>

    <!-- API Viewer -->
    <px-demo-api-viewer source="px-simple-horizontal-bar-chart"></px-demo-api-viewer>

    <!-- Footer -->
    <px-demo-footer></px-demo-footer>
`,

  is: 'px-simple-horizontal-bar-chart-demo',

  properties: {

    props: {
      type: Object,
      value: function(){ return this.demoProps; }
    },

    scriptsIncludes: {
      type: Array,
      value: function(){ return ['https://d3js.org/d3.v3.min.js']; }
    },

    configs: {
      type: Array,
      value: function(){
        return [
          { configName: "Option 1",
            configReset: true },

          { configName: "Option 2",
            width: "450",
            height: "250",
            legendLabels: ["Alpha","Beta","Charlie","Delta","Echo","Foxtrot","Golf","Hotel","India","Juliet","Kilo","Lima"],
            barLabels: 'values',
            chartData: [88,7,54,33,12,75,99] },

          { configName: "Option 3",
            width: "550",
            height: "200",
            legendLabels: ["Apples","Oranges","Peaches"],
            barLabels: 'percentage',
            chartData: [2,8,5] }
        ]
      }
    }
  },

  demoProps: {

    width: {
      type: String,
      defaultValue: 'auto',
      inputType: 'text'
    },

    height: {
      type: String,
      defaultValue: 'auto',
      inputType: 'text'
    },

    barLabels: {
      type: String,
      defaultValue: 'percentage',
      inputType: 'dropdown',
      inputChoices: ['percentage', 'values']
    },

    legendLabels: {
      type: Array,
      defaultValue: ["Bar One","Bar Two","Bar Three","Bar Four","Bar Five","Bar Six"],
      inputType: 'code:JSON'
    },

    chartData: {
      type: Array,
      defaultValue: [29,20,15,18,8,10],
      inputType: 'code:JSON'
    }
  }
});
