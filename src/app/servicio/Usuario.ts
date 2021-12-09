export class Usuario {
    idUsuario!: number;
    nombre!: String;
    apellido!: String;
    correo!: String;
    contrasena!: String;
    telefono!: number;
    direcion!: String;
    cedula!: number;
    foto!: String;
    fecharegistro!: Date;
    idRol!: number;
}


export class Categoria {
    id!: number;
    nombre!: String;
    descripcion!: String;
    imagen!: String;
}


export class Producto{
    idProducto!: number;
    nombre!: String;
    marca!: String;
    modelo!: String;
    descripcion!: String;
    idCategoria!: number;
    fechainicio!: Date;
    fechafinalizacion!: String;
    precioBase!: number;
    precioActual!: number;
    fotos!: String[];
    idUsuario!: number;
}