-- Ejecútalo en tu base de datos para poblar las tablas con datos. 

-- Poblar la tabla roles
INSERT INTO roles (nombre, descripcion) VALUES
('admin', 'Administrador del sistema'),
('vendedor', 'Usuario encargado de ventas'),
('inventario', 'Usuario encargado de gestionar inventarios'),
('cliente', 'Usuario cliente del sistema'),
('proveedor', 'Usuario proveedor'),
('gerente', 'Usuario encargado de supervisar el sistema'),
('analista', 'Usuario encargado de análisis de datos'),
('supervisor', 'Usuario supervisor'),
('tecnico', 'Usuario técnico'),
('auxiliar', 'Usuario auxiliar');

-- Poblar la tabla sucursales
INSERT INTO sucursales (nombre, direccion, telefono, email, activo) VALUES
('Sucursal Central', 'Av. Principal 123', '123456789', 'central@sistema.com', true),
('Sucursal Norte', 'Calle Norte 456', '987654321', 'norte@sistema.com', true),
('Sucursal Sur', 'Calle Sur 789', '567123456', 'sur@sistema.com', true),
('Sucursal Este', 'Av. Este 101', '345678901', 'este@sistema.com', true),
('Sucursal Oeste', 'Calle Oeste 202', '234567890', 'oeste@sistema.com', true),
('Sucursal Centro', 'Plaza Centro 303', '678901234', 'centro@sistema.com', true),
('Sucursal Andina', 'Av. Andina 404', '890123456', 'andina@sistema.com', true),
('Sucursal Llanos', 'Calle Llanos 505', '901234567', 'llanos@sistema.com', true),
('Sucursal Valle', 'Av. Valle 606', '012345678', 'valle@sistema.com', true),
('Sucursal Montaña', 'Calle Montaña 707', '789012345', 'montaña@sistema.com', true);

-- Poblar la tabla usuarios
INSERT INTO usuarios (nombre, apellido, correo, contrasena, rol_id, id_sucursal, activo) VALUES
('Juan', 'Pérez', 'juan.perez@sistema.com', 'password123', 1, 1, true),
('María', 'López', 'maria.lopez@sistema.com', 'password123', 2, 1, true),
('Carlos', 'Martínez', 'carlos.martinez@sistema.com', 'password123', 3, 2, true),
('Ana', 'Gómez', 'ana.gomez@sistema.com', 'password123', 2, 3, true),
('Pedro', 'Rodríguez', 'pedro.rodriguez@sistema.com', 'password123', 4, 4, true),
('Laura', 'Fernández', 'laura.fernandez@sistema.com', 'password123', 5, 5, true),
('Luis', 'García', 'luis.garcia@sistema.com', 'password123', 6, 6, true),
('Sofía', 'Hernández', 'sofia.hernandez@sistema.com', 'password123', 7, 7, true),
('Diego', 'Torres', 'diego.torres@sistema.com', 'password123', 8, 8, true),
('Elena', 'Ramírez', 'elena.ramirez@sistema.com', 'password123', 9, 9, true);

-- Poblar la tabla categorias
INSERT INTO categorias (nombre, descripcion, activo) VALUES
('Electrónica', 'Productos electrónicos', true),
('Ropa', 'Ropa para todas las edades', true),
('Calzado', 'Zapatos y zapatillas', true),
('Hogar', 'Productos para el hogar', true),
('Juguetes', 'Juguetes para niños', true),
('Alimentos', 'Productos alimenticios', true),
('Bebidas', 'Bebidas y licores', true),
('Deportes', 'Artículos deportivos', true),
('Libros', 'Libros y revistas', true),
('Tecnología', 'Productos tecnológicos', true);

-- Poblar la tabla clientes
INSERT INTO clientes (tipo_documento, numero_documento, nombre, direccion, telefono, correo, activo) VALUES
('CI', '12345678', 'Mario Gutiérrez', 'Calle Falsa 123', '555123456', 'mario.gutierrez@cliente.com', true),
('CI', '87654321', 'Lucía Ramírez', 'Av. Real 456', '555987654', 'lucia.ramirez@cliente.com', true),
('CI', '11223344', 'Alberto Gómez', 'Calle Verde 789', '555567123', 'alberto.gomez@cliente.com', true),
('CI', '44332211', 'Carla Rodríguez', 'Calle Azul 101', '555345678', 'carla.rodriguez@cliente.com', true),
('CI', '55667788', 'Fernando Torres', 'Av. Roja 202', '555234567', 'fernando.torres@cliente.com', true),
('CI', '88776655', 'Patricia López', 'Calle Amarilla 303', '555678901', 'patricia.lopez@cliente.com', true),
('CI', '99887766', 'Sergio Fernández', 'Calle Negra 404', '555890123', 'sergio.fernandez@cliente.com', true),
('CI', '66554433', 'Mariana García', 'Av. Blanca 505', '555901234', 'mariana.garcia@cliente.com', true),
('CI', '33221100', 'Gabriel Hernández', 'Calle Gris 606', '555012345', 'gabriel.hernandez@cliente.com', true),
('CI', '00112233', 'Natalia Ramírez', 'Av. Naranja 707', '555789012', 'natalia.ramirez@cliente.com', true);

