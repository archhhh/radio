let dropdown_nav = document.getElementById("dropdown-nav");
let nav = document.getElementById("nav");

dropdown_nav.addEventListener("click", () => {
    if(nav.className == "nav-open")
    {
        nav.className = "nav-closed";
        dropdown_nav.className = "fas fa-chevron-down";
    }else{
        nav.className = "nav-open";
        dropdown_nav.className = "fas fa-chevron-circle-down";
    }
});

