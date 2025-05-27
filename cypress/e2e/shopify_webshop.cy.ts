describe("RealBeans Shopify Store", () => {
  const storeUrl = "https://r0975484-realbeans.myshopify.com/";
  const storePassword = "aoveed";

  beforeEach(() => {
    cy.visit(storeUrl);

    // If the store asks for a password, enter it
    cy.get("body").then((body) => {
      if (body.find("input[type='password']").length > 0) {
        cy.get("input[type='password']").type(storePassword);
        cy.get("form").submit();
      }
    });

    // Confirm we're on the Shopify store URL
    cy.url().should("include", "myshopify.com");
  });

  context("Hero section", () => {
    // Check if the main heading (h1) exists on the homepage
    it("has the homepage heading", () => {
      cy.get("h1").should("exist");
    });

    // Check if the intro text appears on the homepage
    it("shows the intro text", () => {
      cy.contains("RealBeans has roasted premium coffee").should("exist");
    });
  });

  context("Product section", () => {
    // Make sure both coffee products are listed on the homepage
    it("lists the expected products", () => {
      cy.contains("Blended coffee 5kg").should("exist");
      cy.contains("Roasted coffee beans 5kg").should("exist");
    });

    // Test if clicking on a product shows the correct detail page
    it("shows correct product detail page", () => {
      cy.contains("Roasted coffee beans 5kg").click({ force: true }); // Open product
      cy.url().should("include", "roasted-coffee-beans"); // Check URL
      cy.contains("Roasted coffee beans 5kg").should("exist"); // Product name visible
      cy.get("img").should("exist"); // Product image exists
      cy.contains("€40,00").should("exist"); // Product price is visible
    });
  });

  context("Navigation", () => {
    // Make sure main navigation links (top menu) are present
    it("shows top nav links", () => {
      ["Home", "Catalog", "Contact", "About"].forEach(link => {
        cy.get("a").contains(link, { matchCase: false }).should("exist");
      });
    });

    // Test if the About link works and displays the correct text
    it("navigates to About page and shows text", () => {
      cy.get("a").contains("About", { matchCase: false }).click({ force: true });
      cy.contains("From a small Antwerp grocery").should("exist");
    });
  });


  context("Product Page - Blended Coffee", () => {
    // Visit the blended coffee product page before each test
    beforeEach(() => {
      cy.visit("https://r0975484-realbeans.myshopify.com/products/blended-coffee-5kg");
    });

    // Check if the product title and price are shown correctly
    it("displays product title and price", () => {
      cy.contains("Blended coffee 5kg").should("exist");
      cy.contains("€55,00").should("exist");
    });

    // Make sure the product image is loaded
    it("displays the product image", () => {
      cy.get("img").first().should("have.attr", "src");
    });

    // Verify all coffee types (variants) are listed
    it("displays coffee types (variants)", () => {
      ["Robusta", "Excelsa", "Arabica", "Liberica"].forEach(type => {
        cy.contains(type).should("exist");
      });
    });

    // Test if quantity selector works by increasing from 1 to 2
    it("allows quantity change", () => {
      cy.get("input[type='number']").should("have.value", "1"); // default quantity
      cy.get("button.quantity__button[name='plus']").click(); // click "+"
      cy.get("input[type='number']").should("have.value", "2"); // new quantity
    });

    // Make sure the Add to cart and Buy it now buttons are visible
    it("has Add to cart and Buy it now buttons", () => {
      cy.contains("Add to cart").should("exist");
      cy.contains("Buy it now").should("exist");
    });

    // Check that the product description text is shown
    it("shows product description", () => {
      cy.contains("RealBeans coffee, ready to brew.").should("exist");
    });
  });

  context("Catalog Page", () => {
    // Visit the catalog (all products) page before each test
    beforeEach(() => {
      cy.visit("https://r0975484-realbeans.myshopify.com/collections/all");
    });

    // Check if the catalog title is shown
    it("shows catalog title", () => {
      cy.get("h1").should("contain", "Products");
    });

    // Make sure both products are listed on the page
    it("lists all available products", () => {
      cy.contains("Blended coffee 5kg").should("exist");
      cy.contains("Roasted coffee beans 5kg").should("exist");
    });

    // Verify the prices for both products are shown correctly
    it("shows price for each product", () => {
      cy.contains("€55,00").should("exist");
      cy.contains("€40,00").should("exist");
    });

    // Check if the sort dropdown can be used to sort products
    it("has working sort dropdown", () => {
      cy.get("select").first().select("Price, low to high");
      // Optional: Add more code to check if order actually changed
    });

    // Test that clicking a product takes you to its detail page
    it("allows product link click", () => {
      cy.contains("Roasted coffee beans 5kg").click({ force: true });
      cy.url().should("include", "/roasted-coffee-beans");
      cy.contains("Roasted coffee beans 5kg").should("exist");
    });
  });

});
