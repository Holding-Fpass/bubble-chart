export function isInRange(value, min, max)
{
    return value >= min && value <= max;
}

export function prepare(rawData, options)
{
    var root = clone(rawData);

    for (var i = 0; i < root.children.length; i++)
    {
        var content = root.children[i];

        adjustName(content);

        var clonedContent = clone(content);
        clonedContent.children = null;

        for (var ii = 0; ii < content.children.length; ii++)
        {
            var tag = content.children[ii];

            tag.parent = clonedContent;
        }

        wrapChildren(content, "hash_tag", i, 2, "w", true);
    }

    wrapChildren(root, "content_type", 0, 0, "w", false);

    return root;
}

function wrapChildren(item, type, index, level, prefix, twoSteps)
{

    item.level = 0;

    if (!item.children)
    {
        return;
    }

    for (var i = 0; i < item.children.length; i++)
    {
        var child = item.children[i];

        var wrapper = clone(child);
        wrapper.id = prefix + "_" + type + "_" + index + "_" + i;
        wrapper.type = prefix + "_" + type;
        wrapper.children = [child];
        wrapper.level = level + 1;

        child.id = type + "_" + index + "_" + + i;
        child.type = type;

        item.children[i] = wrapper;
    }
}

function adjustName(item)
{
    var originalName = item.name.trim();

    if (originalName.length < 3)
    {
        return;
    }

    var spaceIndex = originalName.indexOf(" ");

    if (spaceIndex == -1)
    {
        item.smallName = originalName.substring(0, 2);
    }
    else
    {
        item.smallName = originalName[0] + "" + originalName[spaceIndex + 1];
    }

    item.originalName = originalName;

    if (item.children && item.children.length > 0)
    {
        item.children.forEach(child =>
        {
            adjustName(child);
        });
    }
}

function adjustNamew(item)
{
    var originalName = item.name.trim();

    if (originalName.length < 3)
    {
        return;
    }

    var spaceIndex = originalName.indexOf(" ");

    if (spaceIndex == -1)
    {
        item.smallName = originalName.substring(0, 2);
    }
    else
    {
        item.smallName = originalName[0] + "" + originalName[spaceIndex + 1];
    }

    item.originalName = originalName;
}

function clone(object)
{
    return JSON.parse(JSON.stringify(object));
}