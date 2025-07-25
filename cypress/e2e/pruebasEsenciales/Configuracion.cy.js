import ConfiguracionInicialPage from "../../support/page-objects/ConfiguracionInicialPage";
import ConfEmpresaPage from "../../support/page-objects/ConfiguracionEmpresaPage";
import ConfSistemaPage from "../../support/page-objects/ConfiguracionSistemaPage";

describe("Configuracion Inicial", () => {
  const confInicial = new ConfiguracionInicialPage();
  const confEmpresa = new ConfEmpresaPage();
  const confRoles = new ConfSistemaPage();

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

  it("2. Configuracion de la Empresa", () => {
    cy.fixture("empresas").then((datosEmpresa) => {
      confEmpresa.goToDatosEmpresa();
      confEmpresa.cambiarLogoEmpresa(datosEmpresa.demo3);
    });
  });

  it.only("4. Configurar Roles y Permisos", () => {
    confRoles.goToRolesPermisos();
    confRoles.createRol();
  });
});
