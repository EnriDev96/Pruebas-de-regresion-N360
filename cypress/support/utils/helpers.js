require("cypress-xpath");
require("cypress-plugin-tab");
class helpers {
  seleccionarFecha(data) {
    const [anio, mes, dia] = data.split("-");
    const meses = [
      "",
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    const mesNombre = meses[parseInt(mes, 10)];
    cy.xpath("(//span[@tabindex='-1'])[3]").click();
    cy.xpath(
      `//div[@class='q-btn-inner row col items-center q-popup--skip justify-center'][contains(.,'${anio}')]`
    ).click();
    cy.xpath(
      `//div[@class='q-btn-inner row col items-center q-popup--skip justify-center'][contains(.,'${mesNombre}')]`
    ).click();
    cy.xpath(
      `//div[@class='row items-center content-center justify-center cursor-pointer'][contains(.,'${parseInt(
        dia,
        10
      )}')]`
    ).click();
  }
}

export const helper = new helpers();
