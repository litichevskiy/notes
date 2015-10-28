(function(exports){

    var TEMPL_TAG_NAME = 'searchResultItem',
        THE_BLOCK_NAME = 'searchResult',
        TAGS_LIST = 'searchResultTagsList';

    if ( !exports.blocks ) exports.blocks = {};
    if ( exports.blocks.hasOwnProperty(THE_BLOCK_NAME) ) {
        throw('the block ' + THE_BLOCK_NAME + ' already exists');
    }

    exports.blocks[THE_BLOCK_NAME] = Instance;



    /**
     * @param {Object} o
     *      @param {Object} o.container HTML element where to create the block instance
     *      @param {Object} [o.channel] pub/sub insance
     */
    function Instance ( o ) {

        var that = this;

        this.channel = o.channel || new EventManager(true);
        this.container = document.createElement('ul');
        this.checkedNoticeId;

        this.container.setAttribute('data-role', 'searchResultItem-label');
        o.container.appendChild(this.container);

        this.container.addEventListener('change', function(event){

            that.checkedNoticeId = event.target.dataset.noticeId;

            that.channel.publish('change', that.checkedNoticeId);
        });
    };


    /**
     * @param {Object[]} tagsList
     */
    Instance.prototype.update = function ( searchResults ) {

        var that = this,
            isCheckedActual = false;

        searchResults = searchResults || [];

        this.container.innerHTML = '';

        searchResults.forEach(function(notice){

            if ( notice.id === that.checkedNoticeId*1 ) isCheckedActual = true;

                if ( true ){

                    var tagsList = notice.tags.map(function( tagName ){

                        return templator.make( TAGS_LIST, 
                            {

                                TAG : tagName

                            }
                        ) 

                    })
                    .join('');
                    
                   
                }

            templator.addTo(
                TEMPL_TAG_NAME,
                {
                    NOTICE_ID : notice.id,
                    CHECKED   : that.checkedNoticeId === notice.id.toString()
                                    ? 'checked'
                                    : '',
                    DATE      :  new Date().toString().split(' ').slice(1,5).join(' '),
                    TITLE     : notice.title,
                    TAGS : tagsList
                },
                that.container
            );
        });


        if ( !isCheckedActual ) {
            that.checkedNoticeId = undefined;
            that.channel.publish('change', that.checkedNoticeId);
        }
    };

    Instance.prototype.on = function () {
        return this.channel.subscribe.apply(this.channel, arguments);
    }

})(window);