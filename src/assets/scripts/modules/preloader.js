
export default function () {

    let percentTotal = 0,
        preloader = document.querySelector('#preloader');
    
    //Add all img path in collection
    let imgPathes = [];

    document.querySelectorAll('*').forEach((element) => {

        let bg = element.style.backgroundImage,
            img = element.tagName === 'IMG',
            path;
        bg !== 'none' ? path = bg.slice(5,-2) : null;
        
        img ? path = element.attributes.src && element.attributes.src.nodeValue : null;

        path ? imgPathes.push(path) : null;
    });


    const setPercent = (total, current) => {
        let percents = Math.ceil(current / total * 100);
        const counter = document.querySelector('#preloader-counter');
        counter.innerHTML = `<span>${percents}%</span>`;

        if (percents >= 100) {
            preloader.style.display = 'none';
        }
    };

    let loadImages = (images) => {
        //If no images
        if (!images.length) {
            preloader.style.dispay = 'none';
        }
        else {
            //Make fake img and tracked load/error event
            images.forEach((img) => {
                let fakeImg = document.createElement('img');
                fakeImg.src = img;
                //if load/error - set new percent in preloader
                fakeImg.addEventListener('load', () => {
                    percentTotal++;
                    setPercent(images.length, percentTotal);
                });
                fakeImg.addEventListener('error', () => {
                    percentTotal++;
                    setPercent(images.length, percentTotal);
                });
            });
        }
    };

    //Init
    loadImages(imgPathes);
        
}
