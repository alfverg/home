# Home Page · cómo dejarla funcionando (≈20 min)

## 1. Notion (5 min)
1. Entra a https://www.notion.so/profile/integrations → **Nueva integración** (interna) → copia el token `secret_…` / `ntn_…`.
2. Abre tu base **📋 Pendientes** → `···` → **Conexiones** → agrega tu integración.

## 2. Apps Script (10 min)
1. https://script.google.com → **Proyecto nuevo** → pega `apps-script/Code.gs`.
2. ⚙️ Configuración del proyecto → **Propiedades del script** → agrega `NOTION_TOKEN` con el token.
3. Arriba elige la función `setup` → **Ejecutar** → acepta permisos (Calendar, Gmail, conexiones externas).
4. En **Registro de ejecución** copia tu **KEY**.
5. **Implementar → Nueva implementación → Aplicación web**. Ejecutar como: *Yo*. Acceso: *Cualquier usuario*. Copia la URL `…/exec`.

## 3. Gmail (2 min)
Crea la etiqueta **Home**. Lo que tenga esa etiqueta (por filtro o Gemini) aparece en la página.

## 4. Página (GitHub Pages)
La sube Claude al repo. Ábrela en el S25 con Chrome → pega URL y KEY → menú ⋮ → **Agregar a pantalla principal**.

## 5. Hábitos (Google Sheet)
`setup()` también crea el Sheet **Home · Hábitos** (pestañas Estructura y Registro) y deja su URL en el registro. Ahí se guardan tus hábitos y sus ✓. No lo edites a mano salvo emergencia.

> Si cambias `Code.gs`: pégalo, corre `setup()` una vez y luego Implementar → Administrar implementaciones → ✏️ → Versión: nueva. Así la URL no cambia.
