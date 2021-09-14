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
    if (d.data && d.data.type == "w_content_type")
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
    else if (d.data && d.data.type == "w_hash_tag")
    {
        if (d.data.durationTotal)
        {
            return "node--parent--leaf--hidden";
        }
        else
        {
            return "node--parent--nodata";
        }
    }
    else if (d.data && d.data.type == "hash_tag")
    {
        return "node--leaf";
    }

    return "node--root";
}

function getTotalLineRadius(node, nodeElement)
{
    var radius = nodeElement.r.baseVal.value;
    return radius + (node.durationTotal - node.timeWatched);
}

function getCircleBackgroundColor(completed, options)
{
    switch (true)
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
    for (var i = 0; i < object.children.length; i++)
    {
        var parent = object.children[i];
        var parentElement = document.getElementById(parent.id);

        for (var ii = 0; ii < parent.children.length; ii++)
        {
            var node = parent.children[ii];
            var nodeElement = document.getElementById(node.id);

            var completed = (node.timeWatched / node.durationTotal) * 100

            // dashed parent line
            parentElement.style.r = getTotalLineRadius(node, nodeElement);

            nodeElement.style.fill = getCircleBackgroundColor(completed, options);

            for (var iii = 0; iii < node.children.length; iii++)
            {
                var leaf = node.children[iii];
                var leafElement = document.getElementById(leaf.id.replace("w_", ""));

                if (leafElement)
                {
                    (function ()
                    {
                        var name = leaf.name;
                        var timeWatchedHours = Math.trunc(node.timeWatched / 60);
                        var timeWatchedMinutes = Math.trunc(node.timeWatched % 60);
                        var timeLeftHours = Math.trunc((node.durationTotal - node.timeWatched) / 60);
                        var timeLeftMinutes = Math.trunc((node.durationTotal - node.timeWatched) % 60);

                        leafElement.addEventListener('mouseover', () => showTooltip(name, timeWatchedHours, timeWatchedMinutes, timeLeftHours, timeLeftMinutes));
                        leafElement.addEventListener('mouseout', function () { hideTooltip(); });
                    }());
                }
            }
        }
    }
}