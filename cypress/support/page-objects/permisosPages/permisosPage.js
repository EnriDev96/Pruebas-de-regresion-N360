require("cypress-xpath");
require("cypress-plugin-tab");

class permisosPage {
  goToPermisos() {
    cy.xpath("//a[@tabindex='0'][contains(.,'dashboardDashboard')]").click();
    cy.xpath("//button[contains(.,'supervised_user_circleEmpleados')]").click();
    cy.xpath(
      "//div[@class='q-btn-inner row col items-center q-popup--skip justify-center'][contains(.,'Permisos')]"
    ).click();
    cy.wait(1000);
  }
  solicitarPermisoMaterno(dataEmpleado) {
    //Buscar al Empleado
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

    //Ingresar Informacion
    cy.xpath(
      "//div[@class='q-if-label'][contains(.,'Tipo de Solicitud')]"
    ).click();
    cy.xpath(
      "//div[@class='q-item-label'][contains(.,'Permiso de Maternidad')]"
    ).click();
    cy.xpath(
      "//div[@class='q-if-label'][contains(.,'Fecha del permiso')]"
    ).click();
    //❌Pendiente de Corregir❌
    // Por algun motivo no permite escoger la fecha deseada sin antes ecocger la fecha actual
    cy.xpath("(//span[contains(.,'30')])[3]").click();
    cy.get(
      ":nth-child(1) > :nth-child(1) > :nth-child(2) > .row.col > .q-field-content > .q-if > .q-icon"
    ).click();
    //❌Fin del Warning❌
    cy.xpath("(//span[@tabindex='-1'])[3]").click();
    cy.xpath(`(//div[contains(.,'2025')])[55]`).click();
    cy.xpath(`(//div[contains(.,'Junio')])[6]`).click();
    cy.xpath(
      `//div[@class='row items-center content-center justify-center cursor-pointer'][contains(.,'19')]`
    ).click();
    cy.get(".q-uploader-input").selectFile(
      "cypress/fixtures/images/Test Comprobante Imagen .jpg"
    );
    cy.scrollTo("top", { easing: "linear", duration: 1000 });

    //Guardar Informacion
    cy.get(".gutter-sm > :nth-child(1) > .q-btn").click();
  }
  registrarPermisoMaterno(dataEmpleado) {
    cy.get(".gutter-sm > :nth-child(2) > .q-btn").click();
    cy.get(
      ".q-table-top > :nth-child(3) > .q-if > .q-if-inner > .row > .col"
    ).type(dataEmpleado.apellido);
    cy.wait(1000);
    cy.xpath("(//div[contains(.,'registrar')])[19]").click();
    cy.get(".modal-buttons > :nth-child(2)").click();
  }
  visualizarPermisos(dataEmpleado) {
    //Buscar al Empleado
    cy.xpath(
      "//div[@class='col-xs-4 col-md-3'][contains(.,'visibilityPermiso')]"
    ).click();
    cy.get(
      "#q-app > div > div.q-layout-page-container.q-layout-transition > div > main > div > div.col-3.shadow-1 > div > div > div.q-toolbar.row.no-wrap.items-center.relative-position.q-toolbar-normal.bg-primary.text-white > button"
    ).click();
    cy.xpath("(//input[contains(@placeholder,'Buscar')])[1]").type(
      dataEmpleado.cedula
    );
    cy.scrollTo("top");
    cy.xpath(
      `(//div[contains(.,'${dataEmpleado.nombreCompleto}')])[17]`
    ).click();
    cy.scrollTo("top");
    cy.wait(500);
    cy.get(
      ".q-table-top > :nth-child(3) > .q-if > .q-if-inner > .row > .col"
    ).type("Maternidad");
    cy.wait(1000);
    cy.xpath("(//div[contains(.,'Eliminar')])[16]").scrollIntoView({
      easing: "linear",
      duration: 2000,
    });
    cy.xpath("(//div[contains(.,'ver')])[16]").click();
  }
}

export default permisosPage;
