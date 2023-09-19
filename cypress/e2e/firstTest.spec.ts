describe("Authentication", () => {
  beforeEach(() => {
    cy.intercept({ method: "GET", path: "tags" }, { fixture: "tags.json" });
    cy.loginToApplication();
  });

  it(
    "WHEEL verify correct req and res - PRAC-T1",
    { browser: "firefox" },
    () => {
      cy.intercept("POST", "https://api.realworld.io/api/articles").as(
        "postArticles"
      );

      cy.generateRandomNumber().then((ID) => {
        cy.contains("New Article").click();
        cy.get('[formcontrolname="title"]').type(`Aneesa wow ${ID}`);
        cy.get('[formcontrolname="description"]').type("Description");
        cy.get('[formcontrolname="body"]').type("Body");
        cy.contains("Publish Article").click();

        // delete it
        cy.url().should("contain", "Aneesa");
        cy.contains("button", "Delete").click();
      });
    }
  );

  it("will intercept and modify the req and res - PRAC-T2", () => {
    cy.intercept("POST", "**/articles", (req) => {
      req.reply((res) => {
        expect(res.body.article.description).to.equal("Description");
        res.body.description = "I CHANGED IT AGAIN";
      });
    }).as("postArticles");

    cy.contains("New Article").click();
    cy.get('[formcontrolname="title"]').type("Aneesa wows22");
    cy.get('[formcontrolname="description"]').type("Description");
    cy.get('[formcontrolname="body"]').type("Body");
    cy.contains("a", "conduit").click();
  });

  it("verifies popular tags are displayed", () => {
    cy.get(".tag-list").should("contain", "saa").and("contain", "gwamma");
  });

  it(
    "verify global feed likes count",
    { retries: 1, browser: "chrome" },
    () => {
      cy.intercept("GET", "https://api.realworld.io/api/articles/feed*", {
        articles: [],
        articlesCount: 0,
      });
      cy.intercept("GET", "https://api.realworld.io/api/articles*", {
        fixture: "articles.json",
      });

      cy.contains("Global Feed").click();
      cy.get("app-article-list button").then((heart) => {
        expect(heart).to.contain.text("2202");
      });

      cy.fixture("articles").then((file) => {
        const articleLink = file.articles[0].slug;
        file.articles[0].favoritesCount = 222000222;
        cy.intercept(
          "POST",
          `https://api.realworld.io/api/articles/${articleLink}/favorite`,
          file
        );
      });

      cy.get("app-article-list button").click().should("contain", "2203"); // wrong: 2204
    }
  );
});
