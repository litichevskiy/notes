(function(){
    var blocksBin = {},
        containers = {
            search       : document.querySelector('div[data-role="search"]'),
            searchResult : document.querySelector('div[data-role="searchResult"]'),
            noticeCont   : document.querySelector('div[data-role="noticeCont"]')
        };

    
    blocksBin.searchResult = new blocks.searchResult({
        container : containers.searchResult
    });
    
    blocksBin.search = new blocks.search({
        container : containers.search
    });
    
    blocksBin.noticeEditor = new blocks.noticeEditor({
        container : containers.noticeCont
    });
    
    
    blocksBin.noticeEditor.render();
    
    
    blocksBin.noticeEditor.on('save', function(event, notice){
        indexedStorage.create(notice, function(error){
            if ( error ) return console.error(error);
        });
    });
    
    blocksBin.search.on('change', function(event, checkedTags){
        checkedTags = checkedTags || [];
    
        if ( !checkedTags.length ) return blocksBin.searchResult.update([]);
    
        indexedStorage.findByTags(checkedTags, function(error,list){
            if ( error ) throw(error);
    
            blocksBin.searchResult.update(list)
        });
    });
    
    blocksBin.searchResult.on('change', function(event, checkedNoticeId){

        if ( !checkedNoticeId ) {
            blocksBin.noticeEditor.render({});
            return;
        }

        indexedStorage.get(checkedNoticeId, function(error, notice){
            blocksBin.noticeEditor.render(notice);
        })
    });
    
    
    indexedStorage.on('tagschange', function(event, list){
        blocksBin.search.update(list);
    });
    
    indexedStorage.tagsList(function(error, list){
        blocksBin.search.update(list);
    });
})();