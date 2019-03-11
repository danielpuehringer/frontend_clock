//Author: Daniel Puehringer, 24.3.2018
lib = window.lib || {};

(function () {
  class ClockModel {
    constructor() {
      this.date = null;
      this._timezoneOffset = 0;
      this._updateTime();
      setInterval(this._updateTime.bind(this), 1000);//this method gets called every second once
    }

    get timezoneOffset() {
      return this._timezoneOffset;
    }

    set timezoneOffset(value){
      if(this._timezoneOffset == undefined){
        return;
      }
      if((this._timezoneOffset > 11)&&(value > 0)){
        return;
      }
      if((this._timezoneOffset < -11)&&(value < 0)){
          return;
      }

      this._timezoneOffset = (this._timezoneOffset + value);
      $(this).trigger('change');
    }

    get hours() {
        return (this.date.getUTCHours() + this._timezoneOffset)%24;
    }

    get minutes() {
        return this.date.getUTCMinutes();
    }

    get seconds() {
      return this.date.getUTCSeconds();
    }

    // ----- private methods -----
    _updateTime() {
      this.date = new Date();//getting the current system time
      $(this).trigger('change');//this method triggers the views so that the views can change
    }
  }

  lib.ClockModel = ClockModel;
}());