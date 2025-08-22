require("cypress-xpath");
require("cypress-plugin-tab");
import { validationReporter } from "../../../utils/validationReporter";
import { validacion } from "../../../utils/validacionCampos";
import { helper } from "../../../utils/helpers";
class vacacionesPage {
  goToVacaciones() {
    cy.xpath("//a[@tabindex='0'][contains(.,'settingsConfiguración')]").click({
      force: true,
    });
    cy.wait(500);
    cy.xpath("//button[contains(.,'supervised_user_circleEmpleados')]").click();
    cy.xpath("//a[@tabindex='0'][contains(.,'Vacaciones')]").click();
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

  solicitarVacacionNormal(data) {
    cy.xpath("(//div[contains(.,'Generar')])[179]").click();
    cy.xpath("(//div[contains(.,'Normal')])[18]").click();

    this.seleccionarPeriodo(data.periodo);
    this.seleccionarFechaInicio(data.fechaInicio);
    this.seleccionarDiasNormales(data.diasDisponibles);

    //Generar Solicitud
    cy.xpath("(//div[contains(.,'Generar')])[195]").click();
    cy.wait(1000);
    cy.get(".q-alert-content > div", { timeout: 5000 }).then(($els) => {
      const match = $els
        .toArray()
        .some((el) => el.innerText.trim().includes("Generado Exitosamente"));
      if (match) {
        cy.log("✅ Se generó la Solicitud correctamente ✅");
      } else {
        validationReporter.addError(
          '❌ No se generó la Solicitud correctamente ❌" |'
        );
      }
    });
  }

  registroVacacionNormal(dataEmpleado, dataSolicitud) {
    cy.get(".gutter-sm > :nth-child(1) > .q-btn").click();
    cy.wait(1000);
    cy.get(
      ".q-table-top > :nth-child(3) > .q-if > .q-if-inner > .row > .col"
    ).type(dataEmpleado.apellido, { force: true });
    cy.get(".text-principal > .q-btn-inner > div").click();
    cy.get(".modal-buttons > :nth-child(2)").click();
    cy.wait(1000);
    //Regresar a Vacaciones y verificar el registro
    cy.xpath("//a[@tabindex='0'][contains(.,'Vacaciones')]").click();
    this.seleccionarEmpleado(dataEmpleado);
    this.verificarHistorico(dataSolicitud);
  }

  rechazoVacacionNormal(dataEmpleado) {
    cy.get(".gutter-sm > :nth-child(1) > .q-btn").click();
    cy.wait(1000);
    cy.get(
      ".q-table-top > :nth-child(3) > .q-if > .q-if-inner > .row > .col"
    ).type(dataEmpleado.apellido, { force: true });
    cy.xpath("(//div[contains(.,'rechazar')])[14]").click();
    cy.xpath("(//input[contains(@type,'text')])[15]").type(
      "Pruebas Automatizadas QA"
    );
    cy.xpath("//button[contains(.,'Si')]").click();
    cy.wait(1000);
  }

  eliminarVacacionRegistrada(data) {
    cy.xpath("//button[@tabindex='0'][contains(.,'Historico')]").click();
    // Verificar si la fila con la fecha existe
    cy.get("body").then(($body) => {
      if ($body.find(`tr:contains("${data.fechaInicio}")`).length === 0) {
        cy.xpath("//button[@tabindex='0'][contains(.,'chevron_right')]")
          .should("exist")
          .click();
      }
    });
    // Buscar y hacer clic en el botón delete de la fila específica
    cy.get("tr")
      .contains(data.fechaInicio)
      .parent("tr")
      .find("button.text-negative")
      .click();
    //Confirmar la eliminacion del registro
    cy.xpath("//button[@tabindex='0'][contains(.,'Si')]").click();
    cy.wait(1000);
  }

  verificarHistorico(data) {
    cy.xpath("//button[@tabindex='0'][contains(.,'Historico')]").click();
    // Verificar si la fila con la fecha existe
    cy.get("body").then(($body) => {
      if ($body.find(`tr:contains("${data.fechaInicio}")`).length === 0) {
        cy.xpath("//button[@tabindex='0'][contains(.,'chevron_right')]")
          .should("exist")
          .click();
      }
    });
    // Buscar la fila y encontrar Los Días Tomados Registrados
    cy.get("tr")
      .contains(data.fechaInicio)
      .parents("tr")
      .within(() => {
        cy.get("td")
          .eq(2) // índice 2 = "Días Tomados"
          .invoke("text")
          .then((texto) => {
            const diasTomados = texto.trim();
            cy.log(
              `Se registraron correctamente los Días Tomados: ${diasTomados} ✅`
            );
          });
      });
  }

  seleccionarPeriodo(periodo) {
    cy.xpath("(//div[contains(.,'Periodo')])[61]").click();
    if (!validacion.campoObligatorio(periodo, "Periodo")) {
      return;
    }
    validacion.correctaSeleccion(
      `(//div[contains(.,'${periodo}')])[30]`,
      "Periodo",
      periodo
    );
  }

  seleccionarFechaInicio(fecha) {
    cy.xpath("(//div[contains(.,'Fecha de inicio')])[16]").click();
    if (!validacion.campoObligatorio(fecha, "Fecha de inicio")) {
      return;
    }
    helper.seleccionarFecha(fecha);
  }

  seleccionarDiasNormales(dias) {
    cy.xpath("(//div[contains(.,'Días normales disponibles')])[16]").click();
    if (!validacion.campoObligatorio(dias, "Días normales disponibles")) {
      return;
    }
    validacion.correctaSeleccion(
      `//div[@class='q-item-label'and text()='${dias}']`,
      "Días normales disponibles",
      dias
    );
  }
}

export default vacacionesPage;
