// This is a JavaScript file

app.factory('service', function() {

    return {
        baseUrl : 'http://localhost:4035/gotapi',
        
        showSpinnerAuto: function() {
            modal.show();
            setTimeout('modal.hide()', 10000);
        },
        showSpinnerTimer: function(timer) {
            modal.show();
            setTimeout('modal.hide()', timer);
        },
        showSpinner: function() {
            modal.show();
        },
        hideSpinner: function() {
            modal.hide();
        }
        
    };

});