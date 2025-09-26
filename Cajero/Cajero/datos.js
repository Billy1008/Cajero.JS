// Datos de almacenamiento
export const usuarios = [];
export const cuentas = [];
export const movimientos = [];
export let sesionActiva = null;

export function setSesionActiva(usuario) {
    sesionActiva = usuario;
}

export function clearSesionActiva() {
    sesionActiva = null;
}