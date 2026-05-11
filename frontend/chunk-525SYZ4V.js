import{b as Y}from"./chunk-HPKJOWGS.js";import{a as et,b as at,c as nt}from"./chunk-XPLXZ6M6.js";import{u as Z,w as tt}from"./chunk-J47S2BLW.js";import{$ as p,$b as Q,Aa as d,Ab as A,Ba as f,C as I,Ga as q,H as P,I as l,J as F,N as x,Na as S,O as _,P as u,R as L,S as O,T as y,V as M,W as w,X as E,Xa as $,Ya as G,Zb as b,aa as r,ab as J,ba as o,bc as W,ca as m,cc as X,dc as v,ja as V,la as R,ma as s,na as U,oa as H,r as j,s as g,t as D,v as h,va as z,w as k,x as N,xb as K,za as C}from"./chunk-OZEG2AIK.js";var it=`
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
`;var pt=["*"];function dt(t,a){if(t&1&&(r(0,"span",3),d(1),o()),t&2){let e=s();C(e.cx("label")),p("pBind",e.ptm("label")),l(),f(e.label)}}function mt(t,a){if(t&1&&m(0,"span",5),t&2){let e=s(2);C(e.icon),p("pBind",e.ptm("icon"))("ngClass",e.cx("icon"))}}function ft(t,a){if(t&1&&y(0,mt,1,4,"span",4),t&2){let e=s(),i=z(5);p("ngIf",e.icon)("ngIfElse",i)}}function gt(t,a){if(t&1){let e=V();r(0,"img",7),R("error",function(n){k(e);let c=s(2);return N(c.imageError(n))}),o()}if(t&2){let e=s(2);p("pBind",e.ptm("image"))("src",e.image,P),M("aria-label",e.ariaLabel)}}function ut(t,a){if(t&1&&y(0,gt,1,3,"img",6),t&2){let e=s();p("ngIf",e.image)}}var vt={root:({instance:t})=>["p-avatar p-component",{"p-avatar-image":t.image!=null,"p-avatar-circle":t.shape==="circle","p-avatar-lg":t.size==="large","p-avatar-xl":t.size==="xlarge"}],label:"p-avatar-label",icon:"p-avatar-icon"},rt=(()=>{class t extends Q{name="avatar";style=it;classes=vt;static \u0275fac=(()=>{let e;return function(n){return(e||(e=I(t)))(n||t)}})();static \u0275prov=j({token:t,factory:t.\u0275fac})}return t})();var ot=new D("AVATAR_INSTANCE"),B=(()=>{class t extends X{$pcAvatar=h(ot,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=h(v,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}label;icon;image;size="normal";shape="square";styleClass;ariaLabel;ariaLabelledBy;onImageError=new F;_componentStyle=h(rt);imageError(e){this.onImageError.emit(e)}static \u0275fac=(()=>{let e;return function(n){return(e||(e=I(t)))(n||t)}})();static \u0275cmp=_({type:t,selectors:[["p-avatar"]],hostVars:4,hostBindings:function(i,n){i&2&&(M("aria-label",n.ariaLabel)("aria-labelledby",n.ariaLabelledBy),C(n.cn(n.cx("root"),n.styleClass)))},inputs:{label:"label",icon:"icon",image:"image",size:"size",shape:"shape",styleClass:"styleClass",ariaLabel:"ariaLabel",ariaLabelledBy:"ariaLabelledBy"},outputs:{onImageError:"onImageError"},features:[q([rt,{provide:ot,useExisting:t},{provide:W,useExisting:t}]),O([v]),L],ngContentSelectors:pt,decls:6,vars:2,consts:[["iconTemplate",""],["imageTemplate",""],[3,"pBind","class",4,"ngIf","ngIfElse"],[3,"pBind"],[3,"pBind","class","ngClass",4,"ngIf","ngIfElse"],[3,"pBind","ngClass"],[3,"pBind","src","error",4,"ngIf"],[3,"error","pBind","src"]],template:function(i,n){if(i&1&&(U(),H(0),y(1,dt,2,4,"span",2)(2,ft,1,2,"ng-template",null,0,S)(4,ut,1,1,"ng-template",null,1,S)),i&2){let c=z(3);l(),p("ngIf",n.label)("ngIfElse",c)}},dependencies:[J,$,G,b,v],encapsulation:2,changeDetection:0})}return t})(),lt=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=u({type:t});static \u0275inj=g({imports:[B,b,b]})}return t})();function xt(t,a){if(t&1&&(r(0,"h2",4),d(1),o(),r(2,"p",5),d(3),o()),t&2){let e=s();l(),f(e.user.username),l(2),f(e.user.email)}}function _t(t,a){if(t&1&&(r(0,"div",3)(1,"div",6)(2,"span",7),d(3),o(),r(4,"span",8),d(5,"Linked"),o()(),r(6,"div",6)(7,"span",7),d(8),o(),r(9,"span",8),d(10,"Total accounts"),o()()()),t&2){let e=s();l(3),f(e.linkedCount),l(5),f(e.accounts.length)}}function yt(t,a){t&1&&(r(0,"div",3),m(1,"p-skeleton",9)(2,"p-skeleton",9),o())}var st=(()=>{let a=class a{constructor(i,n,c){this.authService=i,this.launcherService=n,this.router=c,this.user=null,this.accounts=[],this.loading=!0}ngOnInit(){this.user=this.authService.getCurrentUser(),this.launcherService.getLinkedAccounts().subscribe({next:i=>{this.accounts=i,this.loading=!1},error:()=>{this.loading=!1}})}get linkedCount(){return this.accounts.filter(i=>i.isLinked).length}get userInitial(){return this.user?.username?.charAt(0)?.toUpperCase()??"?"}logout(){this.authService.logout(),this.router.navigate(["/library"])}};a.\u0275fac=function(n){return new(n||a)(x(Y),x(nt),x(K))},a.\u0275cmp=_({type:a,selectors:[["app-profile"]],standalone:!1,decls:8,vars:3,consts:[[1,"profile-page"],[1,"profile-card"],["size","xlarge","shape","circle","styleClass","profile-avatar",3,"label"],[1,"stats-row"],[1,"username"],[1,"email"],[1,"stat"],[1,"stat-value"],[1,"stat-label"],["width","5rem","height","3rem"]],template:function(n,c){n&1&&(r(0,"div",0)(1,"div",1),m(2,"p-avatar",2),w(3,xt,4,2),m(4,"p-divider"),w(5,_t,11,2,"div",3)(6,yt,3,0,"div",3),m(7,"p-divider"),o()()),n&2&&(l(2),p("label",c.userInitial),l(),E(c.user?3:-1),l(2),E(c.loading?6:5))},dependencies:[Z,B,et],styles:[".profile-page[_ngcontent-%COMP%]{padding:2rem 1.5rem;display:flex;justify-content:center}.profile-card[_ngcontent-%COMP%]{width:100%;max-width:420px;background:var(--p-surface-card, #1e1e1e);border-radius:12px;padding:2rem 1.5rem;border:1px solid var(--p-surface-border, #333);display:flex;flex-direction:column;align-items:center;gap:.5rem}.profile-avatar[_ngcontent-%COMP%]{margin-bottom:.5rem}.username[_ngcontent-%COMP%]{margin:0;font-size:1.5rem;font-weight:700}.email[_ngcontent-%COMP%]{margin:0;color:var(--p-text-muted-color, #888);font-size:.9rem}.stats-row[_ngcontent-%COMP%]{display:flex;gap:3rem;justify-content:center;width:100%;padding:.5rem 0}.stat[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:.125rem}.stat[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%]{font-size:2rem;font-weight:700;line-height:1}.stat[_ngcontent-%COMP%]   .stat-label[_ngcontent-%COMP%]{font-size:.75rem;text-transform:uppercase;letter-spacing:.05em;color:var(--p-text-muted-color, #888)}"]});let t=a;return t})();var Ct=[{path:"",component:st}],ct=(()=>{let a=class a{};a.\u0275fac=function(n){return new(n||a)},a.\u0275mod=u({type:a}),a.\u0275inj=g({imports:[A.forChild(Ct),A]});let t=a;return t})();var ee=(()=>{let a=class a{};a.\u0275fac=function(n){return new(n||a)},a.\u0275mod=u({type:a}),a.\u0275inj=g({imports:[tt,ct,lt,at]});let t=a;return t})();export{ee as ProfileModule};
