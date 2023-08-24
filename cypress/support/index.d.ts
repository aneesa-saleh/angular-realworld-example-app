declare namespace Cypress {
  interface Chainable<Subject = any> {
    loginToApplication(): Chainable<null>;
    generateRandomNumber(): Chainable<number>;
  }
}
