require("cypress-xpath");
require("cypress-plugin-tab");
import { validationReporter } from "../../../utils/validationReporter";
import { validacion } from "../../../utils/validacionCampos";
import { helper } from "../../../utils/helpers";
class prestamosPage {
  goToPrestamos() {
    cy.xpath("//a[@tabindex='0'][contains(.,'dashboardDashboard')]").click();
    cy.xpath("//button[contains(.,'supervised_user_circleEmpleados')]").click();
    cy.xpath(
      "//div[@class='q-btn-inner row col items-center q-popup--skip justify-center'][contains(.,'Prestamos')]"
    ).click();
    cy.wait(1000);
  }

  goToPrestamosConfig() {
    cy.xpath("//a[@tabindex='0'][contains(.,'settingsConfiguración')]").click();
    cy.xpath(
      "//div[@class='q-item q-item-division relative-position'][contains(.,'Empresaarrow_drop_down')]"
    ).click();
    cy.xpath("//a[contains(.,'Configuración Préstamos y Anticipos')]").click();
  }

  configurarPrestamo(dataConfig) {
    this.goToPrestamosConfig();
    this.ingresarCuotasMin(dataConfig.cuotasMin);
    this.ingresarCuotasMax(dataConfig.cuotasMax);
    this.ingresarProrentajeSueldo(dataConfig.porcentajeSueldo);
    this.ingresarMesesGracias(dataConfig.mesesGracia);
    cy.xpath("(//div[contains(.,'saveGuardar')])[37]").click();
    cy.get(".q-alert-content > div", { timeout: 5000 }).then(($els) => {
      const match = $els
        .toArray()
        .some((el) => el.innerText.trim().includes("Guardado"));
      if (match) {
        cy.log("✅ Se guardo correctamente la Configuracion ✅");
      } else {
        validationReporter.addError(
          '❌ No se guardo correctamente la Configuracion ❌" |'
        );
      }
    });
  }

  verificarConfiguracion(dataEmpleado, dataConfig) {
    cy.log(dataConfig.porcentajeSueldo);
    const porcentaje = parseFloat(dataConfig.porcentajeSueldo);
    const sueldo = parseFloat(dataEmpleado.sueldo);
    const montoMaximo = (sueldo * porcentaje) / 100;
    const montoMaximoInvalido = montoMaximo + 0.1;
    this.ingresarMonto(montoMaximoInvalido);
    cy.xpath(
      "//div[@class='q-field-error col'][contains(.,'El monto Excede el % establecido')]",
      { timeout: 5000 }
    ).then(($els) => {
      const match = $els
        .toArray()
        .some((el) =>
          el.innerText.trim().includes("El monto Excede el % establecido")
        );

      if (match) {
        cy.log("✅ Esta correctamente configurado ✅");
      } else {
        cy.log("❌ No detecta correctamente la configuracion ❌");
        validationReporter.addError(
          "❌ No detecta correctamente la configuracion ❌"
        );
      }
    });
  }

  seleccionarEmpleado(dataEmpleado) {
    cy.xpath("(//i[@aria-hidden='true'][contains(.,'search')])[1]").click();
    cy.xpath("(//input[contains(@placeholder,'Buscar')])[1]").type(
      dataEmpleado.cedula
    );
    cy.scrollTo("top");
    cy.xpath(
      `(//div[contains(.,'${dataEmpleado.nombreCompleto}')])[17]`
    ).click();
    cy.scrollTo("top");
    cy.wait(500);
  }

  solicitarPrestamo(data) {
    this.ingresarMotivo(data.motivo);
    this.seleccionarFecha(data.fecha);
    this.ingresarMonto(data.monto);
    this.seleccionarCuotas(data.cuotas);
    this.ingresarInteres(data.interes);
    this.marcarIngreso(data.ingreso);

    // Configurar todas las cuotas dinámicamente
    if (data.cuotasData && data.cuotasData.length > 0) {
      data.cuotasData.forEach((cuotaData, index) => {
        cy.log(`Configurando cuota ${index + 1}`);
        this.configurarCuota(cuotaData);
      });
    }

    cy.scrollTo("top");
    cy.get(".gutter-sm > :nth-child(1) > .q-btn").click();
    cy.wait(1000);
  }

