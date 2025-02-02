interface Window {
  electron?: {
    ipcRenderer?: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      send(channel: string, ...args: any[]): void;
    };
  };
}
