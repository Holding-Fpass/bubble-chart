import { hideTooltip, showTooltip } from './bubble-chart-tooltip'
import * as data from './bubble-chart-data'
import { timeConvert } from './utils/timeConvert'

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


        // if (d.data.durationTotal)
        // {
        //     return "node--parent--leaf--hidden";
        // }
        // else
        // {
        //     return "node--parent--nodata";
        // }
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
    //return radius + (node.durationTotal - node.timeWatched);
    //(node.timeWatched / node.durationTotal) * 100
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

            // debugger;
            var completed = (node.timeWatched / node.durationTotal) * 100

            // dashed parent line
            //parentElement.style.r = getTotalLineRadius(node, nodeElement);

            nodeElement.style.fill = getCircleBackgroundColor(completed, options, true);



            for (var iii = 0; iii < node.children.length; iii++) // wrapper
            {
                var leafParent = node.children[iii];
                var leafParentElement = document.getElementById(leafParent.id);
                //var leafParentElement = document.getElementById(leafParent.id.replace("w_", ""));


                for (var iiii = 0; iiii < leafParent.children.length; iiii++) // node
                {
                    var leaf = leafParent.children[iiii];
                    var leafElement = document.getElementById(leaf.id);
                    var labelElement = document.getElementById("l_" + leaf.id);

                    var leafCompleted = (leafParent.timeWatched / leafParent.durationTotal) * 100

                    //   leafParentElement.style.r = getTotalLineRadius(leaf, leafParentElement);
                    //  leafParentElement.style.pointerEvents = "visiblePainted";

                    //leafElement.style.fill = getCircleBackgroundColor(leafCompleted, options, false);

                    if (leafElement.style.fill == "red")
                    {
                        var a = 0;
                    }

                    if (leafElement)
                    {
                        (function ()
                        {
                            var name = leaf.name;
                            var timeWatched = timeConvert(leaf.timeWatched)
                            var timeLeft = timeConvert(leaf.durationTotal - leaf.timeWatched)
                            
                            leafElement.addEventListener('mouseover', () => showTooltip(name, timeWatched.hoursText, timeWatched.minutesText, timeLeft.hoursText, timeLeft.minutesText));
                        }());
                    }

                }

            }
        }
    }
}