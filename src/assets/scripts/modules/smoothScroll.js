const smoothScroll = (elemToId) =>  {
    document.querySelector(elemToId).scrollIntoView({ behavior: 'smooth', block: 'start' })
};

export default smoothScroll;