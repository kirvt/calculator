import { Component, Prop, Vue } from 'vue-property-decorator';
import { VueComponent } from '@/shims-vue';

import { useStore } from 'vuex-simple';
import { MyStore } from '@/store/store';

import styles from './Keyboard.css?module'

interface Props {
    //dayTasks: DayTasks,
}

@Component
export default class Keyboard extends VueComponent<Props> {
    //@Prop()
    //dayTasks!: DayTasks;

    public store: MyStore = useStore(this.$store);



    digits = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
    operations = ['C', '-', '+', '='];

    inputProcessor(val: string) {
        if (!this.store.processing)
            this.store.actionUpdateInput(val);
    }

    render() {
        return (
            <div class={styles.calc_bttns}>
                <div class={styles.digits}>
                    {this.digits.map(d =>
                        <div
                            onclick={this.inputProcessor.bind(this, d.toString())}
                            class={[d === 0 ? styles.zero : '', this.store.processing ? styles.disabled : '']}>{d}
                        </div>)}
                </div>
                <div class={styles.operations}>
                    {this.operations.map(o =>
                        <div
                            onclick={this.inputProcessor.bind(this, o)}
                            class={this.store.processing ? styles.disabled : ''}
                        >{o}</div>)}
                </div>
            </div>
        )
    }
}