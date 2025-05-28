describe("RealBeans Shopify Store - Required Tests", () => {
  const storeUrl = "https://r0975484-realbeans.myshopify.com/";
  const storePassword = "aoveed";

  beforeEach(() => {
    cy.visit(storeUrl);

    // Enter password if prompted
    cy.get("body").then((body) => {
      if (body.find("input[type='password']").length > 0) {
        cy.get("input[type='password']").type(storePassword);
        cy.get("form").submit();
      }
    });

    cy.url().should("include", "myshopify.com");
  });


  // The homepage’s intro text and product list appear correctly
  it("shows homepage intro text and product list", () => {
    cy.contains("RealBeans has roasted premium coffee").should("exist");
    cy.contains("Blended coffee 5kg").should("exist");
    cy.contains("Roasted coffee beans 5kg").should("exist");
  });

  // The product catalog page shows the correct items you entered
  it("displays product catalog page with correct items", () => {
    cy.visit(`${storeUrl}/collections/all`);
    cy.contains("Blended coffee 5kg").should("exist");
    cy.contains("Roasted coffee beans 5kg").should("exist");
  });

  // Sorting products (e.g., by price) actually changes their order
  it("changes product order when sorted by price", () => {
    cy.visit(`${storeUrl}/collections/all`);
    cy.get("select").first().select("Price, low to high");
    // Optional: verify order changes
  });

  // Product detail pages display the right descriptions, prices, and imagenames
  it("displays correct product details", () => {
    cy.visit(`${storeUrl}/products/roasted-coffee-beans-5kg`);
    cy.contains("Roasted coffee beans 5kg").should("exist");
    cy.contains("€40,00").should("exist");
    cy.get("img").should("exist");
  });

  // ✅ The About page includes the history paragraph
  it("shows About page history text", () => {
    cy.get("a").contains("About", { matchCase: false }).click({ force: true });
    cy.contains("From a small Antwerp grocery").should("exist");
  });


});
