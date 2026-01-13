# Guía: Actualización de Google Apps Script

Sigue estos pasos detallados para corregir el error de **"Fail to Fetch"** y autorizar correctamente el envío de correos.

### 1. Configuración del Despliegue (CRÍTICO)

El error "Fail to Fetch" ocurre porque la configuración en tu imagen es demasiado restrictiva para una web pública. Debes configurar el script así:

1. En el editor de Google Apps Script, ve a **Implementar** > **Administrar implementaciones**.
2. Haz clic en el icono del **lápiz** (Editar) en tu implementación activa.
3. **Configura los campos exactamente así:**
   - **Ejecutar como:** Selecciona **"Yo"** (tu cuenta de email).
   - **Quién tiene acceso:** Selecciona **"Cualquiera"** (o "Anyone").
     _Nota: NO selecciones "Cualquier usuario con cuenta de Google", ya que eso obliga a los usuarios a loguearse y causa el error de Fetch._
4. Haz clic en **Implementar**.

### 2. Cómo Autorizar GmailApp (Paso a Paso)

Al usar `GmailApp`, Google te pedirá confirmar que confías en tu propio script para enviar mails:

1. Al darle a **Implementar**, si aparece una ventana de "Se requiere autorización", haz clic en **Autorizar acceso**.
2. **Selecciona tu cuenta de Google**.
3. **Pantalla de Alerta:** Verás un aviso que dice "Google no ha verificado esta aplicación".
   - Haz clic en el texto pequeño **"Configuración avanzada"** (o "Advanced").
   - Haz clic en el enlace de abajo que dice **"Ir a [Nombre de tu Proyecto] (no seguro)"**.
4. Aparecerá la lista de permisos (ver hojas de cálculo, enviar correos). Haz clic en **Permitir**.

### 3. Verificar que el Endpoint está Activo

Para comprobar que los permisos son correctos sin usar el formulario:

1. Copia la **URL de la aplicación web** (la que termina en `/exec`).
2. Pégala directamente en una pestaña nueva del navegador.
3. **Resultado esperado:** Deberías ver este texto en blanco y negro:
   `{"ok":true,"msg":"Endpoint activo. Use POST para enviar leads."}`
   _Si te pide login o da error, vuelve al Paso 1._

### 4. Actualizar .env.local

Si la URL que te dio Google al final del proceso es distinta a la que tenías, **cópiala y actualízala** en tu archivo `.env.local`:

```bash
PUBLIC_SCRIPT_URL=https://script.google.com/macros/s/NUEVOS_CARACTERES/exec
```

---

### ¿Por qué fallaba antes?

En tu configuración anterior (la de la foto), tenías "Ejecutar como: Usuario que accede". Esto significa que Google intentaba usar la cuenta de la persona que visita tu web para enviar el formulario. Como esa persona no ha dado permisos, el navegador bloquea la acción por seguridad. Al poner **"Ejecutar como: Yo"**, el script usa tus propios permisos para guardar el lead y enviar el mail, sin importar quién sea el visitante.
