require("cypress-xpath");
require("cypress-plugin-tab");
class ConfSistemaPage {
  goToRolesPermisos() {
    cy.xpath("(//div[contains(.,'Configuración')])[10]").click();
    cy.xpath("(//div[contains(.,'Sistema')])[23]").click();
    cy.xpath("(//div[contains(.,'Roles y Permisos')])[17]").click();
    cy.wait(1000);
  }
  createRol() {
    cy.xpath("(//button[contains(@tabindex,'0')])[58]").click();
    cy.xpath("(//input[contains(@type,'text')])[7]").type("Rol QA");
    cy.xpath("//div[@tabindex='0'][contains(.,'Rol Técnico')]").click();
    cy.xpath(
      "//div[@tabindex='0'][contains(.,'Rol Técnico')]//div[contains(@class, 'q-option-inner')]"
    )
      .should("have.class", "active")
      .then(($inner) => {
        if ($inner.hasClass("active")) {
          cy.log("✅ Toggle Rol Técnico está en ON");
        } else {
          cy.log("❌ Toggle Rol Técnico está en OFF");
        }
      });

    cy.xpath("(//div[contains(.,'saveGuardar')])[31]").scrollIntoView({
      easing: "linear",
      duration: 1000,
    });
    cy.xpath("(//div[contains(.,'saveGuardar')])[31]").then(($btnGuardar) => {
      if ($btnGuardar.is(":visible")) {
        cy.log("El boton esta visible. Haciendo clic...");
        //cy.wrap($btnGuardar).click();
      } else {
        cy.log(
          'El botón "Guardar" NO esta visible. Continuando con la prueba...'
        );
      }
    });
    // cy.xpath("//div[contains(@class, 'q-option-inner')]").should(
    //   "have.class",
    //   "active"
    // );
  }
  editRol() {
    cy.xpath("").click();
  }
}

export default ConfSistemaPage;
