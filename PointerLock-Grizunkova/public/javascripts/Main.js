/**
 * @author Charlie Calvert
 */

require.config({
    baseUrl : '.',
    paths : {
        "jquery" : 'javascripts/jquery-2.1.1',
        "Three" : 'javascripts/three',
        "Control" : 'javascripts/Control',
        "Floors":'javascripts/Floors',
        "PointerLockControls":'javascripts/PointerLockControls',
        "PointerLockSetup":'javascripts/PointerLockSetup'

    },
    shim : {
        'Three' : {
            exports : 'Three'
        },
        'PointerLockControls' : {
            exports : 'PointerLockControls'
        }
    }
});

require([ 'jquery', 'Three', 'Control' ], function(jq, Three, Control) {

    'use strict';

    $(document).ready(function() {
        var control = new Control();
    });

});
