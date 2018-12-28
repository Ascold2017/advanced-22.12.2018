'use strict';

const switchCards = (linkAuth, flipContainer, signInReset) => {
    document.body.addEventListener('click', (e) => {
        //Click in auth or reset or out of flip container
        if( (!e.target.closest('.flip') || e.target === signInReset) ) {
            //If click out of front flip container - no flip
            if(!flipContainer.classList.contains('flip_rotate') && e.target !== linkAuth) 
                return false;
            flipContainer.classList.toggle('flip_rotate');
            linkAuth.classList.toggle('hidden');
        }
    });
};

export default switchCards;
