import{a as Z}from"./chunk-SQHQ4MSC.js";import{a as ae,b as ie,c as re}from"./chunk-XPLPLSO7.js";import{r as ee,t as te,v as ne}from"./chunk-KMUQARGL.js";import{Ba as G,D as V,E as o,F as R,Ha as x,J as I,K as E,L as v,N as U,O as H,P as d,Qa as J,R as k,Rb as A,Sa as z,Tb as W,Vb as X,Wa as K,Wb as Y,X as l,Xb as _,Y as r,Z as s,_ as g,ca as j,da as D,fa as w,ha as M,ia as p,ja as q,ka as $,o as F,p as u,pa as h,q as O,rb as Q,s as C,t as y,ta as S,u as b,ua as m,ub as L,va as f,z as B}from"./chunk-BAYKJQYM.js";var oe=`
    .p-avatar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: dt('avatar.width');
        height: dt('avatar.height');
        font-size: dt('avatar.font.size');
        background: dt('avatar.background');
        color: dt('avatar.color');
        border-radius: dt('avatar.border.radius');
    }

    .p-avatar-image {
        background: transparent;
    }

    .p-avatar-circle {
        border-radius: 50%;
    }

    .p-avatar-circle img {
        border-radius: 50%;
    }

    .p-avatar-icon {
        font-size: dt('avatar.icon.size');
        width: dt('avatar.icon.size');
        height: dt('avatar.icon.size');
    }

    .p-avatar img {
        width: 100%;
        height: 100%;
    }

    .p-avatar-lg {
        width: dt('avatar.lg.width');
        height: dt('avatar.lg.width');
        font-size: dt('avatar.lg.font.size');
    }

    .p-avatar-lg .p-avatar-icon {
        font-size: dt('avatar.lg.icon.size');
        width: dt('avatar.lg.icon.size');
        height: dt('avatar.lg.icon.size');
    }

    .p-avatar-xl {
        width: dt('avatar.xl.width');
        height: dt('avatar.xl.width');
        font-size: dt('avatar.xl.font.size');
    }

    .p-avatar-xl .p-avatar-icon {
        font-size: dt('avatar.xl.icon.size');
        width: dt('avatar.xl.icon.size');
        height: dt('avatar.xl.icon.size');
    }

    .p-avatar-group {
        display: flex;
        align-items: center;
    }

    .p-avatar-group .p-avatar + .p-avatar {
        margin-inline-start: dt('avatar.group.offset');
    }

    .p-avatar-group .p-avatar {
        border: 2px solid dt('avatar.group.border.color');
    }

    .p-avatar-group .p-avatar-lg + .p-avatar-lg {
        margin-inline-start: dt('avatar.lg.group.offset');
    }

    .p-avatar-group .p-avatar-xl + .p-avatar-xl {
        margin-inline-start: dt('avatar.xl.group.offset');
    }
`;var ge=["*"];function fe(e,n){if(e&1&&(r(0,"span",3),m(1),s()),e&2){let t=p();S(t.cx("label")),l("pBind",t.ptm("label")),o(),f(t.label)}}function ue(e,n){if(e&1&&g(0,"span",5),e&2){let t=p(2);S(t.icon),l("pBind",t.ptm("icon"))("ngClass",t.cx("icon"))}}function ve(e,n){if(e&1&&d(0,ue,1,4,"span",4),e&2){let t=p(),i=h(5);l("ngIf",t.icon)("ngIfElse",i)}}function he(e,n){if(e&1){let t=w();r(0,"img",7),M("error",function(a){y(t);let c=p(2);return b(c.imageError(a))}),s()}if(e&2){let t=p(2);l("pBind",t.ptm("image"))("src",t.image,V),k("aria-label",t.ariaLabel)}}function xe(e,n){if(e&1&&d(0,he,1,3,"img",6),e&2){let t=p();l("ngIf",t.image)}}var _e={root:({instance:e})=>["p-avatar p-component",{"p-avatar-image":e.image!=null,"p-avatar-circle":e.shape==="circle","p-avatar-lg":e.size==="large","p-avatar-xl":e.size==="xlarge"}],label:"p-avatar-label",icon:"p-avatar-icon"},le=(()=>{class e extends W{name="avatar";style=oe;classes=_e;static \u0275fac=(()=>{let t;return function(a){return(t||(t=B(e)))(a||e)}})();static \u0275prov=F({token:e,factory:e.\u0275fac})}return e})();var se=new O("AVATAR_INSTANCE"),P=(()=>{class e extends Y{$pcAvatar=C(se,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=C(_,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}label;icon;image;size="normal";shape="square";styleClass;ariaLabel;ariaLabelledBy;onImageError=new R;_componentStyle=C(le);imageError(t){this.onImageError.emit(t)}static \u0275fac=(()=>{let t;return function(a){return(t||(t=B(e)))(a||e)}})();static \u0275cmp=E({type:e,selectors:[["p-avatar"]],hostVars:4,hostBindings:function(i,a){i&2&&(k("aria-label",a.ariaLabel)("aria-labelledby",a.ariaLabelledBy),S(a.cn(a.cx("root"),a.styleClass)))},inputs:{label:"label",icon:"icon",image:"image",size:"size",shape:"shape",styleClass:"styleClass",ariaLabel:"ariaLabel",ariaLabelledBy:"ariaLabelledBy"},outputs:{onImageError:"onImageError"},features:[G([le,{provide:se,useExisting:e},{provide:X,useExisting:e}]),H([_]),U],ngContentSelectors:ge,decls:6,vars:2,consts:[["iconTemplate",""],["imageTemplate",""],[3,"pBind","class",4,"ngIf","ngIfElse"],[3,"pBind"],[3,"pBind","class","ngClass",4,"ngIf","ngIfElse"],[3,"pBind","ngClass"],[3,"pBind","src","error",4,"ngIf"],[3,"error","pBind","src"]],template:function(i,a){if(i&1&&(q(),$(0),d(1,fe,2,4,"span",2)(2,ve,1,2,"ng-template",null,0,x)(4,xe,1,1,"ng-template",null,1,x)),i&2){let c=h(3);o(),l("ngIf",a.label)("ngIfElse",c)}},dependencies:[K,J,z,A,_],encapsulation:2,changeDetection:0})}return e})(),ce=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=v({type:e});static \u0275inj=u({imports:[P,A,A]})}return e})();function ye(e,n){if(e&1&&(j(0),r(1,"h2",7),m(2),s(),r(3,"p",8),m(4),s(),D()),e&2){let t=p();o(2),f(t.user.username),o(2),f(t.user.email)}}function be(e,n){if(e&1&&(j(0),r(1,"div",9)(2,"div",10)(3,"span",11),m(4),s(),r(5,"span",12),m(6,"Linked"),s()(),r(7,"div",10)(8,"span",11),m(9),s(),r(10,"span",12),m(11,"Total accounts"),s()()(),D()),e&2){let t=p();o(4),f(t.linkedCount),o(5),f(t.accounts.length)}}function Ie(e,n){e&1&&(r(0,"div",9),g(1,"p-skeleton",13)(2,"p-skeleton",13),s())}var pe=(()=>{let n=class n{constructor(i,a,c){this.authService=i,this.launcherService=a,this.router=c,this.user=null,this.accounts=[],this.loading=!0}ngOnInit(){this.user=this.authService.getCurrentUser(),this.launcherService.getLinkedAccounts().subscribe({next:i=>{this.accounts=i,this.loading=!1},error:()=>{this.loading=!1}})}get linkedCount(){return this.accounts.filter(i=>i.isLinked).length}get userInitial(){return this.user?.username?.charAt(0)?.toUpperCase()??"?"}logout(){this.authService.logout(),this.router.navigate(["/auth/login"])}};n.\u0275fac=function(a){return new(a||n)(I(Z),I(re),I(Q))},n.\u0275cmp=E({type:n,selectors:[["app-profile"]],standalone:!1,decls:10,vars:5,consts:[["statsLoading",""],[1,"profile-page"],[1,"profile-card"],["size","xlarge","shape","circle","styleClass","profile-avatar",3,"label"],[4,"ngIf"],[4,"ngIf","ngIfElse"],["label","Logout","icon","pi pi-sign-out","severity","danger",3,"onClick","outlined"],[1,"username"],[1,"email"],[1,"stats-row"],[1,"stat"],[1,"stat-value"],[1,"stat-label"],["width","5rem","height","3rem"]],template:function(a,c){if(a&1){let T=w();r(0,"div",1)(1,"div",2),g(2,"p-avatar",3),d(3,ye,5,2,"ng-container",4),g(4,"p-divider"),d(5,be,12,2,"ng-container",5)(6,Ie,3,0,"ng-template",null,0,x),g(8,"p-divider"),r(9,"p-button",6),M("onClick",function(){return y(T),b(c.logout())}),s()()()}if(a&2){let T=h(7);o(2),l("label",c.userInitial),o(),l("ngIf",c.user),o(2),l("ngIf",!c.loading)("ngIfElse",T),o(4),l("outlined",!0)}},dependencies:[z,ee,te,P,ae],styles:[".profile-page[_ngcontent-%COMP%]{padding:2rem 1.5rem;display:flex;justify-content:center}.profile-card[_ngcontent-%COMP%]{width:100%;max-width:420px;background:var(--p-surface-card, #1e1e1e);border-radius:12px;padding:2rem 1.5rem;border:1px solid var(--p-surface-border, #333);display:flex;flex-direction:column;align-items:center;gap:.5rem}.profile-avatar[_ngcontent-%COMP%]{margin-bottom:.5rem}.username[_ngcontent-%COMP%]{margin:0;font-size:1.5rem;font-weight:700}.email[_ngcontent-%COMP%]{margin:0;color:var(--p-text-muted-color, #888);font-size:.9rem}.stats-row[_ngcontent-%COMP%]{display:flex;gap:3rem;justify-content:center;width:100%;padding:.5rem 0}.stat[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:.125rem}.stat[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%]{font-size:2rem;font-weight:700;line-height:1}.stat[_ngcontent-%COMP%]   .stat-label[_ngcontent-%COMP%]{font-size:.75rem;text-transform:uppercase;letter-spacing:.05em;color:var(--p-text-muted-color, #888)}"]});let e=n;return e})();var Ee=[{path:"",component:pe}],me=(()=>{let n=class n{};n.\u0275fac=function(a){return new(a||n)},n.\u0275mod=v({type:n}),n.\u0275inj=u({imports:[L.forChild(Ee),L]});let e=n;return e})();var rt=(()=>{let n=class n{};n.\u0275fac=function(a){return new(a||n)},n.\u0275mod=v({type:n}),n.\u0275inj=u({imports:[ne,me,ce,ie]});let e=n;return e})();export{rt as ProfileModule};
