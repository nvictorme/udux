# UDUx - monorepo del sistema de gestión de pacientes

## Descripción

Este repositorio contiene el código fuente del sistema de gestión de pacientes UDUx, el cual es un sistema de información que permite la gestión de pacientes en la Unidad Diagnóstica de Urología.

## Estructura del repositorio

El repositorio está estructurado en los siguientes directorios:

- `app`: React app que contiene el frontend del sistema. Utiliza vite como bundler, shadcn-ui como librería de componentes y tailwindcss para estilos.
- `backend`: Este backend está desarrollado en Node.js y Express. Utiliza TypeORM como ORM y SQLite como base de datos.
- `shared`: Contiene código compartido entre el frontend y el backend, como las interfaces, enums, helpers, etc.

## Requisitos

- Node.js >= 20 (recomendado)
- [serve](https://www.npmjs.com/package/serve) (requerido)
- [pm2](https://www.npmjs.com/package/pm2) (requerido)

## Configuración

1. Desde el directorio `backend`, ejecutar `npm run migration:run` para inicializar la base de datos.
2. Desde el directorio `backend`, ejecutar `npm run seed:old-data` para migrar los datos de la base de datos antigua a la nueva.
3. Editar el archivo `app/src/config.ts` y cambiar la variable `API_URL` por la URL del MagicDNS de Tailscale que apunta al backend o por localhost si se está ejecutando en local.

## Instalación

En la raíz del proyecto, ejecutar:

1. `npm install`.
2. `npm run build`.
3. `npm run start`.

## Desarrollo

Para ejecutar el proyecto en modo desarrollo, ejecutar `npm run dev` desde la raíz del proyecto.

## Licencia

Este proyecto está licenciado bajo la licencia MIT.
