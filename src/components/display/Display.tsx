import { Component, Prop, Vue } from 'vue-property-decorator';
import { VueComponent } from '@/shims-vue';

import { useStore } from 'vuex-simple';
import { MyStore } from '@/store/store';

import styles from './Display.css?module'

interface Props {
    topRow: string, bttmRow: string;
}

@Component
export default class Display extends VueComponent<Props> {
    @Prop()
    topRow!: string;

    @Prop()
    bttmRow!: string;

    public store: MyStore = useStore(this.$store);


    render() {
        return (
            <div class={styles.calc_display}>
                <div class={styles.top_row}>{this.topRow}</div>
                <div class={styles.bottom_row}><span>&nbsp;</span>{this.bttmRow}</div>
            </div>
        )
    }
}