
export default function(elem) {

    //This method watch - whether the elem is in field of view
    let $window = window,
        docViewTop = $window.scrollY,
        docViewBottom = docViewTop + $window.innerHeight,
        elemTop = elem.offsetTop,
        elemBottom = elemTop + elem.offsetHeight;
        
    //True, if visible top or bottom part block in window
    return (((elemTop <= docViewBottom) && (docViewBottom <= elemBottom))
            ||((docViewTop <= elemBottom) && (elemTop <= docViewBottom)));
    
}
