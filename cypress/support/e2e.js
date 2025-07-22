import "./commands";

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
  // Ignora específicamente el error de ResizeObserver
  //   if (
  //     err.message.includes(
  //       "ResizeObserver loop completed with undelivered notifications"
  //     )
  //   ) {
  //     return false; // Previene que Cypress falle el test
  //   }

  //   if (err.message.includes("Container is not defined")) {
  //     return false; // Ignora este error específico
  //   }
});
