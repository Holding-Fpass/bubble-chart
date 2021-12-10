/* eslint-disable no-sequences */
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import BubbleChartOptions from './bubble-chart-options';
import { init, zoom, focus } from './bubble-chart-d3'
import { state, states, setState } from './bubble-chart-states'
import * as data from './bubble-chart-data'
import * as presenter from './bubble-chart-presenter'
import * as events from './bubble-chart-events'

var that;
var selectedHashtagId;

export default class BubbleChart extends Component
{
  constructor()
  {
    super();
    window.bubbleChart = this;


  }

  componentDidMount()
  {
    if (this.props && this.props.options && this.props.data)
    {
      this.load(this.props.options, this.props.data);
    }
  }

  render()
  {
    return React.createElement('svg',
      {
        width: this.props.width,
        height: this.props.height,
        className: "udiurYssf"
      },
      null);
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

  zoomOut()
  {
    this.deselectHashtag();
    setState(states.CONTENT_TYPE);
    zoom(window.root);
  }


  onClick(e, d)
  {
    e.stopPropagation();
    // debugger;
    // console.log("onclick " + d.data.name);



    if (state == states.CONTENT_TYPE)
    {
      // console.log("contentclick " + data.name);

      var data = null;
      var obj = null;

      if (d.data.type == "content_type")
      {
        // debugger;
        data = d.data;
        obj = d;
      }
      else
      {
        data = d.data.parent;
        obj = d.parent;
      }

      if (data == null)
      {
        return;
      }


      zoom(obj, () =>
      {
        //debugger;

        setState(states.HASH_TAG);

        events.onContentClick(data);

      });
    }
    else if (state == states.HASH_TAG)
    {

      if (d.data.type && d.data.type.includes("hash_tag"))
      {
        that.selectHashtag(d.data.id.replace("l_", "").replace("w_", ""));

        events.onHashtagClick(d.data);

      }
      // console.log("hashtagclick " + d.data.name);

      //setState(states.CONTENT_TYPE);
    }
  }

  selectHashtag(id)
  {
    this.deselectHashtag();

    selectedHashtagId = id;

    this.changeHashtagClasses(selectedHashtagId, "label--selected", "node--leaf--selected", "node--parent--leaf--selected");
  }

  deselectHashtag()
  {
    if (!selectedHashtagId)
    {
      return;
    }

    this.changeHashtagClasses(selectedHashtagId, "label", "node--leaf", "node--parent--leaf");

    selectedHashtagId = null;
  }

  changeHashtagClasses(id, labelClass, circleClass, lineClass)
  {
    document.getElementById("l_w_" + id).setAttribute("class", labelClass);
    document.getElementById("w_" + id).setAttribute("class", lineClass);
    document.getElementById(id).setAttribute("class", circleClass);
  }

  onClick4(e, d)
  {
    //debugger;
    if (focus !== d)
    {
      e.stopPropagation();

      if (d.data && d.data.type == states.CONTENT_TYPE)
      {
        zoom(d, () =>
        {
          setState(states.HASH_TAG);

          events.onContentClick(d.data);

        });
      }
      else if (d.data && d.data.type == states.HASH_TAG)
      {
        events.onHashtagClick(d.data);

        setState(states.CONTENT_TYPE);
        // zoom(d, () => setState(states.HASH_TAG_DETAILS));

        // if (window.state == states.HASH_TAG)
        // {




        ////setState(states.CONTENT_TYPE);


        // }
        // else
        // {
        //   zoom(d, () => setState(states.HASH_TAG));
        // }
      }
      // else if (d.data && d.data.type == states.HASH_TAG_DETAILS)
      // {
      //   zoom(d, () => setState(states.HASH_TAG));
      // }
      else
      {
        debugger;
        setState(states.CONTENT_TYPE);
      }
    }
  }
}