import switchCards from '@modules/switchCards';
import authorization from '@modules/authorization';

document.addEventListener('DOMContentLoaded', () => {
    
    let linkAuth = document.querySelector('#to-auth'),
        flipContainer = document.querySelector('#flip-container'),
        signInForm = document.querySelector('#sign-in'),
        signInReset = document.querySelector('#log-reset');
    
    //Swipping cards 'welcome' an 'authorization'
    switchCards(linkAuth, flipContainer, signInReset);
    //Validation in 'authorization card'
    authorization(signInForm);
});