-- Poblar la tabla proveedores
INSERT INTO proveedores (nombre, nit, telefono, direccion, correo, contacto_nombre, contacto_telefono, activo) VALUES
('Proveedor Central', '123456789', '555123456', 'Calle Central 123', 'central@proveedor.com', 'Carlos Pérez', '555123457', true),
('Proveedor Norte', '987654321', '555987654', 'Av. Norte 456', 'norte@proveedor.com', 'Ana López', '555987655', true),
('Proveedor Sur', '567123456', '555567123', 'Calle Sur 789', 'sur@proveedor.com', 'Mario Gómez', '555567124', true),
('Proveedor Este', '345678901', '555345678', 'Av. Este 101', 'este@proveedor.com', 'Lucía Ramírez', '555345679', true),
('Proveedor Oeste', '234567890', '555234567', 'Calle Oeste 202', 'oeste@proveedor.com', 'Fernando Torres', '555234568', true),
('Proveedor Centro', '678901234', '555678901', 'Plaza Centro 303', 'centro@proveedor.com', 'Patricia López', '555678902', true),
('Proveedor Andina', '890123456', '555890123', 'Av. Andina 404', 'andina@proveedor.com', 'Sergio Fernández', '555890124', true),
('Proveedor Llanos', '901234567', '555901234', 'Calle Llanos 505', 'llanos@proveedor.com', 'Mariana García', '555901235', true),
('Proveedor Valle', '012345678', '555012345', 'Av. Valle 606', 'valle@proveedor.com', 'Gabriel Hernández', '555012346', true),
('Proveedor Montaña', '789012345', '555789012', 'Calle Montaña 707', 'montaña@proveedor.com', 'Natalia Ramírez', '555789013', true);

-- Poblar la tabla productos
INSERT INTO productos (codigo, nombre, descripcion, id_categoria, precio_compra, precio_venta, id_proveedor, activo) VALUES
('PROD001', 'Televisor', 'Televisor de 42 pulgadas', 1, 250.00, 300.00, 1, true),
('PROD002', 'Celular', 'Celular de alta gama', 1, 500.00, 650.00, 2, true),
('PROD003', 'Zapatillas', 'Zapatillas deportivas', 3, 40.00, 60.00, 3, true),
('PROD004', 'Sofá', 'Sofá de tres plazas', 4, 200.00, 250.00, 4, true),
('PROD005', 'Laptop', 'Laptop de última generación', 10, 800.00, 950.00, 5, true),
('PROD006', 'Pelota', 'Pelota de fútbol profesional', 8, 20.00, 30.00, 6, true),
('PROD007', 'Camiseta', 'Camiseta deportiva', 2, 15.00, 25.00, 7, true),
('PROD008', 'Libro', 'Novela best-seller', 9, 10.00, 15.00, 8, true),
('PROD009', 'Refrigerador', 'Refrigerador de dos puertas', 4, 350.00, 450.00, 9, true),
('PROD010', 'Auriculares', 'Auriculares inalámbricos', 10, 50.00, 70.00, 10, true);

-- Poblar la tabla inventarios_sucursal
INSERT INTO inventarios_sucursal (id_producto, id_sucursal, stock_actual, stock_minimo, tipo_unidad, ubicacion) VALUES
(1, 1, 20, 5, 'Unidad', 'A1'),
(2, 2, 15, 3, 'Unidad', 'B2'),
(3, 3, 30, 10, 'Par', 'C3'),
(4, 4, 10, 2, 'Unidad', 'D4'),
(5, 5, 5, 1, 'Unidad', 'E5'),
(6, 6, 25, 5, 'Unidad', 'F6'),
(7, 7, 40, 15, 'Unidad', 'G7'),
(8, 8, 50, 20, 'Unidad', 'H8'),
(9, 9, 8, 2, 'Unidad', 'I9'),
(10, 10, 12, 3, 'Unidad', 'J10');

