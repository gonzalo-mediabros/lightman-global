import { defineConfig } from 'astro/config';


/*
* OPCION 1 Para que funcione en una carpeta dentro del dominio agregar el la carpeta
* Descomentar para exportar para mediabros.cl/lightman
*/

// export default defineConfig({
//   base: '/lightman/',
//   build: {
//     assetsPrefix: '/lightman/'
//   }
// });

/*
* OPCION 2 Para que funcione en Vercel
* Descomentar para exportar para Vercel
*/
export default defineConfig({
  base: './',
  build: {
    assetsPrefix: './'
  }
});