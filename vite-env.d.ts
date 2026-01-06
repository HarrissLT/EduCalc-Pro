// Manually declare asset modules since vite/client types are not found
declare module '*.css';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';

// Ensure process is declared to avoid errors with process.env usage if types are missing
declare const process: any;

// Fix for error TS7016: Could not find a declaration file for module 'katex'
declare module 'katex' {
  interface KatexOptions {
    displayMode?: boolean;
    throwOnError?: boolean;
    errorColor?: string;
    macros?: any;
    colorIsTextColor?: boolean;
    maxSize?: number;
    maxExpand?: number;
    allowedProtocols?: string[];
    strict?: boolean | string | Function;
  }

  export function renderToString(tex: string, options?: KatexOptions): string;
  export function render(tex: string, element: HTMLElement, options?: KatexOptions): void;
}
