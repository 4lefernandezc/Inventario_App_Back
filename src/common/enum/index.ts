//Roles
export const Roles = {
  ADMIN: 'admin',
  VENDEDOR: 'vendedor',
  INVENTARIO: 'inventario',
};

//MetodosPago
export const MetodosPago = {
  EFECTIVO: 'efectivo',
  TARJETA: 'tarjeta',
  TRANSFERENCIA: 'transferencia',
  OTRO: 'otro',
};

//EstadosVenta
export const EstadosVenta = {
  COMPLETADA: 'completada',
  ANULADA: 'anulada',
  PENDIENTE: 'pendiente',
};

//EstadosCompra
export const EstadosCompra = {
  COMPLETADA: 'completada',
  ANULADA: 'anulada',
  PENDIENTE: 'pendiente',
};

//TiposMovimientoInventario
export const TiposMovimientoInventario = {
  ENTRADA: 'entrada',
  SALIDA: 'salida',
  TRANSFERENCIA: 'transferencia',
  AJUSTE: 'ajuste',
};

//TiposDocumentoCliente
export const TiposDocumentoCliente = {
  CI: 'ci',
  PASAPORTE: 'pasaporte',
  NIT: 'nit',
};

//EstadosGenerales
export const EstadosGenerales = {
  ACTIVO: true,
  INACTIVO: false,
};