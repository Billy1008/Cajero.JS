import { cuentas, movimientos, sesionActiva, clearSesionActiva } from './datos.js';

export function registrarMovimiento(concepto, valor) {
    const cuenta = obtenerCuentaUsuario();
    if (!cuenta) return;
    
    movimientos.push({
        usuario: sesionActiva.usuario,
        fecha: new Date(),
        concepto,
        valor,
        saldo: cuenta.saldo
    });
}

function obtenerCuentaUsuario() {
    return cuentas.find(c => c.usuario === sesionActiva.usuario);
}

export function retirar() {
    console.clear();
    console.log("=== RETIRAR DINERO ===");
    
    const cuenta = obtenerCuentaUsuario();
    if (!cuenta) return false;
    
    const saldoActual = cuenta.saldo;
    console.log(`Saldo actual: $${saldoActual}`);
    const monto = parseFloat(prompt("Ingrese el monto a retirar:"));
    
    if (isNaN(monto) || monto <= 0) {
        console.log("Monto no válido. Debe ser un número positivo.");
        return false;
    }
    
    if (monto > saldoActual) {
        console.log("Fondos insuficientes. No puede retirar más de su saldo actual.");
        return false;
    }
    
    cuenta.saldo -= monto;
    registrarMovimiento("Retiro", -monto);
    
    console.log(`Retiro exitoso por $${monto}. Nuevo saldo: $${cuenta.saldo}`);
    return true;
}

export function consultarSaldo() {
    console.clear();
    console.log("=== CONSULTA DE SALDO ===");
    
    const cuenta = obtenerCuentaUsuario();
    if (!cuenta) return false;
    
    console.log(`Saldo actual: $${cuenta.saldo}`);
    return true;
}

export function consignar() {
    console.clear();
    console.log("=== CONSIGNAR DINERO ===");
    
    const cuenta = obtenerCuentaUsuario();
    if (!cuenta) return false;
    
    const saldoActual = cuenta.saldo;
    console.log(`Saldo actual: $${saldoActual}`);
    const monto = parseFloat(prompt("Ingrese el monto a consignar:"));
    
    if (isNaN(monto) || monto <= 0) {
        console.log("Monto no válido. Debe ser un número positivo.");
        return false;
    }
    
    cuenta.saldo += monto;
    registrarMovimiento("Consignación", monto);
    
    console.log(`Consignación exitosa por $${monto}. Nuevo saldo: $${cuenta.saldo}`);
    return true;
}

export function consultarMovimientos() {
    console.clear();
    console.log("=== HISTORIAL DE MOVIMIENTOS ===");
    
    const movimientosUsuario = movimientos.filter(m => m.usuario === sesionActiva.usuario);
    
    if (movimientosUsuario.length === 0) {
        console.log("No hay movimientos registrados.");
    } else {
        console.log("Fecha y Hora\t\tConcepto\tValor\tSaldo");
        console.log("==================================================");
        
        movimientosUsuario.forEach(mov => {
            const fechaFormateada = new Date(mov.fecha).toLocaleString();
            console.log(`${fechaFormateada}\t${mov.concepto}\t${mov.valor > 0 ? "+" : ""}${mov.valor}\t${mov.saldo}`);
        });
    }
    
    return true;
}

export function cerrarSesion() {
    clearSesionActiva();
    console.log("Sesión cerrada exitosamente.");
    return true;
}