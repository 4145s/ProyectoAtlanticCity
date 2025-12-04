-- =====================================================
-- Script DDL - Sistema de Gestión de Clientes
-- Empresa: Atlantic City
-- Base de Datos: Microsoft SQL Server
-- =====================================================

-- Tabla: SEGMENTO
CREATE TABLE SEGMENTO (
    id_segmento INT PRIMARY KEY IDENTITY(1,1),
    nombre_segmento VARCHAR(100) NOT NULL,
    descripcion VARCHAR(MAX),
    criterios VARCHAR(MAX),
    fecha_creacion DATE DEFAULT GETDATE()
);

-- Tabla: CLIENTE
CREATE TABLE CLIENTE (
    id_cliente INT PRIMARY KEY IDENTITY(1,1),
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    direccion VARCHAR(255),
    fecha_registro DATE DEFAULT GETDATE(),
    estado VARCHAR(20) DEFAULT 'activo' CHECK (estado IN ('activo', 'inactivo', 'suspendido')),
    id_segmento INT,
    FOREIGN KEY (id_segmento) REFERENCES SEGMENTO(id_segmento) ON DELETE SET NULL
);

-- Tabla: PROMOCION
CREATE TABLE PROMOCION (
    id_promocion INT PRIMARY KEY IDENTITY(1,1),
    nombre_promocion VARCHAR(150) NOT NULL,
    descripcion VARCHAR(MAX),
    condiciones VARCHAR(MAX),
    descuento_porcentaje DECIMAL(5,2) CHECK (descuento_porcentaje >= 0 AND descuento_porcentaje <= 100),
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    estado VARCHAR(20) DEFAULT 'activa' CHECK (estado IN ('activa', 'inactiva', 'finalizada')),
    id_segmento INT,
    FOREIGN KEY (id_segmento) REFERENCES SEGMENTO(id_segmento) ON DELETE SET NULL,
    CHECK (fecha_fin >= fecha_inicio)
);

-- Tabla: INTERACCION
CREATE TABLE INTERACCION (
    id_interaccion INT PRIMARY KEY IDENTITY(1,1),
    id_cliente INT NOT NULL,
    id_promocion INT,
    tipo_interaccion VARCHAR(50) NOT NULL,
    fecha_interaccion DATETIME DEFAULT GETDATE(),
    canal VARCHAR(50) CHECK (canal IN ('email', 'sms', 'whatsapp', 'telefono', 'presencial', 'web')),
    estado VARCHAR(20) CHECK (estado IN ('enviado', 'entregado', 'leido', 'respondido', 'fallido')),
    notas VARCHAR(MAX),
    FOREIGN KEY (id_cliente) REFERENCES CLIENTE(id_cliente) ON DELETE CASCADE,
    FOREIGN KEY (id_promocion) REFERENCES PROMOCION(id_promocion) ON DELETE NO ACTION
);

-- Tabla: TAREA_AUTOMATICA
CREATE TABLE TAREA_AUTOMATICA (
    id_tarea INT PRIMARY KEY IDENTITY(1,1),
    nombre_tarea VARCHAR(150) NOT NULL,
    tipo_tarea VARCHAR(50) NOT NULL CHECK (tipo_tarea IN ('envio_email', 'envio_sms', 'segmentacion', 'notificacion')),
    frecuencia VARCHAR(50) CHECK (frecuencia IN ('diaria', 'semanal', 'mensual', 'unica')),
    hora_ejecucion TIME,
    proxima_ejecucion DATETIME,
    estado VARCHAR(20) DEFAULT 'activa' CHECK (estado IN ('activa', 'inactiva', 'pausada')),
    id_promocion INT,
    id_segmento INT,
    FOREIGN KEY (id_promocion) REFERENCES PROMOCION(id_promocion) ON DELETE CASCADE,
    FOREIGN KEY (id_segmento) REFERENCES SEGMENTO(id_segmento) ON DELETE CASCADE
);

