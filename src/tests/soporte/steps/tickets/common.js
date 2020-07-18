import {act, render, screen, waitFor} from "@testing-library/react";
import moment from "moment";
import App from "app";
import userEvent from "@testing-library/user-event";
import React from "react";
import {server} from "mocks/server";
import {rest} from "msw";


export const stepData = {}

export const existeTicket = ({given}) => {
    given(/^que existe un ticket con los siguientes atributos:$/, tabla => {
        const atributos = tabla[0]

        const ticket = {
            ...atributos,
            fechaDeCreacion: moment(atributos.fechaDeCreacion, "DD/MM/YYYY HH:mm").format(),
            fechaDeActualizacion: moment(atributos.fechaDeActualizacion, "DD/MM/YYYY HH:mm").format()
        }
        stepData.ticket = ticket

        server.use(
            rest.get(process.env.REACT_APP_URL_SOPORTE + '/tickets/' + atributos.id,
                (req, res, ctx) => {
                    return res(
                        ctx.status(201),
                        ctx.json(ticket),
                    )
                }),
            rest.get(process.env.REACT_APP_URL_SOPORTE + '/tickets',
                (req, res, ctx) => {
                    return res(
                        ctx.status(201),
                        ctx.json([ticket]),
                    )
                }),
        )
    });
}

export const verTickets = async () => {
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
}

export const seleccionoTicket = ({when}) => {
    when(/^selecciono un ticket con nombre "([^"]*)"$/, async nombre => {
        await verTickets()

        // Seleccionar ticket
        await act(async () => {
            userEvent.click(screen.getByText(nombre))
        })
        await waitFor(() => {
            expect(screen.queryByText('Nuevo ticket')).not.toBeInTheDocument()
        })
    });
}

export const completarTicket = async (atributos, accion) => {
    // Completar ticket
    await userEvent.clear(screen.getByRole('textbox', {name: /nombre/i}))
    await userEvent.type(screen.getByRole('textbox', {name: /nombre/i}), atributos['nombre'])

    await userEvent.clear(screen.getByRole('textbox', {name: /descripcion/i}))
    await userEvent.type(screen.getByRole('textbox', {name: /descripcion/i}), atributos['descripcion'])

    await userEvent.clear(screen.getByRole('textbox', {name: /responsable/i}))
    await userEvent.type(screen.getByRole('textbox', {name: /responsable/i}), atributos['responsable'])

    await act(async () => {
        userEvent.click(screen.getByText(accion))
    })
}

export const chequearResultado = ({then}) => {
    then(/^veo que el resultado fue "([^"]*)"$/, async resultado => {
        if (resultado === 'éxito') {
            await waitFor(() => {
                expect(screen.getByText('Ver ticket')).toBeInTheDocument()
            })
            await waitFor(() => {
                expect(screen.queryByText('Crear Ticket')).not.toBeInTheDocument()
            })
            await waitFor(() => {
                expect(screen.queryByText('Modificar Ticket')).not.toBeInTheDocument()
            })
        } else {
            await waitFor(() => {
                expect(screen.queryByText(resultado)).toBeInTheDocument()
            })
        }
    });
}

export const poseeAtributos = ({then}) => {
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
}
