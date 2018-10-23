let input = document.querySelector("#textinput");
let lastText = "";
let debouncer = new Debouncer(input);

function Debouncer(input) {
  this.debounceTime = 3;
  this.value = "";
  this.onSearch = false;
  this.interval = null;
  this.unblockInterval = null;

  this.unblock = () => {
    console.log("Search ended!");
    clearInterval(this.interval);
    clearInterval(this.unblockInterval);
    this.onSearch = false;
    this.interval = null;
    this.unblockInterval = null;
    this.debounceTime = 3;
  };

  this.subtractDebounceTime = () => {
    if (this.debounceTime == 0) {
      console.log("Search ongoing...");
      this.onSearch == true;
      if (this.unblockInterval == null) {
        this.unblockInterval = setInterval(this.unblock, 5000);
      }
    } else {
      console.log(`${this.debounceTime} seconds to fire search...`);
      console.log(`Value to search: ${this.value}`);
      this.debounceTime--;
    }
  };

  this.canExecute = () => !this.onSearch && this.debounceTime > 0;
  this.execute = value => {
    this.value = value;
    if (this.interval == null) {
      this.interval = setInterval(this.subtractDebounceTime, 1000);
    }
  };
  input.oninput = e => {
    if (this.canExecute()) {
      this.execute(e.target.value);
    } else {
      console.log(
        "Your search is being processed. Please wait until it has completed."
      );
    }
  };
}
