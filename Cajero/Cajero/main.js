import { iniciarSistemaBancario } from './usuarios.js';
import { cargarDatosPrueba } from './mPrueba.js';


// Iniciar el sistema
cargarDatosPrueba(); // Opcional: quitar en producción
iniciarSistemaBancario();