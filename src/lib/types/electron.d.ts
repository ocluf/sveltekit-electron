interface Window {
  api: {
    preload: () => void;
    main: () => Promise<void>;
  }
}
