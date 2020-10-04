import { Component, Vue } from 'vue-property-decorator';
import Keyboard from './components/keyboard/Keyboard';
import Display from './components/display/Display';

import { useStore } from 'vuex-simple';
import { MyStore } from '@/store/store';

import './App.css'

@Component
export default class App extends Vue {
  public store: MyStore = useStore(this.$store);

  windowHeight: number = window.innerHeight;

  get wHeight(): string {
    return "height:" + this.windowHeight + "px";
  }

  mounted() {
    window.addEventListener("resize", () => {
      this.windowHeight = window.innerHeight;
    })
  }


  get topRow(): string {
    var inp = this.store.currentInput.join('');
    if (inp.length === 0) return '0';
    if (inp.length > 12) inp = inp.slice(inp.length - 12);
    return inp;
  }

  get bttmRow(): string {
    var res = this.store.result;
    var strRes = res ? '=' + res.toString() : '';
    if (strRes.length > 12) strRes = strRes.slice(strRes.length - 12);
    return strRes;
  }

  render() {
    return (
      <div id="app" style={this.wHeight}>
        <div class="container">
          <Display topRow={this.topRow} bttmRow={this.bttmRow} />
          <Keyboard />
        </div>
      </div>
    )
  }
}
