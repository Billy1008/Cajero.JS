import { usuarios, cuentas, movimientos } from './datos.js';

export function cargarDatosPrueba() {
    usuarios.push({
        identificacion: "123456789",
        usuario: "admin",
        correo: "admin@banco.com",
        clave: "1234"
    });
    
    cuentas.push({
        usuario: "admin",
        saldo: 1000000,
        bloqueada: false
    });
    
    // Algunos movimientos de prueba
    const fechaPasada = new Date();
    fechaPasada.setDate(fechaPasada.getDate() - 1);
    
    movimientos.push({
        usuario: "admin",
        fecha: fechaPasada,
        concepto: "Consignación inicial",
        valor: 1000000,
        saldo: 1000000
    });
}