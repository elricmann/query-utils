## query-utils

A lightweight DOM manipulation library inspired by jQuery. Provides a simple API for selecting, traversing, and modifying DOM elements.

### Why?

We normally do not need an entire 200 kB UI library, even for SPAs. At times, it is more convenient to work with the DOM directly. Encapsulate styles using utility classes and functionality in regular JavaScript functions. The Web Almanac (2019) by HTTP Archive lists third-party libraries as bloatware. However, certain libraries scale well with usage, e.g. React, whereas frameworks like Svelte may continuously generate JavaScript since it lacks meaningful abstractions. I think jQuery partially solves this but it ended up patching every cross-browser issue over decades and turned into a pile of bloat itself.

What is the solution? A modern API that selectively wraps the DOM and can be used with libraries that support custom transparent reactivity with observable objects.

What about a component model? Components have never been solved, neither by standards nor userland libraries. Each one has their pitfalls. SSR in web components is not entirely in a great state. Libraries have weird and unpredictable component models. The standards have also been extremely useless in this regard, to be frank. While I certainly do not expect anyone to use this library, it will be valuable for my use cases.

Aside, the APIs in this library may change over time, according to usage & requirements.

### Installation

```bash
npm install query-utils
```

### Usage

```javascript
import { _ } from "query-utils";

// select elements
_(".my-class");
_("#my-id");
_("div");

// chain methods
_(".my-element")
  .addClass("active")
  .css("color", "blue")
  .on("click", () => console.log("clicked"));
```

Refer to [`main.tsx`](https://github.com/elricmann/query-utils/blob/main/src/main.tsx) for a quick overview.

### API Reference

**Element selection**

- `_('selector')` - Select elements using CSS selector
- `_(element)` - Wrap a DOM element
- `_(elementArray)` - Wrap an array of DOM elements

**Class manipulation**

- `addClass(className)` - Add class to elements
- `removeClass(className)` - Remove class from elements
- `toggleClass(className)` - Toggle class on elements
- `hasClass(className)` - Check if any element has class

**Attributes & CSS**

- `attr(name, value?)` - Get/set attribute
- `css(property, value?)` - Get/set CSS property
- `css({ property: value })` - Set multiple CSS properties

**Content manipulation**

- `html(content?)` - Get/set HTML content
- `text(content?)` - Get/set text content
- `val(value?)` - Get/set form element value
- `empty()` - Remove all child elements

**DOM insertion**

- `append(content)` - Add content to end of elements
- `prepend(content)` - Add content to start of elements
- `appendTo(target)` - Append elements to target
- `remove()` - Remove elements from DOM

**Event handling**

- `on(event, handler)` - Add event listener
- `off(event, handler)` - Remove event listener

**Traversal**

- `find(selector)` - Find descendants matching selector
- `parent()` - Get parent elements
- `children()` - Get child elements
- `siblings()` - Get sibling elements

**Iteration**

- `each(callback)` - Execute function for each element

### License

Copyright © 2025 Elric Neumann. MIT License.
