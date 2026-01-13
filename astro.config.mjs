import { defineConfig } from 'astro/config';


// Para que funcione en una carpeta dentro del dominio agregar el la carpeta
export default defineConfig({
  // base: '/lightman/',
  // build: {
  //   assetsPrefix: '/lightman/'
  // }
  base: './',
  build: {
    assetsPrefix: './'
  }
});