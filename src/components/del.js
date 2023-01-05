this.passing = "";
        console.log("selected data by filter", this.selected);
        for (let a in this.selected) {
          console.log("aya", this.filterPassing);
          this.filterPassing.push(this.selected[a].filter_code);
          for (let i of this.filterPassing) {
            for (let j of this.filterPassing) {
              if (this.filterPassing[i] == this.filterPassing[j]) {
                this.filterPassing.pop(j);
              }
            }
            // if (this.uniqueArray.indexOf(i) === -1) {
            //   this.uniqueArray.push(i);
            // }
          }
          console.log(
            "this is unique Array for filter passing",
            this.filterPassing
          );
          // console.log("before concat", this.filterPassing);
          this.passing = this.passing.concat(this.filterPassing[a], ",");
          console.log("after Concat", this.passing);
          // console.log(this.selected[a].filter_code);
        }