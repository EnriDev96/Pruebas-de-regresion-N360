import ConfiguracionInicialPage from "../../support/page-objects/ConfiguracionInicialPage";
import ConfEmpresaPage from "../../support/page-objects/ConfiguracionEmpresaPage";

describe("Configuracion Inicial", () => {
  const confInicial = new ConfiguracionInicialPage();
  const confEmpresa = new ConfEmpresaPage();

  beforeEach(() => {
    cy.loginNomina360("adminDemo");
  });

  it("1. Carga Masiva de Datos", () => {
    confInicial.goToCargasMasivas();
    confInicial.cargaMasivaColaboradores();
    confInicial.cargaMasivaLocalidades();
    confInicial.cargaMasivaDepartamentos();
    confInicial.cargaMasivaCentrosCosto();
    confInicial.cargaMasivaCodigoEstablecimientoSRI();
    confInicial.cargaMasivaCodigoEstablecimientoIESS();
    confInicial.cargaMasivaCargosEmpresa();
    confInicial.cargaMasivaContratosActivos();
    confInicial.cargaMasivaContratosHistoricos();
  });

  it.only("2. Configuracion de la Empresa", () => {
    cy.fixture("empresas").then((datosEmpresa) => {
      confEmpresa.goToDatosEmpresa();
      confEmpresa.cambiarLogoEmpresa(datosEmpresa.demo3);
    });
  });
});
