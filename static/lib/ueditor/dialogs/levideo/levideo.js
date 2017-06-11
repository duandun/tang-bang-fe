UE.registerUI('levideo',function(editor,uiName){

    //创建dialog
    var dialog = new UE.ui.Dialog({
    	id:'levideo',
    	//源码位于html文件以便调试
    	iframeUrl:'/news/toEditVideo',
    	//需要指定当前的编辑器实例
        editor:editor,
        //指定dialog的名字
        name:uiName,
        //dialog的标题
        title:UE.I18N[editor.getOpt("lang")].le.videoTitle,

        //指定dialog的外围样式
        cssRules:"width:500px;height:500px;",

        //如果给出了buttons就代表dialog有确定和取消
        buttons:[
            {
                className:'edui-okbutton',
                label:UE.I18N[editor.getOpt("lang")].ok,
                onclick:function () {
                	var frameDoc = document.getElementById('levideo_iframe').contentWindow.document;
                	var vid, count = 0;
                	$(frameDoc).find("table input").each(function(index,ele){
                		  if ($(ele).is(":checked")) {
                			  count++;
                			  vid = $(ele).val();
                		  }
                	});
                	if (count > 1) {
                		alert(UE.I18N[editor.getOpt("lang")].le.videoTip);

                	} else if (count == 1) {
                		var vname = $(frameDoc).find("#vname"+vid).attr("title");
                		var vimgs = $(frameDoc).find("#vimgs"+vid).val();
                		
                		var h = '<iframe class="appvideos" data-type="video" data-vid="'+vid+'" data-title="'+vname+'" data-image="'+vimgs+'" src="http://minisite.letv.com/tuiguang/index.shtml?autoplay=0&vid='+vid+'"></iframe>';
                		editor.execCommand('inserthtml',h);
                        dialog.close(true);
                	}
                }
            },
            {
                className:'edui-cancelbutton',
                label:UE.I18N[editor.getOpt("lang")].cancel,
                onclick:function () {
                    dialog.close(false);
                }
            }
        ]});

    //参考addCustomizeButton.js
    var btn = new UE.ui.Button({
        name:UE.I18N[editor.getOpt("lang")].le.video,
        title:UE.I18N[editor.getOpt("lang")].le.video,
        //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules :'background-position: -320px -20px',
        onclick:function () {
            //渲染dialog
            dialog.render();
            dialog.open();
        }
    });
    
    return btn;
},[-2]/*index 指定添加到工具栏上的那个位置，默认时追加到最后,editorId 指定这个UI是那个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮*/);