-- Poblar la tabla movimientos_inventarios
INSERT INTO movimientos_inventarios (id_producto, id_sucursal, tipo_movimiento, cantidad, motivo, comentario, id_usuario, id_sucursal_destino, documento_referencia) VALUES
(1, 1, 'entrada', 10, 'Compra', 'Ingreso de nuevos productos', 1, NULL, 'DOC001'),
(2, 2, 'salida', 5, 'Venta', 'Producto vendido', 2, NULL, 'DOC002'),
(3, 3, 'ajuste', 2, 'Ajuste', 'Corrección de stock', 3, NULL, 'DOC003'),
(4, 4, 'transferencia', 3, 'Reubicación', 'Transferido a otra sucursal', 4, 5, 'DOC004'),
(5, 5, 'entrada', 4, 'Compra', 'Ingreso de nuevos productos', 5, NULL, 'DOC005'),
(6, 6, 'salida', 7, 'Venta', 'Producto vendido', 6, NULL, 'DOC006'),
(7, 7, 'ajuste', 1, 'Ajuste', 'Corrección de stock', 7, NULL, 'DOC007'),
(8, 8, 'entrada', 20, 'Compra', 'Ingreso masivo', 8, NULL, 'DOC008'),
(9, 9, 'salida', 3, 'Venta', 'Producto vendido', 9, NULL, 'DOC009'),
(10, 10, 'entrada', 5, 'Compra', 'Ingreso adicional', 10, NULL, 'DOC010');

-- Poblar la tabla ventas
INSERT INTO ventas (numero_documento, fecha_venta, id_cliente, subtotal, total_venta, metodo_pago, estado, id_usuario, id_sucursal) VALUES
('VENT001', NOW(), 1, 100.00, 110.00, 'efectivo', 'completada', 1, 1),
('VENT002', NOW(), 2, 200.00, 220.00, 'tarjeta', 'completada', 2, 2),
('VENT003', NOW(), 3, 150.00, 165.00, 'transferencia', 'pendiente', 3, 3),
('VENT004', NOW(), 4, 50.00, 55.00, 'efectivo', 'anulada', 4, 4),
('VENT005', NOW(), 5, 300.00, 330.00, 'tarjeta', 'completada', 5, 5),
('VENT006', NOW(), 6, 400.00, 440.00, 'transferencia', 'completada', 6, 6),
('VENT007', NOW(), 7, 250.00, 275.00, 'efectivo', 'completada', 7, 7),
('VENT008', NOW(), 8, 350.00, 385.00, 'tarjeta', 'pendiente', 8, 8),
('VENT009', NOW(), 9, 120.00, 132.00, 'efectivo', 'completada', 9, 9),
('VENT010', NOW(), 10, 80.00, 88.00, 'transferencia', 'completada', 10, 10);

-- Poblar la tabla detalle_ventas
INSERT INTO detalle_ventas (id_venta, id_producto, cantidad, precio_unitario, descuento, subtotal) VALUES
(1, 1, 1, 100.00, 0.00, 100.00),
(2, 2, 1, 200.00, 0.00, 200.00),
(3, 3, 2, 50.00, 0.00, 100.00),
(4, 4, 4, 50.00, 5.00, 45.00),
(5, 5, 5, 300.00, 0.00, 300.00),
(6, 6, 6, 200.00, 10.00, 190.00),
(7, 7, 7, 250.00, 0.00, 250.00),
(8, 8, 8, 350.00, 0.00, 350.00),
(9, 9, 9, 120.00, 0.00, 120.00),
(10, 10, 10, 80.00, 0.00, 80.00);

-- Poblar la tabla compras
INSERT INTO compras (numero_documento, fecha_compra, id_proveedor, subtotal, total_compra, estado, id_usuario, id_sucursal) VALUES
('COMP001', NOW(), 1, 200.00, 220.00, 'completada', 1, 1),
('COMP002', NOW(), 2, 150.00, 165.00, 'pendiente', 2, 2),
('COMP003', NOW(), 3, 400.00, 440.00, 'completada', 3, 3),
('COMP004', NOW(), 4, 300.00, 330.00, 'completada', 4, 4),
('COMP005', NOW(), 5, 100.00, 110.00, 'pendiente', 5, 5),
('COMP006', NOW(), 6, 500.00, 550.00, 'completada', 6, 6),
('COMP007', NOW(), 7, 600.00, 660.00, 'anulada', 7, 7),
('COMP008', NOW(), 8, 250.00, 275.00, 'completada', 8, 8),
('COMP009', NOW(), 9, 320.00, 352.00, 'completada', 9, 9),
('COMP010', NOW(), 10, 450.00, 495.00, 'completada', 10, 10);

-- Poblar la tabla detalle_compras
INSERT INTO detalle_compras (id_compra, id_producto, cantidad, precio_unitario, subtotal) VALUES
(1, 1, 1, 200.00, 200.00),
(2, 2, 1, 150.00, 150.00),
(3, 3, 2, 100.00, 200.00),
(4, 4, 4, 300.00, 300.00),
(5, 5, 5, 100.00, 100.00),
(6, 6, 6, 250.00, 500.00),
(7, 7, 7, 600.00, 600.00),
(8, 8, 8, 125.00, 250.00),
(9, 9, 9, 160.00, 320.00),
(10, 10, 10, 225.00, 450.00);

