import {rest} from "msw";

export default [
    rest.get(process.env.REACT_APP_URL_SOPORTE + '/tickets',
        (req, res, ctx) => {
            return res(
                ctx.delay(300),
                ctx.status(200),
                ctx.json([
                    {
                        "nombre": "Uso de filtros",
                        "descripcion": "El usuario consulta sobre el uso de filtros al buscar productos de compra.",
                        "tipo": "consulta",
                        "severidad": "baja",
                        "responsable": "Juan Lopez",
                        "estado": "pendiente",
                        "fechaDeCreacion": "2020-07-01T07:00:29.472Z",
                        "fechaDeActualizacion": null,
                        "id": 0
                    }, {
                        "nombre": "Tiempos de espera",
                        "descripcion": "Se desea optimizar los tiempos de espera al confirmar la compra, de forma tal que tarde aproximadamente la mitad de lo que tarda hoy en día.",
                        "tipo": "mejora",
                        "severidad": "media",
                        "responsable": "Agustín Ramirez",
                        "estado": "iniciado",
                        "fechaDeCreacion": "2020-06-04T18:19:29.472Z",
                        "fechaDeActualizacion": "2020-06-04T10:14:38.472Z",
                        "id": 1
                    }, {
                        "nombre": "Error de logueo",
                        "descripcion": "El usuario no puede loguearse para ver sus pedidos activos. El sistema muestra una pantalla en blanco luego de ingresar el usuario y la contraseña",
                        "tipo": "incidencia",
                        "severidad": "alta",
                        "responsable": "Agustín Ramirez",
                        "estado": "pendiente",
                        "fechaDeCreacion": "2020-06-04T18:19:29.472Z",
                        "fechaDeActualizacion": "2020-06-04T10:14:38.472Z",
                        "id": 2
                    }, {
                        "nombre": "Exportar a Excel",
                        "descripcion": "El usuario consultó sobre como exportar a excel los ítems de su pedido de compra.",
                        "tipo": "consulta",
                        "severidad": "baja",
                        "responsable": "Agustín Ramirez",
                        "estado": "cerrado",
                        "fechaDeCreacion": "2020-06-29T18:03:49.472Z",
                        "fechaDeActualizacion": "2020-06-30T20:34:05.472Z",
                        "id": 3
                    }
                ]),
            )
        }),
    rest.get(process.env.REACT_APP_URL_SOPORTE + '/tickets/1',
        (req, res, ctx) => {
            return res(
                ctx.delay(300),
                ctx.status(200),
                ctx.json({
                    "nombre": "Tiempos de espera",
                    "descripcion": "Se desea optimizar los tiempos de espera al confirmar la compra, de forma tal que tarde aproximadamente la mitad de lo que tarda hoy en día.",
                    "tipo": "mejora",
                    "severidad": "media",
                    "responsable": "Agustín Ramirez",
                    "estado": "iniciado",
                    "fechaDeCreacion": "2020-06-04T18:19:29.472Z",
                    "fechaDeActualizacion": null,
                    "id": 1
                }),
            )
        }),
    rest.get(process.env.REACT_APP_URL_SOPORTE + '/tickets/0',
        (req, res, ctx) => {
            return res(
                ctx.delay(200),
                ctx.status(400),
                ctx.json({
                    "nombre": "El nombre es requerido",
                }),
            )
        })
]