-- Tabla: REPORTE
CREATE TABLE REPORTE (
    id_reporte INT PRIMARY KEY IDENTITY(1,1),
    tipo_reporte VARCHAR(50) NOT NULL,
    id_promocion INT NOT NULL,
    fecha_generacion DATETIME DEFAULT GETDATE(),
    total_enviados INT DEFAULT 0 CHECK (total_enviados >= 0),
    total_abiertos INT DEFAULT 0 CHECK (total_abiertos >= 0),
    total_conversiones INT DEFAULT 0 CHECK (total_conversiones >= 0),
    tasa_efectividad DECIMAL(5,2) CHECK (tasa_efectividad >= 0 AND tasa_efectividad <= 100),
    FOREIGN KEY (id_promocion) REFERENCES PROMOCION(id_promocion) ON DELETE CASCADE
);

-- Tabla: USUARIO
CREATE TABLE USUARIO (
    id_usuario INT PRIMARY KEY IDENTITY(1,1),
    nombre_usuario VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    rol VARCHAR(50) NOT NULL CHECK (rol IN ('admin', 'gerente_operaciones', 'gerente_marketing', 'gerente_servicio', 'gerente_rrhh', 'gerente_ti', 'gerente_negocios')),
    nivel_acceso VARCHAR(50) CHECK (nivel_acceso IN ('completo', 'lectura', 'escritura', 'limitado')),
    fecha_creacion DATE DEFAULT GETDATE(),
    estado VARCHAR(20) DEFAULT 'activo' CHECK (estado IN ('activo', 'inactivo', 'bloqueado'))
);

-- Tabla: INCIDENCIA
CREATE TABLE INCIDENCIA (
    id_incidencia INT PRIMARY KEY IDENTITY(1,1),
    id_cliente INT NOT NULL,
    tipo_incidencia VARCHAR(50) NOT NULL,
    descripcion VARCHAR(MAX) NOT NULL,
    fecha_registro DATETIME DEFAULT GETDATE(),
    fecha_resolucion DATETIME,
    estado VARCHAR(20) DEFAULT 'abierta' CHECK (estado IN ('abierta', 'en_proceso', 'resuelta', 'cerrada')),
    solucion VARCHAR(MAX),
    id_usuario INT,
    FOREIGN KEY (id_cliente) REFERENCES CLIENTE(id_cliente) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario) ON DELETE SET NULL
);

-- Tabla: LOG_EJECUCION
CREATE TABLE LOG_EJECUCION (
    id_log INT PRIMARY KEY IDENTITY(1,1),
    id_tarea INT NOT NULL,
    fecha_ejecucion DATETIME DEFAULT GETDATE(),
    estado_ejecucion VARCHAR(50) NOT NULL CHECK (estado_ejecucion IN ('exitosa', 'fallida', 'parcial', 'cancelada')),
    registros_procesados INT DEFAULT 0 CHECK (registros_procesados >= 0),
    errores VARCHAR(MAX),
    FOREIGN KEY (id_tarea) REFERENCES TAREA_AUTOMATICA(id_tarea) ON DELETE CASCADE
);

-- =====================================================
-- Índices para mejorar rendimiento
-- =====================================================

CREATE INDEX idx_cliente_email ON CLIENTE(email);
CREATE INDEX idx_cliente_segmento ON CLIENTE(id_segmento);
CREATE INDEX idx_interaccion_cliente ON INTERACCION(id_cliente);
CREATE INDEX idx_interaccion_promocion ON INTERACCION(id_promocion);
CREATE INDEX idx_interaccion_fecha ON INTERACCION(fecha_interaccion);
CREATE INDEX idx_promocion_fechas ON PROMOCION(fecha_inicio, fecha_fin);
CREATE INDEX idx_promocion_estado ON PROMOCION(estado);
CREATE INDEX idx_reporte_promocion ON REPORTE(id_promocion);
CREATE INDEX idx_incidencia_cliente ON INCIDENCIA(id_cliente);
CREATE INDEX idx_incidencia_estado ON INCIDENCIA(estado);
CREATE INDEX idx_log_tarea ON LOG_EJECUCION(id_tarea);

-- =====================================================
-- Fin del Script DDL para SQL Server
-- =====================================================