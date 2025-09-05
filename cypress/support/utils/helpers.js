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

  parseCurrencyToNumber(str) {
    if (!str && str !== 0) return NaN;
    let s = String(str).trim();
    // Detectar paréntesis como negativo: (1.234,56) => -1234.56
    const isNegative = /^\(.*\)$/.test(s);
    if (isNegative) {
      s = s.replace(/^\(|\)$/g, "");
    }
    // Si tiene tanto '.' como ',' asumimos que '.' son miles y ',' decimal: "1.234,56"
    if (s.indexOf(".") !== -1 && s.indexOf(",") !== -1) {
      s = s.replace(/\./g, "").replace(",", ".");
    } else if (s.indexOf(",") !== -1 && s.indexOf(".") === -1) {
      // Si sólo tiene coma, la tratamos como separador decimal "123,45" -> "123.45"
      s = s.replace(",", ".");
    }
    // Quitar todo lo que no sea dígito, punto o signo negativo
    s = s.replace(/[^\d.-]/g, "");
    // Reaplicar signo negativo si venía entre paréntesis
    if (isNegative && s) s = "-" + s;
    const n = parseFloat(s);
    return isNaN(n) ? NaN : n;
  }
}

export const helper = new helpers();
