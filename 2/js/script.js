document.addEventListener('DOMContentLoaded', function() {
    var submenuItems = document.querySelectorAll('.has-submenu > a');

    submenuItems.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            var submenu = this.nextElementSibling;
            if (submenu.style.display === 'block') {
                submenu.style.display = 'none';
            } else {
                submenu.style.display = 'block';
            }
        });
    });
});