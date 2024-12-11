/// <reference types= "cypress" />

describe('Pokemon Cypress Spec', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Spinner Shows Up In The Start', () => {
    cy.contains('Loading...');
  });

  it('Pokemon Header Exists', () => {
    cy.get('#pokemon-logo').should('exist');
  });

  it('Pokemon Score Exists', () => {
    cy.get('#score').contains('Score: 0');
    cy.get('#question').contains('Question: 1/10');
  });

  it('Pokemon Image Should Be Hidden And Overlay Should Be Displayed', () => {
    cy.get('#pokemon-image').should('not.exist');
    cy.get('#image-overlay').should('exist');
  });

  it('All 4 choices should exist', () => {
    cy.get('#choice-0').should('exist');
    cy.get('#choice-1').should('exist');
    cy.get('#choice-2').should('exist');
    cy.get('#choice-3').should('exist');
  });

  it('Users clicks on one option then presses next then presses the next button', () => {
    // Users clicks on a choice and the answer is reveald.
    cy.get('#choice-0').click();

    cy.get('#pokemon-image').should('exist');
    cy.get('#image-overlay').should('not.exist');

    cy.get('#result-message').then((message) => {
      const wrongResult = message.hasClass('text-red-500');

      if (wrongResult) {
        cy.wrap(message).contains('NAH MAN! GIVE IT ANOTHER SHOT!');
        cy.get('#score').contains('Score: 0');
      } else {
        cy.wrap(message).contains('NICE GARY!');
        cy.get('#score').contains('Score: 1');
      }
    });

    // Users presses the next button which gets the new pokemon and shows its overlay
    cy.get('#next-btn').click();

    cy.get('#pokemon-image').should('not.exist');
    cy.get('#image-overlay').should('exist');

    cy.get('#question').contains('2');
  });
});
