import { defineConfig } from 'astro/config';
import icon from 'astro-icon';


/*
* OPCION 1 Para que funcione en una carpeta dentro del dominio agregar el la carpeta
* Descomentar para exportar para mediabros.cl/lightman
*/

// export default defineConfig({
//   base: '/lightman/',
//   build: {
//     assetsPrefix: '/lightman/'
//   }
//  integrations: [icon()]
// });

/*
* OPCION 2 Para que funcione en Vercel
* Descomentar para exportar para Vercel
*/
export default defineConfig({
  base: './',
  build: {
    assetsPrefix: './'
  },
  integrations: [icon()]
});