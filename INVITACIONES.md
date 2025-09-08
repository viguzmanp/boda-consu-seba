# Sistema de Invitaciones Personalizadas con Base de Datos - Consu & Seba

## 📋 Descripción

Sistema completo de invitaciones de boda personalizadas con base de datos SQLite que permite crear, gestionar y rastrear invitaciones con nombres específicos y tratamientos apropiados según el género del invitado.

## 🚀 Características

### Personalización Avanzada
- **Mensajes por género**: Textos específicos para hombre, mujer o pareja
- **Nombres personalizados**: Incluye el nombre del invitado en la invitación
- **URLs únicas**: Cada invitación tiene su enlace compartible único

### Sistema de Gestión
- **Base de datos SQLite**: Almacenamiento persistente de todas las invitaciones
- **Estados de seguimiento**: Pendiente → Enviada → Vista → Confirmada
- **Estadísticas en tiempo real**: Dashboard con métricas de participación
- **Gestión completa**: Crear, editar, eliminar y rastrear invitaciones

### Tracking Automático
- **Vista automática**: Se marca como "vista" cuando el invitado accede
- **Fechas de seguimiento**: Registro de cuándo se creó, envió y vio
- **Estados manuales**: Posibilidad de marcar como enviada o confirmada

## 📖 Cómo usar

### Para invitados
- Simplemente abre el enlace personalizado que recibiste
- La invitación mostrará tu nombre y el mensaje apropiado
- Tu vista se registrará automáticamente en el sistema

### Para administradores

1. **Acceder al generador**:
   - Ve a `http://localhost:3001/generator`
   - O haz clic en "Admin" en el pie de página de la invitación

2. **Dashboard de estadísticas**:
   - **Total**: Número total de invitaciones creadas
   - **Enviadas**: Invitaciones marcadas como enviadas
   - **Vistas**: Invitaciones que han sido abiertas por los invitados
   - **Confirmadas**: Invitaciones confirmadas por los invitados

3. **Crear nueva invitación**:
   - Ingresa el nombre del invitado
   - Selecciona el tipo (Hombre/Mujer/Pareja)
   - Haz clic en "Agregar a la lista"
   - La invitación se guarda automáticamente en la base de datos

4. **Gestionar invitaciones existentes**:
   - **📤 Enviar**: Marcar como enviada
   - **👁️ Vista**: Marcar como vista (también automático)
   - **✅ Confirmar**: Marcar como confirmada
   - **📋 Copiar**: Copiar enlace individual
   - **🗑️ Eliminar**: Eliminar invitación

## 🗄️ Base de Datos

### Estructura de la tabla `invitations`:
```sql
CREATE TABLE invitations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('male', 'female', 'couple')),
  url TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  sent_at DATETIME,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'viewed', 'confirmed'))
);
```

### Estados de invitación:
- **pending**: Recién creada, no enviada
- **sent**: Marcada como enviada manualmente
- **viewed**: El invitado ha abierto el enlace
- **confirmed**: El invitado ha confirmado asistencia

## 💡 Ejemplos de uso

### URLs generadas:
- `/?name=Juan&type=male` → "Estimado Juan, ¡estás cordialmente invitado..."
- `/?name=María&type=female` → "Estimada María, ¡estás cordialmente invitada..."
- `/?name=Juan y María&type=couple` → "Estimados Juan y María, ¡ustedes están cordialmente invitados..."

### Mensajes personalizados:
- **Hombre**: "Estimado [Nombre], ¡estás cordialmente invitado a celebrar con nosotros!"
- **Mujer**: "Estimada [Nombre], ¡estás cordialmente invitada a celebrar con nosotros!"
- **Pareja**: "Estimados [Nombres], ¡ustedes están cordialmente invitados a celebrar con nosotros!"

## �️ API Endpoints

- `GET /api/invitations` - Obtener todas las invitaciones
- `POST /api/invitations` - Crear nueva invitación
- `PUT /api/invitations/[id]` - Actualizar estado de invitación
- `DELETE /api/invitations/[id]` - Eliminar invitación
- `GET /api/stats` - Obtener estadísticas
- `POST /api/track-view` - Registrar vista de invitación

## �🔧 Funcionalidades del generador

- ✅ Vista previa en tiempo real del mensaje
- ✅ Gestión completa de invitaciones con base de datos
- ✅ Dashboard de estadísticas en tiempo real
- ✅ Sistema de estados y seguimiento
- ✅ Tracking automático de vistas
- ✅ Copia rápida de enlaces individuales
- ✅ Exportación masiva de todas las URLs
- ✅ Gestión de fechas de creación y envío

## 📱 Responsive Design

El sistema funciona perfectamente en:
- 💻 Computadoras de escritorio
- 📱 Teléfonos móviles
- 📐 Tablets

## 🎨 Características visuales

- Fondo con patrón personalizado
- Efectos de luz ovalada en la cita bíblica
- Animaciones suaves con Framer Motion
- Tipografía personalizada (Adelia para títulos)
- Colores temáticos en tonos rosa y naranja
- Dashboard administrativo con métricas coloridas

## 🚀 Instalación y configuración

1. **Dependencias instaladas**:
   ```bash
   npm install better-sqlite3 @types/better-sqlite3
   ```

2. **Ejecutar servidor**:
   ```bash
   npm run dev
   ```

3. **Base de datos**:
   - Se crea automáticamente en `invitations.db`
   - No requiere configuración adicional

## 📊 Funcionalidades de tracking

- **Creación automática**: Fecha y hora de creación de cada invitación
- **Envío manual**: Posibilidad de marcar cuándo se envió
- **Vista automática**: Se registra automáticamente cuando el invitado accede
- **Confirmación manual**: Para cuando el invitado confirma asistencia
- **Estadísticas agregadas**: Contadores en tiempo real de todos los estados

---

*Desarrollado con ❤️ para la boda de Consuelo y Sebastián*
*Powered by Next.js, SQLite y mucho amor por los detalles*
