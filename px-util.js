window.px = window.px || {};

px.isInt = function(n){
    return Number(n) === n && n % 1 === 0;
};

px.isFloat = function(n){
    return n === Number(n) && n % 1 !== 0;
};
