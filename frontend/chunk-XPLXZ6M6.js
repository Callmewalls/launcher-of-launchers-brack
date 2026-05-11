import{$ as k,$b as E,C as g,Ga as M,O as z,P as T,R as C,S as x,V as I,Zb as w,a as m,aa as S,ab as P,b as f,ba as B,bc as N,cc as R,dc as p,ec as y,j as o,mc as U,na as D,oa as j,r as u,s as b,t as A,u as L,v as h,ya as F,za as v}from"./chunk-OZEG2AIK.js";var V=`
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
`;var $=["*"],q={root:({instance:n})=>({justifyContent:n.layout==="horizontal"?n.align==="center"||n.align==null?"center":n.align==="left"?"flex-start":n.align==="right"?"flex-end":null:null,alignItems:n.layout==="vertical"?n.align==="center"||n.align==null?"center":n.align==="top"?"flex-start":n.align==="bottom"?"flex-end":null:null})},J={root:({instance:n})=>["p-divider p-component","p-divider-"+n.layout,"p-divider-"+n.type,{"p-divider-left":n.layout==="horizontal"&&(!n.align||n.align==="left")},{"p-divider-center":n.layout==="horizontal"&&n.align==="center"},{"p-divider-right":n.layout==="horizontal"&&n.align==="right"},{"p-divider-top":n.layout==="vertical"&&n.align==="top"},{"p-divider-center":n.layout==="vertical"&&(!n.align||n.align==="center")},{"p-divider-bottom":n.layout==="vertical"&&n.align==="bottom"}],content:"p-divider-content"},G=(()=>{class n extends E{name="divider";style=V;classes=J;inlineStyles=q;static \u0275fac=(()=>{let l;return function(e){return(l||(l=g(n)))(e||n)}})();static \u0275prov=u({token:n,factory:n.\u0275fac})}return n})();var O=new A("DIVIDER_INSTANCE"),K=(()=>{class n extends R{$pcDivider=h(O,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=h(p,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}styleClass;layout="horizontal";type="solid";align;_componentStyle=h(G);static \u0275fac=(()=>{let l;return function(e){return(l||(l=g(n)))(e||n)}})();static \u0275cmp=z({type:n,selectors:[["p-divider"]],hostAttrs:["role","separator"],hostVars:5,hostBindings:function(t,e){t&2&&(I("aria-orientation",e.layout),F(e.sx("root")),v(e.cn(e.cx("root"),e.styleClass)))},inputs:{styleClass:"styleClass",layout:"layout",type:"type",align:"align"},features:[M([G,{provide:O,useExisting:n},{provide:N,useExisting:n}]),x([p]),C],ngContentSelectors:$,decls:2,vars:3,consts:[[3,"pBind"]],template:function(t,e){t&1&&(D(),S(0,"div",0),j(1),B()),t&2&&(v(e.cx("content")),k("pBind",e.ptm("content")))},dependencies:[P,w,y,p],encapsulation:2,changeDetection:0})}return n})(),ce=(()=>{class n{static \u0275fac=function(t){return new(t||n)};static \u0275mod=T({type:n});static \u0275inj=b({imports:[K,y,y]})}return n})();var he=(()=>{let s=class s{constructor(t){this.launchersApi=t}getLinkedAccounts(){return this.launchersApi.getLinkedAccounts().pipe(o(t=>t.map(e=>f(m({},e),{launcherType:this.normalizeLauncherType(e.launcherType)}))))}getCapabilities(){return this.launchersApi.getCapabilities().pipe(o(t=>this.normalizeCapabilities(t.launchers)))}getLauncherAuthUrl(t,e){let i=this.toApiLauncherType(t);return this.launchersApi.getAuthUrl(i,e).pipe(o(r=>({success:!0,authUrl:r.authUrl})))}getSteamAuthUrl(t){return this.getLauncherAuthUrl("steam",t)}linkAccount(t,e){let i={launcherType:this.toApiLauncherType(t),accountName:e};return this.launchersApi.linkLauncher(i).pipe(o(r=>f(m({},r),{launcherType:this.normalizeLauncherType(r.launcherType)})))}getLauncherLocalConfig(t){let e=this.toApiLauncherType(t);return this.launchersApi.getLocalConfig(e).pipe(o(i=>this.normalizeLocalConfig(i.config)))}upsertLauncherLocalConfig(t,e){let i=this.toApiLauncherType(t),r={installBasePath:e.installBasePath?.trim()||void 0,executablePattern:e.executablePattern?.trim()||void 0};return this.launchersApi.upsertLocalConfig(i,r).pipe(o(a=>this.normalizeLocalConfig(a.config)))}unlinkAccount(t){return this.launchersApi.unlinkLauncher(t).pipe(o(e=>({success:!0,message:e.message})))}syncLauncher(t){return this.launchersApi.syncLauncher(t).pipe(o(e=>({success:e.success,message:e.message,count:e.count})))}syncAll(){return this.launchersApi.syncAllLaunchers().pipe(o(t=>({success:t.success,message:t.message})))}localScanAll(){return this.launchersApi.scanLocalInstallations().pipe(o(t=>this.normalizeLocalScanResponse(t)))}localScanByLauncher(t){let e=this.toApiLauncherType(t);return this.launchersApi.scanLocalInstallationsByLauncher(e).pipe(o(i=>this.normalizeLocalScanResponse(i)))}exchangeLauncherCode(t,e,i){let r=this.toApiLauncherType(t);return this.launchersApi.exchangeCode(r,{code:e,state:i}).pipe(o(a=>({success:!0,message:a.message})))}linkGogAccount(t,e){return this.exchangeLauncherCode("gog",t,e)}normalizeCapabilities(t){let e=i=>{let r=i?.launcherType,a=i?.capabilities;return!r||!a?null:{launcherType:this.normalizeLauncherType(r),configured:i.configured!==!1,capabilities:{auth:a.canAuthenticate!==!1,ownedGames:a.canFetchOwnedGames!==!1,recentlyPlayed:a.canFetchRecentlyPlayed!==!1,playtime:a.canFetchPlaytime!==!1,installState:a.canFetchInstallState!==!1}}};return Array.isArray(t)?t.map(i=>e(i)).filter(i=>!!i):t&&typeof t=="object"?Object.values(t).map(i=>e(i)).filter(i=>!!i):[]}normalizeLocalConfig(t){let e=t;return{installBasePath:e?.installBasePath??null,executablePattern:e?.executablePattern??null}}normalizeLocalScanResponse(t){let e=t.summary,r=(e?.results??[]).map(c=>({launcherType:this.normalizeLauncherType(c.launcherType),count:c.count??0,games:(c.games??[]).map(d=>({launcherId:d.launcherId,title:d.title,installPath:d.installPath}))})),a=r.reduce((c,d)=>c+d.count,0);return{success:t.success,message:t.message,summary:{total:e?.total??a,results:r}}}normalizeLauncherType(t){let e=String(t??"").toLowerCase();return e==="uplay"?"ubisoft":e==="xbox"||e==="microsoftstore"||e==="microsoft_store"||e==="microsoft-store"||e==="msstore"?"xbox":["steam","epic","gog","ubisoft","origin","xbox","battlenet","other"].includes(e)?e:"other"}toApiLauncherType(t){let e=this.normalizeLauncherType(t);return e==="ubisoft"?"uplay":e}};s.\u0275fac=function(e){return new(e||s)(L(U))},s.\u0275prov=u({token:s,factory:s.\u0275fac,providedIn:"root"});let n=s;return n})();export{K as a,ce as b,he as c};
