Px-Simple-Horizontal-Bar-Chart
-----------------------------------------------

## Overview

Px-Simple-Horizontal-Bar-Chart is a Predix Experience ('Px') component.

Use this component to visualize a series of numeric values as a horizontally-oriented bar chart. The series is represented by horizontally left-aligned rectangle bars, the width of each proportionally representing a value.

The bar colors and legend labels are configurable. The width and height of the component are also configurable. We recommend viewing the `demo.html` page to become aware of the configuration possibilities. We also recommend using the default settings as they are designed for proper performance.

## Getting Started

From the component's directory...

```
$ npm install
$ bower install
$ grunt sass
```

### API and examples

From the component's directory run:

```
$ grunt depserve
```

Starts a local server. Navigate to the root of that server (e.g. http://localhost:8082/) in a browser to open the API documentation page, with link to the "Demo" / working examples.

### Local Development

Local development is enabled by running `grunt devmode` (see below)

### LiveReload

By default grunt watch is configured to enable LiveReload and will be watching for modifications in your root directory as well as `/css`.

Your browser will also need to have the LiveReload extension installed and enabled. For instructions on how to do this please refer to: [livereload.com/extensions/](http://livereload.com/extensions/).

This is an example watch configuration:

```javascript
watch: {
    sass: {
        files: ['sass/**/*.scss'],
        tasks: ['sass', 'autoprefixer'],
        options: {
            interrupt: true,
            livereload: true
        }
    },
    htmljs: {
        files: ['*.html', '*.js'],
        options: {
            interrupt: true,
            livereload: true
        }
    }
},
```

Disable LiveReload by removing the `livereload` key from the configuration object or explicitly setting it to false.

### DevMode

From the component's directory run:

```
$ grunt devmode
```

Starts a local server exactly the same as if you had run `grunt depserve` however in addition it also runs `grunt watch` concurrently which will execute commands on file change according to the specified matching patterns.

This is an example `grunt watch` configuration which watches for changes to SASS files, then on changes executes SASS compilation and automatic prefixing:

```javascript
watch: {
    sass: {
        files: ['sass/**/*.scss'],
        tasks: ['sass', 'autoprefixer'],
        options: {
            interrupt: true
        }
    }
}
```

**We hope `grunt devmode` puts your development into *#beastmode*.**

<img src="http://imgc.allpostersimages.com/images/P-488-488-90/71/7108/JJUV100Z/posters/teen-wolf-beast-mode.jpg" alt="Slam Dunks for Days" width=
"250" />

### Options

Options are passed into the component as attributes on the element tag.

##### chart-data

Send your data to the component via the `chart-data` attribute which defines the series data to be charted. It needs to be passed in as a multi-dimensional array containing one or more arrays of numeric values.

```html
<px-simple-horizontal-bar-chart
    chart-data="[1,2,3]">
</px-simple-horizontal-bar-chart>
```

##### width and height

Set the `width` and `height` attributes to define the target pixel width and height of the chart component. The default settings are 283 by 150.

```html
<px-simple-horizontal-bar-chart
    ...
    width="370"
    height="230">
</px-simple-horizontal-bar-chart>
```

###### Automatic width and height for responsive layouts

Set the `width` and `height` attributes to "auto" and the chart will expand to fill it's containing element. *Note: The parent containing element must be a block-level element or have a defined width/height so that the component can inherit the value.*

```html
<px-simple-line-chart
    ...
    width="auto"
    height="auto">
</px-simple-line-chart>
```

##### legend-labels

Use the `legend-labels` attribute to define custom text labels for your bar chart legend. Pass in the values as an array of strings.

```html
<px-simple-horizontal-bar-chart
    ...
    legend-labels="['Alpha', 'Bravo', 'Charlie']">
</px-simple-horizontal-bar-chart>
```
##### colors

Configure custom bar colors with the `colors` attribute. Pass in the desired values as an array of hexadecimal value color strings.

```html
<px-simple-horizontal-bar-chart
    ...
    colors=['#5da5da', '#faa43a', '#60bd68']>
</px-simple-horizontal-bar-chart>
```

##### domain-min and domain-max

Use the `domain-min` and `domain-max` attributes to customize the x-axis range. Doing so helps compare multiple graphs with different value ranges and scale them accordingly.

```html
<px-simple-horizontal-bar-chart
    ...
    domain-min="100"
    domain-max="600">
</px-simple-horizontal-bar-chart>
```

### Function calls

There are no external function calls for this component.

### Extending styles

There are no external CSS extension points.

### Extending behavior

See Polymer composition patterns

GE Coding Style Guide
---------------------

[GE JS Developer's Guide](https://github.com/GeneralElectric/javascript)


### Known Issues
