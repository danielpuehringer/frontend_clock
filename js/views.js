//Author: Daniel Puehringer, 24.3.2018
lib = window.lib || {};

(function () {
  class LogView {//this view prints out the time in the console
    constructor(model) {
      this.model = model;
      $(model).on('change', this.render.bind(this));
    }

    render() {//prints the time into the console
      console.log("LogView: "  + this.model.hours + this.model.minutes + this.model.seconds);
    }
  }

  class DigitalView {//prints the time in digital form underneath the clock
    constructor(model, $elem, $inputField) {
      this.model = model;
      this.$elem = $elem;
      this.$inputField = $inputField;
      $(model).on('change', this.render.bind(this));
    }

    render() {
      let h = this.model.hours;
      let m = this.model.minutes;
      let s = this.model.seconds;
      let am_pm = 'am';

      let is12hSystem = $("input[name='"+this.$inputField+"']:checked").val() != undefined;

      if(is12hSystem){
          if((h > 12)){//jumping between AM and PM
              h = h - 12;
              am_pm = ' pm';
          }else{
              am_pm = ' am';
          }
      }else{
        am_pm = '';
      }

      if(h < 10){
          h = "0" + h;
      }

      if(m < 10){
          m = "0" + m;
      }
      if(s < 10){
        s = "0" + s;
      }
      this.$elem.text(h + ":" + m + ":"+ s + am_pm);//the time gets displayed at certain element in DOM-tree
    }
  }

  class TimeZoneView{//shows current time zone(default: gmt) and changes the time zone (-12/+12 maximum change)
    constructor(model, $elem, $plus, $minus){
        this.model = model;
        this.$elem = $elem;
        this.$plus = $plus;
        this.$minus = $minus;
        $(model).on('change', this.render.bind(this));
        this.clickHandlers();//clickhandlers for interactive buttons
    }

    render(){
        let timeZoneOffset = this.model.timezoneOffset;

        if(this.model.timezoneOffset == 12){
          this.$plus.attr('disabled', 'disabled');
        }else{
          this.$plus.removeAttr('disabled');
        }

        if(this.model.timezoneOffset == -12){
            this.$minus.attr('disabled', 'disabled');
        }else{
            this.$minus.removeAttr('disabled');
        }
        if(timeZoneOffset > 0){
        timeZoneOffset = "+" + timeZoneOffset;
        }
        if(this.model.timezoneOffset != 0){
          this.$elem.text(" " + timeZoneOffset);
        }else{
          this.$elem.text("");
        }
    }

    clickHandlers(){
        $('.increaseTimeZone').on('click', () =>{
            this.model.timezoneOffset = 1;//increasing time zone
        });

        $('.decreaseTimeZone').on('click', () =>{
            this.model.timezoneOffset = -1;//decrausing time zone
        });
    }
  }

  class AnalogClockView{//shows the current time via a analog clock
      constructor(model, $secDiv, $minDiv, $houDiv){
          this.model = model;
          this.$secDiv = $secDiv;
          this.$minDiv = $minDiv;
          this.$houDiv = $houDiv;
          $(model).on('change', this.render.bind(this));
      }

      render(){
          let h = this.model.hours;
          let m = this.model.minutes;
          let s = this.model.seconds;
          let degS = ((360/60)*s)+90;
          let degM = ((360/60)*m)+90;
          let degH = ((360/12)*(h%12))+90;

          $(this.$secDiv).css("transform", "rotate("+degS+"deg)");//rotates the pointers, so the clock shows the current time
          $(this.$minDiv).css("transform", "rotate("+degM+"deg)");
          $(this.$houDiv).css("transform", "rotate("+degH+"deg)");
      }
  }

  lib.LogView = LogView;
  lib.DigitalView = DigitalView;
  lib.TimeZoneView = TimeZoneView;
  lib.AnalogClockView = AnalogClockView;
}());