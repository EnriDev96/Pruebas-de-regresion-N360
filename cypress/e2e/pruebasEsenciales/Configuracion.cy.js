import FichaPersonalPage from "../../support/page-objects/FichaPersonalPage";
import ConfiguracionPage from "../../support/page-objects/ConfiguracionPage";

describe("Configuracion Inicial", () => {
  const fichaPersonal = new FichaPersonalPage();
  const configuracion = new ConfiguracionPage();

  beforeEach(() => {
    cy.loginNomina360("adminDemo");
  });

  it.only("1. Cargas Masivas", () => {
    cy.fixture("fichaPersonal").then((data) => {
      configuracion.goToCargasMasivas();
      configuracion.cargaMasivaColaboradores();
      configuracion.cargaMasivaLocalidades();
      configuracion.cargaMasivaDepartamentos();
      configuracion.cargaMasivaCentrosCosto();
      configuracion.cargaMasivaCodigoEstablecimientoSRI();
      configuracion.cargaMasivaCodigoEstablecimientoIESS();
      configuracion.cargaMasivaCargosEmpresa();
      configuracion.cargaMasivaContratosActivos();
      configuracion.cargaMasivaContratosHistoricos();
    });
  });

  it("2. Configuracion Empresa", () => {
    cy.fixture("fichaPersonal").then((data) => {
      fichaPersonal.goToFichaPersonal();
      fichaPersonal.buscarFichaPorCedula(data.empleadoUno.cedula);
      fichaPersonal.eliminarFichaPersonal();
    });
  });
});
