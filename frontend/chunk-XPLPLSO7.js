import{Ba as M,K as A,L as T,N as C,O as I,R as k,Rb as w,Tb as E,Vb as N,Wa as P,Wb as R,X as x,Xb as p,Y as S,Yb as m,Z as B,a as y,b as g,ec as U,h as o,ja as D,ka as j,o as u,p as b,q as z,r as L,s as h,sa as F,ta as v,z as f}from"./chunk-BAYKJQYM.js";var V=`
    .p-divider-horizontal {
        display: flex;
        width: 100%;
        position: relative;
        align-items: center;
        margin: dt('divider.horizontal.margin');
        padding: dt('divider.horizontal.padding');
    }

    .p-divider-horizontal:before {
        position: absolute;
        display: block;
        inset-block-start: 50%;
        inset-inline-start: 0;
        width: 100%;
        content: '';
        border-block-start: 1px solid dt('divider.border.color');
    }

    .p-divider-horizontal .p-divider-content {
        padding: dt('divider.horizontal.content.padding');
    }

    .p-divider-vertical {
        min-height: 100%;
        display: flex;
        position: relative;
        justify-content: center;
        margin: dt('divider.vertical.margin');
        padding: dt('divider.vertical.padding');
    }

    .p-divider-vertical:before {
        position: absolute;
        display: block;
        inset-block-start: 0;
        inset-inline-start: 50%;
        height: 100%;
        content: '';
        border-inline-start: 1px solid dt('divider.border.color');
    }

    .p-divider.p-divider-vertical .p-divider-content {
        padding: dt('divider.vertical.content.padding');
    }

    .p-divider-content {
        z-index: 1;
        background: dt('divider.content.background');
        color: dt('divider.content.color');
    }

    .p-divider-solid.p-divider-horizontal:before {
        border-block-start-style: solid;
    }

    .p-divider-solid.p-divider-vertical:before {
        border-inline-start-style: solid;
    }

    .p-divider-dashed.p-divider-horizontal:before {
        border-block-start-style: dashed;
    }

    .p-divider-dashed.p-divider-vertical:before {
        border-inline-start-style: dashed;
    }

    .p-divider-dotted.p-divider-horizontal:before {
        border-block-start-style: dotted;
    }

    .p-divider-dotted.p-divider-vertical:before {
        border-inline-start-style: dotted;
    }

    .p-divider-left:dir(rtl),
    .p-divider-right:dir(rtl) {
        flex-direction: row-reverse;
    }
`;var $=["*"],q={root:({instance:t})=>({justifyContent:t.layout==="horizontal"?t.align==="center"||t.align==null?"center":t.align==="left"?"flex-start":t.align==="right"?"flex-end":null:null,alignItems:t.layout==="vertical"?t.align==="center"||t.align==null?"center":t.align==="top"?"flex-start":t.align==="bottom"?"flex-end":null:null})},J={root:({instance:t})=>["p-divider p-component","p-divider-"+t.layout,"p-divider-"+t.type,{"p-divider-left":t.layout==="horizontal"&&(!t.align||t.align==="left")},{"p-divider-center":t.layout==="horizontal"&&t.align==="center"},{"p-divider-right":t.layout==="horizontal"&&t.align==="right"},{"p-divider-top":t.layout==="vertical"&&t.align==="top"},{"p-divider-center":t.layout==="vertical"&&(!t.align||t.align==="center")},{"p-divider-bottom":t.layout==="vertical"&&t.align==="bottom"}],content:"p-divider-content"},G=(()=>{class t extends E{name="divider";style=V;classes=J;inlineStyles=q;static \u0275fac=(()=>{let l;return function(n){return(l||(l=f(t)))(n||t)}})();static \u0275prov=u({token:t,factory:t.\u0275fac})}return t})();var O=new z("DIVIDER_INSTANCE"),K=(()=>{class t extends R{$pcDivider=h(O,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=h(p,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}styleClass;layout="horizontal";type="solid";align;_componentStyle=h(G);static \u0275fac=(()=>{let l;return function(n){return(l||(l=f(t)))(n||t)}})();static \u0275cmp=A({type:t,selectors:[["p-divider"]],hostAttrs:["role","separator"],hostVars:5,hostBindings:function(e,n){e&2&&(k("aria-orientation",n.layout),F(n.sx("root")),v(n.cn(n.cx("root"),n.styleClass)))},inputs:{styleClass:"styleClass",layout:"layout",type:"type",align:"align"},features:[M([G,{provide:O,useExisting:t},{provide:N,useExisting:t}]),I([p]),C],ngContentSelectors:$,decls:2,vars:3,consts:[[3,"pBind"]],template:function(e,n){e&1&&(D(),S(0,"div",0),j(1),B()),e&2&&(v(n.cx("content")),x("pBind",n.ptm("content")))},dependencies:[P,w,m,p],encapsulation:2,changeDetection:0})}return t})(),ce=(()=>{class t{static \u0275fac=function(e){return new(e||t)};static \u0275mod=T({type:t});static \u0275inj=b({imports:[K,m,m]})}return t})();var he=(()=>{let s=class s{constructor(e){this.launchersApi=e}getLinkedAccounts(){return this.launchersApi.getLinkedAccounts().pipe(o(e=>e.map(n=>g(y({},n),{launcherType:this.normalizeLauncherType(n.launcherType)}))))}getCapabilities(){return this.launchersApi.getCapabilities().pipe(o(e=>this.normalizeCapabilities(e.launchers)))}getLauncherAuthUrl(e,n){let i=this.normalizeLauncherType(e);return this.launchersApi.getAuthUrl(i,n).pipe(o(r=>({success:!0,authUrl:r.authUrl})))}getSteamAuthUrl(e){return this.getLauncherAuthUrl("steam",e)}linkAccount(e,n){let i={launcherType:this.normalizeLauncherType(e),accountName:n};return this.launchersApi.linkLauncher(i).pipe(o(r=>g(y({},r),{launcherType:this.normalizeLauncherType(r.launcherType)})))}getLauncherLocalConfig(e){let n=this.normalizeLauncherType(e);return this.launchersApi.getLocalConfig(n).pipe(o(i=>this.normalizeLocalConfig(i.config)))}upsertLauncherLocalConfig(e,n){let i=this.normalizeLauncherType(e),r={installBasePath:n.installBasePath?.trim()||void 0,executablePattern:n.executablePattern?.trim()||void 0};return this.launchersApi.upsertLocalConfig(i,r).pipe(o(a=>this.normalizeLocalConfig(a.config)))}unlinkAccount(e){return this.launchersApi.unlinkLauncher(e).pipe(o(n=>({success:!0,message:n.message})))}syncLauncher(e){return this.launchersApi.syncLauncher(e).pipe(o(n=>({success:n.success,message:n.message,count:n.count})))}syncAll(){return this.launchersApi.syncAllLaunchers().pipe(o(e=>({success:e.success,message:e.message})))}localScanAll(){return this.launchersApi.scanLocalInstallations().pipe(o(e=>this.normalizeLocalScanResponse(e)))}localScanByLauncher(e){let n=this.normalizeLauncherType(e);return this.launchersApi.scanLocalInstallationsByLauncher(n).pipe(o(i=>this.normalizeLocalScanResponse(i)))}exchangeLauncherCode(e,n,i){let r=this.normalizeLauncherType(e);return this.launchersApi.exchangeCode(r,{code:n,state:i}).pipe(o(a=>({success:!0,message:a.message})))}linkGogAccount(e,n){return this.exchangeLauncherCode("gog",e,n)}normalizeCapabilities(e){let n=i=>{let r=i?.launcherType,a=i?.capabilities;return!r||!a?null:{launcherType:this.normalizeLauncherType(r),configured:i.configured!==!1,capabilities:{auth:a.canAuthenticate!==!1,ownedGames:a.canFetchOwnedGames!==!1,recentlyPlayed:a.canFetchRecentlyPlayed!==!1,playtime:a.canFetchPlaytime!==!1,installState:a.canFetchInstallState!==!1}}};return Array.isArray(e)?e.map(i=>n(i)).filter(i=>!!i):e&&typeof e=="object"?Object.values(e).map(i=>n(i)).filter(i=>!!i):[]}normalizeLocalConfig(e){let n=e;return{installBasePath:n?.installBasePath??null,executablePattern:n?.executablePattern??null}}normalizeLocalScanResponse(e){let n=e.summary,r=(n?.results??[]).map(c=>({launcherType:this.normalizeLauncherType(c.launcherType),count:c.count??0,games:(c.games??[]).map(d=>({launcherId:d.launcherId,title:d.title,installPath:d.installPath}))})),a=r.reduce((c,d)=>c+d.count,0);return{success:e.success,message:e.message,summary:{total:n?.total??a,results:r}}}normalizeLauncherType(e){let n=String(e??"").toLowerCase();return n==="uplay"?"ubisoft":["steam","epic","gog","ubisoft","origin","battlenet","other"].includes(n)?n:"other"}};s.\u0275fac=function(n){return new(n||s)(L(U))},s.\u0275prov=u({token:s,factory:s.\u0275fac,providedIn:"root"});let t=s;return t})();export{K as a,ce as b,he as c};
