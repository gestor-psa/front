import {act, render, screen, waitFor} from "@testing-library/react";
import moment from "moment";
import App from "app";
import userEvent from "@testing-library/user-event";
import React from "react";
import {server} from "mocks/server";
import {rest} from "msw";

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

export const existeTicket = ({given}) => {
    given(/^que existe un ticket con los siguientes atributos:$/, tabla => {
        const atributos = tabla[0]
        server.use(
            rest.get(process.env.REACT_APP_URL_SOPORTE + '/tickets/' + atributos.id,
                (req, res, ctx) => {
                    return res(
                        ctx.status(201),
                        ctx.json(atributos),
                    )
                }),
            rest.get(process.env.REACT_APP_URL_SOPORTE + '/tickets',
                (req, res, ctx) => {
                    return res(
                        ctx.status(201),
                        ctx.json([atributos]),
                    )
                }),
        )
    });
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
