
# Flexbox Layout System

<style>
.demo {
  background-color: #ccc;
  padding: 4px;
  margin: 12px;
}

.demo div {
  background-color: white;
  padding: 12px;
  margin: 4px;
}

.tall {
  height: 124px;
}

.demo.vertical {
  height: 250px;
}

demo-tabs::shadow #results {
  width: 40%;
  max-width: initial;
}

table {
  margin: 16px 20px;
}
td,th {
  padding 0px 8px;
}

.layout.horizontal,
.layout.vertical {
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
}

.layout.inline {
  display: -ms-inline-flexbox;
  display: -webkit-inline-flex;
  display: inline-flex;
}

.layout.horizontal {
  -ms-flex-direction: row;
  -webkit-flex-direction: row;
  flex-direction: row;
}

.layout.vertical {
  -ms-flex-direction: column;
  -webkit-flex-direction: column;
  flex-direction: column;
}

.layout.wrap {
  -ms-flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
}

.layout.center,
.layout.center-center {
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.layout.center-justified,
.layout.center-center {
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
}

.flex {
  -ms-flex: 1 1 0.000000001px;
  -webkit-flex: 1;
  flex: 1;
  -webkit-flex-basis: 0.000000001px;
  flex-basis: 0.000000001px;
}

.flex-auto {
  -ms-flex: 1 1 auto;
  -webkit-flex: 1 1 auto;
  flex: 1 1 auto;
}

.flex-none {
  -ms-flex: none;
  -webkit-flex: none;
  flex: none;
}
/**
 * Alignment in cross axis.
 */
.layout.start {
  -ms-flex-align: start;
  -webkit-align-items: flex-start;
  align-items: flex-start;
}

.layout.center,
.layout.center-center {
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.layout.end {
  -ms-flex-align: end;
  -webkit-align-items: flex-end;
  align-items: flex-end;
}

.layout.baseline {
  -ms-flex-align: baseline;
  -webkit-align-items: baseline;
  align-items: baseline;
}

/**
 * Alignment in main axis.
 */
.layout.start-justified {
  -ms-flex-pack: start;
  -webkit-justify-content: flex-start;
  justify-content: flex-start;
}

.layout.center-justified,
.layout.center-center {
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
}

.layout.end-justified {
  -ms-flex-pack: end;
  -webkit-justify-content: flex-end;
  justify-content: flex-end;
}

.layout.around-justified {
  -ms-flex-pack: distribute;
  -webkit-justify-content: space-around;
  justify-content: space-around;
}

.layout.justified {
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
}

/**
 * Self alignment.
 */
.self-start {
  -ms-align-self: flex-start;
  -webkit-align-self: flex-start;
  align-self: flex-start;
}

.self-center {
  -ms-align-self: center;
  -webkit-align-self: center;
  align-self: center;
}

.self-end {
  -ms-align-self: flex-end;
  -webkit-align-self: flex-end;
  align-self: flex-end;
}

.self-stretch {
  -ms-align-self: stretch;
  -webkit-align-self: stretch;
  align-self: stretch;
}

.self-baseline {
  -ms-align-self: baseline;
  -webkit-align-self: baseline;
  align-self: baseline;
}

/**
 * multi-line alignment in main axis.
 */
.layout.start-aligned {
  -ms-flex-line-pack: start;  /* IE10 */
  -ms-align-content: flex-start;
  -webkit-align-content: flex-start;
  align-content: flex-start;
}

.layout.end-aligned {
  -ms-flex-line-pack: end;  /* IE10 */
  -ms-align-content: flex-end;
  -webkit-align-content: flex-end;
  align-content: flex-end;
}

.layout.center-aligned {
  -ms-flex-line-pack: center;  /* IE10 */
  -ms-align-content: center;
  -webkit-align-content: center;
  align-content: center;
}

.layout.between-aligned {
  -ms-flex-line-pack: justify;  /* IE10 */
  -ms-align-content: space-between;
  -webkit-align-content: space-between;
  align-content: space-between;
}

.layout.around-aligned {
  -ms-flex-line-pack: distribute;  /* IE10 */
  -ms-align-content: space-around;
  -webkit-align-content: space-around;
  align-content: space-around;
}
/*flex factors within 12 column grid*/
.flex,
.flex-1 {
  -ms-flex: 1 1 0.000000001px;
  -webkit-flex: 1;
  flex: 1;
  -webkit-flex-basis: 0.000000001px;
  flex-basis: 0.000000001px;
}

.flex-2 {
  -ms-flex: 2;
  -webkit-flex: 2;
  flex: 2;
}

.flex-3 {
  -ms-flex: 3;
  -webkit-flex: 3;
  flex: 3;
}

.flex-4 {
  -ms-flex: 4;
  -webkit-flex: 4;
  flex: 4;
}

.flex-5 {
  -ms-flex: 5;
  -webkit-flex: 5;
  flex: 5;
}

.flex-6 {
  -ms-flex: 6;
  -webkit-flex: 6;
  flex: 6;
}

.flex-7 {
  -ms-flex: 7;
  -webkit-flex: 7;
  flex: 7;
}

.flex-8 {
  -ms-flex: 8;
  -webkit-flex: 8;
  flex: 8;
}

.flex-9 {
  -ms-flex: 9;
  -webkit-flex: 9;
  flex: 9;
}

.flex-10 {
  -ms-flex: 10;
  -webkit-flex: 10;
  flex: 10;
}

.flex-11 {
  -ms-flex: 11;
  -webkit-flex: 11;
  flex: 11;
}

.flex-12 {
  -ms-flex: 12;
  -webkit-flex: 12;
  flex: 12;
}
.layout.horizontal-reverse,
.layout.vertical-reverse {
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
}

.layout.horizontal-reverse {
  -ms-flex-direction: row-reverse;
  -webkit-flex-direction: row-reverse;
  flex-direction: row-reverse;
}

.layout.vertical-reverse {
  -ms-flex-direction: column-reverse;
  -webkit-flex-direction: column-reverse;
  flex-direction: column-reverse;
}

.layout.wrap-reverse {
  -ms-flex-wrap: wrap-reverse;
  -webkit-flex-wrap: wrap-reverse;
  flex-wrap: wrap-reverse;
}
.block {
  display: block;
}

/* IE 10 support for HTML5 hidden attr */
[hidden] {
  display: none !important;
}

.invisible {
  visibility: hidden !important;
}

.relative {
  position: relative;
}

.fit {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

body.fullbleed {
  margin: 0;
  height: 100vh;
}

.scroll {
  -webkit-overflow-scrolling: touch;
  overflow: auto;
}

/* fixed position */
.fixed-bottom,
.fixed-left,
.fixed-right,
.fixed-top {
  position: fixed;
}

.fixed-top {
  top: 0;
  left: 0;
  right: 0;
}

.fixed-right {
  top: 0;
  right: 0;
  bottom: 0;
}

.fixed-bottom {
  right: 0;
  bottom: 0;
  left: 0;
}

.fixed-left {
  top: 0;
  bottom: 0;
  left: 0;
}
</style>

## Overview

The `layout` provides simple ways to use [CSS flexible box layout](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Flexible_boxes), also known as _flexbox_. It provides two different ways to use flexbox:
                                                                                                                                                                       
*   Layout classes. The layout class stylesheet provides a simple set of class-based flexbox rules. Layout classes let you specify layout properties directly in markup.
                                                                                                                                                                       
*   Custom CSS mixins. The mixin stylesheet includes custom CSS mixins that can be applied inside a CSS rule using the `@apply` function. 

Using the classes or CSS mixins is largely a matter of preference. The following sections discuss how to use the each of the stylesheets.

<aside><b>Note:</b> Before using either of these stylesheets, it's helpful to be familiar with the basics
of flexbox layout. Chris Coyier's [A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) is a
good primer.</aside>

### Using layout classes

To use layout classes import the necessary module files from the `layout` folder to the `/main.css` file.

    @import "layout/flex.css";
    @import "layout/flex-reverse.css";
    @import "layout/flex-alignment.css";
    @import "layout/flex-factors.css";
    @import "layout/positioning.css";

To use layout mixins import the `layout/layout-mixins.css` file to the `/main.css` file.

    @import "layout/layout-mixins.css";

Then simply apply the classes to any element.

    <div class="layout horizontal wrap">

Many of the layout rules involve combinations of multiple classes (such as `layout horizontal wrap` above),
and will need a combination of modules.
The order in which the classes are specified doesn't matter, so `layout horizontal` and `horizontal layout`
are equivalent.

There are 5 modules available:
- `flex`. Basic flex layouts.
- `flex-reverse`. Reverse flexbox layouts.
- `flex-alignment`.  Main axis, cross axis and self alignment.
- `flex-factors`. All the available flex factors.
- `positioning`. Generic, non-flexbox positioning helpers.

**Example: using classes in the main document**

    <head>

      ...

      <link rel="stylesheet" href="styles.css">

      ...

    </head>
    <body>

      <div class="layout horizontal">
        <div>One</div>
        <div>Two</div>
        <div>Three</div>
      </div>

    </body>

### Using layout mixins

Custom mixins can be applied inside any element's style.

**Example: using mixins in the main document**

      <!-- element's styles.css file -- apply mixins to an element -->
       
         .container {
           @apply --layout-horizontal;
           @apply --layout-wrap;
         }
      
    
    <head>

      ...

      <link rel="stylesheet" href="styles.css">

      ...

    </head>
    <body>

      <div class="container">
        <div>One</div>
        <div>Two</div>
        <div>Three</div>
      </div>

    </body>

In general the mixins require a little more code to use, but they can be preferable if you
don't want to use the classes, or if you want to switch layouts based on a media query.

## Horizontal and vertical layout

Create a flex container that lays out its children vertically or horizontally.

Class | Mixin | Result
:-|:-|:-
<code>layout horizontal</code>| <code>--layout-horizontal</code> | Horizontal layout container.
<code>layout vertical</code> | <code>--layout-vertical</code> | Vertical layout container.

The classes listed here are included in the `flex` module of classes files in the `layout` folder.

**Example: classes**

    <div class="layout horizontal">
      <div>One</div>
      <div>Two</div>
      <div>Three</div>
    </div>

**Example: mixins**

     <!--css file-->
     
        .container {
          @apply --layout-horizontal;
        }
        
     <!--end of css file-->

     <!--html file -->

        <div class="container">
          <div>One</div>
          <div>Two</div>
          <div>Three</div>
        </div>

        ...

**Example output**

<div class="layout horizontal demo">
  <div>One</div>
  <div>Two</div>
  <div>Three</div>
</div>

### Flexible children

Children of a flex container can use flex to control their own sizing.

Class | Mixin | Result
:-|:-|:-
<code>flex</code>| <code>--layout-flex</code> | Expand the child to fill available space in the main axis.
<code>flex-<var>ratio</var></code>| <code>--layout-flex-<var>ratio</var></code> | Assign a flex ratio of 1 to 12.
<code>flex-none</code>| <code>--layout-flex-none</code> | Don't flex the child.
<code>flex-auto</code>| <code>--layout-flex-auto</code> | Sets flex `flex-basis` to `auto` and `flex-grow` and `flex-shrink` to 1.

The classes listed here are included in the `flex` module of classes files in the `layout` folder.

**Example: classes**

        <div class="horizontal layout">
          <div>Alpha</div>
          <div class="flex">Beta (flex)</div>
          <div>Gamma</div>
        </div>

**Example: mixins**

    <!--css file-->
        .container {
          @apply --layout-horizontal;
        }
        .flexchild {
          @apply --layout-flex;
        }
    <!--end of css file-->
      
    <!--html file -->

        <div class="container">
          <div>One</div>
          <div class="flexchild">Two</div>
          <div>Three</div>
        </div>

        ...

**Example output**

<div class="horizontal layout demo">
  <div>Alpha</div>
  <div class="flex">Beta (flex)</div>
  <div>Gamma</div>
</div>

#### Flexible children in vertical layouts

The same rules can be used for children in vertical layouts.

**Example: classes**

    <div class="vertical layout" style="height:250px">
      <div>Alpha</div>
      <div class="flex">Beta (flex)</div>
      <div>Gamma</div>
    </div>

**Example: mixins**

    <!--css file-->
          
        .container {
          @apply --layout-vertical;
        }
        .flexchild {
          @apply --layout-flex;
        }
        
    <!--end of css file-->

    <!--html file -->

        <div class="container">
          <div>One</div>
          <div class="flexchild">Two</div>
          <div>Three</div>
        </div>

        ...

**Example output**

<div class="vertical layout demo tall">
  <div>Alpha</div>
  <div class="flex">Beta (flex)</div>
  <div>Gamma</div>
</div>

**Note**: for vertical layouts, the container needs to have a height for the children to flex correctly.

#### Flex ratios

Children elements can be told to take up more space by including a "flex ratio"
from 1 to 12. This is equivalent to specifying the CSS `flex-grow` property.

For example, the following examples make "Gamma" 2x larger than "Beta" and "Alpha" 3x larger, use
`flex-2` and `flex-3`, respectively.

The classes listed here are included in the `flex-factors` module of classes files in the `layout` folder.

**Example: classes**

        <div class="horizontal layout demo">
          <div class="flex-3">Alpha</div>
          <div class="flex">Beta</div>
          <div class="flex-2">Gamma</div>
        </div>

**Example: mixins**

      <!--css file-->
   
        .container {
          @apply --layout-horizontal;
        }
        .flexchild {
          @apply --layout-flex;
        }
        .flex2child {
          @apply --layout-flex-2;
        }
        .flex3child {
          @apply --layout-flex-3;
        }
        
    <!--end of css file-->

    <!--html file -->

        <div class="container">
          <div class="flex3child">One</div>
          <div class="flexchild">Two</div>
          <div class="flex2child">Three</div>
        </div>

        ...

**Example output**

<div class="horizontal layout demo">
  <div class="flex-3">Alpha</div>
  <div class="flex">Beta</div>
  <div class="flex-2">Gamma</div>
</div>


### Cross-axis alignment

By default, children stretch to fit the cross-axis (e.g. _vertical_ stretching in a _horizontal_ layout).

    <div class="horizontal layout">
      <div>Stretch Fill</div>
    </div>

<div class="horizontal layout demo tall">
  <div>Stretch Fill</div>
</div>

Center _across_ the main axis (e.g. _vertical_ centering elements in a _horizontal_ layout)
by adding the `center` class or applying the `--layout-center` mixin.

**Example: classes, cross-axis center**

    <div class="horizontal layout center">
      <div>Center</div>
    </div>

**Example: mixins, cross-axis center**

     <!--css file-->
 
        .container {
          @apply --layout-horizontal;
          @apply --layout-center;
        }
        
    <!--end of css file-->

    <!--html file -->

        <div class="container">
          <div>Center</div>
        </div>

        ...

**Example output, cross-axis center**

<div class="horizontal layout center demo tall">
  <div>Center</div>
</div>

You can also position at the top/bottom (or left/right in `vertical` layouts) using the `start` or `end`
classes, or by applying the `--layout-start` or `--layout-end` mixins.


**Example: classes, cross-axis start**

    <div class="horizontal layout start">
      <div>start</div>
    </div>

**Example: mixins, cross-axis start**

    <!--css file-->

        .container {
          @apply --layout-horizontal;
          @apply --layout-start;
        }
     <!--end of css file-->
 
     <!--html file -->

        <div class="container">
          <div>start</div>
        </div>

        ...

**Example output, cross-axis start**

<div class="horizontal layout start demo tall">
  <div>start</div>
</div>


**Example: classes, cross-axis end**

    <div class="horizontal layout end">
      <div>end</div>
    </div>

**Example: mixins, cross-axis end**

     <!--css file-->
     
        .container {
          @apply --layout-horizontal;
          @apply --layout-end;
        }
        
    <!--end of css file-->

    <!--html file -->

        <div class="container">
          <div>end</div>
        </div>

        ...

**Example output, cross-axis end**

<div class="horizontal layout end demo tall">
  <div>end</div>
</div>


### Justification

Justifying aligns contents along the **main axis**.  Justify the layout
by specifying  one of the following.


Class | Mixin | Result
:-|:-|:-
`start-justified`| <code>--layout-start-justified</code> | Aligns contents at the start of the main axis.
`center-justified` | <code>--layout-center-justified</code> | Centers contents along the main axis.
`end-justified` | <code>--layout-end-justified</code> | Aligns contents to the end of the main axis.
`justified` | <code>--layout-justified</code> | Aligns contents with equal spaces between children.
`around-justified` | <code>--layout-around-justified</code> | Aligns contents with equal spaces arround children.

The classes listed here are included in the `flex-alignment` module of classes files in the `layout` folder.

**Example: classes, start justified**

    <div class="horizontal start-justified layout">
      <div>start-justified</div>
    </div>

**Example output, start justified**

<div class="horizontal start-justified layout demo">
  <div>start-justified</div>
</div>

**Example: mixins, center justified**

    <!--css file-->
     
        .container {
          @apply --layout-horizontal;
          @apply --layout-center-justified;
        }
        
    <!--end of css file-->

    <!--html file -->

        <div class="container">
          <div>center-justified</div>
        </div>

        ...

**Example output, center justified**

<div class="horizontal center-justified layout demo">
  <div>center-justified</div>
</div>

**Example: classes, end justified**

    <div class="horizontal end-justified layout">
      <div>end-justified</div>
    </div>

**Example output, end justified**

<div class="horizontal end-justified layout demo">
  <div>end-justified</div>
</div>

**Example: mixins, equal space between elements**

    <!--css file-->
     
        .container {
          @apply --layout-horizontal;
          @apply --layout-justified;
        }
        
    <!--end of css file-->

    <!--html file -->

        <div class="container">
          <div>justified</div>
          <div>justified</div>
          <div>justified</div>
        </div>

        ...

**Example output, equal space between elements**

<div class="horizontal justified layout demo">
  <div>justified</div>
  <div>justified</div>
  <div>justified</div>
</div>

**Example: classes, equal space around each element**

    <div class="horizontal around-justified layout">
      <div>around-justified</div>
      <div>around-justified</div>
    </div>

<div class="horizontal around-justified layout demo">
  <div>around-justified</div>
  <div>around-justified</div>
</div>

## Self alignment

Alignment can also be set per-child (instead of using the layout container's rules).

Class | Mixin | Result
:-|:-|:-
`self-start`| <code>--layout-self-start</code> | Aligns the child at the start of the cross-axis.
`self-center` | <code>--layout-self-center</code> | Centers the child along the cross-axis.
`self-end` | <code>--layout-self-end</code> | Aligns the child at the end of the cross-axis.
`self-stretch` | <code>--layout-self-stretch</code> | Stretches the child to fit the cross-axis.

**Example: classes**

    <div class="horizontal layout" style="height: 120px;">
      <div class="flex self-start">Alpha</div>
      <div class="flex self-center">Beta</div>
      <div class="flex self-end">Gamma</div>
      <div class="flex self-stretch">Delta</div>
    </div>

**Example: mixins**

    <!--css file-->
     
        .container {
          @apply --layout-horizontal;
          @apply --layout-justified;
          height: 120px;
        }
        .container div {
          @apply --layout-flex;
        }
        .child1 {
          @apply --layout-self-start;
        }
        .child2 {
          @apply --layout-self-center;
        }
        .child3 {
          @apply --layout-self-end;
        }
        .child4 {
          @apply --layout-self-stretch;
        }
        
    <!--end of css file-->

    <!--html file -->

        <div class="container">
          <div class="child1">Alpha</div>
          <div class="child2">Beta</div>
          <div class="child3">Gamma</div>
          <div class="child4">Delta</div>
        </div>

        ...

**Example output**

<div class="horizontal layout demo tall">
  <div class="flex self-start">Alpha</div>
  <div class="flex self-center">Beta</div>
  <div class="flex self-end">Gamma</div>
  <div class="flex self-stretch">Delta</div>
</div>

<aside><b>Note:</b> The <code>flex</code> class
(and <code>--layout-flex</code> mixin) shown in these examples is
added for the demo and not required for self-alignment.</aside>


## Wrapping

Wrapped layouts can be enabled with the `wrap` class or `--layout-wrap` mixin.

**Example: classes**

    <div class="horizontal layout wrap" style="width: 220px">
      <div>Alpha</div>
      <div>Beta</div>
      <div>Gamma</div>
      <div>Delta</div>
    </div>

**Example output**

<div class="horizontal layout wrap demo" style="width: 220px">
  <div>Alpha</div>
  <div>Beta</div>
  <div>Gamma</div>
  <div>Delta</div>
</div>

## Reversed layouts

Layout direction can be mirrored using the following rules:

Class | Mixin | Result
:-|:-|:-
<code>layout horizontal-reverse</code>| <code>--layout-horizontal-reverse</code> | Horizontal layout with children laid out in reverse order (last-to-first).
<code>layout vertical-reverse</code> | <code>--layout-vertical-reverse</code> | Vertical layout with children laid out in reverse order.
<code>layout wrap-reverse</code> | <code>--layout-wrap-reverse</code> | Wrap layout with wrapped rows placed in the reverse order (for example, in a vertical layout, the second row is placed above the first row, instead of below).

The classes listed here are included in the `flex-reverse`  module of classes files in the `layout` folder.

**Example: mixins**

        
    <!--css file-->

        .container {
          @apply --layout-horizontal-reverse;
        }
        
    <!--end of css file-->

    <!--html file -->

        <div class="container">
          <div>Alpha</div>
          <div>Beta</div>
          <div>Gamma</div>
          <div>Delta</div>
        </div>

        ...

**Example output**

<div class="horizontal-reverse layout demo">
  <div>Alpha</div>
  <div>Beta</div>
  <div>Gamma</div>
  <div>Delta</div>
</div>

## Full bleed &lt;body>

It's common to want the entire `<body>` to fit to the viewport. By themselves, Polymer's layout features on
`<body>` don't achieve the result. You can make `<body>` take up the entire viewport by adding the `fullbleed` class:

    <body class="fullbleed vertical layout">
      <div class="flex">Fitting a fullbleed body.</div>
    </body>

This removes its margins and maximizes its height to the viewport. There is no equivalent mixin, but the same result can
be achieved in CSS very simply:

    body {
      margin: 0;
      height: 100vh;
    }

This class is included in the `positioning`  module of classes files in the `layout` folder.

Note that the `fullbleed` class **only works on the `<body>` tag.** This is the only rule in the
stylesheet that is scoped to a particular tag.


## General purpose rules

This layouting system includes other general purpose rules for basic positioning:

Class | Mixin | Result
:-|:-|:-
`block`| `--layout-block` | Assigns `display: block`
`invisible` | `--layout-invisible` | Assigns `visibility: hidden`
`relative` | `--layout-relative` | Assigns `position: relative`
`fit` | `--layout-fit` | Sets `position: absolute` and sets `top:0;right:0;bottom:0;left:0;` (aka "trbl fitting").

The classes listed here are included in the `positioning` module of classes files in the `layout` folder.

<aside><b>Note:</b>When using `fit` layout, the element must have an ancestor with fixed size and `position: relative` layout
to fit inside of.
</aside>


**Example: classes**

    <div>Before <span>[A Span]</span> After</div>

    <div>Before <span class="block">[A Block Span]</span> After</div>
    <div>Before invisible span <span class="invisible">Not displayed</span> After invisible span</div>
    <div class="relative" style="height: 100px;">
      <div class="fit" style="background-color: #000;color: white">Fit</div>
    </div>

**Example output**

<div class="demo">Before <span>[A Span]</span> After</div>
<div class="demo">Before <span class="block">[A Block Span]</span> After</div>
<div class="demo">Before invisible span <span class="invisible">Not displayed</span> After invisible span</div>
<div class="relative" style="height: 100px;" class="demo">
  <div class="fit" style="background-color: #000;color: white">Fit</div>
</div>
