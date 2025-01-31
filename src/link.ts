// Copyright (c) 2025 Elric Neumann. All rights reserved. MIT license.

import { _ } from "./";

_.define("link", ({ host, mount }) => {
  mount(() => {
    const href = host.getAttribute("href");
    if (!href) {
      console.error('q-link: missing "href" attribute');
      return;
    }

    host.addEventListener("click", (e: Event) => {
      e.preventDefault();

      if (href == window.location.pathname) return;

      history.pushState({}, "", href);
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
  });
});
