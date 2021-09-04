# Introduction 
This is a sample project show how to use Fpass Bubble Chart.
<br><br><br>

# Getting Started

1.	Dependencies

    - npm ^6.13.4
    - node ^v10.18.0
    - react ^17.0.2
    - [d3 ^7.0.1](https://d3js.org) 

    <br>

2.	Installation process

    - open **bubble-chart-basic folder** on Visual Studio Code
    - Run **npm install** to install all dependecies

    <br>

3.	Build and Run

    - npm start

<br>
<br>
<br>

# Fpass Bubble Chart sample files

The component code are grouped by bubble-chart*.js files with specific responsabilities.

<br>
<br>
<br>

## App.js

The standard React app function with chart sample initialization.
It uses the mock data.json to simulate the fpass learning analytics response.
The options sample has all supported properties defined;
The bubble-chart.css referenced will be replaced (in a future version) by dynamic css injection to give more control over the chart initialization

<br>
<br>
<br>

## bubble-chart.js


The React Component entry point.
It's methods are specfic for the component basic declaration and execution.
All imports referes all the helper chart files.

<br>
<br>

### Props

<br>

**data**

The learning analytics objects containing all content data to display.

<br>

**options**

Contains all dynamic properties used to configure the chart for different projecs.

<br>

**width and height**

The desired dimensions for the SVG canvas where the chart will be rendered.

<br>
<br>

### Methods

<br>

**componentDidMount()**

Holds all chart initialization code.

<br>

**render()**

Renders the basic SVG canvas for the chart.

<br>

**onClick()**

Is the handler for buble clicks.

<br>
<br>
<br>

## bubble-chart-options.js


It's the unique class beyond the component.
The BubbleChartOptions class is the place to validate and set default values for the component logic and presentation.
It can be improved in the future versions.

<br>
<br>
<br>

## bubble-chart-states.js


Holds all the state manipulation.

<br>
<br>

### Properties

<br>

**states**

Is an enumeration of all supported states.

<br>

> <br>
>
>**CONTENT_TYPE**
>
> Active when the bubbles that represent content types are in focus.
> 
> <br>
>
>**HASH_TAG**
>
>Active when the bubbles that represent hashtags are in focus.
>
><br>
>
>**TOOLTIP**
>
>Active when the hashtag tooltip is visible.
>
><br>

<br>

**state**

Holds the current state

<br>
<br>

### Methods

<br>

**setState()**

The the safest way to change the current state

<br>
<br>
<br>

## bubble-chart-data.js


Holds all the data manipulation methods.

<br>
<br>

### Methods

<br>

**prepare()**

Transform the data received by the component to support the total dashed lines.
It adds properties to describe each object and change the tree structure to correctly chart rendering.

<br>

**wrapChildren()**

Create virtual parent nodes for node data. It is necessary to show the total dashed lines.

<br>

**isInRange()**

Checks if a value is within a range. Useful to have different visuals for presenting the bubbles.

<br>

**clone()**

Safelly clones a javascript object for manipulation without affecting the source object.

<br>
<br>
<br>

## bubble-chart-d3.js


The chart uses d3js to render the bubbles.
This file holds all d3 manipulation necessary to customize the chart for fpass requirements.

This file have local variables that are necessary to manipulate the chart across methods.

<br>
<br>

### Methods

<br>

**init()**

Initialize the chart customizing it for fpass requirements.
At the end of this methods the chart is fullfiled and with the correct zoom.

<br>

**zoom()**

Has the soft transition logic between the states.

<br>

**zoomTo()**

Start the zoom transition for an specific view.

<br>
<br>
<br>

## bubble-chart-presenter.js


Is responsible for all the presentation values and logic for the chart.

<br>
<br>

### Properties

<br>

**defaultHueSaturation**

Is the default saturation applied to the chart elements

<br>
<br>

### Methods

<br>

**getHueSaturation()**

Returns the correct saturation for data nodes that has children or not.

<br>

**getCircleClass()**

Returns the cicle correct class based on data type.

<br>

**getLabelFillOpacity()**

Returns the label fill opacity.

<br>

**getLabelDisplay()**

Returns de label display property.

<br>

**getLabelClass()**

Returns the label class.

<br>

**getTotalLineRadius()**

Returns the calculated radius for the total dashed line.

<br>

**getCircleBackgroundColor()**

Return the circle background color based on the completed value.

<br>

**present()**

Apply all the presentation logic for elements.

<br>
<br>
<br>

## bubble-chart-tooltip.js


Specific for the hashtag tooltip manipulation.

<br>
<br>

### Methods

<br>

**showTooltip()**

Create the tooltip dom element and change the chart state.

<br>

**hideTooltip()**

Remove the tooltip dom element and change the chart state.

<br>
<br>
<br>

## bubble-chart.css


Contains all the static styles necessary for the chart.
It can be replaced for dynamic css generation ina future version.


<br>
<br>


