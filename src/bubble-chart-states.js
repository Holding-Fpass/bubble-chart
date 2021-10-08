import { hideTooltip } from "./bubble-chart-tooltip";

export var state;

export var states =
{
    CONTENT_TYPE: "content_type",
    HASH_TAG: "hash_tag",
    TOOLTIP: "tooltip"
};

export function setState(newState)
{
    state = newState;

    switch (state)
    {
        case states.CONTENT_TYPE:
            hideTooltip();

            var els = document.getElementsByClassName("node--parent--leaf");

            Array.from(els).forEach((el) =>
            {
                el.setAttribute("class", "node--parent--leaf--hidden");
            });
            break;
        case states.HASH_TAG:
            var els = document.getElementsByClassName("node--parent--leaf--hidden");

            Array.from(els).forEach((el) =>
            {
                el.setAttribute("class", "node--parent--leaf");
            });

            break;
        case states.TOOLTIP:

            break;
    }
}