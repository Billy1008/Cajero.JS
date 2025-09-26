import { usuarios, cuentas, setSesionActiva } from './datos.js';
import { sesionActiva } from './datos.js';


export function iniciarSesion() {
    console.clear();
    console.log("=== INICIO DE SESIÓN ===");
    
    let intentos = 3;
    
    function autenticar() {
        const usuario = prompt("Usuario:");
        const clave = prompt("Contraseña:");
        
        const usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.clave === clave);
        const cuentaUsuario = cuentas.find(c => c.usuario === usuario);
        
        if (cuentaUsuario && cuentaUsuario.bloqueada) {
            console.log("Cuenta bloqueada por 24 horas. Comunícate con tu banco.");
            return false;
        }
        
        if (usuarioEncontrado) {
            setSesionActiva(usuarioEncontrado);
            console.log(`Bienvenido ${usuarioEncontrado.usuario}!`);
            return true;
        } else {
            intentos--;
            
            if (intentos > 0) {
                console.log(`Usuario o contraseña incorrectos. Te quedan ${intentos} intentos.`);
                return autenticar();
            } else {
                if (cuentaUsuario) {
                    cuentaUsuario.bloqueada = true;
                }
                console.log("Cuenta bloqueada por 24 horas. Comunícate con tu banco.");
                return false;
            }
        }
    }
    
    return autenticar();
}

export function registrarUsuario() {
    console.clear();
    console.log("=== REGISTRO DE NUEVO USUARIO ===");
    
    const identificacion = prompt("Identificación:");
    const usuario = prompt("Nombre de usuario:");
    const correo = prompt("Correo electrónico:");
    const clave = prompt("Contraseña:");
    const repetirClave = prompt("Repetir contraseña:");
    
    if (clave !== repetirClave) {
        console.log("Las contraseñas no coinciden. Intente nuevamente.");
        return false;
    }
    
    if (usuarios.some(u => u.usuario === usuario)) {
        console.log("El nombre de usuario ya está en uso. Intente con otro.");
        return false;
    }
    
    const nuevoUsuario = {
        identificacion,
        usuario,
        correo,
        clave
    };
    
    usuarios.push(nuevoUsuario);
    
    // Crear una cuenta asociada al usuario
    const nuevaCuenta = {
        usuario: usuario,
        saldo: 0,
        bloqueada: false
    };
    
    cuentas.push(nuevaCuenta);
    
    console.log("Usuario registrado exitosamente!");
    console.log(`Bienvenido ${usuario}, tu cuenta ha sido creada con saldo inicial: $0`);
    return true;
}

export function cambiarContraseña() {
    console.clear();
    console.log("=== CAMBIAR CONTRASEÑA ===");
    
    const claveActual = prompt("Ingrese su contraseña actual:");
    
    if (claveActual !== sesionActiva.clave) {
        console.log("Contraseña actual incorrecta.");
        return false;
    }
    
    const nuevaClave = prompt("Ingrese su nueva contraseña:");
    const repetirClave = prompt("Repita su nueva contraseña:");
    
    if (nuevaClave !== repetirClave) {
        console.log("Las contraseñas no coinciden.");
        return false;
    }else{

        sesionActiva.clave = nuevaClave;
    console.log("Contraseña cambiada exitosamente!");
    return true;
    }
    
}
