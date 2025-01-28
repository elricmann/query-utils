// Copyright (c) 2025 Elric Neumann. All rights reserved. MIT license.

export class Query {
  elements: Element[] = [];
  length: number = 0;

  constructor(selector: string | Element | Element[] | Query | null) {
    if (!selector) return;

    if (typeof selector === "string") {
      if (selector[0] === "<" && selector[selector.length - 1] === ">") {
        const parser = new DOMParser();
        const doc = parser.parseFromString(selector, "text/html");
        this.elements = [doc.body.firstElementChild as Element];
      } else if (selector[0] === "#") {
        const element = document.getElementById(selector.slice(1));
        if (element) this.elements = [element];
      } else if (selector[0] === ".") {
        const elements = document.getElementsByClassName(selector.slice(1));
        this.elements = [];
        for (let i = 0, len = elements.length; i < len; i++) {
          this.elements.push(elements[i]);
        }
      } else {
        const elements = document.querySelectorAll(selector);
        this.elements = [];

        for (let i = 0, len = elements.length; i < len; i++) {
          this.elements.push(elements[i]);
        }
      }
    } else if (selector instanceof Element) {
      this.elements = [selector];
    } else if (selector instanceof Query) {
      this.elements = selector.elements;
    } else if (Array.isArray(selector)) {
      this.elements = selector;
    }

    this.length = this.elements.length;
  }

  addClass(className: string): Query {
    for (let i = 0, len = this.length; i < len; i++) {
      this.elements[i].classList.add(className);
    }

    return this;
  }

  removeClass(className: string): Query {
    for (let i = 0, len = this.length; i < len; i++) {
      this.elements[i].classList.remove(className);
    }

    return this;
  }

  toggleClass(className: string): Query {
    for (let i = 0, len = this.length; i < len; i++) {
      this.elements[i].classList.toggle(className);
    }

    return this;
  }

  hasClass(className: string): boolean {
    for (let i = 0, len = this.length; i < len; i++) {
      if (this.elements[i].classList.contains(className)) return true;
    }

    return false;
  }

  attr(name: string, value?: string): any /** string | Query */ {
    if (value === undefined && this.length > 0) {
      return this.elements[0].getAttribute(name) || "";
    }

    for (let i = 0, len = this.length; i < len; i++) {
      this.elements[i].setAttribute(name, value || "");
    }

    return this;
  }

  css(property: string | Record<string, string>, value?: string): any /** string | Query */ {
    if (typeof property === "object") {
      for (let i = 0, len = this.length; i < len; i++) {
        const element = this.elements[i] as HTMLElement;

        for (const key in property) {
          if (property.hasOwnProperty(key)) {
            element.style[key as any] = property[key];
          }
        }
      }

      return this;
    } else if (value === undefined && this.length > 0) {
      return getComputedStyle(this.elements[0])[property as any];
    } else {
      for (let i = 0, len = this.length; i < len; i++) {
        (this.elements[i] as HTMLElement).style[property as any] = value || "";
      }

      return this;
    }
  }

  html(content?: string): any /** string | Query */ {
    if (content === undefined && this.length > 0) {
      return this.elements[0].innerHTML;
    }

    for (let i = 0, len = this.length; i < len; i++) {
      this.elements[i].innerHTML = content || "";
    }

    return this;
  }

  text(content?: string): any /** string | Query */ {
    if (content === undefined && this.length > 0) {
      return this.elements[0].textContent || "";
    }

    for (let i = 0, len = this.length; i < len; i++) {
      this.elements[i].textContent = content || "";
    }

    return this;
  }

  val(value?: string): any /** string | Query */ {
    if (value === undefined && this.length > 0) {
      return (this.elements[0] as HTMLInputElement).value || "";
    }

    for (let i = 0, len = this.length; i < len; i++) {
      if ("value" in this.elements[i]) {
        (this.elements[i] as HTMLInputElement).value = value || "";
      }
    }

    return this;
  }

