'use strict';

const blogNavToggle = () => {

    let blogNav = document.querySelector('#blog-nav');

    //Process click and touch only on mobile mode of menu
    function addEventsWhenMobile(){

        //X point start and end touch
        let initialPoint = 0, 
            finalPoint = 0;

        //Process click in blog-nav label
        document.body.addEventListener('click', (e) => {
            e.target !== blogNav[0] ? blogNav.classList.remove('blog-nav_open') :
                blogNav.classList.toggle('blog-nav_open');
        });
        //Process touch left and touch right
        //Start touch
        document.body.addEventListener('touchstart', (e) => {
            initialPoint = e.changedTouches[0];
        });
        //End touch
        document.body.addEventListener('touchend', (e)=>{

            finalPoint = e.changedTouches[0];
            let xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);

            if (xAbs > 20 && window.innerWidth <= '930') {
                
                finalPoint.pageX > initialPoint.pageX ? 
                    blogNav.classList.add('blog-nav_open') :
                    blogNav.classList.remove('blog-nav_open');
            }
        });
    }

    //Switch menu to mobile/desktop mode
    function toggleNav(){
        
        let flag = false;

        if (window.innerWidth <= '930' && !flag){
            
            blogNav.classList.add('blog-nav_mobile');
            addEventsWhenMobile();
            flag = true;
        }
        else {
            blogNav.classList.remove('blog-nav_mobile');
            //Important! Force remove open class for nav panel
            blogNav.classList.remove('blog-nav_open');
            flag = false;
        }
    }

    //For first load
    toggleNav();

    //For resize
    window.addEventListener('resize', () => toggleNav());
     
};

export default blogNavToggle;