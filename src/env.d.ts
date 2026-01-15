/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

declare module "*.astro" {
  const component: any;
  export default component;
}