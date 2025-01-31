// Copyright (c) 2025 Elric Neumann. All rights reserved. MIT license.

import { _ } from "./";

_.define("import", ({ host, mount }) => {
  mount(() => {
    const src = host.getAttribute("src");

    if (!src) {
      console.error('q-import: missing "src" attribute');
      return;
    }

    fetch(src)
      .then((response) => {
        if (!response.ok) throw new Error(`failed to fetch ${src}: ${response.statusText}`);
        return response.text();
      })
      .then((html) => {
        host.innerHTML = html;
      })
      .catch((error) => {
        console.error(`q-import: error loading ${src}`, error);
      });
  });
});
