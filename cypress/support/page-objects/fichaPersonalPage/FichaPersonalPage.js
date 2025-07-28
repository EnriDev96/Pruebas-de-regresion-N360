require("cypress-xpath");
require("cypress-plugin-tab");
class FichaPersonalPage {
  goToFichaPersonal() {
    cy.xpath("//div[normalize-space()='Contratos']").click();
    cy.xpath("//div[contains(text(),'Ficha personal')]").click();
    cy.wait(1000);
  }

  crearFichaPersonal(datos) {
    cy.xpath("(//div[contains(.,'Empleado')])[47]").click();
    cy.xpath("(//div[contains(.,'Datos Básicos')])[11]").click();
    cy.wait(2000);
    cy.xpath(
      "(//div[@class='col q-input-target ellipsis justify-start'])[31]"
    ).click();
    cy.xpath("//div[contains(text(),'Cédula')]").click();
    cy.xpath("(//input[@type='text'])[4]").type(datos.cedula);
    cy.xpath("(//div[contains(.,'verificar cedula')])[14]").click();
    cy.xpath("(//input[contains(@type,'text')])[5]")
      .type(datos.nombres)
      .type("{enter}")
      .tab()
      .type(datos.apellidos)
      .type("{enter}");
    cy.xpath("(//input[@type='email'])[1]").type(datos.emailInstitucional);
    cy.xpath("(//input[@type='email'])[2]").type(datos.emailPersonal);
    cy.xpath("(//input[@type='text'])[7]").type(datos.codigoIESS);
    cy.xpath(
      "(//div[@class='col q-input-target ellipsis justify-start'])[32]"
    ).click();
    cy.xpath(`(//div[contains(.,'${datos.sexo}')])[5]`).click();
    cy.xpath(
      "(//div[@class='col q-input-target ellipsis justify-start'])[33]"
    ).click();
    cy.xpath(`(//div[contains(.,'${datos.estadoCivil}')])[5]`).click();
    // Fecha de nacimiento
    cy.xpath(
      "(//div[@class='col q-input-target ellipsis justify-start'])[34]"
    ).click();
    cy.xpath("(//span[@tabindex='-1'])[3]").click();
    cy.xpath(`(//div[contains(.,'${datos.anioNacimiento}')])[6]`).click();
    cy.xpath(`(//div[contains(.,'${datos.mesNacimiento}')])[6]`).click();
    cy.xpath(`(//span[contains(.,'${datos.diaNacimiento}')])[3]`).click();
    // Empleado Sustituto y Discapacidad
    cy.xpath("(//div[@class='col q-input-target ellipsis justify-start'])[34]")
      .focused()
      .tab()
      .type("{enter}{downarrow}{downarrow}{enter}")
      .tab()
      .type("{enter}{downarrow}{downarrow}{enter}");
    // Foto
    cy.get("#picture-input > input[type=file]").selectFile(datos.foto, {
      force: true,
    });
    // Datos de Ubicación
    cy.xpath("(//div[contains(.,'Datos de ubicación')])[11]").click();
    cy.wait(1000);
    cy.xpath(
      "(//div[@class='col q-input-target ellipsis justify-start'])[30]"
    ).click();
    cy.xpath(`(//div[contains(.,'${datos.region}')])[5]`).click();
    cy.xpath(
      "(//div[@class='col q-input-target ellipsis justify-start'])[31]"
    ).click();
    cy.xpath(`(//div[contains(.,'${datos.tipoVivienda}')])[5]`).click();
    // Datos Financieros
    cy.xpath("(//div[contains(.,'Datos financieros')])[9]").click();
    cy.wait(1000);
    cy.xpath(
      "(//div[@class='col q-input-target ellipsis justify-start'])[30]"
    ).click();
    cy.xpath(`(//div[contains(.,'${datos.formaPago}')])[5]`).click();
    // Guardar
    cy.xpath("(//div[contains(.,'Guardar')])[39]").click();
    cy.wait(3000);
  }

  buscarFichaPorCedula(cedula) {
    cy.xpath("(//div[contains(.,'Sin contratos')])[16]").click();
    cy.wait(500);
    cy.xpath("//i[@aria-hidden='true'][contains(.,'search')]").click();
    cy.xpath("//input[contains(@placeholder,'Buscar')]").type(
      `${cedula}{enter}`
    );
  }

  eliminarFichaPersonal() {
    cy.xpath("//div[contains(@class,'q-item-label ellipsis')]").click();
    cy.xpath("(//div[contains(.,'Eliminar ficha personal')])[16]").click();
    cy.xpath("//i[@aria-hidden='true'][contains(.,'arrow_back')]").click();
    cy.wait(3000);
  }
}
export default FichaPersonalPage;
