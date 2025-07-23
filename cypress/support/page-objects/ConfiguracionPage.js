require("cypress-xpath");
require("cypress-plugin-tab");
class ConfiguracionPage {
  goToCargasMasivas() {
    cy.xpath("(//div[contains(.,'Configuración')])[10]").click();
    cy.xpath("(//div[contains(.,'Inicial')])[39]").click();
    cy.xpath("(//div[contains(.,'Cargas Masivas')])[17]").click();
    cy.wait(1000);
  }
  cargaMasivaColaboradores() {
    cy.xpath("(//div[contains(.,'Colaboradores')])[13]").click();
    //cy.xpath("(//div[contains(.,'Descargar Plantilla')])[23]").click(); //Solo Descarga la Plantilla
    cy.get(
      "#q-app > div > div.q-layout-page-container.q-layout-transition > main > div.row.fit.absolute-top-left > div.col.full-height.scroll > main > div > div > div > div.q-collapsible.q-item-division.relative-position.q-collapsible-opened.q-collapsible-cursor-pointer > div > div:nth-child(2) > div > div:nth-child(1) > div > div.q-pa-xl.col.full-width > div > div > div > div > div.q-field-content.col-xs-12.col-sm > div.q-uploader.relative-position.q-uploader-files-no-border > div.q-if.row.no-wrap.relative-position.q-if-has-label.q-if-standard.q-if-has-content.text-primary > i > input"
    ).selectFile(
      "cypress/fixtures/cargasMasivas/demo_demo3/01 COLABORADORES ACTIVOS.xlsx"
    ); // Seleccionar archivo
    cy.xpath("(//div[contains(.,'Cargar')])[23]").click(); //Cargar el archivo
  }
  cargaMasivaLocalidades() {
    cy.xpath("(//div[contains(.,'Localidades')])[13]").click();
    //cy.xpath("(//div[contains(.,'Descargar Plantilla')])[49]").click(); //Solo Descarga la Plantilla
    cy.get(
      "#q-app > div > div.q-layout-page-container.q-layout-transition > main > div.row.fit.absolute-top-left > div.col.full-height.scroll > main > div > div > div > div.q-collapsible.q-item-division.relative-position.q-collapsible-opened.q-collapsible-cursor-pointer > div > div:nth-child(2) > div > div > div > div.q-pa-xl.col.full-width > div > div > div > div > div.q-field-content.col-xs-12.col-sm > div.q-uploader.relative-position.q-uploader-files-no-border > div.q-if.row.no-wrap.relative-position.q-if-has-label.q-if-standard.q-if-has-content.text-primary > i > input"
    ).selectFile(
      "cypress/fixtures/cargasMasivas/demo_demo3/02 LOCALIDADES.xlsx"
    ); // Seleccionar archivo
    cy.xpath("(//button[contains(.,'Cargar')])[3]").click(); //Cargar el archivo
  }
  cargaMasivaDepartamentos() {
    cy.xpath("(//div[contains(.,'Departamentos')])[26]").click();
    //cy.xpath("(//div[contains(.,'Descargar Plantilla')])[111]").click(); //Solo Descarga la Plantilla
    cy.get(
      "#q-app > div > div.q-layout-page-container.q-layout-transition > main > div.row.fit.absolute-top-left > div.col.full-height.scroll > main > div > div > div > div.q-collapsible.q-item-division.relative-position.q-collapsible-opened.q-collapsible-cursor-pointer > div > div:nth-child(2) > div > div > div > div.q-pa-xl.col.full-width > div > div > div > div > div.q-field-content.col-xs-12.col-sm > div.q-uploader.relative-position.q-uploader-files-no-border > div.q-if.row.no-wrap.relative-position.q-if-has-label.q-if-standard.q-if-has-content.text-primary > i > input"
    ).selectFile(
      "cypress/fixtures/cargasMasivas/demo_demo3/03 DEPARTAMENTOS - ESTRUCTURA.xlsx"
    ); // Seleccionar archivo
    cy.xpath("(//div[contains(.,'Cargar')])[111]").click(); //Cargar el archivo
  }
  cargaMasivaCentrosCosto() {
    cy.xpath("(//div[contains(.,'Centros de Costo')])[34]").click();
    //cy.xpath("(//div[contains(.,'Descargar Plantilla')])[126]").click(); //Solo Descarga la Plantilla
    cy.get(
      "#q-app > div > div.q-layout-page-container.q-layout-transition > main > div.row.fit.absolute-top-left > div.col.full-height.scroll > main > div > div > div > div.q-collapsible.q-item-division.relative-position.q-collapsible-opened.q-collapsible-cursor-pointer > div > div:nth-child(2) > div > div > div > div.q-pa-xl.col.full-width > div > div > div > div > div.q-field-content.col-xs-12.col-sm > div.q-uploader.relative-position.q-uploader-files-no-border > div.q-if.row.no-wrap.relative-position.q-if-has-label.q-if-standard.q-if-has-content.text-primary > i > input"
    ).selectFile(
      "cypress/fixtures/cargasMasivas/demo_demo3/04 CENTROS DE COSTO.xlsx"
    ); // Seleccionar archivo
    cy.xpath("(//button[contains(.,'Cargar')])[9]").click(); //Cargar el archivo
  }
  cargaMasivaCodigoEstablecimientoSRI() {
    cy.xpath("(//div[contains(.,'Establecimiento SRI')])[13]").click();
    //cy.xpath("(//button[contains(.,'Descargar Plantilla')])[10]").click(); //Solo Descarga la Plantilla
    cy.get(
      "#q-app > div > div.q-layout-page-container.q-layout-transition > main > div.row.fit.absolute-top-left > div.col.full-height.scroll > main > div > div > div > div.q-collapsible.q-item-division.relative-position.q-collapsible-opened.q-collapsible-cursor-pointer > div > div:nth-child(2) > div > div > div > div.q-pa-xl.col.full-width > div > div > div > div > div.q-field-content.col-xs-12.col-sm > div.q-uploader.relative-position.q-uploader-files-no-border > div.q-if.row.no-wrap.relative-position.q-if-has-label.q-if-standard.q-if-has-content.text-primary > i > input"
    ).selectFile(
      "cypress/fixtures/cargasMasivas/demo_demo3/05 CODIGO ESTABLECIMIENTO SRI.xlsx"
    ); // Seleccionar archivo
    cy.xpath("(//div[contains(.,'Cargar')])[141]").click(); //Cargar el archivo
  }
  cargaMasivaCodigoEstablecimientoIESS() {
    cy.xpath("(//div[contains(.,'Establecimiento IESS')])[13]").click();
    //cy.xpath("(//div[contains(.,'Descargar Plantilla')])[156]").click(); //Solo Descarga la Plantilla
    cy.get(
      "#q-app > div > div.q-layout-page-container.q-layout-transition > main > div.row.fit.absolute-top-left > div.col.full-height.scroll > main > div > div > div > div.q-collapsible.q-item-division.relative-position.q-collapsible-opened.q-collapsible-cursor-pointer > div > div:nth-child(2) > div > div > div > div.q-pa-xl.col.full-width > div > div > div > div > div.q-field-content.col-xs-12.col-sm > div.q-uploader.relative-position.q-uploader-files-no-border > div.q-if.row.no-wrap.relative-position.q-if-has-label.q-if-standard.q-if-has-content.text-primary > i > input"
    ).selectFile(
      "cypress/fixtures/cargasMasivas/demo_demo3/06 CODIGO EMPRESA IESS.xlsx"
    ); // Seleccionar archivo
    cy.xpath("(//div[contains(.,'Cargar')])[156]").click(); //Cargar el archivo
  }
  cargaMasivaCargosEmpresa() {
    cy.xpath("(//div[contains(.,'Cargos y Códigos Sectoriales')])[13]").click();
    //cy.xpath("(//div[contains(.,'Descargar Plantilla')])[171]").click(); //Solo Descarga la Plantilla
    cy.get(
      "#q-app > div > div.q-layout-page-container.q-layout-transition > main > div.row.fit.absolute-top-left > div.col.full-height.scroll > main > div > div > div > div.q-collapsible.q-item-division.relative-position.q-collapsible-opened.q-collapsible-cursor-pointer > div > div:nth-child(2) > div > div > div > div.q-pa-xl.col.full-width > div > div > div > div > div.q-field-content.col-xs-12.col-sm > div.q-uploader.relative-position.q-uploader-files-no-border > div.q-if.row.no-wrap.relative-position.q-if-has-label.q-if-standard.q-if-has-content.text-primary > i > input"
    ).selectFile(
      "cypress/fixtures/cargasMasivas/demo_demo3/07 CARGOS DE EMPRESA-COD. SECTORIALES.xlsx"
    ); // Seleccionar archivo
    cy.xpath("(//div[contains(.,'Cargar')])[171]").click(); //Cargar el archivo
  }
  cargaMasivaContratosActivos() {
    cy.xpath("(//div[contains(.,'Contratos')])[52]").click();
    //cy.xpath("(//div[contains(.,'Descargar Plantilla')])[64]").click(); //Solo Descarga la Plantilla
    cy.get(
      "#q-app > div > div.q-layout-page-container.q-layout-transition > main > div.row.fit.absolute-top-left > div.col.full-height.scroll > main > div > div > div > div.q-collapsible.q-item-division.relative-position.q-collapsible-opened.q-collapsible-cursor-pointer > div > div:nth-child(2) > div > div > div > div.q-pa-xl.col.full-width > div > div > div:nth-child(1) > div > div.q-field-content.col-xs-12.col-sm > div.q-uploader.relative-position.q-uploader-files-no-border > div.q-if.row.no-wrap.relative-position.q-if-has-label.q-if-standard.q-if-has-content.text-primary > i > input"
    ).selectFile(
      "cypress/fixtures/cargasMasivas/demo_demo3/08 CONTRATOS ACTIVOS.xlsx"
    ); // Seleccionar archivo
    cy.xpath("(//button[contains(.,'Cargar')])[4]").click(); //Cargar el archivo
  }
  cargaMasivaContratosHistoricos() {
    cy.xpath("(//div[contains(.,'Contratos Historicos')])[13]").click();
    //cy.xpath("(//div[contains(.,'Descargar Plantilla')])[85]").click(); //Solo Descarga la Plantilla
    cy.get(
      "#q-app > div > div.q-layout-page-container.q-layout-transition > main > div.row.fit.absolute-top-left > div.col.full-height.scroll > main > div > div > div > div.q-collapsible.q-item-division.relative-position.q-collapsible-opened.q-collapsible-cursor-pointer > div > div:nth-child(2) > div > div:nth-child(1) > div > div.q-pa-xl.col.full-width > div > div > div > div > div.q-field-content.col-xs-12.col-sm > div.q-uploader.relative-position.q-uploader-files-no-border > div.q-if.row.no-wrap.relative-position.q-if-has-label.q-if-standard.q-if-has-content.text-primary > i > input"
    ).selectFile(
      "cypress/fixtures/cargasMasivas/demo_demo3/09 CONTRATOS HISTORICOS.xlsx"
    ); // Seleccionar archivo
    cy.xpath("(//div[contains(.,'Cargar')])[85]").click(); //Cargar el archivo
  }
}

export default ConfiguracionPage;
