import {Context} from "cordis";
import {createApp, Ref, Plugin as VuePlugin, shallowRef} from "vue";
import {SlotManager} from "./slot";

export const CordisPlugin: VuePlugin<{context:Context}> = {
    install(app,options){
        let context_reference = shallowRef();
        app.provide('cordis/context',context_reference);
        options.context.plugin(SlotManager);
        options.context.inject(['slot'],(ctx:Context)=>{
            context_reference.value = ctx;
            ctx.on('dispose',()=>{
                context_reference.value = null
            });
        })
    }
}

export * from './vue-hooks';
export * from './helper';
export * from './slot'