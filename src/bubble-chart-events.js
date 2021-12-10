export function onHashtagClick(data)
{
    if (window.bubbleChart.hashtagClick)
    {
        window.bubbleChart.hashtagClick(data);
    }
}

export function onContentClick(data)
{
    if (window.bubbleChart.contentClick)
    {
        window.bubbleChart.contentClick(data);
    }
}