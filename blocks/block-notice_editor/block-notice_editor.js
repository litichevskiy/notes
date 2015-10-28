(function(exports){


    var TEMPL_TAG_NAME = 'noticeEditor',
        THE_BLOCK_NAME = 'noticeEditor';

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
        this.container = document.createElement('div');

        this.container.setAttribute('data-role', 'noticeEditor');

        o.container.appendChild(this.container);

        this.container.addEventListener('submit', function(event){

            event.preventDefault();

            var notice = {
                id      : that.container.querySelector('input[data-notice-editor="id"]')
                            .value || '',
                date    : that.container.querySelector('input[data-notice-editor="date"]')
                            .value || (new Date).toISOString(),
                title   : that.container.querySelector('input[data-notice-editor="title"]')
                            .value || '',
                content : that.container.querySelector('textarea[data-notice-editor="content"]')
                            .value || '',
                tags    : (
                            that.container.querySelector('input[data-notice-editor="tags"]').value || ''
                          )
                          .split(/,\s*/),
            };

            // TODO validate form
            that.channel.publish('save', notice);

            return false;
        });
    };


    /**
     * @param {Object[]} tagsList
     */
    Instance.prototype.render = function ( notice ) {

        notice = notice || {};

        var _notice = {
            ID      : notice.id || '',
            DATE    : notice.date || '',
            TITLE   : notice.title || '',
            CONTENT : notice.content || '',
            TAGS    : (notice.tags || []).join(', ')
        };
        this.container.style.display = 'block';
        templator.renderTo(TEMPL_TAG_NAME, _notice, this.container);
    };

    Instance.prototype.hide = function () {
        this.container.style.display = 'none';
    };

    Instance.prototype.on = function () {
        return this.channel.subscribe.apply(this.channel, arguments);
    }
})(window);