require("cypress-xpath");
require("cypress-plugin-tab");
import { validationReporter } from "../../../utils/validationReporter";
class ContratoPage {
  goToContratos() {
    cy.xpath("//div[normalize-space()='Contratos']").click();
    cy.xpath("//a[@tabindex='0'][contains(.,'Contratos')]").click();
    cy.wait(1000);
  }
  crearContrato(data) {
    //cy.xpath("(//div[contains(.,'addcontrato')])[13]").click();
    //cy.wait(3000);
    this.seleccionarFechaIngreso(data.fechaIngreso);
    this.seleccionarTipoContrato(data.tipoContrato);
    this.sleccionarCodigoEstablecimiento(data.codigoEstablecimiento);
    this.ingresarSueldo(data.sueldo);
    this.seleccionarTipoSueldo(data.tipoSueldo);
    this.seleccionarCargo(data.cargo);
    this.seleccionarDepartamento(data.departamento);
    this.seleccionarCentroCosto(data.centroCosto);
    this.seleccionarFondoReserva(data.fondoReserva);
    this.seleccionarDecimoTercero(data.decimoTercero);
    this.seleccionarDecimoCuarto(data.decimoCuarto);
    this.seleccionarPagoVacaciones(data.vacaciones);
    this.ingresarHorasLaborables(data.horasLaborables);
    this.seleccionarTipoEgreso(data.tipoEgreso);
    this.seleccionarCodigoIESS(data.codigoIESS);

    //Gestion de Turnos
    this.moduloGestionTurnos(data.moduloGestionTurnos);

    //Guardar Contrato
    cy.xpath("(//div[contains(.,'Guardar')])[37]").click();
    cy.log(`✅ Contrato creado Correctamente ✅`);
    cy.wait(1000);
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

  buscarFichaPorCedula(data) {
    cy.xpath("(//i[@aria-hidden='true'][contains(.,'search')])[1]").click();
    cy.xpath("(//input[contains(@placeholder,'Buscar')])[1]").type(data.cedula);
    cy.xpath(
      `//div[@class='q-item-sublabel ellipsis'][contains(.,'${data.cedula}')]`
    ).click();
  }

  eliminarContrato() {
    cy.xpath("//button[@tabindex='0'][contains(.,'deleteContrato')]").click();
    cy.xpath("//button[@tabindex='0'][contains(.,'Si')]").click();
    cy.scrollTo("top", { easing: "linear", duration: 1000 });
  }

  seleccionarEmpleado(data) {
    cy.xpath(`(//input[contains(@type,'text')])[4]`).type(
      `${data.cedula}{enter}`
    );
    cy.xpath(
      `//div[@class='q-item-sublabel'][contains(.,'${data.cedula}')]`
    ).click();
  }

  seleccionarFechaIngreso(fechaIngreso) {
    // Validar que el campo reciba un valor
    if (!fechaIngreso || fechaIngreso.trim() === "") {
      validationReporter.addError(`❌Campo "Fecha de Ingreso" vacío|`);
      cy.log(
        `❌ El campo "Fecha de Ingreso" es requerido y no puede estar vacío`
      );
      return this;
    }
    const [anio, mes, dia] = fechaIngreso.split("-");
    const meses = [
      "",
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    const mesNombre = meses[parseInt(mes, 10)];
    cy.xpath(
      "(//div[contains(.,'Fecha de ingreso :|arrow_drop_down')])[9]"
    ).click();
    cy.xpath("(//span[contains(@tabindex,'-1')])[3]").click();
    cy.xpath(
      `//div[@class='q-btn-inner row col items-center q-popup--skip justify-center'][contains(.,'${anio}')]`
    ).click();
    cy.xpath(
      `//div[@class='q-btn-inner row col items-center q-popup--skip justify-center'][contains(.,'${mesNombre}')]`
    ).click();
    cy.xpath(
      `//div[@class='row items-center content-center justify-center cursor-pointer'][contains(.,'${parseInt(
        dia,
        10
      )}')]`
    ).click();
    cy.log(`✅ Fecha de Nacimiento seleccionada correctamente`);
    return this;
  }

  seleccionarTipoContrato(contrato) {
    cy.xpath(
      "(//div[contains(.,'Tipo de contrato:|arrow_drop_down')])[9]"
    ).click();
    // Validar que el campo reciba un valor
    if (!contrato || contrato.trim() === "") {
      validationReporter.addError(`❌Campo "Tipo de contrato" vacío |`);
      cy.log(
        `❌ El campo "Tipo de contrato" es requerido y no puede estar vacío`
      );
      return this;
    }
    // Validar Seleccion dentro de la lista
    cy.xpath(`//div[@class='q-item-label'][contains(.,'${contrato}')]`, {
      timeout: 1000,
    }).then(($imput) => {
      if ($imput.length) {
        cy.wrap($imput).click();
        cy.log(`✅ Tipo de contrato seleccionado correctamente: ${contrato}`);
      }
    });
    return this;
  }

  sleccionarCodigoEstablecimiento(codigo) {
    cy.xpath(
      "(//div[contains(.,'Código de establecimiento:|arrow_drop_down')])[9]"
    ).click();
    // Validar que el campo reciba un valor
    if (!codigo || codigo.trim() === "") {
      validationReporter.addError(
        `❌Campo "Código de establecimiento" vacío |`
      );
      cy.log(
        `❌ El campo "Código de establecimiento" es requerido y no puede estar vacío`
      );
      return this;
    }
    // Validar Seleccion dentro de la lista
    cy.xpath(`(//div[contains(.,'${codigo}')])[5]`, {
      timeout: 1000,
    }).then(($imput) => {
      if ($imput.length) {
        cy.wrap($imput).click();
        cy.log(
          `✅ Código de establecimiento seleccionado correctamente: ${codigo}`
        );
      }
    });
    return this;
  }

  ingresarSueldo(sueldo) {
    // Validar que el campo reciba un valor
    if (!sueldo || sueldo.trim() === "") {
      validationReporter.addError(`❌Campo "Sueldo" vacio |`);
      cy.log(`❌ El campo "Sueldo" es requerido y no puede estar vacío`);
      return this;
    }
    // Validar Sueldo Mínimo
    const sueldoNumerico = parseFloat(sueldo);
    const sueldoMinimo = 470.0;
    if (sueldoNumerico < sueldoMinimo) {
      validationReporter.addError(
        `❌Sueldo debajo del mínimo: $${sueldoMinimo}. |`
      );
      cy.log(
        `❌El sueldo debe ser mayor o igual $${sueldoMinimo}. Valor ingresado: $${sueldoNumerico})`
      );
      return this;
    }

    cy.xpath("(//div[contains(.,'Sueldo:|$')])[9]").type(sueldo);
    // cy.xpath("(//div[contains(.,'Sueldo:|$')])[9]").then(($input) => {
    //   const valorIngresado = $input.val();
    //   // Formato de Sueldo
    //   if (!/^\d$/.test(valorIngresado)) {
    //     validationReporter.addError(`Sueldo con formato Invalido |`);
    //     cy.log(`⚠️ La Sueldo solo puede contener Digitos y un punto`);
    //   } else {
    //     cy.log(`✅ Sueldo con formato válido: ${valorIngresado}.`);
    //   }
    // });
    return this;
  }

  seleccionarTipoSueldo(tipoSueldo) {
    cy.xpath(
      "(//div[contains(.,'Tipo de sueldo:|arrow_drop_down')])[9]"
    ).click();
    // Validar que el campo reciba un valor
    if (!tipoSueldo || tipoSueldo.trim() === "") {
      validationReporter.addError(`❌Campo "Tipo de sueldo" vacio |`);
      cy.log(
        `❌ El campo "Tipo de sueldo" es requerido y no puede estar vacío`
      );
      return this;
    }
    // Validar Seleccion dentro de la lista
    cy.xpath(`(//div[contains(.,'${tipoSueldo}')])[5]`, {
      timeout: 1000,
    }).then(($imput) => {
      if ($imput.length) {
        cy.wrap($imput).click();
        cy.log(`✅ Tipo de sueldo seleccionado correctamente: ${tipoSueldo}`);
      }
    });
    return this;
  }

  seleccionarCargo(cargo) {
    cy.xpath("(//div[contains(.,'Cargo:|arrow_drop_down')])[9]").click();
    // Validar que el campo reciba un valor
    if (!cargo || cargo.trim() === "") {
      validationReporter.addError(`❌Campo "Cargo" vacio |`);
      cy.log(`❌ El campo "Cargo" es requerido y no puede estar vacío`);
      return this;
    }
    // Validar Seleccion dentro de la lista
    cy.xpath(`(//div[contains(.,'${cargo}')])[5]`, {
      timeout: 1000,
    }).then(($imput) => {
      if ($imput.length) {
        cy.wrap($imput).click();
        cy.log(`✅ Cargo seleccionado correctamente: ${cargo}`);
      }
    });
    return this;
  }

  seleccionarDepartamento(departamento) {
    cy.xpath("(//div[contains(.,'Departamento:|arrow_drop_down')])[9]").click();
    // Validar que el campo reciba un valor
    if (!departamento || departamento.trim() === "") {
      validationReporter.addError(`❌Campo "Departamento" vacio |`);
      cy.log(`❌ El campo "Departamento" es requerido y no puede estar vacío`);
      return this;
    }
    // Validar Seleccion dentro de la lista
    cy.xpath(`//div[@class='q-item-label'][contains(.,'${departamento}')]`, {
      timeout: 1000,
    }).then(($imput) => {
      if ($imput.length) {
        cy.wrap($imput).click();
        cy.log(`✅ Departamento seleccionado correctamente: ${departamento}`);
      }
    });
    return this;
  }

  seleccionarCentroCosto(centroCosto) {
    cy.xpath(
      "(//div[contains(.,'Centro de costo:|arrow_drop_down')])[9]"
    ).click();
    // Validar que el campo reciba un valor
    if (!centroCosto || centroCosto.trim() === "") {
      validationReporter.addError(`❌Campo "Centro de costo" vacio |`);
      cy.log(
        `❌ El campo "Centro de costo" es requerido y no puede estar vacío`
      );
      return this;
    }
    // Validar Seleccion dentro de la lista
    cy.xpath(`//div[@class='q-item-label'][contains(.,'${centroCosto}')]`, {
      timeout: 1000,
    }).then(($imput) => {
      if ($imput.length) {
        cy.wrap($imput).click();
        cy.log(`✅ Centro de costo seleccionado correctamente: ${centroCosto}`);
      }
    });
    return this;
  }

  seleccionarFondoReserva(fondoReserva) {
    cy.xpath(
      "(//div[contains(.,'Fondo de reserva:|arrow_drop_down')])[9]"
    ).click();
    // Validar que el campo reciba un valor
    if (!fondoReserva || fondoReserva.trim() === "") {
      validationReporter.addError(`❌Campo "Fondo de reserva" vacio |`);
      cy.log(
        `❌ El campo "Fondo de reserva" es requerido y no puede estar vacío`
      );
      return this;
    }
    // Validar Seleccion dentro de la lista
    cy.xpath(`(//div[contains(.,'${fondoReserva}')])[15]`, {
      timeout: 1000,
    }).then(($imput) => {
      if ($imput.length) {
        cy.wrap($imput).click();
        cy.log(
          `✅ Fondo de reserva seleccionado correctamente: ${fondoReserva}`
        );
      }
    });
    return this;
  }

  seleccionarDecimoTercero(decimoTercero) {
    cy.xpath(
      "(//div[contains(.,'Pago XIII Sueldo:|arrow_drop_down')])[9]"
    ).click();
    // Validar que el campo reciba un valor
    if (!decimoTercero || decimoTercero.trim() === "") {
      validationReporter.addError(`❌Campo "Pago XIII Sueldo" vacio |`);
      cy.log(
        `❌ El campo "Pago XIII Sueldo" es requerido y no puede estar vacío`
      );
      return this;
    }
    // Validar Seleccion dentro de la lista
    cy.xpath(`//div[@class='q-item-label'][contains(.,'${decimoTercero}')]`, {
      timeout: 1000,
    }).then(($imput) => {
      if ($imput.length) {
        cy.wrap($imput).click();
        cy.log(
          `✅ Pago XIII Sueldo seleccionado correctamente: ${decimoTercero}`
        );
      }
    });
    return this;
  }

  seleccionarDecimoCuarto(decimoCuarto) {
    cy.xpath(
      "(//div[contains(.,'Pago XIV Sueldo:|arrow_drop_down')])[9]"
    ).click();
    // Validar que el campo reciba un valor
    if (!decimoCuarto || decimoCuarto.trim() === "") {
      validationReporter.addError(`❌Campo "Pago XIV Sueldo" vacio |`);
      cy.log(
        `❌ El campo "Pago XIV Sueldo" es requerido y no puede estar vacío`
      );
      return this;
    }
    // Validar Seleccion dentro de la lista
    cy.xpath(`//div[@class='q-item-label'][contains(.,'${decimoCuarto}')]`, {
      timeout: 1000,
    }).then(($imput) => {
      if ($imput.length) {
        cy.wrap($imput).click();
        cy.log(
          `✅ Pago XIV Sueldo seleccionado correctamente: ${decimoCuarto}`
        );
      }
    });
    return this;
  }

  seleccionarPagoVacaciones(vacaciones) {
    cy.xpath(
      "(//div[contains(.,'Pago de Vacaciones:|arrow_drop_down')])[9]"
    ).click();
    // Validar que el campo reciba un valor
    if (!vacaciones || vacaciones.trim() === "") {
      validationReporter.addError(`❌Campo "Pago de Vacaciones" vacio |`);
      cy.log(
        `❌ El campo "Pago de Vacaciones" es requerido y no puede estar vacío`
      );
      return this;
    }
    // Validar Seleccion dentro de la lista
    cy.xpath(`//div[@class='q-item-label'][contains(.,'${vacaciones}')]`, {
      timeout: 1000,
    }).then(($imput) => {
      if ($imput.length) {
        cy.wrap($imput).click();
        cy.log(
          `✅ Pago de Vacaciones seleccionado correctamente: ${vacaciones}`
        );
      }
    });
    return this;
  }

  ingresarHorasLaborables(horasLaborables) {
    // Validar que el campo reciba un valor
    if (!horasLaborables || horasLaborables.trim() === "") {
      validationReporter.addError(`❌Campo "Horas laborables por mes" vacio |`);
      cy.log(
        `❌ El campo "Horas laborables por mes" es requerido y no puede estar vacío`
      );
      return this;
    }
    cy.xpath("(//div[contains(.,'Horas laborables por mes:|')])[9]").type(
      horasLaborables
    );
  }

  seleccionarTipoEgreso(tipoEgreso) {
    cy.xpath(
      "(//div[contains(.,'Tipo de egreso:|arrow_drop_down')])[9]"
    ).click();
    // Validar que el campo reciba un valor
    if (!tipoEgreso || tipoEgreso.trim() === "") {
      validationReporter.addError(`❌Campo "Tipo de egreso" vacio |`);
      cy.log(
        `❌ El campo "Tipo de egreso" es requerido y no puede estar vacío`
      );
      return this;
    }
    // Validar Seleccion dentro de la lista
    cy.xpath(`//div[@class='q-item-label'][contains(.,'${tipoEgreso}')]`, {
      timeout: 1000,
    }).then(($imput) => {
      if ($imput.length) {
        cy.wrap($imput).click();
        cy.log(`✅ Tipo de egreso seleccionado correctamente: ${tipoEgreso}`);
      }
    });
    return this;
  }

  seleccionarCodigoIESS(codigoIESS) {
    cy.xpath(
      "(//div[contains(.,'Código de establecimiento IESS:|arrow_drop_down')])[9]"
    ).click();
    // Validar que el campo reciba un valor
    if (!codigoIESS || codigoIESS.trim() === "") {
      validationReporter.addError(
        `❌Campo "Código de establecimiento IESS" vacio |`
      );
      cy.log(
        `❌ El campo "Código de establecimiento IESS" es requerido y no puede estar vacío`
      );
      return this;
    }
    // Validar Seleccion dentro de la lista
    cy.xpath(`//div[@class='q-item-label'][contains(.,'${codigoIESS}')]`, {
      timeout: 1000,
    }).then(($imput) => {
      if ($imput.length) {
        cy.wrap($imput).click();
        cy.log(
          `✅ Código de establecimiento IESS seleccionado correctamente: ${codigoIESS}`
        );
      }
    });
    return this;
  }

  moduloGestionTurnos(modGestionTurnos) {
    if (!modGestionTurnos || modGestionTurnos.trim() === "No") {
      cy.log(`ℹ️ No tiene Módulo de gestion de Turnos`);
      return this;
    }
    cy.xpath("(//div[contains(.,'Gestión de turnos')])[9]")
      .scrollIntoView()
      .click();
    cy.xpath(
      "(//div[contains(.,'radio_button_uncheckedradio_button_checkedNo')])[31]"
    ).click();
  }
}

export default ContratoPage;
