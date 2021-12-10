import { hideTooltip, showTooltip } from './bubble-chart-tooltip'
import * as data from './bubble-chart-data'

export function getLabelFillOpacity(d)
{
    return d.parent === window.root ? 1 : 0;
}

export function getLabelDisplay(d)
{
    return d.parent === window.root ? "inline" : "none";
}

export function getLabelClass(d)
{
    return "label";
}

export var defaultHueSaturation = 'hsla(360, 100%, 100%, 0)';

export function getHueSaturation(d)
{
    return d.children ? defaultHueSaturation : null;
}

export function getCircleClass(d)
{
    if (d.data && d.data.type && d.data.type.startsWith("w_content_type"))
    {
        if (d.data)
        {
            return "node--parent";
        }
        else
        {
            return "node--parent--hidden";
        }
    }
    else if (d.data && d.data.type == "content_type")
    {
        return "node";
    }
    else if (d.data && d.data.type && d.data.type.startsWith("w_hash"))
    {

        if (d.data)
        {
            return "node--parent--leaf--hidden";
        }
        else
        {
            return "node--parent--nodata";
        }
    }
    else if (d.data && d.data.type && d.data.type.startsWith("hash_tag"))
    {
        return "node--leaf";
    }

    return "node--root";
}

function getTotalLineRadius(node, nodeElement)
{
    var radius = nodeElement.r.baseVal.value;

    return radius + ((node.timeWatched / node.durationTotal) * 100);
}

function getCircleBackgroundColor(completed, options, visible)
{
    if (!visible)
    {
        return "red";
    }

    switch (completed)
    {
        case data.isInRange(completed, 75, 99):
            return options.content.inProgressBackgroundColor;

        case data.isInRange(completed, 50, 75):
            return options.content.inProgressBackgroundColor;

        case data.isInRange(completed, 25, 50):
            return options.content.inProgressBackgroundColor;

        case data.isInRange(completed, 0, 25):
            return options.content.inProgressBackgroundColor;

        default:
            return options.content.completedBackgroundColor;

    }
}

export function present(object, options)
{
    for (var i = 0; i < object.children.length; i++) //wrapper
    {
        var parent = object.children[i];
        var parentElement = document.getElementById(parent.id);

        for (var ii = 0; ii < parent.children.length; ii++) // node
        {
            var node = parent.children[ii];
            var nodeElement = document.getElementById(node.id);

            var completed = (node.timeWatched / node.durationTotal) * 100

            nodeElement.style.fill = getCircleBackgroundColor(completed, options, true);
        }
    }
}