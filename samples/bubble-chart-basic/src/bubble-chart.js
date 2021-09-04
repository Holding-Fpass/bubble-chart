/* eslint-disable no-sequences */
import React, { Component } from 'react';
import BubbleChartOptions from './bubble-chart-options';
import { init, zoom, focus } from './bubble-chart-d3'
import { state, states, setState } from './bubble-chart-states'
import * as data from './bubble-chart-data'
import * as presenter from './bubble-chart-presenter'

var that;

class BubbleChart extends Component
{
  componentDidMount()
  {
    that = this;

    this.options = new BubbleChartOptions(this.props.options);

    setState(states.CONTENT_TYPE);

    var object = data.prepare(this.props.data);

    init(that, object, this.onClick);

    presenter.present(object, this.options);
  }

  render()
  {
    return (
      <svg width={this.props.width} height={this.props.height}></svg>
    )
  }

  onClick(e, d)
  {

    if (focus !== d)
    {
      e.stopPropagation();

      if (d.data && d.data.type == "content_type")
      {
        zoom(d, () => setState(states.HASH_TAG));
      }
      else if (d.data && d.data.type == "hash_tag")
      {
        setState(states.CONTENT_TYPE);
      }
      else
      {
        setState(states.CONTENT_TYPE);
      }
    }
  }
}

export default BubbleChart;