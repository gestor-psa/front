import {defineFeature, loadFeature} from "jest-cucumber";
import {
    chequearResultado, completarTicket,
    existeTicket, poseeAtributos,
    seleccionoTicket, stepData,
} from "tests/soporte/steps/tickets/common";
import React from "react";
import userEvent from "@testing-library/user-event";
import {screen, waitFor} from "@testing-library/react";
import {server} from "mocks/server";
import {rest} from "msw";
import moment from "moment";


const feature = loadFeature('src/tests/soporte/features/tickets/actualizar_ticket.feature');

const modificarTicket = ({when}) => {
    when(/^modifico el ticket "([^"]*)":$/, async (caso, tabla) => {
        const atributos = tabla[0]

        // Mockeo la respuesta
        server.use(
            rest.put(process.env.REACT_APP_URL_SOPORTE + '/tickets/' + stepData.ticket.id,
                (req, res, ctx) => {
                    return res(
                        ctx.delay(1000),
                        ctx.status(200),
                        ctx.json({
                            ...atributos,
                            id: stepData.ticket.id,
                            fechaDeCreacion: stepData.ticket.fechaDeCreacion,
                            fechaDeActualizacion: moment().format()
                        }),
                    )
                }),
        )

        // Voy a modificar
        userEvent.click(screen.getByText('Modificar'))
        await waitFor(() => {
            expect(screen.queryByText('Ver ticket')).not.toBeInTheDocument()
        })

        // Modifico ticket
        await completarTicket(atributos, 'Modificar')
    })
}
defineFeature(feature, test => {
    test('Actualizar ticket', ({given, when, then}) => {
        existeTicket({given, when, then})
        seleccionoTicket({given, when, then})

        when(/^modifico el ticket "([^"]*)":$/, async (caso, tabla) => {
            const atributos = tabla[0]
            console.log(stepData)
            // Mockeo la respuesta
            server.use(
                rest.put(process.env.REACT_APP_URL_SOPORTE + '/tickets/' + stepData.ticket.id,
                    (req, res, ctx) => {
                        return res(
                            ctx.delay(1000),
                            ctx.status(200),
                            ctx.json({
                                ...atributos,
                                id: stepData.ticket.id,
                                fechaDeCreacion: stepData.ticket.fechaDeCreacion,
                                fechaDeActualizacion: moment().format()
                            }),
                        )
                    }),
            )

            // Voy a modificar
            userEvent.click(screen.getByText('Modificar'))
            await waitFor(() => {
                expect(screen.queryByText('Ver ticket')).not.toBeInTheDocument()
            })

            // Modificar ticket
            await completarTicket(atributos, 'Modificar')
        })
        chequearResultado({given, when, then})
    });

    test('Actualización exitosa', ({given, when, then}) => {
        existeTicket({given, when, then})
        seleccionoTicket({given, when, then})
        modificarTicket({given, when, then})
        chequearResultado({given, when, then})
        poseeAtributos({given, when, then})
    })
})


