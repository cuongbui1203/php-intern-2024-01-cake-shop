const getCookie = (cname) => {
    const name = `${cname}=`;
    const decodedCookie = decodeURIComponent(document.cookie);

    // tim cookie cos ten cname:
    const cookieMatch = decodedCookie.match(`(?:^|; )${name}([^;]*)`);
    return cookieMatch ? cookieMatch[1] : '';
};

const setCookie = function (cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
};

export { getCookie, setCookie };
