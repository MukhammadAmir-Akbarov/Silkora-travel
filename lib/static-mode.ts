// True only in the static GitHub Pages build (set via NEXT_PUBLIC_STATIC_DEMO
// in the Pages CI workflow). There is no server there, so the planner and the
// contact form run a client-side demo instead of calling /api/* endpoints.
// The value is inlined at build time, so it tree-shakes cleanly on Vercel.
export const STATIC_DEMO = process.env.NEXT_PUBLIC_STATIC_DEMO === "true";
