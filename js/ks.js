(function () {
    'use strict';

    angular.module('ispApp').factory('inputString', inputString);
	function inputString() {

        var inputString = this;
        var textString = null;


        function getTextString() {
            return textString;
        }

        function setTextString(text) {
            textString = text;
        };

        return {
            getTextString: getTextString,
            setTextString: setTextString
        };
		
    };
})();