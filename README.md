# Agenda UM

Sistema de gestión de contactos con autenticación de usuarios. Permite crear, visualizar, editar y eliminar contactos personales de forma segura.

## Estructura del Proyecto

```
AgendaUM/
├── BackEnd/
│   ├── config/          # Configuración de base de datos
│   ├── middleware/      # Middleware de autenticación
│   ├── models/          # User.js, Contact.js
│   ├── routes/          # auth, users, contacts
│   └── server.js        # Punto de entrada
└── frontend/
    └── src/
        ├── components/  # Componentes React
        ├── context/     # Context API para estado global
        └── services/    # Llamadas API con Axios
```

## Tecnologías

**Backend:**
- Node.js + Express
- PostgreSQL
- JWT para autenticación
- bcrypt para encriptación

**Frontend:**
- React 19
- React Router
- Axios

## Instalación

### Backend
```bash
cd BackEnd
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Puertos

- Backend: `54055`
- Frontend: `3033`

## Base de Datos

PostgreSQL con dos tablas principales:

**users**
- id, username, email, password (encriptado), created_at

**contacts**
- id, name, address, phone, email, facebook, gender, created_by (FK), created_at

Cada usuario solo puede ver y gestionar sus propios contactos.