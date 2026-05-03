import clarity from "@microsoft/clarity";

const CLARITY_PROJECT_ID = "wlj8ct474k";

let clarityStarted = false;

export function startClarity() {
  if (clarityStarted || typeof window === "undefined") {
    return;
  }

  try {
    clarity.init(CLARITY_PROJECT_ID);
    clarityStarted = true;
  } catch {
    // Adblockers/privacy tools can block Clarity bootstrap.
    // Fail silently so site rendering never breaks.
  }
}
