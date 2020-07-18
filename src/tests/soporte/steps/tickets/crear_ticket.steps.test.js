import {defineFeature, loadFeature} from 'jest-cucumber';
import React from 'react';
import {render, waitFor, screen, act} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from 'app';
import {rest} from "msw";
import moment from "moment";
import {server} from 'mocks/server'


const feature = loadFeature('src/tests/soporte/features/tickets/crear_ticket.feature');

const ingDeSoporte = ({given}) => {
    given(/^que soy ingeniero de soporte$/, () => null);
}

const seleccionarVersion = ({given}) => {
    given(/^que selecciono la versión (\d+) del producto "([^"]*)"$/, () => null);
}

const crearTicket = ({when}) => {
    when(/^creo un ticket "([^"]*)" ingresando:$/, async (caso, tabla) => {
        const input = tabla[0]

        // Mockeo la respuesta
        server.use(
            rest.post(process.env.REACT_APP_URL_SOPORTE + '/tickets',
                (req, res, ctx) => {
                    return res(
                        ctx.delay(1000),
                        ctx.status(201),
                        ctx.json({
                            ...input,
                            "estado": "pendiente",
                            "fechaDeCreacion": moment().format(),
                            "fechaDeActualizacion": null,
                            "id": 1
                        }),
                    )
                }),
        )

        // Render
        render(<App/>)

        // Ir a soporte
        await userEvent.click(screen.getByText('Soporte'))
        await waitFor(() => {
            expect(screen.queryByText('Home')).not.toBeInTheDocument()
        })

        // Listar tickets
        await userEvent.click(screen.getByText('Tickets'))
        await waitFor(() => {
            expect(screen.queryByText('Tickets')).not.toBeInTheDocument()
        })
        await waitFor(() => {
            expect(screen.queryByText('Nombre')).toBeInTheDocument()
        })

        // Ir a crear ticket
        userEvent.click(screen.getByText('Nuevo ticket'))
        await waitFor(() => {
            expect(screen.queryByText('Nuevo ticket')).not.toBeInTheDocument()
        })

        // Completar ticket
        await userEvent.type(screen.getByRole('textbox', {name: /nombre/i}), input['nombre'])
        await userEvent.type(screen.getByRole('textbox', {name: /descripcion/i}), input['descripcion'])
        await userEvent.type(screen.getByRole('textbox', {name: /responsable/i}), input['responsable'])
        await act(async () => {
            userEvent.click(screen.getByText('Crear'))
        })
    });
}

const chequearResultado = ({then}) => {
    then(/^veo que el resultado fue "([^"]*)"$/, async resultado => {
        if (resultado === 'éxito') resultado = 'Ver ticket'
        await waitFor(() => {
            expect(screen.getByText(resultado)).toBeInTheDocument()
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

        then(/^veo que posee los siguientes atributos:$/, async tabla => {
            await waitFor(() => {
                expect(screen.queryByText('Crear Ticket')).not.toBeInTheDocument()
            })

            const atributos = tabla[0];
            Object.values(atributos).forEach(valor => {
                if(valor) {
                    if(valor === 'ahora') valor = moment().format("DD/MM/YYYY HH:")
                    expect(screen.queryByText(new RegExp(valor, "i"))).toBeInTheDocument()
                }
            })
        });

        then(/^veo que no posee comentarios$/, () => null);
    });
});