  resgistrarPrestamoSolicitado(dataEmpleado) {
    cy.xpath("//a[@tabindex='0'][contains(.,'addPor registrar')]").click();
    cy.wait(1000);
    cy.get(
      ".q-table-top > :nth-child(3) > .q-if > .q-if-inner > .row > .col"
    ).type(dataEmpleado.apellido);
    cy.wait(1000);
    cy.xpath("//button[@tabindex='0'][contains(.,'registrar')]").click();
    cy.xpath("//button[@tabindex='0'][contains(.,'Si')]").click();
    cy.wait(1000);
  }

  rechazoPrestamoSolicitado(dataEmpleado) {
    cy.xpath("//a[@tabindex='0'][contains(.,'dashboardDashboard')]").click();
    cy.xpath("//button[contains(.,'supervised_user_circleEmpleados')]").click();
    cy.xpath(
      "//div[@class='q-btn-inner row col items-center q-popup--skip justify-center'][contains(.,'Prestamos')]"
    ).click();
    cy.get(".gutter-sm > :nth-child(2) > .q-btn").click();
    cy.get(
      ".q-table-top > :nth-child(3) > .q-if > .q-if-inner > .row > .col"
    ).type(dataEmpleado.apellido, { force: true });
    cy.get(".text-apropadores > .q-btn-inner > div").click();
    cy.get(
      ".modal-content > :nth-child(3) > .q-if > .q-if-inner > .row > .col"
    ).type("Pruebas QA");
    cy.get(".modal-buttons > .text-positive").click();
    cy.wait(1000);
  }

  eliminarPrestamoRegistrado(data) {
    cy.xpath("//div[@class='q-table-control'][contains(.,'|search')]").type(
      data.fecha
    );
    cy.xpath("//button[contains(.,'Pagar')]").click();
    cy.xpath("//div[@class='q-if-label'][contains(.,'Valor a pagar')]").type(
      data.monto
    );
    cy.xpath("//div[@class='q-if-label'][contains(.,'Observación')]").type(
      "Prueba E2E QA"
    );
    cy.xpath(
      "//div[@class='text-center full-width'][contains(.,'Generar Pago')]"
    ).click();
    cy.wait(500);
    cy.xpath("//button[@tabindex='0'][contains(.,'Eliminar')]").click();
    cy.xpath("//button[@tabindex='0'][contains(.,'Si')]").click();
    cy.wait(1000);
  }

  verificarPrestamo(dataPrestamo, dataEmpleado) {
    cy.xpath("//a[@tabindex='0'][contains(.,'Préstamos')]").click();
    cy.wait(500);
    this.seleccionarEmpleado(dataEmpleado);
    //Ingresar en el buscador la fecha de la solicitud registrada
    cy.get(
      ":nth-child(1) > :nth-child(3) > .q-if > .q-if-inner > .row > .col"
    ).type(dataPrestamo.fecha);
    //Buscar en la tabla la fila con la fecha de la solicitud y obtener el valor del monto
    cy.get("tbody tr")
      .contains(dataPrestamo.fecha)
      .parent("tr")
      .find("td")
      .eq(1)
      .invoke("text")
      .then((texto) => {
        const montoTexto = texto.trim();
        const montoNumero = parseFloat(montoTexto.replace(/[^0-9.-]/g, ""));
        cy.wrap(montoNumero).as("montoObtenido");
      });
    //Verficar el valor del monto Registrado es igual al valor del monto Solicitado
    cy.get("@montoObtenido").then((monto) => {
      if (monto == dataPrestamo.monto) {
        cy.log(`Se registro correctamente la Solicitud: ${monto}✅`);
      } else {
        validationReporter.addError(
          '❌ No se Registro correctamente la Solicitud" |'
        );
        cy.log(
          `❌ ERROR: Valor solicitado: ${dataPrestamo.monto}, Valor registrado: ${monto} ❌`
        );
      }
    });
  }

