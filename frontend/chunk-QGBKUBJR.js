import{d as k,m as w}from"./chunk-J47S2BLW.js";import{$b as N,A as p,C as a,Ga as D,P as b,Pa as s,Q as l,Qa as y,Qb as I,R as u,Ra as i,S as x,Ua as d,bc as T,cc as F,dc as c,la as h,r as g,s as m,t as v,v as r,za as M}from"./chunk-OZEG2AIK.js";var f=(()=>{class t extends F{modelValue=p(void 0);$filled=s(()=>I(this.modelValue()));writeModelValue(e){this.modelValue.set(e)}static \u0275fac=(()=>{let e;return function(o){return(e||(e=a(t)))(o||t)}})();static \u0275dir=l({type:t,features:[u]})}return t})();var V=`
    .p-inputtext {
        font-family: inherit;
        font-feature-settings: inherit;
        font-size: 1rem;
        color: dt('inputtext.color');
        background: dt('inputtext.background');
        padding-block: dt('inputtext.padding.y');
        padding-inline: dt('inputtext.padding.x');
        border: 1px solid dt('inputtext.border.color');
        transition:
            background dt('inputtext.transition.duration'),
            color dt('inputtext.transition.duration'),
            border-color dt('inputtext.transition.duration'),
            outline-color dt('inputtext.transition.duration'),
            box-shadow dt('inputtext.transition.duration');
        appearance: none;
        border-radius: dt('inputtext.border.radius');
        outline-color: transparent;
        box-shadow: dt('inputtext.shadow');
    }

    .p-inputtext:enabled:hover {
        border-color: dt('inputtext.hover.border.color');
    }

    .p-inputtext:enabled:focus {
        border-color: dt('inputtext.focus.border.color');
        box-shadow: dt('inputtext.focus.ring.shadow');
        outline: dt('inputtext.focus.ring.width') dt('inputtext.focus.ring.style') dt('inputtext.focus.ring.color');
        outline-offset: dt('inputtext.focus.ring.offset');
    }

    .p-inputtext.p-invalid {
        border-color: dt('inputtext.invalid.border.color');
    }

    .p-inputtext.p-variant-filled {
        background: dt('inputtext.filled.background');
    }

    .p-inputtext.p-variant-filled:enabled:hover {
        background: dt('inputtext.filled.hover.background');
    }

    .p-inputtext.p-variant-filled:enabled:focus {
        background: dt('inputtext.filled.focus.background');
    }

    .p-inputtext:disabled {
        opacity: 1;
        background: dt('inputtext.disabled.background');
        color: dt('inputtext.disabled.color');
    }

    .p-inputtext::placeholder {
        color: dt('inputtext.placeholder.color');
    }

    .p-inputtext.p-invalid::placeholder {
        color: dt('inputtext.invalid.placeholder.color');
    }

    .p-inputtext-sm {
        font-size: dt('inputtext.sm.font.size');
        padding-block: dt('inputtext.sm.padding.y');
        padding-inline: dt('inputtext.sm.padding.x');
    }

    .p-inputtext-lg {
        font-size: dt('inputtext.lg.font.size');
        padding-block: dt('inputtext.lg.padding.y');
        padding-inline: dt('inputtext.lg.padding.x');
    }

    .p-inputtext-fluid {
        width: 100%;
    }
`;var E=`
    ${V}

    /* For PrimeNG */
   .p-inputtext.ng-invalid.ng-dirty {
        border-color: dt('inputtext.invalid.border.color');
    }

    .p-inputtext.ng-invalid.ng-dirty::placeholder {
        color: dt('inputtext.invalid.placeholder.color');
    }
`,$={root:({instance:t})=>["p-inputtext p-component",{"p-filled":t.$filled(),"p-inputtext-sm":t.pSize==="small","p-inputtext-lg":t.pSize==="large","p-invalid":t.invalid(),"p-variant-filled":t.$variant()==="filled","p-inputtext-fluid":t.hasFluid}]},S=(()=>{class t extends N{name="inputtext";style=E;classes=$;static \u0275fac=(()=>{let e;return function(o){return(e||(e=a(t)))(o||t)}})();static \u0275prov=g({token:t,factory:t.\u0275fac})}return t})();var A=new v("INPUTTEXT_INSTANCE"),it=(()=>{class t extends f{hostName="";ptInputText=i();bindDirectiveInstance=r(c,{self:!0});$pcInputText=r(A,{optional:!0,skipSelf:!0})??void 0;ngControl=r(k,{optional:!0,self:!0});pcFluid=r(w,{optional:!0,host:!0,skipSelf:!0});pSize;variant=i();fluid=i(void 0,{transform:d});invalid=i(void 0,{transform:d});$variant=s(()=>this.variant()||this.config.inputStyle()||this.config.inputVariant());_componentStyle=r(S);constructor(){super(),y(()=>{this.ptInputText()&&this.directivePT.set(this.ptInputText())})}onAfterViewInit(){this.writeModelValue(this.ngControl?.value??this.el.nativeElement.value),this.cd.detectChanges()}onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("root"))}onDoCheck(){this.writeModelValue(this.ngControl?.value??this.el.nativeElement.value)}onInput(){this.writeModelValue(this.ngControl?.value??this.el.nativeElement.value)}get hasFluid(){return this.fluid()??!!this.pcFluid}static \u0275fac=function(n){return new(n||t)};static \u0275dir=l({type:t,selectors:[["","pInputText",""]],hostVars:2,hostBindings:function(n,o){n&1&&h("input",function(B){return o.onInput(B)}),n&2&&M(o.cx("root"))},inputs:{hostName:"hostName",ptInputText:[1,"ptInputText"],pSize:"pSize",variant:[1,"variant"],fluid:[1,"fluid"],invalid:[1,"invalid"]},features:[D([S,{provide:A,useExisting:t},{provide:T,useExisting:t}]),x([c]),u]})}return t})(),ot=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=b({type:t});static \u0275inj=m({})}return t})();var ut=(()=>{class t extends f{required=i(void 0,{transform:d});invalid=i(void 0,{transform:d});disabled=i(void 0,{transform:d});name=i();_disabled=p(!1);$disabled=s(()=>this.disabled()||this._disabled());onModelChange=()=>{};onModelTouched=()=>{};writeDisabledState(e){this._disabled.set(e)}writeControlValue(e,n){}writeValue(e){this.writeControlValue(e,this.writeModelValue.bind(this))}registerOnChange(e){this.onModelChange=e}registerOnTouched(e){this.onModelTouched=e}setDisabledState(e){this.writeDisabledState(e),this.cd.markForCheck()}static \u0275fac=(()=>{let e;return function(o){return(e||(e=a(t)))(o||t)}})();static \u0275dir=l({type:t,inputs:{required:[1,"required"],invalid:[1,"invalid"],disabled:[1,"disabled"],name:[1,"name"]},features:[u]})}return t})();export{it as a,ot as b,ut as c};
