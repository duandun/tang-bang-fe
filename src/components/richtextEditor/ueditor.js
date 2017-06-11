window.UEDITOR_HOME_URL = '/static/lib/ueditor/';
// require('../../../../../static/lib/jquery.cookie/jquery.cookie.js');
require('../../../static/lib/ueditor/ueditor.config.js');
require('../../../static/lib/ueditor/ueditor.all.js');
// import videoPlugin from './plugins/levideo.js';

let UE = window.UE;

export default {
    init(vm) {
        this.vm = vm;

        this.instance = UE.getEditor('editor', {
            'initialFrameHeight': 400
        });

        // videoPlugin(vm);
        this.bindEvents();
    },

    bindEvents() {
        this.instance.addListener('contentChange', this.onContentChange.bind(this));
    },

    setContent(content) {
        let editor = this.instance;

        if (editor.isReady) {
            editor.setContent(content);
        } else {
            console.log('set when ready..');
            editor.addListener('ready', function() {
                editor.setContent(content);
            });
        }
    },

    getContent() {
        return this.instance.getContent();
    },

    onContentChange() {
        this.vm.update(this.getContent());
    },

    insertVideo(video) {
        var template = `
            <iframe class="appvideos" data-type="video" data-vid="${video.id}" data-title="${video.title}" data-image="${video.image}" src="http://minisite.letv.com/tuiguang/index.shtml?autoplay=0&vid='${video.id}'">
            </iframe>
        `;

        this.instance.execCommand('inserthtml', template);
    },

    destroy() {
        this.instance.destroy();
    }
}
