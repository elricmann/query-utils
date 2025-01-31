// Copyright (c) 2025 Elric Neumann. All rights reserved. MIT license.

import { _ } from "./";

_.define("route", ({ host, mount }) => {
  let currentRoute = window.location.pathname;

  const update = () => {
    const path = host.getAttribute("path");

    if (path === currentRoute) {
      host.style.display = "block";
    } else {
      host.style.display = "none";
    }
  };

  mount(() => {
    window.addEventListener("popstate", () => {
      currentRoute = window.location.pathname;
      update();
    });

    update();
  });
});
