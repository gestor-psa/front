import {defineFeature, loadFeature} from "jest-cucumber";
import {existeTicket, poseeAtributos, seleccionoTicket} from "tests/soporte/steps/tickets/common";
import React from "react";


const feature = loadFeature('src/tests/soporte/features/tickets/seleccionar_ticket.feature');

defineFeature(feature, test => {
    test('Seleccionar ticket', ({given, when, then}) => {
        existeTicket({given, when, then})
        seleccionoTicket({given, when, then})
        poseeAtributos({given, when, then})
    })
})
