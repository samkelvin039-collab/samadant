import { useSyncExternalStore } from "react";

/** Tiny shared store so "Get started" on a service card can preselect it in the contact form. */
let selectedService = "";
const listeners = new Set<() => void>();

export function selectServiceForInquiry(service: string) {
  selectedService = service;
  listeners.forEach((l) => l());
}

export function useSelectedService() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => selectedService,
    () => "",
  );
}
