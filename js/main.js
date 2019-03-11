$(function () {
  //initializing of all views including necessary information about the DOM-Tree
  const model = new lib.ClockModel();
  const logView = new lib.LogView(model);
  const digitalView = new lib.DigitalView(model, $('.digitalViewContent'), "12h_24h");
  const timeZoneView = new lib.TimeZoneView(model, $('.displayTimeZoneOffset'), $(".increaseTimeZone"), $(".decreaseTimeZone"));
  const analogClockView = new lib.AnalogClockView(model, $('.secDiv'), $('.minDiv'), $('.houDiv'));
});