  appendTo(target: string | Element | Query): Query {
    const targetElements = new Query(target).elements;

    for (let i = 0, len = this.length; i < len; i++) {
      for (let j = 0, len2 = targetElements.length; j < len2; j++) {
        targetElements[j].appendChild(this.elements[i].cloneNode(true));
      }
    }

    return this;
  }

  append(content: string | Element | Query): Query {
    if (typeof content === "string") {
      for (let i = 0, len = this.length; i < len; i++) {
        this.elements[i].insertAdjacentHTML("beforeend", content);
      }
    } else if (content instanceof Element) {
      for (let i = 0, len = this.length; i < len; i++) {
        this.elements[i].appendChild(content.cloneNode(true));
      }
    } else {
      for (let i = 0, len = this.length; i < len; i++) {
        for (let j = 0, jLen = content.length; j < jLen; j++) {
          this.elements[i].appendChild(content.elements[j].cloneNode(true));
        }
      }
    }

    return this;
  }

  prepend(content: string | Element | Query): Query {
    if (typeof content === "string") {
      for (let i = 0, len = this.length; i < len; i++) {
        this.elements[i].insertAdjacentHTML("afterbegin", content);
      }
    } else if (content instanceof Element) {
      for (let i = 0, len = this.length; i < len; i++) {
        this.elements[i].insertBefore(content.cloneNode(true), this.elements[i].firstChild);
      }
    } else {
      for (let i = 0, len = this.length; i < len; i++) {
        for (let j = 0, jLen = content.length; j < jLen; j++) {
          this.elements[i].insertBefore(
            content.elements[j].cloneNode(true),
            this.elements[i].firstChild
          );
        }
      }
    }

    return this;
  }

  remove(): Query {
    for (let i = 0, len = this.length; i < len; i++) {
      this.elements[i].remove();
    }

    return this;
  }

  empty(): Query {
    for (let i = 0, len = this.length; i < len; i++) {
      this.elements[i].innerHTML = "";
    }

    return this;
  }

  on(event: string, handler: (e: Event) => void): Query {
    for (let i = 0, len = this.length; i < len; i++) {
      this.elements[i].addEventListener(event, handler);
    }

    return this;
  }

  off(event: string, handler: (e: Event) => void): Query {
    for (let i = 0, len = this.length; i < len; i++) {
      this.elements[i].removeEventListener(event, handler);
    }

    return this;
  }

  each(callback: (index: number, element: Element) => void): Query {
    for (let i = 0, len = this.length; i < len; i++) {
      callback(i, this.elements[i]);
    }

    return this;
  }

  find(selector: string): Query {
    const found: Element[] = [];

    for (let i = 0, len = this.length; i < len; i++) {
      const elements = this.elements[i].querySelectorAll(selector);

      for (let j = 0, jLen = elements.length; j < jLen; j++) {
        found.push(elements[j]);
      }
    }

    return new Query(found);
  }

  parent(): Query {
    const parents: Element[] = [];

    for (let i = 0, len = this.length; i < len; i++) {
      const parent = this.elements[i].parentElement;
      if (parent) parents.push(parent);
    }

    return new Query(parents);
  }

  children(): Query {
    const children: Element[] = [];

    for (let i = 0, len = this.length; i < len; i++) {
      const childElements = this.elements[i].children;

      for (let j = 0, jLen = childElements.length; j < jLen; j++) {
        children.push(childElements[j]);
      }
    }

    return new Query(children);
  }

  siblings(): Query {
    const siblings: Element[] = [];

    for (let i = 0, len = this.length; i < len; i++) {
      const parent = this.elements[i].parentElement;

      if (parent) {
        const childElements = parent.children;

        for (let j = 0, len2 = childElements.length; j < len2; j++) {
          if (childElements[j] !== this.elements[i]) {
            siblings.push(childElements[j]);
          }
        }
      }
    }

    return new Query(siblings);
  }
}

export function _(selector: string | Element | Element[] | Query | null): Query {
  return new Query(selector);
}
