import { sesionActiva } from './datos.js';
import { iniciarSesion, registrarUsuario, cambiarContraseña } from './autenticacion.js';
import { retirar, consultarSaldo, consignar, consultarMovimientos, cerrarSesion } from './operaciones.js';

export function mostrarMenuPrincipal() {
    console.clear();
    console.log("=== MENÚ PRINCIPAL ===");
    console.log(`Usuario: ${sesionActiva.usuario}`);
    console.log("1. Retirar");
    console.log("2. Consultar saldo");
    console.log("3. Consignar");
    console.log("4. Consultar movimientos");
    console.log("5. Cambiar contraseña");
    console.log("6. Salir");
    
    const opcion = prompt("Seleccione una opción (1-6): \n1. Retirar \n2. Consultar Saldo \n3. Consignar \n4 Consultar Movimientos \n5 Cambiar Contraseña \n6 Salir");
    
    let resultado;
    switch(opcion) {
        case "1":
            resultado = retirar();
            break;
        case "2":
            resultado = consultarSaldo();
            break;
        case "3":
            resultado = consignar();
            break;
        case "4":
            resultado = consultarMovimientos();
            break;
        case "5":
            resultado = cambiarContraseña();
            break;
        case "6":
            resultado = iniciarSistemaBancario();
            return resultado; // Salir del menú
        default:
            console.log("Opción no válida. Intente nuevamente.");
    }
    
    setTimeout(() => {
        if (resultado !== false) {
            mostrarMenuPrincipal();
        } else {
            mostrarMenuPrincipal();
        }
    }, opcion === "4" ? 5000 : 2500);
}

export function iniciarSistemaBancario() {
    console.clear();
    console.log("=== CAJERO AUTOMATICO ===");
    console.log("1. Iniciar sesión");
    console.log("2. Registrar nuevo usuario");
    console.log("3. Salir");
    
    const opcion = prompt("Seleccione una opción (1-3): \n1. Iniciar sesión \n2. Registrar nuevo usuario \n3. Salir");
    
    let resultado;
    switch(opcion) {
        case "1":
            resultado = iniciarSesion();
            if (resultado) {
                setTimeout(mostrarMenuPrincipal, 1500);
            } else {
                setTimeout(iniciarSistemaBancario, 2000);
            }
            break;
        case "2":
            resultado = registrarUsuario();
            setTimeout(iniciarSistemaBancario, resultado ? 2000 : 1500);
            break;
        case "3":
            console.log("Gracias por usar nuestro Cajero. ¡Hasta pronto!");
            return;
        default:
            console.log("Opción no válida. Intente nuevamente.");
            setTimeout(iniciarSistemaBancario, 1000);
    }
}