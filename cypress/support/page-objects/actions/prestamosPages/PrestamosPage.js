require("cypress-xpath");
require("cypress-plugin-tab");
import { validationReporter } from "../../../utils/validationReporter";
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
    cy.xpath("//div[@tabindex='-1'][contains(.,'|MotivoMotivo')]").type(
      data.motivo
    );
    cy.xpath("//div[@class='q-if-label'][contains(.,'Fecha')]").click();
    helper.seleccionarFecha(data.fecha);

    cy.xpath("//div[@class='q-if-label'][contains(.,'Monto')]").type(
      data.monto
    );
    cy.xpath(
      "//div[@class='row no-wrap relative-position'][contains(.,'Cuotas')]"
    ).click();
    cy.xpath("(//div[@class='q-item-label'][contains(.,'1')])[1]").click();
    cy.xpath("//div[@class='q-if-label'][contains(.,'Interés')]").type(
      data.interes
    );
    cy.get(
      ".q-field-content > :nth-child(1) > .q-option-inner > .q-radio-unchecked"
    ).click();
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
    cy.xpath("//a[@tabindex='0'][contains(.,'visibilitypréstamos')]").click();
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

  verificarPrestamoRolMensual(dataRol, dataEmpleado, dataPrestamo) {
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
    cy.xpath("(//i[@aria-hidden='true'][contains(.,'search')])[2]").click();
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
      if (monto == dataPrestamo.monto) {
        cy.log(
          `El prestamo se muestra correctamente en el Rol: Préstamo Empresa = $${monto}✅`
        );
      } else {
        validationReporter.addError(
          '❌ El prestamo NO se muestra correctamente en el Rol" |'
        );
        cy.log(
          `❌ ERROR: Valor del prestamo: ${dataPrestamo.monto}, Valor en el Rol: ${monto} ❌`
        );
      }
    });
  }
}

export default prestamosPage;
