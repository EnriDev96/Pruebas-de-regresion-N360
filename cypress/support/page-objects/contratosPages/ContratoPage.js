require("cypress-xpath");
require("cypress-plugin-tab");
class ContratoPage {
  goToContratos() {
    cy.xpath("//div[normalize-space()='Contratos']").click();
    cy.xpath("//a[@tabindex='0'][contains(.,'Contratos')]").click();
    cy.wait(1000);
  }

  contratoUnoLogos(dataContrato) {
    cy.xpath("(//div[contains(.,'addcontrato')])[13]").click();
    cy.wait(3000);
    //Informacion administratica y laboral
    //Seleccion del Empleado
    cy.xpath("(//input[contains(@type,'text')])[4]").type("1104730229");
    cy.xpath(
      "//div[@class='q-item-sublabel'][contains(.,'1104730229')]"
    ).click();
    //Fecha de ingreso
    cy.xpath(
      "(//div[contains(.,'Fecha de ingreso :|arrow_drop_down')])[9]"
    ).click();
    cy.xpath("(//span[contains(@tabindex,'-1')])[3]").click();
    cy.xpath(
      `//div[@class='q-btn-inner row col items-center q-popup--skip justify-center'][contains(.,'${dataContrato.anioIngreso}')]`
    ).click();
    cy.xpath(
      `//div[@class='q-btn-inner row col items-center q-popup--skip justify-center'][contains(.,'${dataContrato.mesIngreso}')]`
    ).click();
    cy.xpath(`(//div[contains(.,'${dataContrato.diaIngreso}')])[7]`).click();
    //Tipo de contrato
    cy.xpath(
      "(//div[contains(.,'Tipo de contrato:|arrow_drop_down')])[9]"
    ).click();
    cy.xpath(
      `//div[@class='q-item-label'][contains(.,'${dataContrato.tipoContrato}')]`
    ).click();
    //Codigo de establecimiento
    cy.xpath(
      "(//div[contains(.,'Código de establecimiento:|arrow_drop_down')])[9]"
    ).click();
    cy.xpath(
      `(//div[contains(.,'${dataContrato.codigoEstablecimiento}')])[5]`
    ).click();
    //Sueldo
    cy.xpath("(//div[contains(.,'Sueldo:|$')])[9]").type(dataContrato.sueldo);
    //Tipo de sueldo
    cy.xpath(
      "(//div[contains(.,'Tipo de sueldo:|arrow_drop_down')])[9]"
    ).click();
    cy.xpath(`(//div[contains(.,'${dataContrato.tipoSueldo}')])[5]`).click();
    //Cargo
    cy.xpath("(//div[contains(.,'Cargo:|arrow_drop_down')])[9]").click();
    cy.xpath(`(//div[contains(.,'${dataContrato.cargo}')])[5]`).click();
    //Departamento
    cy.xpath("(//div[contains(.,'Departamento:|arrow_drop_down')])[9]").click();
    cy.xpath(
      `//div[@class='q-item-label'][contains(.,'${dataContrato.departamento}')]`
    ).click();
    //Centro de Costo
    cy.xpath(
      "(//div[contains(.,'Centro de costo:|arrow_drop_down')])[9]"
    ).click();
    cy.xpath(`(//div[contains(.,'${dataContrato.centroCosto}')])[5]`).click();
    //Fondo de Reserva
    cy.xpath(
      "(//div[contains(.,'Fondo de reserva:|arrow_drop_down')])[9]"
    ).click();
    cy.xpath(`(//div[contains(.,'${dataContrato.fondoReserva}')])[15]`).click();
    //Pago del Decimo Tercero
    cy.xpath(
      "(//div[contains(.,'Pago XIII Sueldo:|arrow_drop_down')])[9]"
    ).click();
    cy.xpath(
      `//div[@class='q-item-label'][contains(.,'${dataContrato.decimoTercero}')]`
    ).click();
    //cy.xpath(`(//div[contains(.,'${dataContrato.decimoTercero}')])[5]`).click();
    //Pago del Decimo Cuarto
    cy.xpath(
      "(//div[contains(.,'Pago XIV Sueldo:|arrow_drop_down')])[9]"
    ).click();
    cy.xpath(`(//div[contains(.,'${dataContrato.decimoCuarto}')])[5]`).click();
    //Pago de Vacaciones
    cy.xpath(
      "(//div[contains(.,'Pago de Vacaciones:|arrow_drop_down')])[9]"
    ).click();
    cy.xpath(
      `//div[@class='q-item-label'][contains(.,'${dataContrato.vacaciones}')]`
    ).click();
    //Horas laborables por mes
    cy.xpath("(//div[contains(.,'Horas laborables por mes:|')])[9]").type(
      dataContrato.horasLaborables
    );
    //Tipo de Egreso
    cy.xpath(
      "(//div[contains(.,'Tipo de egreso:|arrow_drop_down')])[9]"
    ).click();
    cy.xpath(
      `//div[@class='q-item-label'][contains(.,'${dataContrato.tipoEgreso}')]`
    ).click();
    //Codigo de establecimiento IESS
    cy.xpath(
      "(//div[contains(.,'Código de establecimiento IESS:|arrow_drop_down')])[9]"
    ).click();
    cy.xpath(
      `//div[@class='q-item-label'][contains(.,'${dataContrato.codigoIESS}')]`
    ).click();

    //Gestion de Turnos
    cy.xpath("(//div[contains(.,'Gestión de turnos')])[9]")
      .scrollIntoView()
      .click();

    cy.xpath(
      "(//div[contains(.,'radio_button_uncheckedradio_button_checkedNo')])[31]"
    ).click();
    //Guardar Contrato
    cy.xpath("(//div[contains(.,'Guardar')])[37]").click();
  }

  verContratoUno() {
    cy.xpath("(//i[@aria-hidden='true'][contains(.,'search')])[1]").click();
    cy.xpath("(//input[contains(@placeholder,'Buscar')])[1]").type(
      "1104730229"
    );
    cy.xpath("(//div[contains(.,'Orellana Cueva Bryan Enrique')])[17]").click();
    cy.xpath("(//div[contains(.,'Ver contrato')])[12]").click();
    cy.wait(2000);
    cy.scrollTo("bottom", { easing: "linear", duration: 1000 });
  }

  eliminarContrato() {
    cy.xpath("(//i[@aria-hidden='true'][contains(.,'search')])[1]").click();
    cy.xpath("(//input[contains(@placeholder,'Buscar')])[1]").type(
      "1104730229"
    );
    cy.xpath("(//div[contains(.,'Orellana Cueva Bryan Enrique')])[17]").click();
    cy.xpath("(//div[contains(.,'Eliminar contrato')])[13]").click();
    cy.get(".modal-buttons > :nth-child(2)").click();
    cy.scrollTo("top", { easing: "linear", duration: 1000 });
  }
}

export default ContratoPage;
