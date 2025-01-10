/// <reference types="vite/client" />
/// <reference types="arconnect" />
interface Window {
  ethereum?: {
    isMetaMask?: boolean;
    request?: (args: { method: string; params?: Array<any> }) => Promise<any>;
    // Add other properties/methods if needed
  };
}
