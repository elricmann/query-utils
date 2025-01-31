// Copyright (c) 2025 Elric Neumann. All rights reserved. MIT license.

import { _ } from "./";

_.define("import", ({ host, mount, unmount }) => {
  let isActive = false;

  const executeScripts = () => {
    const scripts = host.querySelectorAll("script");

    for (let i = 0, len = scripts.length; i < len; i++) {
      const script = document.createElement("script");

      script.textContent = scripts[i].textContent;
      script.type = scripts[i].type;

      if (scripts[i].src) {
        script.src = scripts[i].src;
      }

      document.head.appendChild(script).parentNode?.removeChild(script);
    }
  };

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

        if (isActive) {
          executeScripts();
        }
      })
      .catch((error) => {
        console.error(`q-import: error loading ${src}`, error);
      });

    const handleRouteChange = (event: any) => {
      const newPath = event.detail.path;
      const route = host.closest("q-route")?.getAttribute("path");

      if (route === newPath) {
        isActive = true;
        executeScripts();
      } else {
        isActive = false;
      }
    };

    window.addEventListener("routechange", handleRouteChange);

    window.dispatchEvent(
      new CustomEvent("routechange", { detail: { path: window.location.pathname } })
    );

    unmount(() => {
      window.removeEventListener("routechange", handleRouteChange);
    });
  });
});
