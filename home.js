function scrollWin1() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
}

function scrollWin2() {
    var aboutSection = document.querySelector('.About');
    aboutSection.scrollIntoView({
        behavior: 'smooth' 
    });
}