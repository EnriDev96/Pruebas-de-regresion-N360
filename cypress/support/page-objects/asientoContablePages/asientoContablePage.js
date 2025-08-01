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

  generarAsiento(dataRol) {
    cy.xpath("//button[@tabindex='0'][contains(.,'addGenerar')]").click();
    //Seleccionar Fecha del Rol
    cy.xpath("(//div[contains(.,'2025')])[49]").click();
    cy.xpath(
      `//div[@class='q-item-label'][contains(.,'${dataRol.anio}')]`
    ).click();
    cy.xpath("(//div[contains(.,'Agosto')])[21]").click();
    cy.xpath(
      `//div[@class='q-item-label'][contains(.,'${dataRol.mes}')]`
    ).click();
    //Seleccionar Tipo de Rol
    cy.xpath(
      "(//div[@tabindex='0'][contains(.,'|RolFin de mesRolarrow_drop_down')])[3]"
    ).click();
    cy.xpath(
      `//div[@class='q-item-label'][contains(.,'${dataRol.tipo}')]`
    ).click();
    //Generar Rol
    cy.xpath("(//div[contains(.,'doneGenerar')])[3]").click();
    cy.wait(1000);
    cy.xpath("(//div[contains(.,'Generar Rol')])[7]").click({ force: true });
    cy.wait(60000);
  }
}

export default generacionAsientoContable;
