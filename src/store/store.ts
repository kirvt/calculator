import { State, Getter, Action, Mutation } from 'vuex-simple';

export class MyStore {
  @State()
  public currentInput: Array<string | number> = [0];

  @State()
  public processing: boolean = false;

  @Mutation()
  public setInput(val: Array<string | number>) {
    this.currentInput = val;
  }

  

  @Action()
  public async actionUpdateInput(val: string) {
    var newVal = this.currentInput.map((x) => x);
    var last = newVal[newVal.length - 1]

    if (this.is_numeric(val)) {
      if (typeof last === "number") {
        var numval = Number(last.toString() + val);
        newVal[newVal.length - 1] = numval
      }
      else {
        newVal.push(Number(val))
      }
    }
    else {
      if (val === '=') {
        if (this.is_numeric(this.result)) {
          this.processing = true;
          newVal = [Number(this.result)];
          await this.Calc().then(r => { this.setInput(newVal); this.processing = false });
        }
      }
      else if (val === 'C') {
        newVal = [0]
      }
      else if (typeof last === "number") {
        newVal.push(val)
      }
      else if (last !== val) {
        newVal[newVal.length - 1] = val
      }
    }
    this.setInput(newVal);
  }

  @Getter()
  public get result(): string {
    var vals = this.currentInput;
    if (vals.length > 2) {
      var res = 0;
      var plus = true;

      for (var i = 0; i < vals.length; i++) {
        if (typeof vals[i] === "number") {
          if (plus) {
            res += Number(vals[i]);
          }
          else {
            res -= Number(vals[i]);
          }
        }
        else {
          plus = vals[i] === '+'
        }
      }

      return res.toString();
    }
    return '';
  }

  private async Calc() {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 2000)
    })
  }

  private is_numeric(str: string | number): boolean {
    return /^\d+$/.test(str.toString());
  }
}