  verificarPrestamoRol(dataRol, dataEmpleado, dataPrestamo) {
    //Buscar y ver el rol mensual
    cy.xpath("(//input[contains(@placeholder,'Buscar')])[2]").type(dataRol.mes);
    cy.wait(500);
    cy.get("tbody tr")
      .contains(dataRol.fecha)
      .parent("tr")
      .find("a.q-btn.text-principal")
      .contains("Ver Rol")
      .click();
    //Buscar el empleado
    cy.get(".column > .q-toolbar > .q-btn").click();
    cy.wait(500);
    cy.xpath("//input[contains(@placeholder,'Buscar empleado')]").type(
      dataEmpleado.cedula
    );
    cy.xpath(
      `//div[@class='q-item-sublabel ellipsis'][contains(.,'${dataEmpleado.cedula}')]`
    ).click();
    //Buscar valores generados
    cy.contains("td", "Préstamo Empresa")
      .scrollIntoView()
      .then(($td) => {
        const $nextTd = $td.next("td");
        cy.wrap($nextTd)
          .find("li")
          .invoke("text")
          .then((texto) => {
            const montoTexto = texto.trim();
            const montoNumero = parseFloat(montoTexto.replace(/[^0-9.-]/g, ""));
            cy.wrap(montoNumero).as("montoPrestamoEmpresa");
          });
      });
    //Verificar el Valor del Prestamo Empresa es igual al valor del Prestamos registrado
    cy.get("@montoPrestamoEmpresa").then((monto) => {
      if (monto == dataPrestamo.totalCuota1) {
        cy.log(
          `El prestamo se muestra correctamente en el Rol: Préstamo Empresa = $${monto}✅`
        );
      } else {
        validationReporter.addError(
          '❌ El prestamo NO se muestra correctamente en el Rol" |'
        );
        cy.log(
          `❌ ERROR: Valor del prestamo: ${dataPrestamo.totalCuota1}, Valor en el Rol: ${monto} ❌`
        );
      }
    });
  }

  ingresarMotivo(motivo) {
    cy.xpath(
      "//div[@tabindex='-1'][contains(.,'|MotivoMotivo')]//input[@type='text']"
    ).type(motivo, { forece: true });
    validacion.formatoSoloLetras(
      "//div[@tabindex='-1'][contains(.,'|MotivoMotivo')]//input[@type='text']",
      "Motivo"
    );
  }
  seleccionarFecha(fecha) {
    cy.xpath("//div[@class='q-if-label'][contains(.,'Fecha')]").click();
    helper.seleccionarFecha(fecha);
  }
  ingresarMonto(monto) {
    cy.xpath("//div[@class='q-if-label'][contains(.,'Monto')]").type(monto);
    validacion.valorMonetario("//input[contains(@step,'0.01')]", "Monto");
  }
  seleccionarCuotas(cuotas) {
    cy.xpath(
      `//div[@class='row no-wrap relative-position'][contains(.,'Cuotas')]`
    ).click();
    cy.xpath(
      `(//div[@class='q-item-label'][contains(.,'${cuotas}')])[1]`
    ).click();
  }
  ingresarInteres(interes) {
    cy.xpath("//div[@class='q-if-label'][contains(.,'Interés')]").type(interes);
    validacion.valorMonetario(
      "(//input[contains(@type,'number')])[7]",
      "Interés"
    );
  }
  marcarIngreso(ingreso) {
    if (ingreso === "Si") {
      cy.get(
        ".q-field-content > :nth-child(1) > .q-option-inner > .q-radio-unchecked"
      ).click();
      cy.log(`✅ Checkbox marcado: ${ingreso}`);
    }
    return this;
  }
  configurarCuota(dataCuota) {
    //Obtener la fila
    const fila = cy
      .get(".absolute.full-width")
      .find(".row.gutter-md")
      .eq(dataCuota.index);

    //Seleccionar el Año
    fila
      .find('input[type="number"]') // busca los inputs númericos
      .eq(0) // 0 = Año, 1 = Monto, 2 = Intereses, 3 = Total
      .clear()
      .type(`${dataCuota.año}`);

    //Seleccionar el Mes
    cy.get(".absolute.full-width") // scope
      .find(".row.gutter-md") // todas las filas
      .eq(dataCuota.index) // primera fila
      .find(".q-select") // busca los select
      .eq(0) // 0 = Mes, 1 = Rol
      .click();
    cy.contains(".q-item-label", dataCuota.mes).click();

    //Seleccionar el Rol
    cy.get(".absolute.full-width")
      .find(".row.gutter-md")
      .eq(dataCuota.index)
      .find(".q-select")
      .eq(1)
      .click();
    cy.contains(".q-item-label", dataCuota.rol).click();

    // Seleccionar el monto
    cy.get(".absolute.full-width")
      .find(".row.gutter-md")
      .eq(dataCuota.index)
      .find('input[type="number"]')
      .eq(1)
      .clear()
      .type(`${dataCuota.monto}`);
  }

