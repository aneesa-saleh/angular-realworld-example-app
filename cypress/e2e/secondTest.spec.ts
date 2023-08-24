describe("Authentication", () => {
  beforeEach(() => {
    cy.intercept({ method: "GET", path: "tags" }, { fixture: "tags.json" });
    cy.loginToApplication();
  });

  it("deletes a new article in a global feed", () => {
    let articleTitle = "";
    cy.generateRandomNumber().then((ID) => {
      articleTitle = `Test article ${ID}`;
    });

    // login
    cy.get("@token")
      .then((token) => {
        const requestBody = {
          article: {
            tagList: [],
            title: articleTitle,
            description: "It's the first test article",
            body: "What a cool first test",
          },
        };

        // create article
        cy.request({
          url: "https://conduit.productionready.io/api/articles/",
          headers: { Authorization: `Token ${token}` },
          method: "POST",
          body: requestBody,
        }).then((response) => {
          expect(response.status).to.be.greaterThan(199).and.lessThan(300);
        });

        return cy.wrap(token);
      })
      .then((token) => {
        cy.contains("Global Feed").click();
        cy.get(".preview-link").first().click();
        cy.get(".article-actions").contains("Delete Article").click();

        return cy.wrap(token);
      })
      .then((token) => {
        cy.request({
          url: "https://conduit.productionready.io/api/articles?limit=10&offset=0",
          headers: { Authorization: `Token ${token}` },
          method: "GET",
        })
          .its("body")
          .then((body) => {
            const { articles } = body;
            expect(articles[0].title).not.to.equal(articleTitle);
          });
      });
  });
});
