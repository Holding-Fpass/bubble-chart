import { hideTooltip } from "./bubble-chart-tooltip";

export var states =
{
    CONTENT_TYPE: "content_type",
    HASH_TAG: "hash_tag",
    HASH_TAG_DETAILS: "hash_tag_details",
    TOOLTIP: "tooltip"
};

export function setState(newState)
{
    state = newState;
    window.state = state;

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

export var state = states.CONTENT_TYPE;

window.state = state;