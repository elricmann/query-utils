// Copyright (c) 2025 Elric Neumann. All rights reserved. MIT license.

import { Ref } from "./ref";

export class ComputedRef<T> extends Ref<T> {
  // @ts-ignore
  private dep: Ref<any>;

  constructor(dep: Ref<any>, compute: () => T) {
    super(compute());

    this.dep = dep;

    dep.track(() => {
      this.set(compute());
    });
  }
}