  ingresarCuotasMin(cantidadCuota) {
    cy.log(cantidadCuota);
    cy.xpath(
      "//div[contains(@class, 'q-if-label-inner') and normalize-space(text())='Cantidad mínima de cuotas permitidas']/ancestor::div[contains(@class,'q-field')]//input[@type='number']"
    )
      .clear()
      .type(cantidadCuota);
    validacion.valorMonetario(
      "//div[contains(@class, 'q-if-label-inner') and normalize-space(text())='Cantidad mínima de cuotas permitidas']/ancestor::div[contains(@class,'q-field')]//input[@type='number']",
      "Cuota Mínima"
    );
  }
  ingresarCuotasMax(cantidadCuota) {
    cy.xpath(
      "//div[contains(@class, 'q-if-label-inner') and normalize-space(text())='Cantidad máxima de cuotas permitidas']/ancestor::div[contains(@class,'q-field')]//input[@type='number']"
    )
      .clear()
      .type(cantidadCuota);
    validacion.valorMonetario(
      "//div[contains(@class, 'q-if-label-inner') and normalize-space(text())='Cantidad máxima de cuotas permitidas']/ancestor::div[contains(@class,'q-field')]//input[@type='number']",
      "Cuota Maxima"
    );
  }
  ingresarProrentajeSueldo(porcentaje) {
    cy.xpath(
      "//div[contains(@class, 'q-if-label-inner') and normalize-space(text())='Porcentaje de sueldo máximo para préstamos']/ancestor::div[contains(@class,'q-field')]//input[@type='number']"
    )
      .clear()
      .type(porcentaje);
    validacion.valorMonetario(
      "//div[contains(@class, 'q-if-label-inner') and normalize-space(text())='Porcentaje de sueldo máximo para préstamos']/ancestor::div[contains(@class,'q-field')]//input[@type='number']",
      "Porcentaje de Sueldo Maxima"
    );
  }
  ingresarMesesGracias(meses) {
    cy.xpath(
      "//div[contains(@class, 'q-if-label-inner') and normalize-space(text())='Meses de Gracia']/ancestor::div[contains(@class,'q-field')]//input[@type='number']"
    )
      .clear()
      .type(meses);
    validacion.valorMonetario(
      "//div[contains(@class, 'q-if-label-inner') and normalize-space(text())='Meses de Gracia']/ancestor::div[contains(@class,'q-field')]//input[@type='number']",
      "Meses de Gracia"
    );
  }
}

export default prestamosPage;
