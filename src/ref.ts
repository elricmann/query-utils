// Copyright (c) 2025 Elric Neumann. All rights reserved. MIT license.

export type Trackable<T> = (value: T) => void;

export class Ref<T> {
  private value: T;
  private trackedCallbacks: Trackable<T>[] = [];

  constructor(value: T) {
    this.value = value;
  }

  get() {
    return this.value;
  }

  set(value: T) {
    if (this.value !== value) {
      this.value = value;
      this.trackedCallbacks.forEach((callback) => callback(this.value));
    }
  }

  track(callback: Trackable<T>) {
    this.trackedCallbacks.push(callback);
    callback(this.value); // call initial value immediately
  }
}
