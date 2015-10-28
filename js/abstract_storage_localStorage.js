var storage = (function(){

    return {
    
        create : function ( o, callback ) {

            var id = o.id = getUnicId();

            localStorage.setItem(id, JSON.stringify(o));

            if ( typeof callback === 'function' ) callback(null);
        },

        remove : function ( id, callback ) {

            localStorage.removeItem(id);

            if ( typeof callback === 'function' ) callback(null);
        },
    
        get : function ( id, callback ) {

            var item = localStorage.getItem(id) || null;

            if ( item ) {
                try { item = JSON.parse(item) } catch (e) {}
            }

            callback(null, item);
        },
    
        findByTags : function ( tags, callback ) {
            
            var result = [],
                keysList = Object.keys(localStorage);

            keysList.splice( keysList.indexOf('__index'), 1);

            keysList.forEach(function(key){
                var notice = JSON.parse( localStorage.getItem(key) );

                if ( bIncludesA(tags, notice.tags) ) result.push(notice);

            });
            
            if ( typeof callback === 'function' ) callback(null, result);
        }
    };


    function getUnicId () {
        return (new Date()).getTime();
    }

    function bIncludesA ( a, b, unsorted ) {
    
        if ( unsorted ) {
            a = a.sort();
            b = b.sort();
        }
    
        var aPointer = bPointer = 0,
            aLength = a.length,
            bLength = b.length,
            matches = 0;
    
        while ( aPointer < aLength && bPointer < bLength ) {
    
            if ( a[aPointer] === b[bPointer] ) {
    
                matches++;
                aPointer++;
                bPointer++;
                continue;
    
             } else if ( a[aPointer] > b[bPointer] ) {
    
                bPointer++;
                continue;
    
            }
    
            break;
        }
    
        return aLength === matches;
    }

})();