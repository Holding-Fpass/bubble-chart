import React from 'react';
import ReactDOM from 'react-dom';
import BubbleChart from '.'
import object from './data.json'
import './bubble-chart.css';

var options = {
  content: {
    inProgressBackgroundColor: "#fd89da",
    completedBackgroundColor: "#6d41ff"
  },
  contentType: {
    fontSize: "11px",
    strokeColor: "white",
  },
  hashTag: {
    fontSize: "11px",
    strokeColor: "white",
  }
};


var chart = <BubbleChart
  width="860"
  height="860"
/>

var element = ReactDOM.render(chart, document.getElementById('root'));



// future
window.setTimeout(function () { element.load(options, object) }, 2000);
