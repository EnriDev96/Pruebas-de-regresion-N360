require("cypress-xpath");
require("cypress-plugin-tab");

class generacionRolPage {
  goToGeneracionDelRol() {
    cy.wait(1000);
    cy.xpath("//a[@tabindex='0'][contains(.,'dashboardDashboard')]").click({
      force: true,
    });
    cy.xpath("//button[@tabindex='0'][contains(.,'Roles de pago')]").click();
    cy.xpath("//a[@tabindex='0'][contains(.,'Generación de roles')]").click();
    cy.wait(1000);
  }
  generarTipoRol(dataRol) {
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
      "(//div[contains(.,'|RolQuincenaRolarrow_drop_down')])[21]"
    ).click();
    cy.xpath(
      `//div[@class='q-item-label'][contains(.,'${dataRol.tipo}')]`
    ).click();
    //Generar Rol
    cy.xpath("(//div[contains(.,'doneGenerar')])[3]").click();
    cy.wait(1000);
    cy.xpath("(//div[contains(.,'Generar Rol')])[7]").click({ force: true });
  }
  buscarRol(dataRol) {
    cy.xpath("(//input[contains(@placeholder,'Buscar')])[2]").type(
      dataRol.fecha
    );
    cy.wait(1000);
  }
  aprobarRol() {
    cy.xpath("(//div[contains(.,'Aprobar')])[12]").click();
    cy.wait(1000);
  }
  descargarRolGeneral() {
    cy.xpath("(//div[contains(.,'Reportes')])[20]").click();
    cy.xpath("(//div[contains(.,'Reporte general')])[4]").click();
    cy.xpath("(//div[contains(.,'Generar Reporte General')])[22]").click();
  }

  revertirRol() {
    cy.xpath("(//button[@tabindex='0'][contains(.,'Revertir')])[1]").click();
  }
  eliminarRol() {
    cy.xpath("//button[@tabindex='0'][contains(.,'Eliminar')]").click();
    cy.xpath("(//button[@tabindex='0'][contains(.,'Si')])[2]").click();
    cy.wait(1000);
  }

  tiempoGeneraciónDocumento(xpath) {
    const start = Date.now();
    const downloadsFolder = "cypress/downloads";
    cy.xpath(xpath).click();
    cy.task("getLatestFile", { dirPath: downloadsFolder }).then(
      (latestFilePath) => {
        expect(latestFilePath).to.not.be.null;
        cy.readFile(latestFilePath, { timeout: 10000 })
          .should("exist")
          .then(() => {
            cy.log(`El archivo más reciente es: ${latestFilePath}`);
          });
      }
    );
    const end = Date.now();
    const elapsed = end - start; // tiempo en milisegundos
    const maxTime = 5000;
    if (elapsed > maxTime) {
      cy.log(`⚠️ El archivo tardó demasiado en generarse: ${elapsed} ms`);
    } else {
      cy.log(`✅ El archivo se generó en ${elapsed} ms`);
    }
  }
}

export default generacionRolPage;
