import{$ as c,$b as O,A as Et,Aa as ft,Ab as $e,B as dt,Ba as gt,Bb as St,C as h,Cb as bt,D as it,Db as Ue,E as Ne,Fb as qe,Ga as y,Hb as Lt,I as g,Ib as yt,J as W,Ja as re,Jb as le,K as Te,Kb as Qe,Lb as Ze,M as te,Mb as de,N as f,O as B,Oa as K,Ob as Xe,P as E,Pa as J,Pb as xt,Q as v,Qa as rt,Qb as Ye,R as p,Ra as j,S as A,Sa as se,T as L,Ta as Le,Tb as ce,U as Pe,Ua as m,V as R,Va as He,Wa as ae,Xa as ze,Ya as Rt,Yb as Ht,Za as Ge,Zb as C,_a as jt,a as M,aa as q,ab as k,b as P,ba as Q,bb as mt,bc as N,ca as $,cc as V,da as ee,dc as d,e as Me,ea as ne,ec as Ke,fa as ie,fc as Je,g as Ie,ga as ct,ha as ut,ia as Be,j as Ae,jb as We,jc as tn,k as Fe,ka as Oe,kc as en,la as Vt,ma as F,na as pt,oa as ht,p as Bt,pa as Z,q as wt,qc as nn,r as I,ra as X,s as w,sa as Y,t as b,ta as oe,ua as Re,v as l,wa as Ot,xa as ot,y as lt,ya as je,z as ke,za as _}from"./chunk-OZEG2AIK.js";var hn=(()=>{class e{_renderer;_elementRef;onChange=t=>{};onTouched=()=>{};constructor(t,n){this._renderer=t,this._elementRef=n}setProperty(t,n){this._renderer.setProperty(this._elementRef.nativeElement,t,n)}registerOnTouched(t){this.onTouched=t}registerOnChange(t){this.onChange=t}setDisabledState(t){this.setProperty("disabled",t)}static \u0275fac=function(n){return new(n||e)(f(te),f(it))};static \u0275dir=v({type:e})}return e})(),mi=(()=>{class e extends hn{static \u0275fac=(()=>{let t;return function(o){return(t||(t=h(e)))(o||e)}})();static \u0275dir=v({type:e,features:[p]})}return e})(),me=new b("");var bi={provide:me,useExisting:wt(()=>fn),multi:!0};function yi(){let e=ae()?ae().getUserAgent():"";return/android (\d+)/.test(e.toLowerCase())}var vi=new b(""),fn=(()=>{class e extends hn{_compositionMode;_composing=!1;constructor(t,n,o){super(t,n),this._compositionMode=o,this._compositionMode==null&&(this._compositionMode=!yi())}writeValue(t){let n=t??"";this.setProperty("value",n)}_handleInput(t){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(t)}_compositionStart(){this._composing=!0}_compositionEnd(t){this._composing=!1,this._compositionMode&&this.onChange(t)}static \u0275fac=function(n){return new(n||e)(f(te),f(it),f(vi,8))};static \u0275dir=v({type:e,selectors:[["input","formControlName","",3,"type","checkbox"],["textarea","formControlName",""],["input","formControl","",3,"type","checkbox"],["textarea","formControl",""],["input","ngModel","",3,"type","checkbox"],["textarea","ngModel",""],["","ngDefaultControl",""]],hostBindings:function(n,o){n&1&&Vt("input",function(s){return o._handleInput(s.target.value)})("blur",function(){return o.onTouched()})("compositionstart",function(){return o._compositionStart()})("compositionend",function(s){return o._compositionEnd(s.target.value)})},standalone:!1,features:[y([bi]),p]})}return e})();function be(e){return e==null||ye(e)===0}function ye(e){return e==null?null:Array.isArray(e)||typeof e=="string"?e.length:e instanceof Set?e.size:null}var ve=new b(""),_e=new b(""),_i=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,on=class{static min(i){return Ci(i)}static max(i){return Di(i)}static required(i){return wi(i)}static requiredTrue(i){return Ei(i)}static email(i){return Vi(i)}static minLength(i){return Si(i)}static maxLength(i){return xi(i)}static pattern(i){return Mi(i)}static nullValidator(i){return gn()}static compose(i){return Cn(i)}static composeAsync(i){return wn(i)}};function Ci(e){return i=>{if(i.value==null||e==null)return null;let t=parseFloat(i.value);return!isNaN(t)&&t<e?{min:{min:e,actual:i.value}}:null}}function Di(e){return i=>{if(i.value==null||e==null)return null;let t=parseFloat(i.value);return!isNaN(t)&&t>e?{max:{max:e,actual:i.value}}:null}}function wi(e){return be(e.value)?{required:!0}:null}function Ei(e){return e.value===!0?null:{required:!0}}function Vi(e){return be(e.value)||_i.test(e.value)?null:{email:!0}}function Si(e){return i=>{let t=i.value?.length??ye(i.value);return t===null||t===0?null:t<e?{minlength:{requiredLength:e,actualLength:t}}:null}}function xi(e){return i=>{let t=i.value?.length??ye(i.value);return t!==null&&t>e?{maxlength:{requiredLength:e,actualLength:t}}:null}}function Mi(e){if(!e)return gn;let i,t;return typeof e=="string"?(t="",e.charAt(0)!=="^"&&(t+="^"),t+=e,e.charAt(e.length-1)!=="$"&&(t+="$"),i=new RegExp(t)):(t=e.toString(),i=e),n=>{if(be(n.value))return null;let o=n.value;return i.test(o)?null:{pattern:{requiredPattern:t,actualValue:o}}}}function gn(e){return null}function mn(e){return e!=null}function bn(e){return Pe(e)?Ie(e):e}function yn(e){let i={};return e.forEach(t=>{i=t!=null?M(M({},i),t):i}),Object.keys(i).length===0?null:i}function vn(e,i){return i.map(t=>t(e))}function Ii(e){return!e.validate}function _n(e){return e.map(i=>Ii(i)?i:t=>i.validate(t))}function Cn(e){if(!e)return null;let i=e.filter(mn);return i.length==0?null:function(t){return yn(vn(t,i))}}function Dn(e){return e!=null?Cn(_n(e)):null}function wn(e){if(!e)return null;let i=e.filter(mn);return i.length==0?null:function(t){let n=vn(t,i).map(bn);return Fe(n).pipe(Ae(yn))}}function En(e){return e!=null?wn(_n(e)):null}function rn(e,i){return e===null?[i]:Array.isArray(e)?[...e,i]:[e,i]}function Vn(e){return e._rawValidators}function Sn(e){return e._rawAsyncValidators}function ue(e){return e?Array.isArray(e)?e:[e]:[]}function Gt(e,i){return Array.isArray(e)?e.includes(i):e===i}function sn(e,i){let t=ue(i);return ue(e).forEach(o=>{Gt(t,o)||t.push(o)}),t}function an(e,i){return ue(i).filter(t=>!Gt(e,t))}var Wt=class{get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators=[];_rawAsyncValidators=[];_setValidators(i){this._rawValidators=i||[],this._composedValidatorFn=Dn(this._rawValidators)}_setAsyncValidators(i){this._rawAsyncValidators=i||[],this._composedAsyncValidatorFn=En(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_onDestroyCallbacks=[];_registerOnDestroy(i){this._onDestroyCallbacks.push(i)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(i=>i()),this._onDestroyCallbacks=[]}reset(i=void 0){this.control&&this.control.reset(i)}hasError(i,t){return this.control?this.control.hasError(i,t):!1}getError(i,t){return this.control?this.control.getError(i,t):null}},st=class extends Wt{name;get formDirective(){return null}get path(){return null}},at=class extends Wt{_parent=null;name=null;valueAccessor=null},$t=class{_cd;constructor(i){this._cd=i}get isTouched(){return this._cd?.control?._touched?.(),!!this._cd?.control?.touched}get isUntouched(){return!!this._cd?.control?.untouched}get isPristine(){return this._cd?.control?._pristine?.(),!!this._cd?.control?.pristine}get isDirty(){return!!this._cd?.control?.dirty}get isValid(){return this._cd?.control?._status?.(),!!this._cd?.control?.valid}get isInvalid(){return!!this._cd?.control?.invalid}get isPending(){return!!this._cd?.control?.pending}get isSubmitted(){return this._cd?._submitted?.(),!!this._cd?.submitted}},Ai={"[class.ng-untouched]":"isUntouched","[class.ng-touched]":"isTouched","[class.ng-pristine]":"isPristine","[class.ng-dirty]":"isDirty","[class.ng-valid]":"isValid","[class.ng-invalid]":"isInvalid","[class.ng-pending]":"isPending"},or=P(M({},Ai),{"[class.ng-submitted]":"isSubmitted"}),rr=(()=>{class e extends $t{constructor(t){super(t)}static \u0275fac=function(n){return new(n||e)(f(at,2))};static \u0275dir=v({type:e,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(n,o){n&2&&ot("ng-untouched",o.isUntouched)("ng-touched",o.isTouched)("ng-pristine",o.isPristine)("ng-dirty",o.isDirty)("ng-valid",o.isValid)("ng-invalid",o.isInvalid)("ng-pending",o.isPending)},standalone:!1,features:[p]})}return e})(),sr=(()=>{class e extends $t{constructor(t){super(t)}static \u0275fac=function(n){return new(n||e)(f(st,10))};static \u0275dir=v({type:e,selectors:[["","formGroupName",""],["","formArrayName",""],["","ngModelGroup",""],["","formGroup",""],["form",3,"ngNoForm",""],["","ngForm",""]],hostVars:16,hostBindings:function(n,o){n&2&&ot("ng-untouched",o.isUntouched)("ng-touched",o.isTouched)("ng-pristine",o.isPristine)("ng-dirty",o.isDirty)("ng-valid",o.isValid)("ng-invalid",o.isInvalid)("ng-pending",o.isPending)("ng-submitted",o.isSubmitted)},standalone:!1,features:[p]})}return e})();var Mt="VALID",zt="INVALID",vt="PENDING",It="DISABLED",tt=class{},Ut=class extends tt{value;source;constructor(i,t){super(),this.value=i,this.source=t}},At=class extends tt{pristine;source;constructor(i,t){super(),this.pristine=i,this.source=t}},Ft=class extends tt{touched;source;constructor(i,t){super(),this.touched=i,this.source=t}},_t=class extends tt{status;source;constructor(i,t){super(),this.status=i,this.source=t}},pe=class extends tt{source;constructor(i){super(),this.source=i}},Nt=class extends tt{source;constructor(i){super(),this.source=i}};function Ce(e){return(Xt(e)?e.validators:e)||null}function Fi(e){return Array.isArray(e)?Dn(e):e||null}function De(e,i){return(Xt(i)?i.asyncValidators:e)||null}function ki(e){return Array.isArray(e)?En(e):e||null}function Xt(e){return e!=null&&!Array.isArray(e)&&typeof e=="object"}function xn(e,i,t){let n=e.controls;if(!(i?Object.keys(n):n).length)throw new Bt(1e3,"");if(!n[t])throw new Bt(1001,"")}function Mn(e,i,t){e._forEachChild((n,o)=>{if(t[o]===void 0)throw new Bt(1002,"")})}var Ct=class{_pendingDirty=!1;_hasOwnPendingAsyncValidator=null;_pendingTouched=!1;_onCollectionChange=()=>{};_updateOn;_parent=null;_asyncValidationSubscription;_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators;_rawAsyncValidators;value;constructor(i,t){this._assignValidators(i),this._assignAsyncValidators(t)}get validator(){return this._composedValidatorFn}set validator(i){this._rawValidators=this._composedValidatorFn=i}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(i){this._rawAsyncValidators=this._composedAsyncValidatorFn=i}get parent(){return this._parent}get status(){return K(this.statusReactive)}set status(i){K(()=>this.statusReactive.set(i))}_status=J(()=>this.statusReactive());statusReactive=Et(void 0);get valid(){return this.status===Mt}get invalid(){return this.status===zt}get pending(){return this.status==vt}get disabled(){return this.status===It}get enabled(){return this.status!==It}errors;get pristine(){return K(this.pristineReactive)}set pristine(i){K(()=>this.pristineReactive.set(i))}_pristine=J(()=>this.pristineReactive());pristineReactive=Et(!0);get dirty(){return!this.pristine}get touched(){return K(this.touchedReactive)}set touched(i){K(()=>this.touchedReactive.set(i))}_touched=J(()=>this.touchedReactive());touchedReactive=Et(!1);get untouched(){return!this.touched}_events=new Me;events=this._events.asObservable();valueChanges;statusChanges;get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(i){this._assignValidators(i)}setAsyncValidators(i){this._assignAsyncValidators(i)}addValidators(i){this.setValidators(sn(i,this._rawValidators))}addAsyncValidators(i){this.setAsyncValidators(sn(i,this._rawAsyncValidators))}removeValidators(i){this.setValidators(an(i,this._rawValidators))}removeAsyncValidators(i){this.setAsyncValidators(an(i,this._rawAsyncValidators))}hasValidator(i){return Gt(this._rawValidators,i)}hasAsyncValidator(i){return Gt(this._rawAsyncValidators,i)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(i={}){let t=this.touched===!1;this.touched=!0;let n=i.sourceControl??this;this._parent&&!i.onlySelf&&this._parent.markAsTouched(P(M({},i),{sourceControl:n})),t&&i.emitEvent!==!1&&this._events.next(new Ft(!0,n))}markAllAsDirty(i={}){this.markAsDirty({onlySelf:!0,emitEvent:i.emitEvent,sourceControl:this}),this._forEachChild(t=>t.markAllAsDirty(i))}markAllAsTouched(i={}){this.markAsTouched({onlySelf:!0,emitEvent:i.emitEvent,sourceControl:this}),this._forEachChild(t=>t.markAllAsTouched(i))}markAsUntouched(i={}){let t=this.touched===!0;this.touched=!1,this._pendingTouched=!1;let n=i.sourceControl??this;this._forEachChild(o=>{o.markAsUntouched({onlySelf:!0,emitEvent:i.emitEvent,sourceControl:n})}),this._parent&&!i.onlySelf&&this._parent._updateTouched(i,n),t&&i.emitEvent!==!1&&this._events.next(new Ft(!1,n))}markAsDirty(i={}){let t=this.pristine===!0;this.pristine=!1;let n=i.sourceControl??this;this._parent&&!i.onlySelf&&this._parent.markAsDirty(P(M({},i),{sourceControl:n})),t&&i.emitEvent!==!1&&this._events.next(new At(!1,n))}markAsPristine(i={}){let t=this.pristine===!1;this.pristine=!0,this._pendingDirty=!1;let n=i.sourceControl??this;this._forEachChild(o=>{o.markAsPristine({onlySelf:!0,emitEvent:i.emitEvent})}),this._parent&&!i.onlySelf&&this._parent._updatePristine(i,n),t&&i.emitEvent!==!1&&this._events.next(new At(!0,n))}markAsPending(i={}){this.status=vt;let t=i.sourceControl??this;i.emitEvent!==!1&&(this._events.next(new _t(this.status,t)),this.statusChanges.emit(this.status)),this._parent&&!i.onlySelf&&this._parent.markAsPending(P(M({},i),{sourceControl:t}))}disable(i={}){let t=this._parentMarkedDirty(i.onlySelf);this.status=It,this.errors=null,this._forEachChild(o=>{o.disable(P(M({},i),{onlySelf:!0}))}),this._updateValue();let n=i.sourceControl??this;i.emitEvent!==!1&&(this._events.next(new Ut(this.value,n)),this._events.next(new _t(this.status,n)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(P(M({},i),{skipPristineCheck:t}),this),this._onDisabledChange.forEach(o=>o(!0))}enable(i={}){let t=this._parentMarkedDirty(i.onlySelf);this.status=Mt,this._forEachChild(n=>{n.enable(P(M({},i),{onlySelf:!0}))}),this.updateValueAndValidity({onlySelf:!0,emitEvent:i.emitEvent}),this._updateAncestors(P(M({},i),{skipPristineCheck:t}),this),this._onDisabledChange.forEach(n=>n(!1))}_updateAncestors(i,t){this._parent&&!i.onlySelf&&(this._parent.updateValueAndValidity(i),i.skipPristineCheck||this._parent._updatePristine({},t),this._parent._updateTouched({},t))}setParent(i){this._parent=i}getRawValue(){return this.value}updateValueAndValidity(i={}){if(this._setInitialStatus(),this._updateValue(),this.enabled){let n=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===Mt||this.status===vt)&&this._runAsyncValidator(n,i.emitEvent)}let t=i.sourceControl??this;i.emitEvent!==!1&&(this._events.next(new Ut(this.value,t)),this._events.next(new _t(this.status,t)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._parent&&!i.onlySelf&&this._parent.updateValueAndValidity(P(M({},i),{sourceControl:t}))}_updateTreeValidity(i={emitEvent:!0}){this._forEachChild(t=>t._updateTreeValidity(i)),this.updateValueAndValidity({onlySelf:!0,emitEvent:i.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?It:Mt}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(i,t){if(this.asyncValidator){this.status=vt,this._hasOwnPendingAsyncValidator={emitEvent:t!==!1,shouldHaveEmitted:i!==!1};let n=bn(this.asyncValidator(this));this._asyncValidationSubscription=n.subscribe(o=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(o,{emitEvent:t,shouldHaveEmitted:i})})}}_cancelExistingSubscription(){if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let i=(this._hasOwnPendingAsyncValidator?.emitEvent||this._hasOwnPendingAsyncValidator?.shouldHaveEmitted)??!1;return this._hasOwnPendingAsyncValidator=null,i}return!1}setErrors(i,t={}){this.errors=i,this._updateControlsErrors(t.emitEvent!==!1,this,t.shouldHaveEmitted)}get(i){let t=i;return t==null||(Array.isArray(t)||(t=t.split(".")),t.length===0)?null:t.reduce((n,o)=>n&&n._find(o),this)}getError(i,t){let n=t?this.get(t):this;return n&&n.errors?n.errors[i]:null}hasError(i,t){return!!this.getError(i,t)}get root(){let i=this;for(;i._parent;)i=i._parent;return i}_updateControlsErrors(i,t,n){this.status=this._calculateStatus(),i&&this.statusChanges.emit(this.status),(i||n)&&this._events.next(new _t(this.status,t)),this._parent&&this._parent._updateControlsErrors(i,t,n)}_initObservables(){this.valueChanges=new W,this.statusChanges=new W}_calculateStatus(){return this._allControlsDisabled()?It:this.errors?zt:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(vt)?vt:this._anyControlsHaveStatus(zt)?zt:Mt}_anyControlsHaveStatus(i){return this._anyControls(t=>t.status===i)}_anyControlsDirty(){return this._anyControls(i=>i.dirty)}_anyControlsTouched(){return this._anyControls(i=>i.touched)}_updatePristine(i,t){let n=!this._anyControlsDirty(),o=this.pristine!==n;this.pristine=n,this._parent&&!i.onlySelf&&this._parent._updatePristine(i,t),o&&this._events.next(new At(this.pristine,t))}_updateTouched(i={},t){this.touched=this._anyControlsTouched(),this._events.next(new Ft(this.touched,t)),this._parent&&!i.onlySelf&&this._parent._updateTouched(i,t)}_onDisabledChange=[];_registerOnCollectionChange(i){this._onCollectionChange=i}_setUpdateStrategy(i){Xt(i)&&i.updateOn!=null&&(this._updateOn=i.updateOn)}_parentMarkedDirty(i){let t=this._parent&&this._parent.dirty;return!i&&!!t&&!this._parent._anyControlsDirty()}_find(i){return null}_assignValidators(i){this._rawValidators=Array.isArray(i)?i.slice():i,this._composedValidatorFn=Fi(this._rawValidators)}_assignAsyncValidators(i){this._rawAsyncValidators=Array.isArray(i)?i.slice():i,this._composedAsyncValidatorFn=ki(this._rawAsyncValidators)}},qt=class extends Ct{constructor(i,t,n){super(Ce(t),De(n,t)),this.controls=i,this._initObservables(),this._setUpdateStrategy(t),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}controls;registerControl(i,t){return this.controls[i]?this.controls[i]:(this.controls[i]=t,t.setParent(this),t._registerOnCollectionChange(this._onCollectionChange),t)}addControl(i,t,n={}){this.registerControl(i,t),this.updateValueAndValidity({emitEvent:n.emitEvent}),this._onCollectionChange()}removeControl(i,t={}){this.controls[i]&&this.controls[i]._registerOnCollectionChange(()=>{}),delete this.controls[i],this.updateValueAndValidity({emitEvent:t.emitEvent}),this._onCollectionChange()}setControl(i,t,n={}){this.controls[i]&&this.controls[i]._registerOnCollectionChange(()=>{}),delete this.controls[i],t&&this.registerControl(i,t),this.updateValueAndValidity({emitEvent:n.emitEvent}),this._onCollectionChange()}contains(i){return this.controls.hasOwnProperty(i)&&this.controls[i].enabled}setValue(i,t={}){Mn(this,!0,i),Object.keys(i).forEach(n=>{xn(this,!0,n),this.controls[n].setValue(i[n],{onlySelf:!0,emitEvent:t.emitEvent})}),this.updateValueAndValidity(t)}patchValue(i,t={}){i!=null&&(Object.keys(i).forEach(n=>{let o=this.controls[n];o&&o.patchValue(i[n],{onlySelf:!0,emitEvent:t.emitEvent})}),this.updateValueAndValidity(t))}reset(i={},t={}){this._forEachChild((n,o)=>{n.reset(i?i[o]:null,{onlySelf:!0,emitEvent:t.emitEvent})}),this._updatePristine(t,this),this._updateTouched(t,this),this.updateValueAndValidity(t),t?.emitEvent!==!1&&this._events.next(new Nt(this))}getRawValue(){return this._reduceChildren({},(i,t,n)=>(i[n]=t.getRawValue(),i))}_syncPendingControls(){let i=this._reduceChildren(!1,(t,n)=>n._syncPendingControls()?!0:t);return i&&this.updateValueAndValidity({onlySelf:!0}),i}_forEachChild(i){Object.keys(this.controls).forEach(t=>{let n=this.controls[t];n&&i(n,t)})}_setUpControls(){this._forEachChild(i=>{i.setParent(this),i._registerOnCollectionChange(this._onCollectionChange)})}_updateValue(){this.value=this._reduceValue()}_anyControls(i){for(let[t,n]of Object.entries(this.controls))if(this.contains(t)&&i(n))return!0;return!1}_reduceValue(){let i={};return this._reduceChildren(i,(t,n,o)=>((n.enabled||this.disabled)&&(t[o]=n.value),t))}_reduceChildren(i,t){let n=i;return this._forEachChild((o,r)=>{n=t(n,o,r)}),n}_allControlsDisabled(){for(let i of Object.keys(this.controls))if(this.controls[i].enabled)return!1;return Object.keys(this.controls).length>0||this.disabled}_find(i){return this.controls.hasOwnProperty(i)?this.controls[i]:null}};var he=class extends qt{};var Yt=new b("",{providedIn:"root",factory:()=>Kt}),Kt="always";function In(e,i){return[...i.path,e]}function fe(e,i,t=Kt){we(e,i),i.valueAccessor.writeValue(e.value),(e.disabled||t==="always")&&i.valueAccessor.setDisabledState?.(e.disabled),Ti(e,i),Bi(e,i),Pi(e,i),Ni(e,i)}function ln(e,i,t=!0){let n=()=>{};i.valueAccessor&&(i.valueAccessor.registerOnChange(n),i.valueAccessor.registerOnTouched(n)),Zt(e,i),e&&(i._invokeOnDestroyCallbacks(),e._registerOnCollectionChange(()=>{}))}function Qt(e,i){e.forEach(t=>{t.registerOnValidatorChange&&t.registerOnValidatorChange(i)})}function Ni(e,i){if(i.valueAccessor.setDisabledState){let t=n=>{i.valueAccessor.setDisabledState(n)};e.registerOnDisabledChange(t),i._registerOnDestroy(()=>{e._unregisterOnDisabledChange(t)})}}function we(e,i){let t=Vn(e);i.validator!==null?e.setValidators(rn(t,i.validator)):typeof t=="function"&&e.setValidators([t]);let n=Sn(e);i.asyncValidator!==null?e.setAsyncValidators(rn(n,i.asyncValidator)):typeof n=="function"&&e.setAsyncValidators([n]);let o=()=>e.updateValueAndValidity();Qt(i._rawValidators,o),Qt(i._rawAsyncValidators,o)}function Zt(e,i){let t=!1;if(e!==null){if(i.validator!==null){let o=Vn(e);if(Array.isArray(o)&&o.length>0){let r=o.filter(s=>s!==i.validator);r.length!==o.length&&(t=!0,e.setValidators(r))}}if(i.asyncValidator!==null){let o=Sn(e);if(Array.isArray(o)&&o.length>0){let r=o.filter(s=>s!==i.asyncValidator);r.length!==o.length&&(t=!0,e.setAsyncValidators(r))}}}let n=()=>{};return Qt(i._rawValidators,n),Qt(i._rawAsyncValidators,n),t}function Ti(e,i){i.valueAccessor.registerOnChange(t=>{e._pendingValue=t,e._pendingChange=!0,e._pendingDirty=!0,e.updateOn==="change"&&An(e,i)})}function Pi(e,i){i.valueAccessor.registerOnTouched(()=>{e._pendingTouched=!0,e.updateOn==="blur"&&e._pendingChange&&An(e,i),e.updateOn!=="submit"&&e.markAsTouched()})}function An(e,i){e._pendingDirty&&e.markAsDirty(),e.setValue(e._pendingValue,{emitModelToViewChange:!1}),i.viewToModelUpdate(e._pendingValue),e._pendingChange=!1}function Bi(e,i){let t=(n,o)=>{i.valueAccessor.writeValue(n),o&&i.viewToModelUpdate(n)};e.registerOnChange(t),i._registerOnDestroy(()=>{e._unregisterOnChange(t)})}function Oi(e,i){e==null,we(e,i)}function Ri(e,i){return Zt(e,i)}function Fn(e,i){if(!e.hasOwnProperty("model"))return!1;let t=e.model;return t.isFirstChange()?!0:!Object.is(i,t.currentValue)}function ji(e){return Object.getPrototypeOf(e.constructor)===mi}function Li(e,i){e._syncPendingControls(),i.forEach(t=>{let n=t.control;n.updateOn==="submit"&&n._pendingChange&&(t.viewToModelUpdate(n._pendingValue),n._pendingChange=!1)})}function kn(e,i){if(!i)return null;Array.isArray(i);let t,n,o;return i.forEach(r=>{r.constructor===fn?t=r:ji(r)?n=r:o=r}),o||n||t||null}function Hi(e,i){let t=e.indexOf(i);t>-1&&e.splice(t,1)}function dn(e,i){let t=e.indexOf(i);t>-1&&e.splice(t,1)}function cn(e){return typeof e=="object"&&e!==null&&Object.keys(e).length===2&&"value"in e&&"disabled"in e}var kt=class extends Ct{defaultValue=null;_onChange=[];_pendingValue;_pendingChange=!1;constructor(i=null,t,n){super(Ce(t),De(n,t)),this._applyFormState(i),this._setUpdateStrategy(t),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),Xt(t)&&(t.nonNullable||t.initialValueIsDefault)&&(cn(i)?this.defaultValue=i.value:this.defaultValue=i)}setValue(i,t={}){this.value=this._pendingValue=i,this._onChange.length&&t.emitModelToViewChange!==!1&&this._onChange.forEach(n=>n(this.value,t.emitViewToModelChange!==!1)),this.updateValueAndValidity(t)}patchValue(i,t={}){this.setValue(i,t)}reset(i=this.defaultValue,t={}){this._applyFormState(i),this.markAsPristine(t),this.markAsUntouched(t),this.setValue(this.value,t),this._pendingChange=!1,t?.emitEvent!==!1&&this._events.next(new Nt(this))}_updateValue(){}_anyControls(i){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(i){this._onChange.push(i)}_unregisterOnChange(i){dn(this._onChange,i)}registerOnDisabledChange(i){this._onDisabledChange.push(i)}_unregisterOnDisabledChange(i){dn(this._onDisabledChange,i)}_forEachChild(i){}_syncPendingControls(){return this.updateOn==="submit"&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),!0):!1}_applyFormState(i){cn(i)?(this.value=this._pendingValue=i.value,i.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=i}};var zi=e=>e instanceof kt;var Gi={provide:at,useExisting:wt(()=>Wi)},un=Promise.resolve(),Wi=(()=>{class e extends at{_changeDetectorRef;callSetDisabledState;control=new kt;static ngAcceptInputType_isDisabled;_registered=!1;viewModel;name="";isDisabled;model;options;update=new W;constructor(t,n,o,r,s,a){super(),this._changeDetectorRef=s,this.callSetDisabledState=a,this._parent=t,this._setValidators(n),this._setAsyncValidators(o),this.valueAccessor=kn(this,r)}ngOnChanges(t){if(this._checkForErrors(),!this._registered||"name"in t){if(this._registered&&(this._checkName(),this.formDirective)){let n=t.name.previousValue;this.formDirective.removeControl({name:n,path:this._getPath(n)})}this._setUpControl()}"isDisabled"in t&&this._updateDisabled(t),Fn(t,this.viewModel)&&(this._updateValue(this.model),this.viewModel=this.model)}ngOnDestroy(){this.formDirective&&this.formDirective.removeControl(this)}get path(){return this._getPath(this.name)}get formDirective(){return this._parent?this._parent.formDirective:null}viewToModelUpdate(t){this.viewModel=t,this.update.emit(t)}_setUpControl(){this._setUpdateStrategy(),this._isStandalone()?this._setUpStandalone():this.formDirective.addControl(this),this._registered=!0}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.control._updateOn=this.options.updateOn)}_isStandalone(){return!this._parent||!!(this.options&&this.options.standalone)}_setUpStandalone(){fe(this.control,this,this.callSetDisabledState),this.control.updateValueAndValidity({emitEvent:!1})}_checkForErrors(){this._checkName()}_checkName(){this.options&&this.options.name&&(this.name=this.options.name),!this._isStandalone()&&this.name}_updateValue(t){un.then(()=>{this.control.setValue(t,{emitViewToModelChange:!1}),this._changeDetectorRef?.markForCheck()})}_updateDisabled(t){let n=t.isDisabled.currentValue,o=n!==0&&m(n);un.then(()=>{o&&!this.control.disabled?this.control.disable():!o&&this.control.disabled&&this.control.enable(),this._changeDetectorRef?.markForCheck()})}_getPath(t){return this._parent?In(t,this._parent):[t]}static \u0275fac=function(n){return new(n||e)(f(st,9),f(ve,10),f(_e,10),f(me,10),f(Le,8),f(Yt,8))};static \u0275dir=v({type:e,selectors:[["","ngModel","",3,"formControlName","",3,"formControl",""]],inputs:{name:"name",isDisabled:[0,"disabled","isDisabled"],model:[0,"ngModel","model"],options:[0,"ngModelOptions","options"]},outputs:{update:"ngModelChange"},exportAs:["ngModel"],standalone:!1,features:[y([Gi]),p,dt]})}return e})();var lr=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275dir=v({type:e,selectors:[["form",3,"ngNoForm","",3,"ngNativeValidate",""]],hostAttrs:["novalidate",""],standalone:!1})}return e})();var Nn=new b("");var $i={provide:st,useExisting:wt(()=>Ui)},Ui=(()=>{class e extends st{callSetDisabledState;get submitted(){return K(this._submittedReactive)}set submitted(t){this._submittedReactive.set(t)}_submitted=J(()=>this._submittedReactive());_submittedReactive=Et(!1);_oldForm;_onCollectionChange=()=>this._updateDomValue();directives=[];form=null;ngSubmit=new W;constructor(t,n,o){super(),this.callSetDisabledState=o,this._setValidators(t),this._setAsyncValidators(n)}ngOnChanges(t){t.hasOwnProperty("form")&&(this._updateValidators(),this._updateDomValue(),this._updateRegistrations(),this._oldForm=this.form)}ngOnDestroy(){this.form&&(Zt(this.form,this),this.form._onCollectionChange===this._onCollectionChange&&this.form._registerOnCollectionChange(()=>{}))}get formDirective(){return this}get control(){return this.form}get path(){return[]}addControl(t){let n=this.form.get(t.path);return fe(n,t,this.callSetDisabledState),n.updateValueAndValidity({emitEvent:!1}),this.directives.push(t),n}getControl(t){return this.form.get(t.path)}removeControl(t){ln(t.control||null,t,!1),Hi(this.directives,t)}addFormGroup(t){this._setUpFormContainer(t)}removeFormGroup(t){this._cleanUpFormContainer(t)}getFormGroup(t){return this.form.get(t.path)}addFormArray(t){this._setUpFormContainer(t)}removeFormArray(t){this._cleanUpFormContainer(t)}getFormArray(t){return this.form.get(t.path)}updateModel(t,n){this.form.get(t.path).setValue(n)}onSubmit(t){return this._submittedReactive.set(!0),Li(this.form,this.directives),this.ngSubmit.emit(t),this.form._events.next(new pe(this.control)),t?.target?.method==="dialog"}onReset(){this.resetForm()}resetForm(t=void 0,n={}){this.form.reset(t,n),this._submittedReactive.set(!1)}_updateDomValue(){this.directives.forEach(t=>{let n=t.control,o=this.form.get(t.path);n!==o&&(ln(n||null,t),zi(o)&&(fe(o,t,this.callSetDisabledState),t.control=o))}),this.form._updateTreeValidity({emitEvent:!1})}_setUpFormContainer(t){let n=this.form.get(t.path);Oi(n,t),n.updateValueAndValidity({emitEvent:!1})}_cleanUpFormContainer(t){if(this.form){let n=this.form.get(t.path);n&&Ri(n,t)&&n.updateValueAndValidity({emitEvent:!1})}}_updateRegistrations(){this.form._registerOnCollectionChange(this._onCollectionChange),this._oldForm&&this._oldForm._registerOnCollectionChange(()=>{})}_updateValidators(){we(this.form,this),this._oldForm&&Zt(this._oldForm,this)}static \u0275fac=function(n){return new(n||e)(f(ve,10),f(_e,10),f(Yt,8))};static \u0275dir=v({type:e,selectors:[["","formGroup",""]],hostBindings:function(n,o){n&1&&Vt("submit",function(s){return o.onSubmit(s)})("reset",function(){return o.onReset()})},inputs:{form:[0,"formGroup","form"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:!1,features:[y([$i]),p,dt]})}return e})();var qi={provide:at,useExisting:wt(()=>Qi)},Qi=(()=>{class e extends at{_ngModelWarningConfig;_added=!1;viewModel;control;name=null;set isDisabled(t){}model;update=new W;static _ngModelWarningSentOnce=!1;_ngModelWarningSent=!1;constructor(t,n,o,r,s){super(),this._ngModelWarningConfig=s,this._parent=t,this._setValidators(n),this._setAsyncValidators(o),this.valueAccessor=kn(this,r)}ngOnChanges(t){this._added||this._setUpControl(),Fn(t,this.viewModel)&&(this.viewModel=this.model,this.formDirective.updateModel(this,this.model))}ngOnDestroy(){this.formDirective&&this.formDirective.removeControl(this)}viewToModelUpdate(t){this.viewModel=t,this.update.emit(t)}get path(){return In(this.name==null?this.name:this.name.toString(),this._parent)}get formDirective(){return this._parent?this._parent.formDirective:null}_setUpControl(){this.control=this.formDirective.addControl(this),this._added=!0}static \u0275fac=function(n){return new(n||e)(f(st,13),f(ve,10),f(_e,10),f(me,10),f(Nn,8))};static \u0275dir=v({type:e,selectors:[["","formControlName",""]],inputs:{name:[0,"formControlName","name"],isDisabled:[0,"disabled","isDisabled"],model:[0,"ngModel","model"]},outputs:{update:"ngModelChange"},standalone:!1,features:[y([qi]),p,dt]})}return e})();var Tn=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=E({type:e});static \u0275inj=w({})}return e})(),ge=class extends Ct{constructor(i,t,n){super(Ce(t),De(n,t)),this.controls=i,this._initObservables(),this._setUpdateStrategy(t),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}controls;at(i){return this.controls[this._adjustIndex(i)]}push(i,t={}){Array.isArray(i)?i.forEach(n=>{this.controls.push(n),this._registerControl(n)}):(this.controls.push(i),this._registerControl(i)),this.updateValueAndValidity({emitEvent:t.emitEvent}),this._onCollectionChange()}insert(i,t,n={}){this.controls.splice(i,0,t),this._registerControl(t),this.updateValueAndValidity({emitEvent:n.emitEvent})}removeAt(i,t={}){let n=this._adjustIndex(i);n<0&&(n=0),this.controls[n]&&this.controls[n]._registerOnCollectionChange(()=>{}),this.controls.splice(n,1),this.updateValueAndValidity({emitEvent:t.emitEvent})}setControl(i,t,n={}){let o=this._adjustIndex(i);o<0&&(o=0),this.controls[o]&&this.controls[o]._registerOnCollectionChange(()=>{}),this.controls.splice(o,1),t&&(this.controls.splice(o,0,t),this._registerControl(t)),this.updateValueAndValidity({emitEvent:n.emitEvent}),this._onCollectionChange()}get length(){return this.controls.length}setValue(i,t={}){Mn(this,!1,i),i.forEach((n,o)=>{xn(this,!1,o),this.at(o).setValue(n,{onlySelf:!0,emitEvent:t.emitEvent})}),this.updateValueAndValidity(t)}patchValue(i,t={}){i!=null&&(i.forEach((n,o)=>{this.at(o)&&this.at(o).patchValue(n,{onlySelf:!0,emitEvent:t.emitEvent})}),this.updateValueAndValidity(t))}reset(i=[],t={}){this._forEachChild((n,o)=>{n.reset(i[o],{onlySelf:!0,emitEvent:t.emitEvent})}),this._updatePristine(t,this),this._updateTouched(t,this),this.updateValueAndValidity(t),t?.emitEvent!==!1&&this._events.next(new Nt(this))}getRawValue(){return this.controls.map(i=>i.getRawValue())}clear(i={}){this.controls.length<1||(this._forEachChild(t=>t._registerOnCollectionChange(()=>{})),this.controls.splice(0),this.updateValueAndValidity({emitEvent:i.emitEvent}))}_adjustIndex(i){return i<0?i+this.length:i}_syncPendingControls(){let i=this.controls.reduce((t,n)=>n._syncPendingControls()?!0:t,!1);return i&&this.updateValueAndValidity({onlySelf:!0}),i}_forEachChild(i){this.controls.forEach((t,n)=>{i(t,n)})}_updateValue(){this.value=this.controls.filter(i=>i.enabled||this.disabled).map(i=>i.value)}_anyControls(i){return this.controls.some(t=>t.enabled&&i(t))}_setUpControls(){this._forEachChild(i=>this._registerControl(i))}_allControlsDisabled(){for(let i of this.controls)if(i.enabled)return!1;return this.controls.length>0||this.disabled}_registerControl(i){i.setParent(this),i._registerOnCollectionChange(this._onCollectionChange)}_find(i){return this.at(i)??null}};function pn(e){return!!e&&(e.asyncValidators!==void 0||e.validators!==void 0||e.updateOn!==void 0)}var dr=(()=>{class e{useNonNullable=!1;get nonNullable(){let t=new e;return t.useNonNullable=!0,t}group(t,n=null){let o=this._reduceControls(t),r={};return pn(n)?r=n:n!==null&&(r.validators=n.validator,r.asyncValidators=n.asyncValidator),new qt(o,r)}record(t,n=null){let o=this._reduceControls(t);return new he(o,n)}control(t,n,o){let r={};return this.useNonNullable?(pn(n)?r=n:(r.validators=n,r.asyncValidators=o),new kt(t,P(M({},r),{nonNullable:!0}))):new kt(t,n,o)}array(t,n,o){let r=t.map(s=>this._createControl(s));return new ge(r,n,o)}_reduceControls(t){let n={};return Object.keys(t).forEach(o=>{n[o]=this._createControl(t[o])}),n}_createControl(t){if(t instanceof kt)return t;if(t instanceof Ct)return t;if(Array.isArray(t)){let n=t[0],o=t.length>1?t[1]:null,r=t.length>2?t[2]:null;return this.control(n,o,r)}else return this.control(t)}static \u0275fac=function(n){return new(n||e)};static \u0275prov=I({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var Pn=(()=>{class e{static withConfig(t){return{ngModule:e,providers:[{provide:Yt,useValue:t.callSetDisabledState??Kt}]}}static \u0275fac=function(n){return new(n||e)};static \u0275mod=E({type:e});static \u0275inj=w({imports:[Tn]})}return e})(),Bn=(()=>{class e{static withConfig(t){return{ngModule:e,providers:[{provide:Nn,useValue:t.warnOnNgModelWithFormControl??"always"},{provide:Yt,useValue:t.callSetDisabledState??Kt}]}}static \u0275fac=function(n){return new(n||e)};static \u0275mod=E({type:e});static \u0275inj=w({imports:[Tn]})}return e})();var Ee=(()=>{class e{static zindex=1e3;static calculatedScrollbarWidth=null;static calculatedScrollbarHeight=null;static browser;static addClass(t,n){t&&n&&(t.classList?t.classList.add(n):t.className+=" "+n)}static addMultipleClasses(t,n){if(t&&n)if(t.classList){let o=n.trim().split(" ");for(let r=0;r<o.length;r++)t.classList.add(o[r])}else{let o=n.split(" ");for(let r=0;r<o.length;r++)t.className+=" "+o[r]}}static removeClass(t,n){t&&n&&(t.classList?t.classList.remove(n):t.className=t.className.replace(new RegExp("(^|\\b)"+n.split(" ").join("|")+"(\\b|$)","gi")," "))}static removeMultipleClasses(t,n){t&&n&&[n].flat().filter(Boolean).forEach(o=>o.split(" ").forEach(r=>this.removeClass(t,r)))}static hasClass(t,n){return t&&n?t.classList?t.classList.contains(n):new RegExp("(^| )"+n+"( |$)","gi").test(t.className):!1}static siblings(t){return Array.prototype.filter.call(t.parentNode.children,function(n){return n!==t})}static find(t,n){return Array.from(t.querySelectorAll(n))}static findSingle(t,n){return this.isElement(t)?t.querySelector(n):null}static index(t){let n=t.parentNode.childNodes,o=0;for(var r=0;r<n.length;r++){if(n[r]==t)return o;n[r].nodeType==1&&o++}return-1}static indexWithinGroup(t,n){let o=t.parentNode?t.parentNode.childNodes:[],r=0;for(var s=0;s<o.length;s++){if(o[s]==t)return r;o[s].attributes&&o[s].attributes[n]&&o[s].nodeType==1&&r++}return-1}static appendOverlay(t,n,o="self"){o!=="self"&&t&&n&&this.appendChild(t,n)}static alignOverlay(t,n,o="self",r=!0){t&&n&&(r&&(t.style.minWidth=`${e.getOuterWidth(n)}px`),o==="self"?this.relativePosition(t,n):this.absolutePosition(t,n))}static relativePosition(t,n,o=!0){let r=nt=>{if(nt)return getComputedStyle(nt).getPropertyValue("position")==="relative"?nt:r(nt.parentElement)},s=t.offsetParent?{width:t.offsetWidth,height:t.offsetHeight}:this.getHiddenElementDimensions(t),a=n.offsetHeight,u=n.getBoundingClientRect(),T=this.getWindowScrollTop(),D=this.getWindowScrollLeft(),S=this.getViewport(),x=r(t)?.getBoundingClientRect()||{top:-1*T,left:-1*D},z,U,Pt="top";u.top+a+s.height>S.height?(z=u.top-x.top-s.height,Pt="bottom",u.top+z<0&&(z=-1*u.top)):(z=a+u.top-x.top,Pt="top");let xe=u.left+s.width-S.width,gi=u.left-x.left;if(s.width>S.width?U=(u.left-x.left)*-1:xe>0?U=gi-xe:U=u.left-x.left,t.style.top=z+"px",t.style.left=U+"px",t.style.transformOrigin=Pt,o){let nt=Ue(/-anchor-gutter$/)?.value;t.style.marginTop=Pt==="bottom"?`calc(${nt??"2px"} * -1)`:nt??""}}static absolutePosition(t,n,o=!0){let r=t.offsetParent?{width:t.offsetWidth,height:t.offsetHeight}:this.getHiddenElementDimensions(t),s=r.height,a=r.width,u=n.offsetHeight,T=n.offsetWidth,D=n.getBoundingClientRect(),S=this.getWindowScrollTop(),H=this.getWindowScrollLeft(),x=this.getViewport(),z,U;D.top+u+s>x.height?(z=D.top+S-s,t.style.transformOrigin="bottom",z<0&&(z=S)):(z=u+D.top+S,t.style.transformOrigin="top"),D.left+a>x.width?U=Math.max(0,D.left+H+T-a):U=D.left+H,t.style.top=z+"px",t.style.left=U+"px",o&&(t.style.marginTop=origin==="bottom"?"calc(var(--p-anchor-gutter) * -1)":"calc(var(--p-anchor-gutter))")}static getParents(t,n=[]){return t.parentNode===null?n:this.getParents(t.parentNode,n.concat([t.parentNode]))}static getScrollableParents(t){let n=[];if(t){let o=this.getParents(t),r=/(auto|scroll)/,s=a=>{let u=window.getComputedStyle(a,null);return r.test(u.getPropertyValue("overflow"))||r.test(u.getPropertyValue("overflowX"))||r.test(u.getPropertyValue("overflowY"))};for(let a of o){let u=a.nodeType===1&&a.dataset.scrollselectors;if(u){let T=u.split(",");for(let D of T){let S=this.findSingle(a,D);S&&s(S)&&n.push(S)}}a.nodeType!==9&&s(a)&&n.push(a)}}return n}static getHiddenElementOuterHeight(t){t.style.visibility="hidden",t.style.display="block";let n=t.offsetHeight;return t.style.display="none",t.style.visibility="visible",n}static getHiddenElementOuterWidth(t){t.style.visibility="hidden",t.style.display="block";let n=t.offsetWidth;return t.style.display="none",t.style.visibility="visible",n}static getHiddenElementDimensions(t){let n={};return t.style.visibility="hidden",t.style.display="block",n.width=t.offsetWidth,n.height=t.offsetHeight,t.style.display="none",t.style.visibility="visible",n}static scrollInView(t,n){let o=getComputedStyle(t).getPropertyValue("borderTopWidth"),r=o?parseFloat(o):0,s=getComputedStyle(t).getPropertyValue("paddingTop"),a=s?parseFloat(s):0,u=t.getBoundingClientRect(),D=n.getBoundingClientRect().top+document.body.scrollTop-(u.top+document.body.scrollTop)-r-a,S=t.scrollTop,H=t.clientHeight,x=this.getOuterHeight(n);D<0?t.scrollTop=S+D:D+x>H&&(t.scrollTop=S+D-H+x)}static fadeIn(t,n){t.style.opacity=0;let o=+new Date,r=0,s=function(){r=+t.style.opacity.replace(",",".")+(new Date().getTime()-o)/n,t.style.opacity=r,o=+new Date,+r<1&&(window.requestAnimationFrame?window.requestAnimationFrame(s):setTimeout(s,16))};s()}static fadeOut(t,n){var o=1,r=50,s=n,a=r/s;let u=setInterval(()=>{o=o-a,o<=0&&(o=0,clearInterval(u)),t.style.opacity=o},r)}static getWindowScrollTop(){let t=document.documentElement;return(window.pageYOffset||t.scrollTop)-(t.clientTop||0)}static getWindowScrollLeft(){let t=document.documentElement;return(window.pageXOffset||t.scrollLeft)-(t.clientLeft||0)}static matches(t,n){var o=Element.prototype,r=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.msMatchesSelector||function(s){return[].indexOf.call(document.querySelectorAll(s),this)!==-1};return r.call(t,n)}static getOuterWidth(t,n){let o=t.offsetWidth;if(n){let r=getComputedStyle(t);o+=parseFloat(r.marginLeft)+parseFloat(r.marginRight)}return o}static getHorizontalPadding(t){let n=getComputedStyle(t);return parseFloat(n.paddingLeft)+parseFloat(n.paddingRight)}static getHorizontalMargin(t){let n=getComputedStyle(t);return parseFloat(n.marginLeft)+parseFloat(n.marginRight)}static innerWidth(t){let n=t.offsetWidth,o=getComputedStyle(t);return n+=parseFloat(o.paddingLeft)+parseFloat(o.paddingRight),n}static width(t){let n=t.offsetWidth,o=getComputedStyle(t);return n-=parseFloat(o.paddingLeft)+parseFloat(o.paddingRight),n}static getInnerHeight(t){let n=t.offsetHeight,o=getComputedStyle(t);return n+=parseFloat(o.paddingTop)+parseFloat(o.paddingBottom),n}static getOuterHeight(t,n){let o=t.offsetHeight;if(n){let r=getComputedStyle(t);o+=parseFloat(r.marginTop)+parseFloat(r.marginBottom)}return o}static getHeight(t){let n=t.offsetHeight,o=getComputedStyle(t);return n-=parseFloat(o.paddingTop)+parseFloat(o.paddingBottom)+parseFloat(o.borderTopWidth)+parseFloat(o.borderBottomWidth),n}static getWidth(t){let n=t.offsetWidth,o=getComputedStyle(t);return n-=parseFloat(o.paddingLeft)+parseFloat(o.paddingRight)+parseFloat(o.borderLeftWidth)+parseFloat(o.borderRightWidth),n}static getViewport(){let t=window,n=document,o=n.documentElement,r=n.getElementsByTagName("body")[0],s=t.innerWidth||o.clientWidth||r.clientWidth,a=t.innerHeight||o.clientHeight||r.clientHeight;return{width:s,height:a}}static getOffset(t){var n=t.getBoundingClientRect();return{top:n.top+(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0),left:n.left+(window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0)}}static replaceElementWith(t,n){let o=t.parentNode;if(!o)throw"Can't replace element";return o.replaceChild(n,t)}static getUserAgent(){if(navigator&&this.isClient())return navigator.userAgent}static isIE(){var t=window.navigator.userAgent,n=t.indexOf("MSIE ");if(n>0)return!0;var o=t.indexOf("Trident/");if(o>0){var r=t.indexOf("rv:");return!0}var s=t.indexOf("Edge/");return s>0}static isIOS(){return/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream}static isAndroid(){return/(android)/i.test(navigator.userAgent)}static isTouchDevice(){return"ontouchstart"in window||navigator.maxTouchPoints>0}static appendChild(t,n){if(this.isElement(n))n.appendChild(t);else if(n&&n.el&&n.el.nativeElement)n.el.nativeElement.appendChild(t);else throw"Cannot append "+n+" to "+t}static removeChild(t,n){if(this.isElement(n))n.removeChild(t);else if(n.el&&n.el.nativeElement)n.el.nativeElement.removeChild(t);else throw"Cannot remove "+t+" from "+n}static removeElement(t){"remove"in Element.prototype?t.remove():t.parentNode?.removeChild(t)}static isElement(t){return typeof HTMLElement=="object"?t instanceof HTMLElement:t&&typeof t=="object"&&t!==null&&t.nodeType===1&&typeof t.nodeName=="string"}static calculateScrollbarWidth(t){if(t){let n=getComputedStyle(t);return t.offsetWidth-t.clientWidth-parseFloat(n.borderLeftWidth)-parseFloat(n.borderRightWidth)}else{if(this.calculatedScrollbarWidth!==null)return this.calculatedScrollbarWidth;let n=document.createElement("div");n.className="p-scrollbar-measure",document.body.appendChild(n);let o=n.offsetWidth-n.clientWidth;return document.body.removeChild(n),this.calculatedScrollbarWidth=o,o}}static calculateScrollbarHeight(){if(this.calculatedScrollbarHeight!==null)return this.calculatedScrollbarHeight;let t=document.createElement("div");t.className="p-scrollbar-measure",document.body.appendChild(t);let n=t.offsetHeight-t.clientHeight;return document.body.removeChild(t),this.calculatedScrollbarWidth=n,n}static invokeElementMethod(t,n,o){t[n].apply(t,o)}static clearSelection(){if(window.getSelection&&window.getSelection())window.getSelection()?.empty?window.getSelection()?.empty():window.getSelection()?.removeAllRanges&&(window.getSelection()?.rangeCount||0)>0&&(window.getSelection()?.getRangeAt(0)?.getClientRects()?.length||0)>0&&window.getSelection()?.removeAllRanges();else if(document.selection&&document.selection.empty)try{document.selection.empty()}catch{}}static getBrowser(){if(!this.browser){let t=this.resolveUserAgent();this.browser={},t.browser&&(this.browser[t.browser]=!0,this.browser.version=t.version),this.browser.chrome?this.browser.webkit=!0:this.browser.webkit&&(this.browser.safari=!0)}return this.browser}static resolveUserAgent(){let t=navigator.userAgent.toLowerCase(),n=/(chrome)[ \/]([\w.]+)/.exec(t)||/(webkit)[ \/]([\w.]+)/.exec(t)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(t)||/(msie) ([\w.]+)/.exec(t)||t.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(t)||[];return{browser:n[1]||"",version:n[2]||"0"}}static isInteger(t){return Number.isInteger?Number.isInteger(t):typeof t=="number"&&isFinite(t)&&Math.floor(t)===t}static isHidden(t){return!t||t.offsetParent===null}static isVisible(t){return t&&t.offsetParent!=null}static isExist(t){return t!==null&&typeof t<"u"&&t.nodeName&&t.parentNode}static focus(t,n){t&&document.activeElement!==t&&t.focus(n)}static getFocusableSelectorString(t=""){return`button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        .p-inputtext:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        .p-button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t}`}static getFocusableElements(t,n=""){let o=this.find(t,this.getFocusableSelectorString(n)),r=[];for(let s of o){let a=getComputedStyle(s);this.isVisible(s)&&a.display!="none"&&a.visibility!="hidden"&&r.push(s)}return r}static getFocusableElement(t,n=""){let o=this.findSingle(t,this.getFocusableSelectorString(n));if(o){let r=getComputedStyle(o);if(this.isVisible(o)&&r.display!="none"&&r.visibility!="hidden")return o}return null}static getFirstFocusableElement(t,n=""){let o=this.getFocusableElements(t,n);return o.length>0?o[0]:null}static getLastFocusableElement(t,n){let o=this.getFocusableElements(t,n);return o.length>0?o[o.length-1]:null}static getNextFocusableElement(t,n=!1){let o=e.getFocusableElements(t),r=0;if(o&&o.length>0){let s=o.indexOf(o[0].ownerDocument.activeElement);n?s==-1||s===0?r=o.length-1:r=s-1:s!=-1&&s!==o.length-1&&(r=s+1)}return o[r]}static generateZIndex(){return this.zindex=this.zindex||999,++this.zindex}static getSelection(){return window.getSelection?window.getSelection()?.toString():document.getSelection?document.getSelection()?.toString():document.selection?document.selection.createRange().text:null}static getTargetElement(t,n){if(!t)return null;switch(t){case"document":return document;case"window":return window;case"@next":return n?.nextElementSibling;case"@prev":return n?.previousElementSibling;case"@parent":return n?.parentElement;case"@grandparent":return n?.parentElement?.parentElement;default:let o=typeof t;if(o==="string")return document.querySelector(t);if(o==="object"&&t.hasOwnProperty("nativeElement"))return this.isExist(t.nativeElement)?t.nativeElement:void 0;let s=(a=>!!(a&&a.constructor&&a.call&&a.apply))(t)?t():t;return s&&s.nodeType===9||this.isExist(s)?s:null}}static isClient(){return!!(typeof window<"u"&&window.document&&window.document.createElement)}static getAttribute(t,n){if(t){let o=t.getAttribute(n);return isNaN(o)?o==="true"||o==="false"?o==="true":o:+o}}static calculateBodyScrollbarWidth(){return window.innerWidth-document.documentElement.offsetWidth}static blockBodyScroll(t="p-overflow-hidden"){document.body.style.setProperty("--scrollbar-width",this.calculateBodyScrollbarWidth()+"px"),this.addClass(document.body,t)}static unblockBodyScroll(t="p-overflow-hidden"){document.body.style.removeProperty("--scrollbar-width"),this.removeClass(document.body,t)}static createElement(t,n={},...o){if(t){let r=document.createElement(t);return this.setAttributes(r,n),r.append(...o),r}}static setAttribute(t,n="",o){this.isElement(t)&&o!==null&&o!==void 0&&t.setAttribute(n,o)}static setAttributes(t,n={}){if(this.isElement(t)){let o=(r,s)=>{let a=t?.$attrs?.[r]?[t?.$attrs?.[r]]:[];return[s].flat().reduce((u,T)=>{if(T!=null){let D=typeof T;if(D==="string"||D==="number")u.push(T);else if(D==="object"){let S=Array.isArray(T)?o(r,T):Object.entries(T).map(([H,x])=>r==="style"&&(x||x===0)?`${H.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}:${x}`:x?H:void 0);u=S.length?u.concat(S.filter(H=>!!H)):u}}return u},a)};Object.entries(n).forEach(([r,s])=>{if(s!=null){let a=r.match(/^on(.+)/);a?t.addEventListener(a[1].toLowerCase(),s):r==="pBind"?this.setAttributes(t,s):(s=r==="class"?[...new Set(o("class",s))].join(" ").trim():r==="style"?o("style",s).join(";").trim():s,(t.$attrs=t.$attrs||{})&&(t.$attrs[r]=s),t.setAttribute(r,s))}})}}static isFocusableElement(t,n=""){return this.isElement(t)?t.matches(`button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
                select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
                [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n}`):!1}}return e})();var On=class{element;listener;scrollableParents;constructor(i,t=()=>{}){this.element=i,this.listener=t}bindScrollListener(){this.scrollableParents=Ee.getScrollableParents(this.element);for(let i=0;i<this.scrollableParents.length;i++)this.scrollableParents[i].addEventListener("scroll",this.listener)}unbindScrollListener(){if(this.scrollableParents)for(let i=0;i<this.scrollableParents.length;i++)this.scrollableParents[i].removeEventListener("scroll",this.listener)}destroy(){this.unbindScrollListener(),this.element=null,this.listener=null,this.scrollableParents=null}};var Rn=(()=>{class e extends V{autofocus=!1;focused=!1;platformId=l(Ne);document=l(ke);host=l(it);onAfterContentChecked(){this.autofocus===!1?this.host.nativeElement.removeAttribute("autofocus"):this.host.nativeElement.setAttribute("autofocus",!0),this.focused||this.autoFocus()}onAfterViewChecked(){this.focused||this.autoFocus()}autoFocus(){mt(this.platformId)&&this.autofocus&&setTimeout(()=>{let t=Ee.getFocusableElements(this.host?.nativeElement);t.length===0&&this.host.nativeElement.focus(),t.length>0&&t[0].focus(),this.focused=!0})}static \u0275fac=(()=>{let t;return function(o){return(t||(t=h(e)))(o||e)}})();static \u0275dir=v({type:e,selectors:[["","pAutoFocus",""]],inputs:{autofocus:[0,"pAutoFocus","autofocus"]},features:[p]})}return e})();var jn=`
    .p-badge {
        display: inline-flex;
        border-radius: dt('badge.border.radius');
        align-items: center;
        justify-content: center;
        padding: dt('badge.padding');
        background: dt('badge.primary.background');
        color: dt('badge.primary.color');
        font-size: dt('badge.font.size');
        font-weight: dt('badge.font.weight');
        min-width: dt('badge.min.width');
        height: dt('badge.height');
    }

    .p-badge-dot {
        width: dt('badge.dot.size');
        min-width: dt('badge.dot.size');
        height: dt('badge.dot.size');
        border-radius: 50%;
        padding: 0;
    }

    .p-badge-circle {
        padding: 0;
        border-radius: 50%;
    }

    .p-badge-secondary {
        background: dt('badge.secondary.background');
        color: dt('badge.secondary.color');
    }

    .p-badge-success {
        background: dt('badge.success.background');
        color: dt('badge.success.color');
    }

    .p-badge-info {
        background: dt('badge.info.background');
        color: dt('badge.info.color');
    }

    .p-badge-warn {
        background: dt('badge.warn.background');
        color: dt('badge.warn.color');
    }

    .p-badge-danger {
        background: dt('badge.danger.background');
        color: dt('badge.danger.color');
    }

    .p-badge-contrast {
        background: dt('badge.contrast.background');
        color: dt('badge.contrast.color');
    }

    .p-badge-sm {
        font-size: dt('badge.sm.font.size');
        min-width: dt('badge.sm.min.width');
        height: dt('badge.sm.height');
    }

    .p-badge-lg {
        font-size: dt('badge.lg.font.size');
        min-width: dt('badge.lg.min.width');
        height: dt('badge.lg.height');
    }

    .p-badge-xl {
        font-size: dt('badge.xl.font.size');
        min-width: dt('badge.xl.min.width');
        height: dt('badge.xl.height');
    }
`;var Zi=`
    ${jn}

    /* For PrimeNG (directive)*/
    .p-overlay-badge {
        position: relative;
    }

    .p-overlay-badge > .p-badge {
        position: absolute;
        top: 0;
        inset-inline-end: 0;
        transform: translate(50%, -50%);
        transform-origin: 100% 0;
        margin: 0;
    }
`,Xi={root:({instance:e})=>{let i=typeof e.value=="function"?e.value():e.value,t=typeof e.size=="function"?e.size():e.size,n=typeof e.badgeSize=="function"?e.badgeSize():e.badgeSize,o=typeof e.severity=="function"?e.severity():e.severity;return["p-badge p-component",{"p-badge-circle":Ye(i)&&String(i).length===1,"p-badge-dot":xt(i),"p-badge-sm":t==="small"||n==="small","p-badge-lg":t==="large"||n==="large","p-badge-xl":t==="xlarge"||n==="xlarge","p-badge-info":o==="info","p-badge-success":o==="success","p-badge-warn":o==="warn","p-badge-danger":o==="danger","p-badge-secondary":o==="secondary","p-badge-contrast":o==="contrast"}]}},Ln=(()=>{class e extends O{name="badge";style=Zi;classes=Xi;static \u0275fac=(()=>{let t;return function(o){return(t||(t=h(e)))(o||e)}})();static \u0275prov=I({token:e,factory:e.\u0275fac})}return e})();var Hn=new b("BADGE_INSTANCE");var Ve=(()=>{class e extends V{$pcBadge=l(Hn,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=l(d,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}styleClass=j();badgeSize=j();size=j();severity=j();value=j();badgeDisabled=j(!1,{transform:m});_componentStyle=l(Ln);static \u0275fac=(()=>{let t;return function(o){return(t||(t=h(e)))(o||e)}})();static \u0275cmp=B({type:e,selectors:[["p-badge"]],hostVars:4,hostBindings:function(n,o){n&2&&(_(o.cn(o.cx("root"),o.styleClass())),Ot("display",o.badgeDisabled()?"none":null))},inputs:{styleClass:[1,"styleClass"],badgeSize:[1,"badgeSize"],size:[1,"size"],severity:[1,"severity"],value:[1,"value"],badgeDisabled:[1,"badgeDisabled"]},features:[y([Ln,{provide:Hn,useExisting:e},{provide:N,useExisting:e}]),A([d]),p],decls:1,vars:1,template:function(n,o){n&1&&ft(0),n&2&&gt(o.value())},dependencies:[k,C,Ke],encapsulation:2,changeDetection:0})}return e})(),Jt=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=E({type:e});static \u0275inj=w({imports:[Ve,C,C]})}return e})();var Ki=["*"],Ji={root:"p-fluid"},zn=(()=>{class e extends O{name="fluid";classes=Ji;static \u0275fac=(()=>{let t;return function(o){return(t||(t=h(e)))(o||e)}})();static \u0275prov=I({token:e,factory:e.\u0275fac})}return e})();var Gn=new b("FLUID_INSTANCE"),Se=(()=>{class e extends V{$pcFluid=l(Gn,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=l(d,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}_componentStyle=l(zn);static \u0275fac=(()=>{let t;return function(o){return(t||(t=h(e)))(o||e)}})();static \u0275cmp=B({type:e,selectors:[["p-fluid"]],hostVars:2,hostBindings:function(n,o){n&2&&_(o.cx("root"))},features:[y([zn,{provide:Gn,useExisting:e},{provide:N,useExisting:e}]),A([d]),p],ngContentSelectors:Ki,decls:1,vars:0,template:function(n,o){n&1&&(pt(),ht(0))},dependencies:[k],encapsulation:2,changeDetection:0})}return e})();var to=["data-p-icon","spinner"],Wn=(()=>{class e extends Je{pathId;onInit(){this.pathId="url(#"+ce()+")"}static \u0275fac=(()=>{let t;return function(o){return(t||(t=h(e)))(o||e)}})();static \u0275cmp=B({type:e,selectors:[["","data-p-icon","spinner"]],features:[p],attrs:to,decls:5,vars:2,consts:[["d","M6.99701 14C5.85441 13.999 4.72939 13.7186 3.72012 13.1832C2.71084 12.6478 1.84795 11.8737 1.20673 10.9284C0.565504 9.98305 0.165424 8.89526 0.041387 7.75989C-0.0826496 6.62453 0.073125 5.47607 0.495122 4.4147C0.917119 3.35333 1.59252 2.4113 2.46241 1.67077C3.33229 0.930247 4.37024 0.413729 5.4857 0.166275C6.60117 -0.0811796 7.76026 -0.0520535 8.86188 0.251112C9.9635 0.554278 10.9742 1.12227 11.8057 1.90555C11.915 2.01493 11.9764 2.16319 11.9764 2.31778C11.9764 2.47236 11.915 2.62062 11.8057 2.73C11.7521 2.78503 11.688 2.82877 11.6171 2.85864C11.5463 2.8885 11.4702 2.90389 11.3933 2.90389C11.3165 2.90389 11.2404 2.8885 11.1695 2.85864C11.0987 2.82877 11.0346 2.78503 10.9809 2.73C9.9998 1.81273 8.73246 1.26138 7.39226 1.16876C6.05206 1.07615 4.72086 1.44794 3.62279 2.22152C2.52471 2.99511 1.72683 4.12325 1.36345 5.41602C1.00008 6.70879 1.09342 8.08723 1.62775 9.31926C2.16209 10.5513 3.10478 11.5617 4.29713 12.1803C5.48947 12.7989 6.85865 12.988 8.17414 12.7157C9.48963 12.4435 10.6711 11.7264 11.5196 10.6854C12.3681 9.64432 12.8319 8.34282 12.8328 7C12.8328 6.84529 12.8943 6.69692 13.0038 6.58752C13.1132 6.47812 13.2616 6.41667 13.4164 6.41667C13.5712 6.41667 13.7196 6.47812 13.8291 6.58752C13.9385 6.69692 14 6.84529 14 7C14 8.85651 13.2622 10.637 11.9489 11.9497C10.6356 13.2625 8.85432 14 6.99701 14Z","fill","currentColor"],[3,"id"],["width","14","height","14","fill","white"]],template:function(n,o){n&1&&(lt(),ee(0,"g"),ie(1,"path",0),ne(),ee(2,"defs")(3,"clipPath",1),ie(4,"rect",2),ne()()),n&2&&(R("clip-path",o.pathId),g(3),Oe("id",o.pathId))},encapsulation:2})}return e})();var $n=`
    .p-ink {
        display: block;
        position: absolute;
        background: dt('ripple.background');
        border-radius: 100%;
        transform: scale(0);
        pointer-events: none;
    }

    .p-ink-active {
        animation: ripple 0.4s linear;
    }

    @keyframes ripple {
        100% {
            opacity: 0;
            transform: scale(2.5);
        }
    }
`;var eo=`
    ${$n}

    /* For PrimeNG */
    .p-ripple {
        overflow: hidden;
        position: relative;
    }

    .p-ripple-disabled .p-ink {
        display: none !important;
    }

    @keyframes ripple {
        100% {
            opacity: 0;
            transform: scale(2.5);
        }
    }
`,no={root:"p-ink"},Un=(()=>{class e extends O{name="ripple";style=eo;classes=no;static \u0275fac=(()=>{let t;return function(o){return(t||(t=h(e)))(o||e)}})();static \u0275prov=I({token:e,factory:e.\u0275fac})}return e})();var qn=(()=>{class e extends V{zone=l(Te);_componentStyle=l(Un);animationListener;mouseDownListener;timeout;constructor(){super(),rt(()=>{mt(this.platformId)&&(this.config.ripple()?this.zone.runOutsideAngular(()=>{this.create(),this.mouseDownListener=this.renderer.listen(this.el.nativeElement,"mousedown",this.onMouseDown.bind(this))}):this.remove())})}onAfterViewInit(){}onMouseDown(t){let n=this.getInk();if(!n||this.document.defaultView?.getComputedStyle(n,null).display==="none")return;if(bt(n,"p-ink-active"),!le(n)&&!de(n)){let a=Math.max(qe(this.el.nativeElement),Ze(this.el.nativeElement));n.style.height=a+"px",n.style.width=a+"px"}let o=Qe(this.el.nativeElement),r=t.pageX-o.left+this.document.body.scrollTop-de(n)/2,s=t.pageY-o.top+this.document.body.scrollLeft-le(n)/2;this.renderer.setStyle(n,"top",s+"px"),this.renderer.setStyle(n,"left",r+"px"),St(n,"p-ink-active"),this.timeout=setTimeout(()=>{let a=this.getInk();a&&bt(a,"p-ink-active")},401)}getInk(){let t=this.el.nativeElement.children;for(let n=0;n<t.length;n++)if(typeof t[n].className=="string"&&t[n].className.indexOf("p-ink")!==-1)return t[n];return null}resetInk(){let t=this.getInk();t&&bt(t,"p-ink-active")}onAnimationEnd(t){this.timeout&&clearTimeout(this.timeout),bt(t.currentTarget,"p-ink-active")}create(){let t=this.renderer.createElement("span");this.renderer.addClass(t,"p-ink"),this.renderer.appendChild(this.el.nativeElement,t),this.renderer.setAttribute(t,"aria-hidden","true"),this.renderer.setAttribute(t,"role","presentation"),this.animationListener||(this.animationListener=this.renderer.listen(t,"animationend",this.onAnimationEnd.bind(this)))}remove(){let t=this.getInk();t&&(this.mouseDownListener&&this.mouseDownListener(),this.animationListener&&this.animationListener(),this.mouseDownListener=null,this.animationListener=null,Xe(t))}onDestroy(){this.config&&this.config.ripple()&&this.remove()}static \u0275fac=function(n){return new(n||e)};static \u0275dir=v({type:e,selectors:[["","pRipple",""]],hostAttrs:[1,"p-ripple"],features:[y([Un]),p]})}return e})();var Qn=`
    .p-button {
        display: inline-flex;
        cursor: pointer;
        user-select: none;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
        color: dt('button.primary.color');
        background: dt('button.primary.background');
        border: 1px solid dt('button.primary.border.color');
        padding: dt('button.padding.y') dt('button.padding.x');
        font-size: 1rem;
        font-family: inherit;
        font-feature-settings: inherit;
        transition:
            background dt('button.transition.duration'),
            color dt('button.transition.duration'),
            border-color dt('button.transition.duration'),
            outline-color dt('button.transition.duration'),
            box-shadow dt('button.transition.duration');
        border-radius: dt('button.border.radius');
        outline-color: transparent;
        gap: dt('button.gap');
    }

    .p-button:disabled {
        cursor: default;
    }

    .p-button-icon-right {
        order: 1;
    }

    .p-button-icon-right:dir(rtl) {
        order: -1;
    }

    .p-button:not(.p-button-vertical) .p-button-icon:not(.p-button-icon-right):dir(rtl) {
        order: 1;
    }

    .p-button-icon-bottom {
        order: 2;
    }

    .p-button-icon-only {
        width: dt('button.icon.only.width');
        padding-inline-start: 0;
        padding-inline-end: 0;
        gap: 0;
    }

    .p-button-icon-only.p-button-rounded {
        border-radius: 50%;
        height: dt('button.icon.only.width');
    }

    .p-button-icon-only .p-button-label {
        visibility: hidden;
        width: 0;
    }

    .p-button-icon-only::after {
        content: "\0A0";
        visibility: hidden;
        width: 0;
    }

    .p-button-sm {
        font-size: dt('button.sm.font.size');
        padding: dt('button.sm.padding.y') dt('button.sm.padding.x');
    }

    .p-button-sm .p-button-icon {
        font-size: dt('button.sm.font.size');
    }

    .p-button-sm.p-button-icon-only {
        width: dt('button.sm.icon.only.width');
    }

    .p-button-sm.p-button-icon-only.p-button-rounded {
        height: dt('button.sm.icon.only.width');
    }

    .p-button-lg {
        font-size: dt('button.lg.font.size');
        padding: dt('button.lg.padding.y') dt('button.lg.padding.x');
    }

    .p-button-lg .p-button-icon {
        font-size: dt('button.lg.font.size');
    }

    .p-button-lg.p-button-icon-only {
        width: dt('button.lg.icon.only.width');
    }

    .p-button-lg.p-button-icon-only.p-button-rounded {
        height: dt('button.lg.icon.only.width');
    }

    .p-button-vertical {
        flex-direction: column;
    }

    .p-button-label {
        font-weight: dt('button.label.font.weight');
    }

    .p-button-fluid {
        width: 100%;
    }

    .p-button-fluid.p-button-icon-only {
        width: dt('button.icon.only.width');
    }

    .p-button:not(:disabled):hover {
        background: dt('button.primary.hover.background');
        border: 1px solid dt('button.primary.hover.border.color');
        color: dt('button.primary.hover.color');
    }

    .p-button:not(:disabled):active {
        background: dt('button.primary.active.background');
        border: 1px solid dt('button.primary.active.border.color');
        color: dt('button.primary.active.color');
    }

    .p-button:focus-visible {
        box-shadow: dt('button.primary.focus.ring.shadow');
        outline: dt('button.focus.ring.width') dt('button.focus.ring.style') dt('button.primary.focus.ring.color');
        outline-offset: dt('button.focus.ring.offset');
    }

    .p-button .p-badge {
        min-width: dt('button.badge.size');
        height: dt('button.badge.size');
        line-height: dt('button.badge.size');
    }

    .p-button-raised {
        box-shadow: dt('button.raised.shadow');
    }

    .p-button-rounded {
        border-radius: dt('button.rounded.border.radius');
    }

    .p-button-secondary {
        background: dt('button.secondary.background');
        border: 1px solid dt('button.secondary.border.color');
        color: dt('button.secondary.color');
    }

    .p-button-secondary:not(:disabled):hover {
        background: dt('button.secondary.hover.background');
        border: 1px solid dt('button.secondary.hover.border.color');
        color: dt('button.secondary.hover.color');
    }

    .p-button-secondary:not(:disabled):active {
        background: dt('button.secondary.active.background');
        border: 1px solid dt('button.secondary.active.border.color');
        color: dt('button.secondary.active.color');
    }

    .p-button-secondary:focus-visible {
        outline-color: dt('button.secondary.focus.ring.color');
        box-shadow: dt('button.secondary.focus.ring.shadow');
    }

    .p-button-success {
        background: dt('button.success.background');
        border: 1px solid dt('button.success.border.color');
        color: dt('button.success.color');
    }

    .p-button-success:not(:disabled):hover {
        background: dt('button.success.hover.background');
        border: 1px solid dt('button.success.hover.border.color');
        color: dt('button.success.hover.color');
    }

    .p-button-success:not(:disabled):active {
        background: dt('button.success.active.background');
        border: 1px solid dt('button.success.active.border.color');
        color: dt('button.success.active.color');
    }

    .p-button-success:focus-visible {
        outline-color: dt('button.success.focus.ring.color');
        box-shadow: dt('button.success.focus.ring.shadow');
    }

    .p-button-info {
        background: dt('button.info.background');
        border: 1px solid dt('button.info.border.color');
        color: dt('button.info.color');
    }

    .p-button-info:not(:disabled):hover {
        background: dt('button.info.hover.background');
        border: 1px solid dt('button.info.hover.border.color');
        color: dt('button.info.hover.color');
    }

    .p-button-info:not(:disabled):active {
        background: dt('button.info.active.background');
        border: 1px solid dt('button.info.active.border.color');
        color: dt('button.info.active.color');
    }

    .p-button-info:focus-visible {
        outline-color: dt('button.info.focus.ring.color');
        box-shadow: dt('button.info.focus.ring.shadow');
    }

    .p-button-warn {
        background: dt('button.warn.background');
        border: 1px solid dt('button.warn.border.color');
        color: dt('button.warn.color');
    }

    .p-button-warn:not(:disabled):hover {
        background: dt('button.warn.hover.background');
        border: 1px solid dt('button.warn.hover.border.color');
        color: dt('button.warn.hover.color');
    }

    .p-button-warn:not(:disabled):active {
        background: dt('button.warn.active.background');
        border: 1px solid dt('button.warn.active.border.color');
        color: dt('button.warn.active.color');
    }

    .p-button-warn:focus-visible {
        outline-color: dt('button.warn.focus.ring.color');
        box-shadow: dt('button.warn.focus.ring.shadow');
    }

    .p-button-help {
        background: dt('button.help.background');
        border: 1px solid dt('button.help.border.color');
        color: dt('button.help.color');
    }

    .p-button-help:not(:disabled):hover {
        background: dt('button.help.hover.background');
        border: 1px solid dt('button.help.hover.border.color');
        color: dt('button.help.hover.color');
    }

    .p-button-help:not(:disabled):active {
        background: dt('button.help.active.background');
        border: 1px solid dt('button.help.active.border.color');
        color: dt('button.help.active.color');
    }

    .p-button-help:focus-visible {
        outline-color: dt('button.help.focus.ring.color');
        box-shadow: dt('button.help.focus.ring.shadow');
    }

    .p-button-danger {
        background: dt('button.danger.background');
        border: 1px solid dt('button.danger.border.color');
        color: dt('button.danger.color');
    }

    .p-button-danger:not(:disabled):hover {
        background: dt('button.danger.hover.background');
        border: 1px solid dt('button.danger.hover.border.color');
        color: dt('button.danger.hover.color');
    }

    .p-button-danger:not(:disabled):active {
        background: dt('button.danger.active.background');
        border: 1px solid dt('button.danger.active.border.color');
        color: dt('button.danger.active.color');
    }

    .p-button-danger:focus-visible {
        outline-color: dt('button.danger.focus.ring.color');
        box-shadow: dt('button.danger.focus.ring.shadow');
    }

    .p-button-contrast {
        background: dt('button.contrast.background');
        border: 1px solid dt('button.contrast.border.color');
        color: dt('button.contrast.color');
    }

    .p-button-contrast:not(:disabled):hover {
        background: dt('button.contrast.hover.background');
        border: 1px solid dt('button.contrast.hover.border.color');
        color: dt('button.contrast.hover.color');
    }

    .p-button-contrast:not(:disabled):active {
        background: dt('button.contrast.active.background');
        border: 1px solid dt('button.contrast.active.border.color');
        color: dt('button.contrast.active.color');
    }

    .p-button-contrast:focus-visible {
        outline-color: dt('button.contrast.focus.ring.color');
        box-shadow: dt('button.contrast.focus.ring.shadow');
    }

    .p-button-outlined {
        background: transparent;
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined:not(:disabled):hover {
        background: dt('button.outlined.primary.hover.background');
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined:not(:disabled):active {
        background: dt('button.outlined.primary.active.background');
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined.p-button-secondary {
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-secondary:not(:disabled):hover {
        background: dt('button.outlined.secondary.hover.background');
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-secondary:not(:disabled):active {
        background: dt('button.outlined.secondary.active.background');
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-success {
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-success:not(:disabled):hover {
        background: dt('button.outlined.success.hover.background');
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-success:not(:disabled):active {
        background: dt('button.outlined.success.active.background');
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-info {
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-info:not(:disabled):hover {
        background: dt('button.outlined.info.hover.background');
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-info:not(:disabled):active {
        background: dt('button.outlined.info.active.background');
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-warn {
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-warn:not(:disabled):hover {
        background: dt('button.outlined.warn.hover.background');
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-warn:not(:disabled):active {
        background: dt('button.outlined.warn.active.background');
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-help {
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-help:not(:disabled):hover {
        background: dt('button.outlined.help.hover.background');
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-help:not(:disabled):active {
        background: dt('button.outlined.help.active.background');
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-danger {
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-danger:not(:disabled):hover {
        background: dt('button.outlined.danger.hover.background');
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-danger:not(:disabled):active {
        background: dt('button.outlined.danger.active.background');
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-contrast {
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-contrast:not(:disabled):hover {
        background: dt('button.outlined.contrast.hover.background');
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-contrast:not(:disabled):active {
        background: dt('button.outlined.contrast.active.background');
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-plain {
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-outlined.p-button-plain:not(:disabled):hover {
        background: dt('button.outlined.plain.hover.background');
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-outlined.p-button-plain:not(:disabled):active {
        background: dt('button.outlined.plain.active.background');
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-text {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text:not(:disabled):hover {
        background: dt('button.text.primary.hover.background');
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text:not(:disabled):active {
        background: dt('button.text.primary.active.background');
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text.p-button-secondary {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-secondary:not(:disabled):hover {
        background: dt('button.text.secondary.hover.background');
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-secondary:not(:disabled):active {
        background: dt('button.text.secondary.active.background');
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-success {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-success:not(:disabled):hover {
        background: dt('button.text.success.hover.background');
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-success:not(:disabled):active {
        background: dt('button.text.success.active.background');
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-info {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-info:not(:disabled):hover {
        background: dt('button.text.info.hover.background');
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-info:not(:disabled):active {
        background: dt('button.text.info.active.background');
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-warn {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-warn:not(:disabled):hover {
        background: dt('button.text.warn.hover.background');
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-warn:not(:disabled):active {
        background: dt('button.text.warn.active.background');
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-help {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-help:not(:disabled):hover {
        background: dt('button.text.help.hover.background');
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-help:not(:disabled):active {
        background: dt('button.text.help.active.background');
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-danger {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-danger:not(:disabled):hover {
        background: dt('button.text.danger.hover.background');
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-danger:not(:disabled):active {
        background: dt('button.text.danger.active.background');
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-contrast {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-contrast:not(:disabled):hover {
        background: dt('button.text.contrast.hover.background');
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-contrast:not(:disabled):active {
        background: dt('button.text.contrast.active.background');
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-plain {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-text.p-button-plain:not(:disabled):hover {
        background: dt('button.text.plain.hover.background');
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-text.p-button-plain:not(:disabled):active {
        background: dt('button.text.plain.active.background');
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-link {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.color');
    }

    .p-button-link:not(:disabled):hover {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.hover.color');
    }

    .p-button-link:not(:disabled):hover .p-button-label {
        text-decoration: underline;
    }

    .p-button-link:not(:disabled):active {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.active.color');
    }
`;var oo=["content"],ro=["loadingicon"],so=["icon"],ao=["*"],ei=(e,i)=>({class:e,pt:i});function lo(e,i){e&1&&Be(0)}function co(e,i){if(e&1&&$(0,"span",7),e&2){let t=F(3);_(t.cn(t.cx("loadingIcon"),"pi-spin",t.loadingIcon)),c("pBind",t.ptm("loadingIcon")),R("aria-hidden",!0)}}function uo(e,i){if(e&1&&(lt(),$(0,"svg",8)),e&2){let t=F(3);_(t.cn(t.cx("loadingIcon"),t.spinnerIconClass())),c("pBind",t.ptm("loadingIcon"))("spin",!0),R("aria-hidden",!0)}}function po(e,i){if(e&1&&(ct(0),L(1,co,1,4,"span",3)(2,uo,1,5,"svg",6),ut()),e&2){let t=F(2);g(),c("ngIf",t.loadingIcon),g(),c("ngIf",!t.loadingIcon)}}function ho(e,i){}function fo(e,i){if(e&1&&L(0,ho,0,0,"ng-template",9),e&2){let t=F(2);c("ngIf",t.loadingIconTemplate||t._loadingIconTemplate)}}function go(e,i){if(e&1&&(ct(0),L(1,po,3,2,"ng-container",2)(2,fo,1,1,null,5),ut()),e&2){let t=F();g(),c("ngIf",!t.loadingIconTemplate&&!t._loadingIconTemplate),g(),c("ngTemplateOutlet",t.loadingIconTemplate||t._loadingIconTemplate)("ngTemplateOutletContext",re(3,ei,t.cx("loadingIcon"),t.ptm("loadingIcon")))}}function mo(e,i){if(e&1&&$(0,"span",7),e&2){let t=F(2);_(t.cn("icon",t.iconClass())),c("pBind",t.ptm("icon"))}}function bo(e,i){}function yo(e,i){if(e&1&&L(0,bo,0,0,"ng-template",9),e&2){let t=F(2);c("ngIf",!t.icon&&(t.iconTemplate||t._iconTemplate))}}function vo(e,i){if(e&1&&(ct(0),L(1,mo,1,3,"span",3)(2,yo,1,1,null,5),ut()),e&2){let t=F();g(),c("ngIf",t.icon&&!t.iconTemplate&&!t._iconTemplate),g(),c("ngTemplateOutlet",t.iconTemplate||t._iconTemplate)("ngTemplateOutletContext",re(3,ei,t.cx("icon"),t.ptm("icon")))}}function _o(e,i){if(e&1&&(q(0,"span",7),ft(1),Q()),e&2){let t=F();_(t.cx("label")),c("pBind",t.ptm("label")),R("aria-hidden",t.icon&&!t.label),g(),gt(t.label)}}function Co(e,i){if(e&1&&$(0,"p-badge",10),e&2){let t=F();c("value",t.badge)("severity",t.badgeSeverity)("pt",t.ptm("pcBadge"))}}var Do={root:({instance:e})=>["p-button p-component",{"p-button-icon-only":(e.icon||e.buttonProps?.icon||e.iconTemplate||e._iconTemplate||e.loadingIcon||e.loadingIconTemplate||e._loadingIconTemplate)&&!e.label&&!e.buttonProps?.label,"p-button-vertical":(e.iconPos==="top"||e.iconPos==="bottom")&&e.label,"p-button-loading":e.loading||e.buttonProps?.loading,"p-button-link":e.link||e.buttonProps?.link,[`p-button-${e.severity||e.buttonProps?.severity}`]:e.severity||e.buttonProps?.severity,"p-button-raised":e.raised||e.buttonProps?.raised,"p-button-rounded":e.rounded||e.buttonProps?.rounded,"p-button-text":e.text||e.variant==="text"||e.buttonProps?.text||e.buttonProps?.variant==="text","p-button-outlined":e.outlined||e.variant==="outlined"||e.buttonProps?.outlined||e.buttonProps?.variant==="outlined","p-button-sm":e.size==="small"||e.buttonProps?.size==="small","p-button-lg":e.size==="large"||e.buttonProps?.size==="large","p-button-plain":e.plain||e.buttonProps?.plain,"p-button-fluid":e.hasFluid}],loadingIcon:"p-button-loading-icon",icon:({instance:e})=>["p-button-icon",{[`p-button-icon-${e.iconPos||e.buttonProps?.iconPos}`]:e.label||e.buttonProps?.label,"p-button-icon-left":(e.iconPos==="left"||e.buttonProps?.iconPos==="left")&&e.label||e.buttonProps?.label,"p-button-icon-right":(e.iconPos==="right"||e.buttonProps?.iconPos==="right")&&e.label||e.buttonProps?.label},e.icon,e.buttonProps?.icon],spinnerIcon:({instance:e})=>Object.entries(e.iconClass()).filter(([,i])=>!!i).reduce((i,[t])=>i+` ${t}`,"p-button-loading-icon"),label:"p-button-label"},Dt=(()=>{class e extends O{name="button";style=Qn;classes=Do;static \u0275fac=(()=>{let t;return function(o){return(t||(t=h(e)))(o||e)}})();static \u0275prov=I({token:e,factory:e.\u0275fac})}return e})();var Zn=new b("BUTTON_INSTANCE"),Xn=new b("BUTTON_DIRECTIVE_INSTANCE"),Yn=new b("BUTTON_LABEL_INSTANCE"),Kn=new b("BUTTON_ICON_INSTANCE"),et={button:"p-button",component:"p-component",iconOnly:"p-button-icon-only",disabled:"p-disabled",loading:"p-button-loading",labelOnly:"p-button-loading-label-only"},Jn=(()=>{class e extends V{ptButtonLabel=j();$pcButtonLabel=l(Yn,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=l(d,{self:!0});constructor(){super(),rt(()=>{this.ptButtonLabel()&&this.directivePT.set(this.ptButtonLabel())})}onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}static \u0275fac=function(n){return new(n||e)};static \u0275dir=v({type:e,selectors:[["","pButtonLabel",""]],hostVars:2,hostBindings:function(n,o){n&2&&ot("p-button-label",!0)},inputs:{ptButtonLabel:[1,"ptButtonLabel"]},features:[y([Dt,{provide:Yn,useExisting:e},{provide:N,useExisting:e}]),A([d]),p]})}return e})(),ti=(()=>{class e extends V{ptButtonIcon=j();$pcButtonIcon=l(Kn,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=l(d,{self:!0});constructor(){super(),rt(()=>{this.ptButtonIcon()&&this.directivePT.set(this.ptButtonIcon())})}onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}static \u0275fac=function(n){return new(n||e)};static \u0275dir=v({type:e,selectors:[["","pButtonIcon",""]],hostVars:2,hostBindings:function(n,o){n&2&&ot("p-button-icon",!0)},inputs:{ptButtonIcon:[1,"ptButtonIcon"]},features:[y([Dt,{provide:Kn,useExisting:e},{provide:N,useExisting:e}]),A([d]),p]})}return e})(),Ps=(()=>{class e extends V{$pcButtonDirective=l(Xn,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=l(d,{self:!0});_componentStyle=l(Dt);ptButtonDirective=j();hostName="";onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("root"))}constructor(){super(),rt(()=>{this.ptButtonDirective()&&this.directivePT.set(this.ptButtonDirective())})}text=!1;plain=!1;raised=!1;size;outlined=!1;rounded=!1;iconPos="left";loadingIcon;fluid=j(void 0,{transform:m});iconSignal=se(ti);labelSignal=se(Jn);isIconOnly=J(()=>!!(!this.labelSignal()&&this.iconSignal()));_label;_icon;_loading=!1;_severity;_buttonProps;initialized;get htmlElement(){return this.el.nativeElement}_internalClasses=Object.values(et);pcFluid=l(Se,{optional:!0,host:!0,skipSelf:!0});isTextButton=J(()=>!!(!this.iconSignal()&&this.labelSignal()&&this.text));get label(){return this._label}set label(t){this._label=t,this.initialized&&(this.updateLabel(),this.updateIcon(),this.setStyleClass())}get icon(){return this._icon}set icon(t){this._icon=t,this.initialized&&(this.updateIcon(),this.setStyleClass())}get loading(){return this._loading}set loading(t){this._loading=t,this.initialized&&(this.updateIcon(),this.setStyleClass())}get buttonProps(){return this._buttonProps}set buttonProps(t){this._buttonProps=t,t&&typeof t=="object"&&Object.entries(t).forEach(([n,o])=>this[`_${n}`]!==o&&(this[`_${n}`]=o))}get severity(){return this._severity}set severity(t){this._severity=t,this.initialized&&this.setStyleClass()}spinnerIcon=`<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="p-icon-spin">
        <g clip-path="url(#clip0_417_21408)">
            <path
                d="M6.99701 14C5.85441 13.999 4.72939 13.7186 3.72012 13.1832C2.71084 12.6478 1.84795 11.8737 1.20673 10.9284C0.565504 9.98305 0.165424 8.89526 0.041387 7.75989C-0.0826496 6.62453 0.073125 5.47607 0.495122 4.4147C0.917119 3.35333 1.59252 2.4113 2.46241 1.67077C3.33229 0.930247 4.37024 0.413729 5.4857 0.166275C6.60117 -0.0811796 7.76026 -0.0520535 8.86188 0.251112C9.9635 0.554278 10.9742 1.12227 11.8057 1.90555C11.915 2.01493 11.9764 2.16319 11.9764 2.31778C11.9764 2.47236 11.915 2.62062 11.8057 2.73C11.7521 2.78503 11.688 2.82877 11.6171 2.85864C11.5463 2.8885 11.4702 2.90389 11.3933 2.90389C11.3165 2.90389 11.2404 2.8885 11.1695 2.85864C11.0987 2.82877 11.0346 2.78503 10.9809 2.73C9.9998 1.81273 8.73246 1.26138 7.39226 1.16876C6.05206 1.07615 4.72086 1.44794 3.62279 2.22152C2.52471 2.99511 1.72683 4.12325 1.36345 5.41602C1.00008 6.70879 1.09342 8.08723 1.62775 9.31926C2.16209 10.5513 3.10478 11.5617 4.29713 12.1803C5.48947 12.7989 6.85865 12.988 8.17414 12.7157C9.48963 12.4435 10.6711 11.7264 11.5196 10.6854C12.3681 9.64432 12.8319 8.34282 12.8328 7C12.8328 6.84529 12.8943 6.69692 13.0038 6.58752C13.1132 6.47812 13.2616 6.41667 13.4164 6.41667C13.5712 6.41667 13.7196 6.47812 13.8291 6.58752C13.9385 6.69692 14 6.84529 14 7C14 8.85651 13.2622 10.637 11.9489 11.9497C10.6356 13.2625 8.85432 14 6.99701 14Z"
                fill="currentColor"
            />
        </g>
        <defs>
            <clipPath id="clip0_417_21408">
                <rect width="14" height="14" fill="white" />
            </clipPath>
        </defs>
    </svg>`;onAfterViewInit(){St(this.htmlElement,this.getStyleClass().join(" ")),mt(this.platformId)&&(this.createIcon(),this.createLabel(),this.initialized=!0)}getStyleClass(){let t=[et.button,et.component];return this.icon&&!this.label&&xt(this.htmlElement.textContent)&&t.push(et.iconOnly),this.loading&&(t.push(et.disabled,et.loading),!this.icon&&this.label&&t.push(et.labelOnly),this.icon&&!this.label&&!xt(this.htmlElement.textContent)&&t.push(et.iconOnly)),this.text&&t.push("p-button-text"),this.severity&&t.push(`p-button-${this.severity}`),this.plain&&t.push("p-button-plain"),this.raised&&t.push("p-button-raised"),this.size&&t.push(`p-button-${this.size}`),this.outlined&&t.push("p-button-outlined"),this.rounded&&t.push("p-button-rounded"),this.size==="small"&&t.push("p-button-sm"),this.size==="large"&&t.push("p-button-lg"),this.hasFluid&&t.push("p-button-fluid"),t}get hasFluid(){return this.fluid()??!!this.pcFluid}setStyleClass(){let t=this.getStyleClass();this.removeExistingSeverityClass(),this.htmlElement.classList.remove(...this._internalClasses),this.htmlElement.classList.add(...t)}removeExistingSeverityClass(){let t=["success","info","warn","danger","help","primary","secondary","contrast"],n=this.htmlElement.classList.value.split(" ").find(o=>t.some(r=>o===`p-button-${r}`));n&&this.htmlElement.classList.remove(n)}createLabel(){if(!yt(this.htmlElement,".p-button-label")&&this.label){let n=Lt("span",{class:this.cx("label"),"p-bind":this.ptm("label"),"aria-hidden":this.icon&&!this.label?"true":null});n.appendChild(this.document.createTextNode(this.label)),this.htmlElement.appendChild(n)}}createIcon(){if(!yt(this.htmlElement,".p-button-icon")&&(this.icon||this.loading)){let n=this.label?"p-button-icon-"+this.iconPos:null,o=this.getIconClass(),r=Lt("span",{class:this.cn(this.cx("icon"),n,o),"aria-hidden":"true","p-bind":this.ptm("icon")});!this.loadingIcon&&this.loading&&(r.innerHTML=this.spinnerIcon),this.htmlElement.insertBefore(r,this.htmlElement.firstChild)}}updateLabel(){let t=yt(this.htmlElement,".p-button-label");if(!this.label){t&&this.htmlElement.removeChild(t);return}t?t.textContent=this.label:this.createLabel()}updateIcon(){let t=yt(this.htmlElement,".p-button-icon"),n=yt(this.htmlElement,".p-button-label");this.loading&&!this.loadingIcon&&t?t.innerHTML=this.spinnerIcon:t?.innerHTML&&(t.innerHTML=""),t?this.iconPos?t.className="p-button-icon "+(n?"p-button-icon-"+this.iconPos:"")+" "+this.getIconClass():t.className="p-button-icon "+this.getIconClass():this.createIcon()}getIconClass(){return this.loading?"p-button-loading-icon "+(this.loadingIcon?this.loadingIcon:"p-icon"):this.icon||"p-hidden"}onDestroy(){this.initialized=!1}static \u0275fac=function(n){return new(n||e)};static \u0275dir=v({type:e,selectors:[["","pButton",""]],contentQueries:function(n,o,r){n&1&&(oe(r,o.iconSignal,ti,5),oe(r,o.labelSignal,Jn,5)),n&2&&Re(2)},hostVars:4,hostBindings:function(n,o){n&2&&ot("p-button-icon-only",o.isIconOnly())("p-button-text",o.isTextButton())},inputs:{ptButtonDirective:[1,"ptButtonDirective"],hostName:"hostName",text:[2,"text","text",m],plain:[2,"plain","plain",m],raised:[2,"raised","raised",m],size:"size",outlined:[2,"outlined","outlined",m],rounded:[2,"rounded","rounded",m],iconPos:"iconPos",loadingIcon:"loadingIcon",fluid:[1,"fluid"],label:"label",icon:"icon",loading:"loading",buttonProps:"buttonProps",severity:"severity"},features:[y([Dt,{provide:Xn,useExisting:e},{provide:N,useExisting:e}]),A([d]),p]})}return e})(),wo=(()=>{class e extends V{hostName="";$pcButton=l(Zn,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=l(d,{self:!0});_componentStyle=l(Dt);onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("host"))}type="button";badge;disabled;raised=!1;rounded=!1;text=!1;plain=!1;outlined=!1;link=!1;tabindex;size;variant;style;styleClass;badgeClass;badgeSeverity="secondary";ariaLabel;autofocus;iconPos="left";icon;label;loading=!1;loadingIcon;severity;buttonProps;fluid=j(void 0,{transform:m});onClick=new W;onFocus=new W;onBlur=new W;contentTemplate;loadingIconTemplate;iconTemplate;templates;pcFluid=l(Se,{optional:!0,host:!0,skipSelf:!0});get hasFluid(){return this.fluid()??!!this.pcFluid}_contentTemplate;_iconTemplate;_loadingIconTemplate;onAfterContentInit(){this.templates?.forEach(t=>{switch(t.getType()){case"content":this._contentTemplate=t.template;break;case"icon":this._iconTemplate=t.template;break;case"loadingicon":this._loadingIconTemplate=t.template;break;default:this._contentTemplate=t.template;break}})}spinnerIconClass(){return Object.entries(this.iconClass()).filter(([,t])=>!!t).reduce((t,[n])=>t+` ${n}`,"p-button-loading-icon")}iconClass(){return{[`p-button-loading-icon pi-spin ${this.loadingIcon??""}`]:this.loading,"p-button-icon":!0,[this.icon]:!0,"p-button-icon-left":this.iconPos==="left"&&this.label,"p-button-icon-right":this.iconPos==="right"&&this.label,"p-button-icon-top":this.iconPos==="top"&&this.label,"p-button-icon-bottom":this.iconPos==="bottom"&&this.label}}static \u0275fac=(()=>{let t;return function(o){return(t||(t=h(e)))(o||e)}})();static \u0275cmp=B({type:e,selectors:[["p-button"]],contentQueries:function(n,o,r){if(n&1&&(Z(r,oo,5),Z(r,ro,5),Z(r,so,5),Z(r,Ht,4)),n&2){let s;X(s=Y())&&(o.contentTemplate=s.first),X(s=Y())&&(o.loadingIconTemplate=s.first),X(s=Y())&&(o.iconTemplate=s.first),X(s=Y())&&(o.templates=s)}},inputs:{hostName:"hostName",type:"type",badge:"badge",disabled:[2,"disabled","disabled",m],raised:[2,"raised","raised",m],rounded:[2,"rounded","rounded",m],text:[2,"text","text",m],plain:[2,"plain","plain",m],outlined:[2,"outlined","outlined",m],link:[2,"link","link",m],tabindex:[2,"tabindex","tabindex",He],size:"size",variant:"variant",style:"style",styleClass:"styleClass",badgeClass:"badgeClass",badgeSeverity:"badgeSeverity",ariaLabel:"ariaLabel",autofocus:[2,"autofocus","autofocus",m],iconPos:"iconPos",icon:"icon",label:"label",loading:[2,"loading","loading",m],loadingIcon:"loadingIcon",severity:"severity",buttonProps:"buttonProps",fluid:[1,"fluid"]},outputs:{onClick:"onClick",onFocus:"onFocus",onBlur:"onBlur"},features:[y([Dt,{provide:Zn,useExisting:e},{provide:N,useExisting:e}]),A([d]),p],ngContentSelectors:ao,decls:7,vars:14,consts:[["pRipple","",3,"click","focus","blur","ngStyle","disabled","pAutoFocus","pBind"],[4,"ngTemplateOutlet"],[4,"ngIf"],[3,"class","pBind",4,"ngIf"],[3,"value","severity","pt",4,"ngIf"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["data-p-icon","spinner",3,"class","pBind","spin",4,"ngIf"],[3,"pBind"],["data-p-icon","spinner",3,"pBind","spin"],[3,"ngIf"],[3,"value","severity","pt"]],template:function(n,o){n&1&&(pt(),q(0,"button",0),Vt("click",function(s){return o.onClick.emit(s)})("focus",function(s){return o.onFocus.emit(s)})("blur",function(s){return o.onBlur.emit(s)}),ht(1),L(2,lo,1,0,"ng-container",1)(3,go,3,6,"ng-container",2)(4,vo,3,6,"ng-container",2)(5,_o,2,5,"span",3)(6,Co,1,3,"p-badge",4),Q()),n&2&&(_(o.cn(o.cx("root"),o.styleClass,o.buttonProps==null?null:o.buttonProps.styleClass)),c("ngStyle",o.style||(o.buttonProps==null?null:o.buttonProps.style))("disabled",o.disabled||o.loading||(o.buttonProps==null?null:o.buttonProps.disabled))("pAutoFocus",o.autofocus||(o.buttonProps==null?null:o.buttonProps.autofocus))("pBind",o.ptm("root")),R("type",o.type||(o.buttonProps==null?null:o.buttonProps.type))("aria-label",o.ariaLabel||(o.buttonProps==null?null:o.buttonProps.ariaLabel))("tabindex",o.tabindex||(o.buttonProps==null?null:o.buttonProps.tabindex)),g(2),c("ngTemplateOutlet",o.contentTemplate||o._contentTemplate),g(),c("ngIf",o.loading),g(),c("ngIf",!o.loading),g(),c("ngIf",!o.contentTemplate&&!o._contentTemplate&&o.label),g(),c("ngIf",!o.contentTemplate&&!o._contentTemplate&&o.badge))},dependencies:[k,Rt,jt,Ge,qn,Rn,Wn,Jt,Ve,C,d],encapsulation:2,changeDetection:0})}return e})(),ni=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=E({type:e});static \u0275inj=w({imports:[k,wo,C,C]})}return e})();var ii=`
    .p-tag {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: dt('tag.primary.background');
        color: dt('tag.primary.color');
        font-size: dt('tag.font.size');
        font-weight: dt('tag.font.weight');
        padding: dt('tag.padding');
        border-radius: dt('tag.border.radius');
        gap: dt('tag.gap');
    }

    .p-tag-icon {
        font-size: dt('tag.icon.size');
        width: dt('tag.icon.size');
        height: dt('tag.icon.size');
    }

    .p-tag-rounded {
        border-radius: dt('tag.rounded.border.radius');
    }

    .p-tag-success {
        background: dt('tag.success.background');
        color: dt('tag.success.color');
    }

    .p-tag-info {
        background: dt('tag.info.background');
        color: dt('tag.info.color');
    }

    .p-tag-warn {
        background: dt('tag.warn.background');
        color: dt('tag.warn.color');
    }

    .p-tag-danger {
        background: dt('tag.danger.background');
        color: dt('tag.danger.color');
    }

    .p-tag-secondary {
        background: dt('tag.secondary.background');
        color: dt('tag.secondary.color');
    }

    .p-tag-contrast {
        background: dt('tag.contrast.background');
        color: dt('tag.contrast.color');
    }
`;var Eo=["icon"],Vo=["*"];function So(e,i){if(e&1&&$(0,"span",4),e&2){let t=F(2);_(t.cx("icon")),c("ngClass",t.icon)("pBind",t.ptm("icon"))}}function xo(e,i){if(e&1&&(ct(0),L(1,So,1,4,"span",3),ut()),e&2){let t=F();g(),c("ngIf",t.icon)}}function Mo(e,i){}function Io(e,i){e&1&&L(0,Mo,0,0,"ng-template")}function Ao(e,i){if(e&1&&(q(0,"span",2),L(1,Io,1,0,null,5),Q()),e&2){let t=F();_(t.cx("icon")),c("pBind",t.ptm("icon")),g(),c("ngTemplateOutlet",t.iconTemplate||t._iconTemplate)}}var Fo={root:({instance:e})=>["p-tag p-component",{"p-tag-info":e.severity==="info","p-tag-success":e.severity==="success","p-tag-warn":e.severity==="warn","p-tag-danger":e.severity==="danger","p-tag-secondary":e.severity==="secondary","p-tag-contrast":e.severity==="contrast","p-tag-rounded":e.rounded}],icon:"p-tag-icon",label:"p-tag-label"},oi=(()=>{class e extends O{name="tag";style=ii;classes=Fo;static \u0275fac=(()=>{let t;return function(o){return(t||(t=h(e)))(o||e)}})();static \u0275prov=I({token:e,factory:e.\u0275fac})}return e})();var ri=new b("TAG_INSTANCE"),ko=(()=>{class e extends V{$pcTag=l(ri,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=l(d,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}styleClass;severity;value;icon;rounded;iconTemplate;templates;_iconTemplate;_componentStyle=l(oi);onAfterContentInit(){this.templates?.forEach(t=>{t.getType()==="icon"&&(this._iconTemplate=t.template)})}static \u0275fac=(()=>{let t;return function(o){return(t||(t=h(e)))(o||e)}})();static \u0275cmp=B({type:e,selectors:[["p-tag"]],contentQueries:function(n,o,r){if(n&1&&(Z(r,Eo,4),Z(r,Ht,4)),n&2){let s;X(s=Y())&&(o.iconTemplate=s.first),X(s=Y())&&(o.templates=s)}},hostVars:2,hostBindings:function(n,o){n&2&&_(o.cn(o.cx("root"),o.styleClass))},inputs:{styleClass:"styleClass",severity:"severity",value:"value",icon:"icon",rounded:[2,"rounded","rounded",m]},features:[y([oi,{provide:ri,useExisting:e},{provide:N,useExisting:e}]),A([d]),p],ngContentSelectors:Vo,decls:5,vars:6,consts:[[4,"ngIf"],[3,"class","pBind",4,"ngIf"],[3,"pBind"],[3,"class","ngClass","pBind",4,"ngIf"],[3,"ngClass","pBind"],[4,"ngTemplateOutlet"]],template:function(n,o){n&1&&(pt(),ht(0),L(1,xo,2,1,"ng-container",0)(2,Ao,2,4,"span",1),q(3,"span",2),ft(4),Q()),n&2&&(g(),c("ngIf",!o.iconTemplate&&!o._iconTemplate),g(),c("ngIf",o.iconTemplate||o._iconTemplate),g(),_(o.cx("label")),c("pBind",o.ptm("label")),g(),gt(o.value))},dependencies:[k,ze,Rt,jt,C,d],encapsulation:2,changeDetection:0})}return e})(),si=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=E({type:e});static \u0275inj=w({imports:[ko,C,C]})}return e})();var ai=`
    .p-progressspinner {
        position: relative;
        margin: 0 auto;
        width: 100px;
        height: 100px;
        display: inline-block;
    }

    .p-progressspinner::before {
        content: '';
        display: block;
        padding-top: 100%;
    }

    .p-progressspinner-spin {
        height: 100%;
        transform-origin: center center;
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        animation: p-progressspinner-rotate 2s linear infinite;
    }

    .p-progressspinner-circle {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: 0;
        stroke: dt('progressspinner.colorOne');
        animation:
            p-progressspinner-dash 1.5s ease-in-out infinite,
            p-progressspinner-color 6s ease-in-out infinite;
        stroke-linecap: round;
    }

    @keyframes p-progressspinner-rotate {
        100% {
            transform: rotate(360deg);
        }
    }
    @keyframes p-progressspinner-dash {
        0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -35px;
        }
        100% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -124px;
        }
    }
    @keyframes p-progressspinner-color {
        100%,
        0% {
            stroke: dt('progressspinner.color.one');
        }
        40% {
            stroke: dt('progressspinner.color.two');
        }
        66% {
            stroke: dt('progressspinner.color.three');
        }
        80%,
        90% {
            stroke: dt('progressspinner.color.four');
        }
    }
`;var No={root:()=>["p-progressspinner"],spin:"p-progressspinner-spin",circle:"p-progressspinner-circle"},li=(()=>{class e extends O{name="progressspinner";style=ai;classes=No;static \u0275fac=(()=>{let t;return function(o){return(t||(t=h(e)))(o||e)}})();static \u0275prov=I({token:e,factory:e.\u0275fac})}return e})();var di=new b("PROGRESSSPINNER_INSTANCE"),To=(()=>{class e extends V{$pcProgressSpinner=l(di,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=l(d,{self:!0});styleClass;strokeWidth="2";fill="none";animationDuration="2s";ariaLabel;onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}_componentStyle=l(li);static \u0275fac=(()=>{let t;return function(o){return(t||(t=h(e)))(o||e)}})();static \u0275cmp=B({type:e,selectors:[["p-progressSpinner"],["p-progress-spinner"],["p-progressspinner"]],hostVars:5,hostBindings:function(n,o){n&2&&(R("aria-label",o.ariaLabel)("role","progressbar")("aria-busy",!0),_(o.cn(o.cx("root"),o.styleClass)))},inputs:{styleClass:"styleClass",strokeWidth:"strokeWidth",fill:"fill",animationDuration:"animationDuration",ariaLabel:"ariaLabel"},features:[y([li,{provide:di,useExisting:e},{provide:N,useExisting:e}]),A([d]),p],decls:2,vars:10,consts:[["viewBox","25 25 50 50",3,"pBind"],["cx","50","cy","50","r","20","stroke-miterlimit","10",3,"pBind"]],template:function(n,o){n&1&&(lt(),q(0,"svg",0),$(1,"circle",1),Q()),n&2&&(_(o.cx("spin")),Ot("animation-duration",o.animationDuration),c("pBind",o.ptm("spin")),g(),_(o.cx("circle")),c("pBind",o.ptm("circle")),R("fill",o.fill)("stroke-width",o.strokeWidth))},dependencies:[k,C,d],encapsulation:2,changeDetection:0})}return e})(),ci=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=E({type:e});static \u0275inj=w({imports:[To,C,C]})}return e})();var ui=`
    .p-skeleton {
        display: block;
        overflow: hidden;
        background: dt('skeleton.background');
        border-radius: dt('skeleton.border.radius');
    }

    .p-skeleton::after {
        content: '';
        animation: p-skeleton-animation 1.2s infinite;
        height: 100%;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(-100%);
        z-index: 1;
        background: linear-gradient(90deg, rgba(255, 255, 255, 0), dt('skeleton.animation.background'), rgba(255, 255, 255, 0));
    }

    [dir='rtl'] .p-skeleton::after {
        animation-name: p-skeleton-animation-rtl;
    }

    .p-skeleton-circle {
        border-radius: 50%;
    }

    .p-skeleton-animation-none::after {
        animation: none;
    }

    @keyframes p-skeleton-animation {
        from {
            transform: translateX(-100%);
        }
        to {
            transform: translateX(100%);
        }
    }

    @keyframes p-skeleton-animation-rtl {
        from {
            transform: translateX(100%);
        }
        to {
            transform: translateX(-100%);
        }
    }
`;var Po={root:{position:"relative"}},Bo={root:({instance:e})=>["p-skeleton p-component",{"p-skeleton-circle":e.shape==="circle","p-skeleton-animation-none":e.animation==="none"}]},pi=(()=>{class e extends O{name="skeleton";style=ui;classes=Bo;inlineStyles=Po;static \u0275fac=(()=>{let t;return function(o){return(t||(t=h(e)))(o||e)}})();static \u0275prov=I({token:e,factory:e.\u0275fac})}return e})();var hi=new b("SKELETON_INSTANCE"),Oo=(()=>{class e extends V{$pcSkeleton=l(hi,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=l(d,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}styleClass;shape="rectangle";animation="wave";borderRadius;size;width="100%";height="1rem";_componentStyle=l(pi);get containerStyle(){let t=this._componentStyle?.inlineStyles.root,n;return this.size?n=P(M({},t),{width:this.size,height:this.size,borderRadius:this.borderRadius}):n=P(M({},t),{width:this.width,height:this.height,borderRadius:this.borderRadius}),n}static \u0275fac=(()=>{let t;return function(o){return(t||(t=h(e)))(o||e)}})();static \u0275cmp=B({type:e,selectors:[["p-skeleton"]],hostVars:5,hostBindings:function(n,o){n&2&&(R("aria-hidden",!0),je(o.containerStyle),_(o.cn(o.cx("root"),o.styleClass)))},inputs:{styleClass:"styleClass",shape:"shape",animation:"animation",borderRadius:"borderRadius",size:"size",width:"width",height:"height"},features:[y([pi,{provide:hi,useExisting:e},{provide:N,useExisting:e}]),A([d]),p],decls:0,vars:0,template:function(n,o){},dependencies:[k,C],encapsulation:2,changeDetection:0})}return e})(),fi=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=E({type:e});static \u0275inj=w({imports:[Oo,C,C]})}return e})();var Pa=(()=>{let i=class i{constructor(n,o,r){this.el=n,this.imageCache=o,this.apiConfig=r,this.src="",this.subscription=null,this.sources=[],this.currentIndex=-1,this.onNativeError=()=>{this.tryNextSource()},this.isElectronRuntime=typeof window<"u"&&!!window.electronAPI}ngOnChanges(){if(this.cancelPendingRequest(),this.el.nativeElement.removeEventListener("error",this.onNativeError),this.el.nativeElement.addEventListener("error",this.onNativeError),this.sources=this.normalizeSources(this.src),this.currentIndex=-1,this.sources.length===0){this.showPlaceholder();return}this.tryNextSource()}ngOnDestroy(){this.el.nativeElement.removeEventListener("error",this.onNativeError),this.cancelPendingRequest()}tryNextSource(){if(this.cancelPendingRequest(),this.currentIndex+=1,this.currentIndex>=this.sources.length){this.showPlaceholder();return}let n=this.sources[this.currentIndex];if(n.startsWith("http://")||n.startsWith("https://")){this.el.nativeElement.src=n,this.el.nativeElement.style.display="",this.hidePlaceholder();return}if(this.isLocalFilePath(n)||n.startsWith("file://")){this.el.nativeElement.src=this.toDesktopLocalUrl(n),this.el.nativeElement.style.display="",this.hidePlaceholder();return}let r=`${(this.apiConfig?.basePath??"").replace(/\/$/,"")}${n}`;this.subscription=this.imageCache.getObjectUrl(r).subscribe({next:s=>{this.el.nativeElement.src=s,this.el.nativeElement.style.display="",this.hidePlaceholder()},error:()=>{this.tryNextSource()}})}cancelPendingRequest(){this.subscription&&(this.subscription.unsubscribe(),this.subscription=null)}showPlaceholder(){this.el.nativeElement.style.display="none";let n=this.el.nativeElement.nextElementSibling;n&&(n.style.display="flex")}hidePlaceholder(){let n=this.el.nativeElement.nextElementSibling;n&&(n.style.display="none")}normalizeSources(n){return(Array.isArray(n)?n:[n]).map(r=>r?.trim()).filter(r=>!!r)}isLocalFilePath(n){return/^[A-Za-z]:[\\/]/.test(n)||n.startsWith("\\\\")}toDesktopLocalUrl(n){let o=this.normalizeLocalPath(n);return o?this.isElectronRuntime?`appimg://${encodeURIComponent(o)}`:this.toFileUrl(o):n}normalizeLocalPath(n){if(this.isLocalFilePath(n))return n;if(!n.startsWith("file://"))return null;try{let o=new URL(n),r=decodeURIComponent(o.pathname);return/^\/[A-Za-z]:\//.test(r)?r.slice(1).replace(/\//g,"\\"):o.host?`\\\\${o.host}${r.replace(/\//g,"\\")}`:r}catch{return null}}toFileUrl(n){if(n.startsWith("file://"))return n;if(n.startsWith("\\\\")){let r=n.replace(/^\\\\/,"").replace(/\\/g,"/");return`file://${encodeURI(r)}`}let o=n.replace(/\\/g,"/");return`file:///${encodeURI(o)}`}};i.\u0275fac=function(o){return new(o||i)(f(it),f(nn),f(en,8))},i.\u0275dir=v({type:i,selectors:[["img","appSecureImage",""]],inputs:{src:[0,"appSecureImage","src"]},standalone:!1,features:[dt]});let e=i;return e})();var Za=(()=>{let i=class i{};i.\u0275fac=function(o){return new(o||i)},i.\u0275mod=E({type:i}),i.\u0275inj=w({imports:[k,Pn,Bn,$e,We,ni,si,Jt,ci,fi,tn]});let e=i;return e})();export{me as a,fn as b,on as c,at as d,rr as e,sr as f,Wi as g,lr as h,Ui as i,Qi as j,dr as k,Pn as l,Se as m,Ee as n,On as o,Rn as p,qn as q,Ps as r,wo as s,ko as t,Oo as u,Pa as v,Za as w};
