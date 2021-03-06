import {rest} from "msw";
import moment from "moment";

export default []
export const mocks = [
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
                    "responsableDni": 39917487,
                    "estado": "iniciado",
                    "fechaDeCreacion": "2020-06-04T18:19:29.472Z",
                    "fechaDeActualizacion": null,
                    "id": 1
                }),
            )
        }),
    rest.post(process.env.REACT_APP_URL_SOPORTE + '/tickets',
        (req, res, ctx) => {
            return res(
                ctx.delay(1000),
                ctx.status(201),
                ctx.json({
                    "nombre": "Tiempos de espera",
                    "descripcion": "Se desea optimizar los tiempos de espera al confirmar la compra, de forma tal que tarde aproximadamente la mitad de lo que tarda hoy en día.",
                    "tipo": "mejora",
                    "severidad": "media",
                    "responsableDni": 39917487,
                    "estado": "iniciado",
                    "fechaDeCreacion": "2020-06-04T18:19:29.472Z",
                    "fechaDeActualizacion": null,
                    "id": 1
                }),
            )
        }),
    rest.put(process.env.REACT_APP_URL_SOPORTE + '/tickets/1',
        (req, res, ctx) => {
            return res(
                ctx.delay(1000),
                ctx.status(200),
                ctx.json({
                    "nombre": "Tiempos de espera",
                    "descripcion": "Se desea optimizar los tiempos de espera al confirmar la compra, de forma tal que tarde aproximadamente la mitad de lo que tarda hoy en día.",
                    "tipo": "mejora",
                    "severidad": "media",
                    "responsableDni": 39917487,
                    "estado": "iniciado",
                    "fechaDeCreacion": "2020-06-04T18:19:29.472Z",
                    "fechaDeActualizacion": null,
                    "id": 1
                }),
            )
        }),
    rest.delete(process.env.REACT_APP_URL_SOPORTE + '/tickets/1',
        (req, res, ctx) => {
            return res(
                ctx.delay(1000),
                ctx.status(200)
            )
        }),
    rest.get(process.env.REACT_APP_URL_RECURSOS + '/employees',
        (req, res, ctx) => {
            return res(
                ctx.delay(1000),
                ctx.status(200),
                ctx.json([
                    {
                        "name": "Sebastián",
                        "surname": "Blázquez",
                        "id": 39917487
                    }
                ]),
            )
        }),
    rest.get(process.env.REACT_APP_URL_RECURSOS + '/employees/39917487',
        (req, res, ctx) => {
            return res(
                ctx.delay(1000),
                ctx.status(200),
                ctx.json({
                    "name": "Sebastián",
                    "surname": "Blázquez",
                    "id": 39917487
                }),
            )
        }),
    rest.get(process.env.REACT_APP_URL_SOPORTE + '/clientes',
        (req, res, ctx) => {
            return res(
                ctx.delay(1000),
                ctx.status(200),
                ctx.json([
                        {
                            "nombre": "IBM",
                            "razonSocial": "IBM Argentina SRL",
                            "cuit": "30503961268",
                            "estado": "activo",
                            "fechaDesdeQueEsCliente": "2020-07-14",
                            "id": 0
                        }, {
                            "nombre": "YPF",
                            "razonSocial": "YPF Sociedad Anonima",
                            "cuit": "30546689979",
                            "estado": "activo",
                            "fechaDesdeQueEsCliente": "2014-08-04",
                            "id": 1
                        }, {
                            "nombre": "Arcor",
                            "razonSocial": "Grupo Arcor Sociedad Anonima",
                            "cuit": "30707006397",
                            "estado": "inactivo",
                            "fechaDesdeQueEsCliente": "2014-08-04",
                            "id": 2
                        }
                    ]
                ),
            )
        }),
    rest.get(process.env.REACT_APP_URL_SOPORTE + '/clientes/1',
        (req, res, ctx) => {
            return res(
                ctx.delay(1000),
                ctx.status(200),
                ctx.json({
                        "nombre": "YPF",
                        "razonSocial": "YPF Sociedad Anonima",
                        "cuit": "30546689979",
                        "estado": "activo",
                        "fechaDesdeQueEsCliente": "2014-08-04",
                        "id": 1
                    }
                ),
            )
        }),
    rest.delete(process.env.REACT_APP_URL_SOPORTE + '/clientes/1',
        (req, res, ctx) => {
            return res(
                ctx.delay(1000),
                ctx.status(200)
            )
        }),
    rest.post(process.env.REACT_APP_URL_SOPORTE + '/clientes',
        (req, res, ctx) => {
            return res(
                ctx.delay(1000),
                ctx.status(200),
                ctx.json({
                        "nombre": "YPF",
                        "razonSocial": "YPF Sociedad Anonima",
                        "cuit": "30546689979",
                        "estado": "activo",
                        "fechaDesdeQueEsCliente": "2014-08-04",
                        "id": 1
                    }
                ),
            )
        }),
    rest.put(process.env.REACT_APP_URL_SOPORTE + '/clientes/1',
        (req, res, ctx) => {
            return res(
                ctx.delay(1000),
                ctx.status(200),
                ctx.json({
                        "nombre": "YPF",
                        "razonSocial": "YPF Sociedad Anonima",
                        "cuit": "30546689979",
                        "estado": "inactivo",
                        "fechaDesdeQueEsCliente": "2014-08-04",
                        "id": 1
                    }
                ),
            )
        }),
    // rest.get(process.env.REACT_APP_URL_PROYECTOS + '/tareas',
    //     (req, res, ctx) => {
    //         return res(
    //             ctx.delay(1000),
    //             ctx.status(200),
    //             ctx.json([
    //                 {
    //                     "id": 1,
    //                     "nombre": "ABM Tareas",
    //                     "descripcion": "hacer x",
    //                     "estado": "activa",
    //                     "prioridad": "alta",
    //                     "fechaInicio": "2020-07-20",
    //                     "fechaFin": "2020-07-22",
    //                     "proyectoId": 1,
    //                     "tickets": [1]
    //                 }, {
    //                     "id": 2,
    //                     "nombre": "ABM Proyectos",
    //                     "descripcion": "hacer abm",
    //                     "estado": "finalizado",
    //                     "prioridad": "alta",
    //                     "fechaInicio": "2020-07-23",
    //                     "fechaFin": "2020-07-23",
    //                     "proyectoId": 1,
    //                     "tickets": [1]
    //                 }, {
    //                     "id": 3,
    //                     "nombre": "ABM Fases",
    //                     "descripcion": "crud",
    //                     "estado": "finalizado",
    //                     "prioridad": "alta",
    //                     "fechaInicio": "2020-07-23",
    //                     "fechaFin": "2020-07-23",
    //                     "proyectoId": 2,
    //                     "tickets": [1]
    //                 }
    //             ]),
    //         )
    //     }
    // ),
    // rest.post(process.env.REACT_APP_URL_PROYECTOS + '/proyectos/1/tareas',
    //     (req, res, ctx) => {
    //         return res(
    //             ctx.delay(1000),
    //             ctx.status(200),
    //             ctx.json({
    //                     "id": 1,
    //                     "nombre": "ABM Tareas",
    //                     "descripcion": "hacer x",
    //                     "estado": "activa",
    //                     "prioridad": "alta",
    //                     "fechaInicio": "2020-07-20",
    //                     "fechaFin": "2020-07-22",
    //                     "proyectoId": 1,
    //                     "tickets": [1]
    //                 }
    //             ),
    //         )
    //     }),
    rest.get(process.env.REACT_APP_URL_SOPORTE + '/reportes/ticketsAbiertosYCerradosPorDia',
        (req, res, ctx) => {
            const min = 0
            const max = 5

            const result = {};
            Array.from(Array(30)).map((v, n) => ({
                dia: moment().subtract(n, 'days').format("YYYY-MM-DD"),
                abiertos: Math.round(Math.random() * (max - min) + min),
                cerrados: Math.round(Math.random() * (max - min) + min)
            })).forEach(({dia, abiertos, cerrados}) => {
                result[dia] = [abiertos, cerrados]
            })

            return res(
                // ctx.delay(1000),
                ctx.status(200),
                ctx.json(result),
            )
        }),
    rest.get(process.env.REACT_APP_URL_SOPORTE + '/reportes/ticketsPendientes',
        (req, res, ctx) => {
            const min = -2
            const max = 2
            let acumulador = 40
            return res(
                // ctx.delay(500),
                ctx.status(200),
                ctx.json(
                    [...Array(30).keys()]
                        .map(n => ({
                            dia: moment().subtract(n, 'days').format("YYYY-MM-DD"),
                            cantidad: acumulador += Math.round(Math.random() * (max - min) + min)
                        }))
                ),
            )
        }),
]
