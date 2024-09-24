# Sistema de Gestión de Clientes y Proveedores

## Descripción del Proyecto

El sistema web propuesto automatiza el proceso de manejo de clientes y proveedores, así como la administración de pagos y comisiones para empleados. Este sistema simplificará la verificación de pagos, permitirá una gestión eficiente de las comisiones y mejorará la visibilidad y trazabilidad de las transacciones.

## Funcionalidades Principales

### 1. Gestión de Clientes y Proveedores
- **Registro y Actualización**: Alta y modificación de datos de clientes y proveedores.
- **Visualización**: Listado y búsqueda de clientes y proveedores.
- **Historial de Transacciones**: Registro de todas las transacciones realizadas con cada cliente y proveedor.

### 2. Manejo de Comisiones a Empleados
- **Registro de Ventas**: Los empleados pueden registrar ventas con detalles como cliente, monto y fecha.
- **Cálculo Automático**: Cálculo automático de comisión a empleados.
- **Subida de Comprobantes**: Permite a los empleados subir fotos de los comprobantes de transacción.
- **Verificación de Pagos**: El supervisor verifica las fotos de los comprobantes y confirma las transacciones.
- **Generación de Reportes**: Reportes sobre comisiones pagadas, pendientes y otros detalles relevantes.

### 3. Automatización del Proceso
- **Notificaciones**: Notificaciones automáticas a supervisores y empleados sobre el estado de las transacciones y verificación.
- **Verificación Automática**: Comparación automática de datos ingresados con los comprobantes subidos.

### 4. Extensibilidad
- **Módulos Adicionales**: Posibilidad de añadir módulos adicionales como gestión de inventario, análisis de ventas y otros según necesidades futuras.

## Módulo de Control de Empleados

### Descripción General
Este módulo está diseñado para gestionar el acceso al sistema y controlar las actividades de los empleados. Permite a los empleados iniciar sesión de manera segura con credenciales individuales y proporciona una visión integral del uso del sistema por parte de cada usuario. Esto facilita la administración, supervisión y auditoría de las acciones realizadas dentro del sistema.

#### 1. Registro de Empleados:
- **Formulario de Registro**:
  - **Campos**: Nombre completo, dirección de correo electrónico, usuario, contraseña y rol (por ejemplo, empleado, supervisor, administrador).
  - **Validación**: Verifica que los datos sean válidos, que el usuario no exista ya y que la contraseña cumpla con los requisitos de seguridad (como longitud mínima, caracteres especiales, etc.).
- **Asignación de Rol**: Permite asignar un rol específico a cada empleado, que determina los permisos y accesos dentro del sistema.

#### 2. Inicio de Sesión:
- **Formulario de Login**:
  - **Campos**: Usuario y contraseña.
  - **Autenticación**: Verifica las credenciales proporcionadas contra la base de datos para permitir el acceso al sistema.
- **Recuperación de Contraseña**: Permite a los usuarios recuperar o restablecer su contraseña mediante un proceso de verificación de identidad (como un enlace enviado al correo electrónico).

#### 3. Gestión de Sesiones:
- **Monitoreo de Sesiones Activas**: Permite ver qué usuarios están actualmente conectados al sistema.
- **Expiración de Sesión**: Implementa políticas de expiración de sesión para mejorar la seguridad, como el cierre automático de sesión después de un período de inactividad.

#### 4. Registro de Actividades:
- **Auditoría**: Registra todas las acciones realizadas por cada usuario (por ejemplo, cambios en datos, accesos, etc.), lo que permite auditar y rastrear las actividades en el sistema.
- **Reportes de Actividad**: Genera reportes sobre las actividades de los empleados, que pueden ser utilizados para análisis de uso y resolución de problemas.

#### 5. Seguridad y Acceso:
- **Autenticación Multifactor (MFA) (Opcional)**: Añade una capa adicional de seguridad requiriendo un segundo factor de autenticación, como un código enviado al móvil del usuario.
- **Encriptación de Contraseñas**: Las contraseñas se almacenan de manera segura utilizando técnicas de encriptación para proteger los datos de acceso.

#### 6. Configuración de Permisos:
- **Control de Acceso Basado en Roles (RBAC)**: Configura permisos específicos para diferentes roles, determinando qué funcionalidades y datos están disponibles para cada tipo de usuario.
- **Permisos Personalizados**: Permite definir permisos específicos a nivel de funcionalidad o de datos, ajustados a las necesidades de la empresa.

## Cronograma del Proyecto

### Posibilidad de Extensión
El sistema está diseñado para ser flexible y extensible. Se pueden agregar módulos adicionales o funcionalidades futuras, como:
- **Gestión de Inventario**: Control del stock y gestión de productos.
- **Análisis de Ventas**: Reportes avanzados y análisis de datos.
- **Automatización Adicional**: Integraciones con otros sistemas y servicios.
- **Funcionalidades Personalizadas**: Desarrollo de características específicas según las necesidades del cliente.

Estas implementaciones no están incluidas en el presupuesto presentado.


#### Proyecto implementado con el empaquetador Vite 