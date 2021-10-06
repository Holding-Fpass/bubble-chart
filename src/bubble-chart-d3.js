import * as d3 from "d3";
import { states, setState } from './bubble-chart-states'
import * as presenter from './bubble-chart-presenter'


export var focus;
var view;
var nodes;
var circle;
export var margin;
export var g;
var node;
var diameter;

export function init(that, object, onClick)
{
  var svg = d3.select("svg.udiurYssf");
  margin = 0;
  diameter = +svg.attr("width");
  g = svg.append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

  var pack = d3.pack()
    .size([diameter - margin, diameter - margin])
    .padding(2);

  window.root = d3.hierarchy(object)
    .sum(function (d) { return d.value; })

  focus = window.root;
  nodes = pack(window.root).descendants();
  // view;


  circle = g.selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("class", presenter.getCircleClass)
    .attr("id", function (d) { return d.data && d.data.id ? d.data.id : "" })
    .style("fill", presenter.getHueSaturation)

    // eslint-disable-next-line no-unused-expressions
    .on("click", onClick);


  // eslint-disable-next-line no-unused-vars
  var text = g.selectAll("text")
    .data(nodes)
    .enter()
    .append("text")
    .attr("class", presenter.getLabelClass)
    .style("fill-opacity", presenter.getLabelFillOpacity)
    .style("display", presenter.getLabelDisplay)
    .text(function (d) { return d.data.name; });

  node = g.selectAll("circle,text");

  svg
    .style("background", presenter.defaultHueSaturation)
    .on("click", function ()
    {
      setState(states.CONTENT_TYPE);

      zoom(window.root);
    });

  zoomTo([window.root.x, window.root.y, window.root.r * 2 + margin]);
}

export function zoom(d, callback)
{
  // eslint-disable-next-line no-unused-vars
  focus = d;

  var transition = d3.transition()
    .duration(false ? 7500 : 750)
    // .duration(d3.event.altKey ? 7500 : 750)
    .tween("zoom", function (d)
    {
      var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);

      return function (t) { zoomTo(i(t)); };
    });

  transition.selectAll("text")
    .filter(function (d) { return d.parent === focus || this.style.display === "inline"; })
    .style("fill-opacity", function (d) { return d.parent === focus ? 1 : 0; })
    .on("start", function (d) { if (d.parent === focus) this.style.display = "inline"; })
    .on("end", function (d)
    {
      if (d.parent !== focus)
      {
        this.style.display = "none";

        if (callback)
        {
          callback();
        }
      }
    });
}

export function zoomTo(v)
{
  var k = diameter / v[2];
  view = v;

  node.attr("transform", function (d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });

  circle.attr("r", function (d) { return d.r * k; });
}