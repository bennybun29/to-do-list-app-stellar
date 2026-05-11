import * as freighter from "@stellar/freighter-api";

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
