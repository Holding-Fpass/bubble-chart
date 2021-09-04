export function isInRange(value, min, max)
{
    return value >= min && value <= max;
}

export function prepare(rawData, options)
{
    var root = clone(rawData);

    for (var i = 0; i < root.children.length; i++)
    {
        var item = root.children[i];

        wrapChildren(item, "hash_tag", i);
    }

    wrapChildren(root, "content_type", 0);

    return root;
}

function clone(object)
{
    return JSON.parse(JSON.stringify(object));
}

function wrapChildren(item, type, index)
{
    if (!item.children)
    {
        return;
    }

    for (var i = 0; i < item.children.length; i++)
    {
        var child = item.children[i];

        var wrapper = clone(child);
        wrapper.id = "w_" + type + "_" + index + "_" + + i;
        wrapper.type = "w_" + type;
        wrapper.children = [child];

        child.id = type + "_" + index + "_" + + i;
        child.type = type;

        item.children[i] = wrapper;
    }
}