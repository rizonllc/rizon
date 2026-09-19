declare global {
  interface Window {
    // Umami tracker global, present once the tracker script loads.
    umami?: {
      track: (eventName: string, eventData?: Record<string, unknown>) => void;
    };
  }
}

export {};
