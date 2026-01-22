---
description: Convierte un proyecto existente (React/Vercel/HTML) a un proyecto Astro estandarizado con MZL.
---

Este workflow guía la transformación de un proyecto existente a Astro, aplicando el estándar **Modular Zenith Layout (MZL)**, eliminando Tailwind/CSS inline, e integrando Material Icons y SEO avanzado.

### 1. Inicialización del Proyecto Astro

Si no existe el proyecto, créalo:

```bash
# turbo
pnpm create astro@latest ./ -- --template minimal --install --no-git --typescript strict
```

### 2. Configuración de Dependencias y Git

```bash
# turbo
pnpm install gh-pages --save-dev
```

En el `package.json`, agrega:

```json
"scripts": {
  "deploy": "gh-pages -d dist"
}
```

Asegúrate de que el `.gitignore` incluya:

```text
node_modules
dist
.vercel
```

### 2.5 Configuración de Despliegue (Critical)

Para evitar errores 404 en GitHub Pages y asegurar rutas correctas, el archivo `astro.config.mjs` debe configurarse de la siguiente manera.

**Reglas Clave:**

1.  **Assets folder**: Renombrar la carpeta de salida `_astro` a `assets` (GitHub Pages ignora carpetas que empiezan con `_`).
2.  **Constantes Explícitas**: Definir constantes para Dominio y Path al inicio del archivo.

#### Plantilla `astro.config.mjs`

```javascript
import { defineConfig } from "astro/config";
import icon from "astro-icon"; // Si usas astro-icon

// --- CONFIGURACIÓN DE DESPLIEGUE ---
// OPCIÓN A: GitHub Pages (URL por defecto)
// Modificar [USUARIO] y [REPO]
const DEPLOY_DOMAIN = "https://tu-usuario.github.io";
const DEPLOY_PATH = "/nombre-repo/"; // ¡IMPORTANTE: Debe terminar en /!

// OPCIÓN B: Dominio Personalizado
// Descomentar si usas custom domain
// const DEPLOY_DOMAIN = "https://midominio.com";
// const DEPLOY_PATH = "/";

export default defineConfig({
  site: DEPLOY_DOMAIN,
  base: DEPLOY_PATH,
  integrations: [icon()],
  build: {
    // Renombra la carpeta de assets para evitar conflictos con Jekyll/GitHub Pages
    assets: "assets",
  },
});
```

#### Manejo de Rutas en Código

Nunca escribas rutas absolutas manualmente (ej: `/images/logo.png`) ni concatenaciones con error de doble slash. Usa `import.meta.env.BASE_URL`:

- **Correcto:** ``src={`${import.meta.env.BASE_URL}images/foto.jpg`}`` (Nota: BASE_URL incluye el slash final)
- **Incorrecto:** ``src={`${import.meta.env.BASE_URL}/images/foto.jpg`}`` (Genera `//images/...`)

### 3. Sistema de Estilos: Modular Zenith Layout (MZL)

**REGLA DE ORO:** No usar Tailwind, no usar CSS inline. Usar variables globales en `global.css` y estilos específicos en módulos CSS.

#### 3.1 `src/styles/global.css`

Define aquí los cimientos del proyecto:

```css
/* Importar fuentes de Google */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap");
/* Material Symbols */
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

:root {
  /* Colores Globales */
  --primary: #007bff;
  --text: #333;
  --bg: #fff;

  /* Layout MZL */
  --container-max-width: 1440px;
  --container-padding: 1rem;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Inter", sans-serif;
  color: var(--text);
  background: var(--bg);
}

/* MZL: Estandarización de Layout */
section {
  padding: 1rem 1rem; /* Padding vertical por defecto */
  display: flex;
  justify-content: center;
  align-items: center; /* Desktop default: align center */
}

.container {
  width: 100%;
  max-width: var(--container-max-width);
  padding: 0 var(--container-padding);
  margin: 0 auto;
}

/* Material Icons Customization */
.material-icons {
  font-size: 24px;
  vertical-align: middle;
}
```

#### 3.2 Unidades de Medida

- **Anchos Máximos:** Usar `px` (ej. `1440px`).
- **Fuentes, Margins, Paddings:** Usar `rem`.

### 4. Estructura de Componentes

Divide la página en componentes modulares independientes bajo `src/components/`.

#### Layout Base (`src/layouts/Layout.astro`)

Debe incluir SEO y OpenGraph:

```astro
---
import '../styles/global.css';
const { title, description, image = 'images/og-image.jpg' } = Astro.props;
const socialImage = `${import.meta.env.BASE_URL}${image}`;
---
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href={`${import.meta.env.BASE_URL}favicon.svg`} />
    <title>{title}</title>
    <meta name="description" content={description} />

    <!-- OpenGraph -->
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={new URL(socialImage, Astro.site)} />
    <meta property="og:type" content="website" />

    <!-- Google Material Icons -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>
<body>
    <slot />
</body>
</html>
```

### 5. Conversión de Elementos

1.  **Iconos:** Reemplaza todos los `<svg>` hardcoded por componentes de iconos o el span de Material Icons.
    ```astro
    <!-- Antes -->
    <svg>...</svg>
    <!-- Después -->
    <span class="material-icons">home</span>
    ```
2.  **Secciones:** Cada sección debe seguir el esquema:
    ```astro
    <section>
      <div class="container">
        <!-- Contenido (Row/Column) -->
      </div>
    </section>
    ```
3.  **Encabezado y Pie de página:** Crea `Header.astro` y `Footer.astro` como componentes independientes.

### 6. Crear instructivo

Crear un archivo **PASOS.md** con los pasos necesarios para:

1. Hacer build del proyecto.
2. Hacer deploy en GitHub Pages (crear un repo `gh-pages`).
3. Delegar el dominio.

#### Delegación de dominio (DNS)

Agregar los siguientes records:

@ A 185.199.108.153  
@ A 185.199.109.153  
@ A 185.199.110.153  
@ A 185.199.111.153  
www CNAME gonzalo-mediabros.github.io  
(o la ruta correspondiente a la cuenta de GitHub que se esté usando)

#### GitHub Pages

Agregar el dominio en:  
GitHub → [REPO] → Settings → Pages

#### Recordatorio

Configurar y validar el formulario de contacto.

### 7. Despliegue

Cualquier cambio se debe verificar localmente con `pnpm run dev` y desplegar con:

```bash
# turbo
pnpm run build
```
