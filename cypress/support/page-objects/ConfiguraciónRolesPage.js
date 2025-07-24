require("cypress-xpath");
require("cypress-plugin-tab");
class ConfRolesPage {
  goToRolesPermisos() {
    cy.xpath("(//div[contains(.,'Configuración')])[10]").click();
    cy.xpath("(//div[contains(.,'Sistema')])[23]").click();
    cy.xpath("(//div[contains(.,'Roles y Permisos')])[17]").click();
    cy.wait(1000);
  }
}

export default ConfRolesPage;
