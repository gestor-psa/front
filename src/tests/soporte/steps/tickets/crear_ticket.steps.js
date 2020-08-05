import {defineFeature, loadFeature} from 'jest-cucumber';
import React from 'react';
import {waitFor, screen, act} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import {rest} from "msw";
import moment from "moment";
import {server} from 'mocks/server'
import {chequearResultado, poseeAtributos, verTickets} from "tests/soporte/steps/tickets/common";


const feature = loadFeature('src/tests/soporte/features/tickets/crear_ticket.feature');

const ingDeSoporte = ({given}) => {
    given(/^que soy ingeniero de soporte$/, () => {
        server.use(
            rest.get(process.env.REACT_APP_URL_PROYECTOS + '/tareas',
                (req, res, ctx) => {
                    return res(
                        ctx.status(200),
                        ctx.json([
                            {
                                "id": 1,
                                "nombre": "ABM Tareas",
                                "descripcion": "hacer x",
                                "estado": "activa",
                                "prioridad": "alta",
                                "fechaInicio": "2020-07-20",
                                "fechaFin": "2020-07-22",
                                "proyectoId": 1,
                                "tickets": [1]
                            }, {
                                "id": 2,
                                "nombre": "ABM Proyectos",
                                "descripcion": "hacer abm",
                                "estado": "finalizado",
                                "prioridad": "alta",
                                "fechaInicio": "2020-07-23",
                                "fechaFin": "2020-07-23",
                                "proyectoId": 1,
                                "tickets": [1]
                            }, {
                                "id": 3,
                                "nombre": "ABM Fases",
                                "descripcion": "crud",
                                "estado": "finalizado",
                                "prioridad": "alta",
                                "fechaInicio": "2020-07-23",
                                "fechaFin": "2020-07-23",
                                "proyectoId": 2,
                                "tickets": [1]
                            }
                        ]),
                    )
                }
            ),
            rest.post(process.env.REACT_APP_URL_PROYECTOS + '/proyectos/:proyectoId/tareas',
                (req, res, ctx) => {
                    return res(
                        ctx.status(200),
                        ctx.json({
                                "id": 1,
                                "nombre": "ABM Tareas",
                                "descripcion": "hacer x",
                                "estado": "activa",
                                "prioridad": "alta",
                                "fechaInicio": "2020-07-20",
                                "fechaFin": "2020-07-22",
                                "proyectoId": 1,
                                "tickets": [1]
                            }
                        ),
                    )
                }),
        )
    });
}

const seleccionarVersion = ({given}) => {
    given(/^que selecciono la versión (\d+) del producto "([^"]*)"$/, () => null);
}

const crearTicket = ({when}) => {
    when(/^creo un ticket "([^"]*)" ingresando:$/, async (caso, tabla) => {
        const atributos = tabla[0]

        // Mockeo la respuesta
        server.use(
            rest.post(process.env.REACT_APP_URL_SOPORTE + '/tickets',
                (req, res, ctx) => {
                    return res(
                        ctx.delay(1000),
                        ctx.status(201),
                        ctx.json({
                            ...atributos,
                            "estado": "pendiente",
                            "fechaDeCreacion": moment().format(),
                            "fechaDeActualizacion": null,
                            "id": 1
                        }),
                    )
                }),
        )

        await verTickets()

        // Ir a crear ticket
        userEvent.click(screen.getByText('Nuevo ticket'))
        await waitFor(() => {
            expect(screen.queryByText('Nuevo ticket')).not.toBeInTheDocument()
        })

        // Completar ticket
        await userEvent.type(screen.getByRole('textbox', {name: /nombre/i}), atributos['nombre'])
        await userEvent.type(screen.getByRole('textbox', {name: /descripcion/i}), atributos['descripcion'])
        await userEvent.type(screen.getByRole('textbox', {name: /responsable/i}), atributos['responsable'])
        await act(async () => {
            userEvent.click(screen.getByText('Crear'))
        })
    });
}

defineFeature(feature, test => {

    test('Crear ticket', ({given, when, then}) => {
        ingDeSoporte({given, when, then})
        seleccionarVersion({given, when, then})
        crearTicket({given, when, then})
        chequearResultado({given, when, then})
    });

    test('Creación exitosa', ({given, when, then}) => {
        ingDeSoporte({given, when, then})
        seleccionarVersion({given, when, then})
        crearTicket({given, when, then})
        chequearResultado({given, when, then})
        poseeAtributos({given, when, then})
        then(/^veo que no posee comentarios$/, () => null);
    });
});
