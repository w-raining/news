/**
 * Created by Administrator on 2017/7/19.
 */
import React, {Component} from 'react';
import E from 'wangeditor';
class WangEditor extends Component {
    componentDidMount() {
        var editor = new E(this.el);
        var self = this;
        editor.customConfig.uploadImgServer = this.props.action;
        editor.customConfig.uploadFileName = 'file';
        editor.customConfig.uploadImgHooks = {
            customInsert: function (insertImg, result, editor) {
                var url = result.url
                insertImg(url)
            }
        };
        editor.customConfig.onchange = function (html) {
            self.props.handleText(html);
        };
        editor.create();
    }


    render() {
        return (
            <div ref={(el) => this.el = el} id="editor">

            </div>
        )
    }
}
export default WangEditor;