export function notationCopy(target, ...sources) {
  let convertBuffer = false;
  if (typeof Buffer !== "undefined") {
    convertBuffer = true;
  }
  const maxCalls = 2000;
  let calls;
  const seen = new WeakSet();
  for (const source of sources) {
    calls = 0;
    notationCopyRecursive(target, source);
    if (calls > maxCalls) {
      console.warn(`[Perj] Maximum of ${maxCalls} recursive calls has been reached.`);
    }
  }
  return target;

  function notationCopyRecursive(tgt, src) {
    if (calls++ > maxCalls) {
      return;
    }
    if (src == null) {
      return src;
    }
    const type = typeof src;
    if (type === "string" || type === "number" || type === "boolean") {
      return src;
    }

    if (type === "object") {
      if (seen.has(src)) {
        return "[Circular]";
      }
      seen.add(src);

      if (Array.isArray(src)) {
        const newArray = [];
        for (let i = 0; i < src.length; i++) {
          newArray[i] = notationCopyRecursive({}, src[i]);
        }
        return newArray;
      }

      if (src instanceof Date) {
        return src;
      }

      if (src instanceof Error) {
        for (const name of Reflect.ownKeys(src)) {
          const result = notationCopyRecursive({}, src[name]);
          if (result !== undefined) {
            tgt[name] = result;
          }
        }
        if (tgt.message === undefined) {
          tgt.message = "The application has encountered an unknown error.";
        }
        if (tgt.name === undefined) {
          tgt.name = "Error";
        }
        return tgt;
      }

      if (convertBuffer && src instanceof Buffer) {
        const maxBytes = 50; // Same max value as buffer.INSPECT_MAX_BYTES
        const result = { type: "Buffer" };
        result.hex = src.toString("hex", 0, maxBytes);
        result.utf8 = src.toString("utf8", 0, maxBytes);
        result.base64 = src.toString("base64", 0, maxBytes);
        if (src.length > maxBytes) {
          const suffix = "...";
          result.hex += suffix;
          result.utf8 += suffix;
          result.base64 += suffix;
        }
        return result;
      }

      for (const name in src) {
        const result = notationCopyRecursive({}, src[name]);
        if (result !== undefined) {
          tgt[name] = result;
        }
      }
      return tgt;
    }

    return undefined;
  }
}
