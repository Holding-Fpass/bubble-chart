export function onHashtagClick(data)
{
    const event = new CustomEvent('bubble-chat.on-hash-tag-clicked', { detail: data })
    document.dispatchEvent(event)
}

export function onContentClick(data)
{
    const event = new CustomEvent('bubble-chat.on-content-clicked', { detail: data })
    document.dispatchEvent(event)
}