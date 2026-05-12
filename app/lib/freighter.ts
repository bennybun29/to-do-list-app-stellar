import * as freighter from "@stellar/freighter-api";
import { Client, networks } from "to_do_list";

const ensureBrowser = () => {
  if (typeof window === "undefined") {
    throw new Error("Freighter can only be used in the browser.");
  }
};

export const isFreighterConnected = async () => {
  ensureBrowser();
  return freighter.isConnected();
};

export const connectFreighter = async () => {
  ensureBrowser();

  // Check if freighter API is available
  if (!freighter || typeof freighter.requestAccess !== "function") {
    throw new Error(
      "Freighter API not properly loaded. Please check your dependencies and reload the page.",
    );
  }

  try {
    // Check if extension is installed
    const connectedResult = (await freighter.isConnected()) as {
      isConnected?: boolean;
    };
    console.log("isConnected result:", connectedResult);

    if (!connectedResult.isConnected) {
      throw new Error(
        "Freighter extension not found or not configured. Please install the Freighter wallet extension and set up your account.",
      );
    }

    // Request access - will wait for user interaction with Freighter popup
    const { address, error } = (await freighter.requestAccess()) as {
      address?: string;
      error?: string | object;
    };
    console.log("freighter.requestAccess response:", { address, error });

    if (error) {
      let errorMessage =
        typeof error === "string"
          ? error
          : error instanceof Error
            ? error.message
            : (error as any)?.message || JSON.stringify(error);

      // If user rejected the request, provide a friendlier message
      if ((error as any)?.code === -4 || errorMessage.includes("rejected")) {
        errorMessage =
          "Please unlock your Freighter wallet and approve the request.";
      }

      throw new Error(errorMessage);
    }

    if (!address || typeof address !== "string" || address.trim() === "") {
      throw new Error(
        "Freighter extension not found or not configured. Please install the Freighter wallet extension and set up your account.",
      );
    }

    return address;
  } catch (err) {
    console.error("Freighter connection error:", err);
    throw err;
  }
};

export async function initializeToDoContract() {
  ensureBrowser();

  // Timeout wrapper for freighter calls
  const withTimeout = <T>(promise: Promise<T>, ms: number = 3000) => {
    return Promise.race([
      promise,
      new Promise<T>((_, reject) =>
        setTimeout(() => reject(new Error("Freighter request timed out")), ms),
      ),
    ]);
  };

  try {
    // Request access - wait for user interaction (no timeout, user controls timing)
    await freighter.requestAccess();
  } catch (e) {
    console.error("Request access failed:", e);
    throw new Error(
      "Freighter wallet extension not found or not responding. Please install the Freighter wallet extension.",
    );
  }

  try {
    // Get address should respond immediately, use timeout for safety
    const addressResult = (await withTimeout(freighter.getAddress(), 3000)) as {
      address: string;
    };

    const { address } = addressResult;

    if (!address) {
      throw new Error("Freighter wallet not connected or no address available");
    }

    // Create a wrapper for freighter.signTransaction that matches the SDK's expected signature
    const signTransaction = async (
      xdr: string,
      opts?: { networkPassphrase?: string; address?: string },
    ) => {
      const result = await freighter.signTransaction(xdr, opts);
      if (result.error) {
        throw new Error(result.error.message || "Failed to sign transaction");
      }
      return {
        signedTxXdr: result.signedTxXdr,
        signerAddress: result.signerAddress,
      };
    };

    const toDoContract = new Client({
      contractId: networks.testnet.contractId,
      networkPassphrase: networks.testnet.networkPassphrase,
      rpcUrl: "https://soroban-testnet.stellar.org",
      publicKey: address,
      signTransaction: signTransaction,
    });

    return { contract: toDoContract, address };
  } catch (err) {
    console.error("Failed to initialize contract:", err);
    throw new Error(
      err instanceof Error
        ? err.message
        : "Failed to connect to Freighter wallet",
    );
  }
}
