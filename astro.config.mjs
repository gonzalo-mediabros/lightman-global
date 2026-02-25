import { defineConfig } from "astro/config";
import astroIcon from 'astro-icon'

/*
* DEPLOY GITHUB PAGES DOMINIO TEMPORAL
*/
let DEPLOY_DOMAIN = "https://gonzalo-mediabros.github.io"; 
let DEPLOY_PATH = "/lightman-global/";   

/* ⚠️ DESCOMENTAR Y COMPLETAR SI DEPLOY ES UN CUSTOM DOMAIN ⚠️ */

// DEPLOY_DOMAIN = "https://lightmanglobal.com";
// DEPLOY_PATH = "/";


export default defineConfig({
  site: DEPLOY_DOMAIN,
  base: DEPLOY_PATH,
  integrations: [astroIcon()],
  build: {
    assets: "assets",
  },
});