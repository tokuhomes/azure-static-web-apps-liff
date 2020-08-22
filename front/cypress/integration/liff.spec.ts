import LINE from '@LINE/bot-sdk';

describe('LIFF App Test', () => {
  const profile: LINE.Profile = {}
  beforeEach(() => {
    cy.viewport('macbook-15')
  	cy.visit(Cypress.env('baseUrl') as string, {
  	  onBeforeLoad: (window: any) => {
 		  // stub liff client API 
 		  profile = {
    	  displayName: 'mockDisplayName',
        userId: '[mock]U1234567890',
        pictureUrl: 'https://ourfunnylittlesite.com/wp-content/uploads/2018/07/1-4-696x696.jpg',
        statusMessage: 'liff is controlled by Cypress'
	    }
	  		 
	    const sendMessagesMock = (async (messages: LINE.Message[]) => {
	      expect(messages.length).to.eq(2)
	    })
	    console.log(profile)
	    window.Cypress.liffMock = {
	      init: cy.stub().as('init').resolves(),
	      isLoggedIn: cy.stub().as('isLoggedIn').returns(true),
	      getProfile: cy.stub().as('getProfile').resolves(profile),
	      isInClient: cy.stub().as('isInClient').returns(true),
	      sendMessages: cy.stub().as('sendMessages').callsFake(sendMessagesMock),
	      closeWindow: cy.stub().as('closeWindow'),
	    };
  	}
	})
  })

  it('TopTitle check', () => {
    cy.contains('【手書きメッセージカード】')
  })

  it('displayName check', () => {
  	cy.contains('こんにちは！' + profile.displayName + 'さん')
  })
  
  it('should be able to send message', () => {
    cy.get('[id^=btnSend]').click()
    cy.get('@sendMessages').should('be.calledOnce')
  })
})