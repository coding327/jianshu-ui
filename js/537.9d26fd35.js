"use strict";(self["webpackChunkjianshu_ui"]=self["webpackChunkjianshu_ui"]||[]).push([[537],{2537:function(e,a,r){r.r(a),r.d(a,{default:function(){return c}});var t=function(){var e=this,a=e._self._c;return a("div",[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:e.action,name:"myfile",headers:e.headers,"show-file-list":!1,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeAvatarUpload}},[e.imageUrl?a("img",{staticClass:"avatar",attrs:{src:e.imageUrl}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)},s=[],i=(r(4603),r(7566),r(8721),r(1351)),l={data(){return{imageUrl:""}},computed:{action(){return(0,i.n)()?"/api/upload":"/upload"},headers(){return{Authorization:`Bearer ${(0,i.gf)()}`}}},methods:{beforeAvatarUpload(e){const a="image/jpeg"===e.type||"image/png"===e.type,r=e.size/1024/1024<2;return a||this.$message.error("上传头像图片只能是 JPG 格式!"),r||this.$message.error("上传头像图片大小不能超过 2MB!"),a&&r},handleAvatarSuccess(e,a){this.imageUrl=URL.createObjectURL(a.raw)},releaseImage(){URL.revokeObjectURL(this.imageUrl)}},beforeDestroy(){this.releaseImage()}},o=l,u=r(1656),n=(0,u.A)(o,t,s,!1,null,"1f26e0cb",null),c=n.exports}}]);
//# sourceMappingURL=537.9d26fd35.js.map