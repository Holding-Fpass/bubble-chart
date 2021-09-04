# Introduction 
This is a sample project show how to use Fpass Bubble Chart.

# Getting Started
1.	Installation process
- open bubble-chart-basic folder on Visual Studio Code
- Run **npm install** to install all dependecies

2.	Software dependencies
- npm ^6.13.4
- node ^v10.18.0
- react ^17.0.2
- [d3 ^7.0.1](https://d3js.org) 

3.	Build and Run
- npm start

# Fpass Bubble Chart sample files
The component code are grouped by bubble-chart*.js files with specific responsabilities:

### App.js
The standard React app function with chart sample initialization.
It uses the mock data.json to simulate the fpass learning analytics response.
The options sample has all supported properties defined;
The bubble-chart.css referenced will be replaced (in a future version) by dynamic css injection to give more control over the chart initialization

### bubble-chart.js
The React Component entry point.
It's methods are specfic for the component basic declaration and execution.
All imports referes all the helper chart files.

- props
**data**
The learning analytics objects containing all content data to display.

**options**
Contains all dynamic properties used to configure the chart for different projecs.

**width and height**
The desired dimensions for the SVG canvas where the chart will be rendered.

- componentDidMount
Holds all chart initialization code.

- render
Renders the basic SVG canvas for the chart.

- onClick
Is the handler for buble clicks.

### bubble-chart-options.js
It's the unique class beyond the component.
The BubbleChartOptions class is the place to validate and set default values for the component logic and presentation.
It can be improved in the future versions.

### bubble-chart-states.js
Holds all the state manipulation.

- states
Is an enumeration of all supported states.

**CONTENT_TYPE**
Active when the bubbles that represent content types are in focus.

**HASH_TAG**
Active when the bubbles that represent hashtags are in focus.

**TOOLTIP**
Active when the hashtag tooltip is visible.


- state
Holds the current state

- setState method
The the safest way to change the current state

### bubble-chart-data.js
Holds all the data manipulation methods.

- prepare
Transform the data received by the component to support the total dashed lines.
It adds properties to describe each object and change the tree structure to correctly chart rendering.

- wrapChildren
Create virtual parent nodes for node data. It is necessary to show the total dashed lines.

- isInRange
Checks if a value is within a range. Useful to have different visuals for presenting the bubbles.

- clone
Safelly clones a javascript object for manipulation without affecting the source object.


### bubble-chart-d3.js
The chart uses d3js to render the bubbles.
This file holds all d3 manipulation necessary to customize the chart for fpass requirements.

This file have local variables that are necessary to manipulate the chart across methods.

- init
Initialize the chart customizing it for fpass requirements.
At the end of this methods the chart is fullfiled and with the correct zoom.

- zoom
Has the soft transition logic between the states.

- zoomTo
Start the zoom transition for an specific view.


### bubble-chart-presenter.js
Is responsible for all the presentation values and logic for the chart.

- defaultHueSaturation
Is the default saturation applied to the chart elements

- getHueSaturation()
Returns the correct saturation for data nodes that has children or not.

- getCircleClass()
Returns the cicle correct class based on data type.

- getLabelFillOpacity()
Returns the label fill opacity.

- getLabelDisplay()
Returns de label display property.

- getLabelClass()
Returns the label class.

- getTotalLineRadius()
Returns the calculated radius for the total dashed line.

- getCircleBackgroundColor()
Return the circle background color based on the completed value.

- present()
Apply all the presentation logic for elements.


### bubble-chart-tooltip.js
Specific for the hashtag tooltip manipulation.

- showTooltip()
Create the tooltip dom element and change the chart state.

- hideTooltip()
Remove the tooltip dom element and change the chart state.

### bubble-chart.css
Contains all the static styles necessary for the chart.
It can be replaced for dynamic css generation ina future version.


