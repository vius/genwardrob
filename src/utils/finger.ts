
import CryptoJS from 'crypto-js';
// fingerprint.ts
export type FingerprintType = "stable";

function normalizeUA(ua: string): string {
    ua = ua.toLowerCase();
    if (ua.includes("chrome")) return "chrome";
    if (ua.includes("safari") && !ua.includes("chrome")) return "safari";
    if (ua.includes("firefox")) return "firefox";
    if (ua.includes("edg")) return "edge";
    return "other";
}

function normalizePlatform(platform: string): string {
    platform = platform.toLowerCase();
    if (platform.includes("win")) return "windows";
    if (platform.includes("mac")) return "mac";
    if (platform.includes("linux")) return "linux";
    if (platform.includes("iphone") || platform.includes("ipad")) return "ios";
    if (platform.includes("android")) return "android";
    return "other";
}

function canvasHash(): string {
    try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return "nocanvas";
        ctx.textBaseline = "top";
        ctx.font = "16px 'Arial'";
        ctx.fillStyle = "#f60";
        ctx.fillRect(125, 1, 62, 20);
        ctx.fillStyle = "#069";
        ctx.fillText("fingerprint-stable", 2, 15);
        ctx.fillStyle = "rgba(102,200,0,0.7)";
        ctx.fillText("fingerprint-stable", 4, 17);
        return canvas.toDataURL();
    } catch {
        return "nocanvas";
    }
}

function webglHash(): string {
    try {
        const canvas = document.createElement("canvas");
        const gl: any = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if (!gl) return "nowebgl";
        const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
        const vendor = debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : "";
        const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : "";
        return (vendor + "~" + renderer).toLowerCase();
    } catch {
        return "nowebgl";
    }
}

function hashString(longString: string): any {
    return CryptoJS.MD5(longString);
}

export function generateFingerprint(type: FingerprintType = "stable"): string {
    if (type === "stable") {
        const ua = normalizeUA(navigator.userAgent);
        const platform = normalizePlatform(navigator.platform);

        const components = [
            ua,
            platform,
            canvasHash(),
            webglHash()
        ].join("--");
        const hash = hashString(components);
        console.log('hahahaha', hash)
        return hash;
    }

    return "0";
}
