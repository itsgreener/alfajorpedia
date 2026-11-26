// Función serverless de Vercel: envuelve la app Express completa.
// vercel.json reescribe /api/* hacia aquí; Express recibe la URL original
// (/api/alfajores, /api/auth/login…) y enruta como siempre.
import app from "../App.cjs";

export default app;
