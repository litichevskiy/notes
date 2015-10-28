(function(exports){

    var TEMPL_TAG_NAME = 'tag',
        THE_BLOCK_NAME = 'search';

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
        this.checkedTags = {};

        this.container.setAttribute('data-role', 'tag-label');
        this.container.classList.add('list-group');
        o.container.appendChild(this.container);

        this.container.addEventListener('change', function(event){
            var tagName = event.target.dataset.tagName,
                isChecked = event.target.checked;

            that.checkedTags[tagName] = isChecked;

            that.channel.publish(
                'change',
                Object.keys(that.checkedTags)
                .filter(function(tagName){
                    return that.checkedTags[tagName];
                })
            );
        });
    }


    /**
     * @param {String[]} tagsList
     */
    Instance.prototype.update = function ( tagsList ) {

        var that = this;

        tagsList = tagsList || [];

        Object.keys(this.checkedTags).forEach(function(tagName){
            if ( tagsList.indexOf(tagName) === -1 ) {
                delete this.checkedTags[tagName];
            }
        });

        this.container.innerHTML = '';

        tagsList.forEach(function(tagName){
            templator.addTo(
                TEMPL_TAG_NAME,
                {
                    TAG_NAME : tagName,
                    CHECKED  : that.checkedTags[tagName] ? 'checked' : ''
                },
                that.container
            );
        });
    };

    Instance.prototype.on = function () {
        return this.channel.subscribe.apply(this.channel, arguments);
    }

})(window);