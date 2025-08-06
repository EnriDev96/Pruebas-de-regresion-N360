require("cypress-xpath");
require("cypress-plugin-tab");

class generacionAsientoContable {
  goToAsientoContable() {
    cy.wait(1000);
    cy.xpath("//a[@tabindex='0'][contains(.,'dashboardDashboard')]").click({
      force: true,
    });
    cy.xpath(
      "//button[@tabindex='0'][contains(.,'assignmentReportes')]"
    ).click();
    cy.xpath(
      "//button[@tabindex='0'][contains(.,'assignmentReportes generales')]"
    ).click();
    cy.xpath("(//a[@tabindex='0'][contains(.,'Contable')])[1]").click();
    cy.wait(1000);
  }

  generarAsientoContable(dataRol) {
    cy.xpath("//button[@tabindex='0'][contains(.,'Generar asiento')]").click();
    //Seleccionar Fecha del Rol
    cy.xpath("(//input[contains(@type,'text')])[5]").type(dataRol.nombre);
    cy.xpath("(//div[contains(.,'Rol')])[67]").click();
    cy.xpath(
      `//div[@class='q-item-label'][contains(.,'${dataRol.tipo}')]`
    ).click();
    cy.xpath("(//div[contains(.,'2025')])[47]").click();
    cy.xpath(
      `//div[@class='q-item-label'][contains(.,'${dataRol.anio}')]`
    ).click();
    cy.xpath("(//div[contains(.,'Mes')])[89]").click();
    cy.xpath(
      `//div[@class='q-item-label'][contains(.,'${dataRol.mes}')]`
    ).click();
    //Generar Asiento
    cy.xpath("(//div[contains(.,'Generar')])[178]").click();
  }
  descargarAsientoContable(dataRol) {
    cy.xpath("//input[contains(@placeholder,'Buscar')]").type(dataRol.nombre);
    cy.wait(1000);
    cy.xpath("(//i[@class='q-icon fas fa-file-excel'])[1]").click();
  }
}

export default generacionAsientoContable;
