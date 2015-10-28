(function(exports){
    
    exports.templator = {

        addTo : function ( tmplName, data, target ) {
            target.innerHTML += render( tmplName, data, target );
        },

        renderTo : function ( tmplName, data, target ) {
            target.innerHTML = render( tmplName, data, target );
        },

        make : function ( tmplName, data ){
            return render( tmplName, data );
        }
    };

    function render ( tmplName, data ) {
        var tmpl = document.querySelector('[data-template-name="'+tmplName+'"]')
                    .innerHTML.split('%%');

        return tmpl.reduce(function(p, c, i, a){
            if ( i%2 === 0 ) return p + c;
    
            return p + data[c];
        }, '');
    }

})(window);