import { defineConfig } from "astro/config";
import icon from "astro-icon";

/*
 * OPCION 1 Para que funcione en una carpeta dentro del dominio agregar el la carpeta
 * Descomentar para exportar para mediabros.cl/lightman
 */

const isVercel =
  process.env.VERCEL === "1" || process.env.NODE_ENV === "development";
const BASE_PATH = isVercel ? "/" : "/lightman/";

export default defineConfig({
  // site: "https://mediabros.cl",
  base: BASE_PATH,
  integrations: [icon()],
});
