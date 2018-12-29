import viewObserver from '@modules/viewObserver';
import smoothScroll from '@modules/smoothScroll';

const blogNavMenu = () => {
    let blogPosts = document.querySelectorAll('.blog__item'),
        blogNavItems = document.querySelectorAll('.blog-nav__item'),
        blogNavLinks = document.querySelectorAll('.blog-nav__link');

    //Processing scroll to switch active link in blog nav
    window.addEventListener('scroll', () => {

        blogNavItems.forEach((item, index) => {
            //Prevently, removing active class in all nav items
            item.classList.remove('blog-nav__item_active');

            //And add to links, which indicate visible post
            viewObserver(blogPosts[index]) && item.classList.add('blog-nav__item_active');
        });
    });

    //Processing click link in blog nav to animate scroll
    blogNavLinks.forEach((link, index) => {

        link.addEventListener('click',(e) => {
            
            e.preventDefault();
            smoothScroll(`#${blogPosts[index].id}`, 900);
        });
    });


};

export default blogNavMenu;