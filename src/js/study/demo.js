let obj = {
  value: 0,
  [Symbol.toPrimitive]() {
    this.value++;
    console.log(this.value);
    return this.value;
  },
  valueOf() {
    return 6;
  },
  toString() {
    return 7;
  }
};

console.log(obj == 1 && obj == 2);
