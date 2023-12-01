beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/
function inputValidData(username) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(username)
    cy.get('#email').type('innar74@gmail.com')
    cy.get('[data-cy="name"]').type('Innar')
    cy.get('#lastName').type('Ool')
    cy.get('[data-testid="phoneNumberTestId"]').type('53429846')
    cy.get('#password').type('InnarSS')
    cy.get('#confirm').type('InnarSS')
    
}

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', ()=>{
        // Add test steps for filling in only mandatory fields
        cy.get('input[name="name"]').type('Innar')
        cy.get('#username').type('InnarTest4')
        cy.get('#email').type('innar74@gmail.com')
        cy.get('#lastName').type('Ool')
        cy.get('[data-testid="phoneNumberTestId"]').type('53429846')
        cy.get('#password').type('InnarSS')
        
        // Type confirmation password which is different from first password
        cy.get('#confirm').type('InnarOol')
        
        // Click somewhere outside input field 
        cy.get('h2').contains('Last name').click()
        
        // Assert that submit button is not enabled
        cy.get('.submit_button').should('be.disabled')
        
        // Assert that successful message is not visible
        cy.get('#success_message').should('not.be.visible')

        // Assert that error message is visible
        cy.get('#password_error_message').should('be.visible').should('contain', 'Passwords do not match!')
        
        // Change the test so, that now there are the same values in the password and confirmation password input fields
        cy.get('#confirm').clear()
        cy.get('#confirm').type('InnarSS')
        cy.get('h2').contains('Last name').click()
        
        // Assert that the error message is not visible anymore and the submit button is enabled
        cy.get('#password_error_message').should('not.be.visible')
        cy.get('.submit_button').should('be.enabled')

    })

    it('User can submit form with all fields added', ()=>{
        // Add test steps for filling in ALL fields
        inputValidData('InnarOol')
        cy.get('#javascriptFavLanguage').check()
        cy.get('#cars').select('volvo')
        cy.get('#animal').select('dog')
        
        // Click somehwere outside of input fields
        cy.get('h2').contains('Last name').click()

        // Assert that submit button is enabled
        cy.get('.submit_button').should('be.enabled')

        // Click on submit button
        cy.get('.submit_button').click()

        // Assert that after submitting the form system show successful message
        cy.get('#success_message').should('be.visible')


    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
        // Add test steps for filling in ONLY mandatory fields
        inputValidData('InnarOol')

        // Click somehwere outside of input fields
        cy.get('h2').contains('Last name').click()

        // Assert that submit button is enabled
        cy.get('.submit_button').should('be.enabled')

        // Click on submit button
        cy.get('.submit_button').click()
        
        // Assert that after submitting the form system shows successful message
        cy.get('#success_message').should('be.visible')

        
    })

    // Add at least 1 test for checking some mandatory field's absence
    it('User can not submit form with empty mandatory field', ()=>{
        
        //Fill mandatory fields
        inputValidData('InnarOol')

        // Clear email field
        cy.get('#email').type('innar74@gmail.com').clear()

        // Click somehwere outside of input fields
        cy.get('h2').contains('Last name').click()

        // Assert that submit button is not enabled
        cy.get('.submit_button').should('be.disabled')

        // Assert that error message is visible
        cy.get('#input_error_message').should('be.visible').and('contain', 'Mandatory input field is not valid or empty!');


    })
    

})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height, to less than 178 and greater than 100
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)   
    })

    it('Check that Cypress logo is correct and has correct size', () => {
        cy.log('Will check Cypress logo source and size')
        
        // Check the image source
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'src', 'cypress_logo.png')
    
        // Check the image height
        cy.get('[data-cy="cypress_logo"]').invoke('height').should('equal', 88)
    
        // Check the image width
        cy.get('[data-cy="cypress_logo"]').invoke('width').should('equal', 116)
    })
    

    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_1.html')
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })
    
    // Create similar test for checking the second link 

    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_3.html')
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })
    


    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)

        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP')

        //Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    // Create test similar to previous one verifying check boxes

    it('Check if checkboxes list is correct', () => {
        // Verify the number of checkboxes
        cy.get('input[type="checkbox"]').should('have.length', 3);
    
        // Verify labels of the checkboxes
        cy.get('input[type="checkbox"]').eq(0).next().should('have.text', 'I have a bike')
        cy.get('input[type="checkbox"]').eq(1).next().should('have.text', 'I have a car')
        cy.get('input[type="checkbox"]').eq(2).next().should('have.text', 'I have a boat')
    
        // Verify default state of checkboxes (unchecked)
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')
    
        // Mark the first checkbox as checked and assert its state
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
    
        // Mark the second checkbox as checked and assert the state of the first and second checkboxes
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        
        // Reassert the state of the first checkbox
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')
    });
    

    it('Car dropdown is correct', () => {
        // Here is an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area, and full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        
        //Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })
    // Create test similar to previous one
   
    it('Animal dropdown is correct', () => {
        // Verify the dropdown contains the correct number of options
        // This check ensures that there are exactly six options available in the dropdown
        cy.get('#animal').find('option').should('have.length', 6)
    
        // Verify the values of each option in the dropdown
        // This ensures that each option's value matches the expected animal names
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo', 'cow', 'mouse'])
        })
    })
    
        
        



})

