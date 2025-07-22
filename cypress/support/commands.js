Cypress.Commands.add("loginNomina360", (userType = "adminDemo") => {
  cy.fixture("users").then((users) => {
    const user = users[userType];
    cy.visit("http://localhost:8080/#/login");
    cy.xpath("//input[contains(@type,'email')]").type(user.email);
    cy.xpath("//input[contains(@type,'password')]").type(user.password);
    cy.xpath("//div[contains(text(),'Iniciar')]").click();
  });
});
