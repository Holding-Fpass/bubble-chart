/* eslint-disable no-sequences */
import React, { Component } from 'react';
import BubbleChartOptions from './bubble-chart-options';
import { init, zoom, focus } from './bubble-chart-d3'
import { state, states, setState } from './bubble-chart-states'
import * as data from './bubble-chart-data'
import * as presenter from './bubble-chart-presenter'

var that;

export default class BubbleChart extends Component
{
  render()
  {
    return (
      <svg width={this.props.width} height={this.props.height}></svg>
    )
  }

  load(o, d)
  {
    that = this;

    this.options = new BubbleChartOptions(o);

    setState(states.CONTENT_TYPE);

    var object = data.prepare(d);

    init(that, object, this.onClick);

    presenter.present(object, this.options);
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