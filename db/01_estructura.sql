-- Ejecútalo en tu base de datos para crear la estructura inicial. 

-- Crear tabla roles
CREATE TABLE roles (
    id_rol SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla sucursales
CREATE TABLE sucursales (
    id_sucursal SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion TEXT NOT NULL,
    telefono VARCHAR(15),
    email VARCHAR(100),
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla usuarios
CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    rol_id INTEGER REFERENCES roles(id_rol),
    id_sucursal INTEGER REFERENCES sucursales(id_sucursal),
    activo BOOLEAN DEFAULT true,
    ultimo_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla categorias
CREATE TABLE categorias (
    id_categoria SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT,
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla clientes
CREATE TABLE clientes (
    id_cliente SERIAL PRIMARY KEY,
    tipo_documento VARCHAR(20) NOT NULL,
    numero_documento VARCHAR(20) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    direccion TEXT,
    telefono VARCHAR(15),
    correo VARCHAR(100),
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla proveedores
CREATE TABLE proveedores (
    id_proveedor SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    nit VARCHAR(20) UNIQUE NOT NULL,
    telefono VARCHAR(15),
    direccion TEXT,
    correo VARCHAR(100),
    contacto_nombre VARCHAR(100),
    contacto_telefono VARCHAR(15),
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla productos
CREATE TABLE productos (
    id_producto SERIAL PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    id_categoria INTEGER REFERENCES categorias(id_categoria),
    precio_compra NUMERIC(10,2) NOT NULL,
    precio_venta NUMERIC(10,2) NOT NULL,
    id_proveedor INTEGER REFERENCES proveedores(id_proveedor),
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla inventarios_sucursal
CREATE TABLE inventarios_sucursal (
    id_inventario SERIAL PRIMARY KEY,
    id_producto INTEGER REFERENCES productos(id_producto),
    id_sucursal INTEGER REFERENCES sucursales(id_sucursal),
    stock_actual INTEGER DEFAULT 0 CHECK (stock_actual >= 0),
    stock_minimo INTEGER DEFAULT 0 CHECK (stock_minimo >= 0),
    tipo_unidad VARCHAR(50),
    ubicacion VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (id_producto, id_sucursal)
);

-- Crear tabla movimientos_inventarios
CREATE TABLE movimientos_inventarios (
    id_movimiento SERIAL PRIMARY KEY,
    id_producto INTEGER REFERENCES productos(id_producto),
    id_sucursal INTEGER REFERENCES sucursales(id_sucursal),
    tipo_movimiento VARCHAR(50) NOT NULL CHECK (tipo_movimiento IN ('entrada', 'salida', 'transferencia', 'ajuste')),
    cantidad INTEGER NOT NULL CHECK (cantidad > 0),
    motivo VARCHAR(50) NOT NULL,
    comentario TEXT,
    id_usuario INTEGER REFERENCES usuarios(id_usuario),
    id_sucursal_destino INTEGER REFERENCES sucursales(id_sucursal),
    documento_referencia VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla ventas
CREATE TABLE ventas (
    id_venta SERIAL PRIMARY KEY,
    numero_documento VARCHAR(20) NOT NULL UNIQUE,
    fecha_venta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_cliente INTEGER REFERENCES clientes(id_cliente),
    subtotal NUMERIC(10,2) NOT NULL,
    total_venta NUMERIC(10,2) NOT NULL,
    metodo_pago VARCHAR(50) NOT NULL CHECK (metodo_pago IN ('efectivo', 'tarjeta', 'transferencia', 'otro')),
    estado VARCHAR(20) DEFAULT 'completada' CHECK (estado IN ('completada', 'anulada', 'pendiente')),
    id_usuario INTEGER REFERENCES usuarios(id_usuario),
    id_sucursal INTEGER REFERENCES sucursales(id_sucursal),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla detalle_ventas
CREATE TABLE detalle_ventas (
    id_detalle SERIAL PRIMARY KEY,
    id_venta INTEGER REFERENCES ventas(id_venta),
    id_producto INTEGER REFERENCES productos(id_producto),
    cantidad INTEGER NOT NULL CHECK (cantidad > 0),
    precio_unitario NUMERIC(10,2) NOT NULL,
    descuento NUMERIC(10,2) DEFAULT 0,
    subtotal NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla compras
CREATE TABLE compras (
    id_compra SERIAL PRIMARY KEY,
    numero_documento VARCHAR(20) NOT NULL UNIQUE,
    fecha_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_proveedor INTEGER REFERENCES proveedores(id_proveedor),
    subtotal NUMERIC(10,2) NOT NULL,
    total_compra NUMERIC(10,2) NOT NULL,
    estado VARCHAR(20) DEFAULT 'completada' CHECK (estado IN ('completada', 'anulada', 'pendiente')),
    id_usuario INTEGER REFERENCES usuarios(id_usuario),
    id_sucursal INTEGER REFERENCES sucursales(id_sucursal),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla detalle_compras
CREATE TABLE detalle_compras (
    id_detalle SERIAL PRIMARY KEY,
    id_compra INTEGER REFERENCES compras(id_compra),
    id_producto INTEGER REFERENCES productos(id_producto),
    cantidad INTEGER NOT NULL CHECK (cantidad > 0),
    precio_unitario NUMERIC(10,2) NOT NULL,
    subtotal NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
