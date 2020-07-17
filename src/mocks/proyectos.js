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
                      "estado": "activo",
                      "fechaInicio": "2020-01-01",
                      "fechaFin": "2021-01-01"
                    },
                    {
                      "id": 2,
                      "nombre": "gestor psa",
                      "descripcion": "proyectos, recursos y soporte",
                      "estado": "activo",
                      "fechaInicio": "2020-04-01",
                      "fechaFin": "2020-08-10"
                    },
                    {
                      "id": 3,
                      "nombre": "psa/prueba",
                      "descripcion": "prueba de api",
                      "estado": "string",
                      "fechaInicio": "2020-03-01",
                      "fechaFin": "2020-06-01"
                    },
                    {
                      "id": 4,
                      "nombre": "Lorem Ipsum",
                      "descripcion": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                      "estado": "activo",
                      "fechaInicio": "2020-03-01",
                      "fechaFin": null
                    }
                  ]),
            )
        }),
]