import {rest} from "msw";

export default [
    rest.get(process.env.REACT_APP_URL_PROYECTOS + '/proyectos',
        (req, res, ctx) => {
            return res(
                ctx.delay(300),
                ctx.status(200),
                ctx.json([
                    {
                      "id": 1,
                      "nombre": "cloud erp",
                      "descripcion": "el mejor proyecto de psa",
                      "estado": "en progreso",
                      "fechaInicio": "2020-01-01",
                      "fechaFin": "2021-01-01",
                      "responsableDni":45487954,
                    },
                    {
                      "id": 2,
                      "nombre": "gestor psa",
                      "descripcion": "proyectos, recursos y soporte",
                      "estado": "en progreso",
                      "fechaInicio": "2020-04-01",
                      "fechaFin": "2020-08-10"
                    },
                  ]),
            )
        }),
        rest.get(process.env.REACT_APP_URL_PROYECTOS + 'proyectos/1/fases',
        (req, res, ctx) => {
            return res(
                ctx.delay(300),
                ctx.status(200),
                ctx.json([
                    {
                      "id": 1,
                      "nombre": "fase 1",
                      "descripcion": "el mejor proyecto de psa",
                      "estado": "en progreso",
                      "fechaInicio": "2020-01-01",
                      "fechaFin": "2021-01-01",
                      "duracion" : "14 dias",
                    },
                    {
                      "id": 2,
                      "nombre": "fase 2, the return of the fase",
                      "descripcion": "proyectos, recursos y soporte",
                      "estado": "en progreso",
                      "fechaInicio": "2020-04-01",
                      "fechaFin": "2020-08-10",
                      "duracion" : "14 dias",
                    }
                  ]),
            )
        }),
        rest.get(process.env.REACT_APP_URL_PROYECTOS + '/proyectos/1',
        (req, res, ctx) => {
            return res(
                ctx.delay(300),
                ctx.status(200),
                ctx.json(
                    {
                      "id": 1,
                      "nombre": "cloud erp",
                      "descripcion": "el mejor proyecto de psa",
                      "estado": "en progreso",
                      "fechaInicio": "2020-01-01",
                      "fechaFin": "2021-01-01",
                      "responsableDni":45487954,
                    },
                )
            )
        }),
        
        rest.put(process.env.REACT_APP_URL_PROYECTOS + '/proyectos/1',
        (req, res, ctx) => {
            return res(
                ctx.delay(300),
                ctx.status(200),
                ctx.json(
                    {
                      "id": 1,
                      "nombre": "cloud erp",
                      "descripcion": "el mejor proyecto de psa.",
                      "estado": "en progreso",
                      "fechaInicio": "2020-01-01",
                      "fechaFin": "2021-01-01",
                      "responsableDni":45487954,
                    },
                   ),
            )
        }),
]
