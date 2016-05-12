describe("A test to see if the correct conversions to pennies occur", function() {

	it("the input can have no units and is passed in as a number", function() {
	  expect( CoinCount.convertToPennies(40) ).toEqual(40);
	});

	it("the input can have no units is passed in as a string", function() {
	  expect( CoinCount.convertToPennies("1") ).toEqual(1);
	});

	it("the input can have no units and is passed in as a number", function() {
	  expect( CoinCount.convertToPennies(432) ).toEqual(432);
	});

	it("the input can be defined in pennies with the minor unit specifed", function() {
	  expect( CoinCount.convertToPennies("213p") ).toEqual(213);
	});

	it("the input can be specified in pounds with pennies with major and minor units specifed", function() {
	  expect( CoinCount.convertToPennies("£16.23p") ).toEqual(1623);
	});

	it("the input can be specified in pounds with the major unit specifed", function() {
	  expect( CoinCount.convertToPennies("£14") ).toEqual(1400);
	});

	it("the input can be specified in pounds with pennies with just the major unit specifed", function() {
	  expect( CoinCount.convertToPennies("£54.04") ).toEqual(5404);
	});

	it("the input can be specified in pounds with pennies and no units specified", function() {
	  expect( CoinCount.convertToPennies("54.04") ).toEqual(5404);
	});

	it("the input can be specified in pounds with recurring pennies with just the major unit specifed", function() {
	  expect( CoinCount.convertToPennies("£23.33333") ).toEqual(2333);
	});

	it("the input can be specified in pounds with leading zeros and no major unit specified.", function() {
	  expect( CoinCount.convertToPennies("001.41p") ).toEqual(141);
	});

});

describe("A test to see if the correct change is given when supplied a value", function() {
	
	it("the input can have no units and is passed in as a number", function() {
	  expect( CoinCount.giveChange(40) ).toEqual(["20p","20p"]);
	});

	it("the input can have no units is passed in as a string", function() {
	  expect( CoinCount.giveChange("40") ).toEqual(["20p","20p"]);
	});

	it("the input can have no units and is passed in as a number", function() {
	  expect( CoinCount.giveChange(432) ).toEqual(["£2","£2","20p","10p","2p"]);
	});

	it("the input can be defined in pennies with the minor unit specifed", function() {
	  expect( CoinCount.giveChange("213p") ).toEqual(["£2","10p","2p","1p"]);
	});

	it("the input can be specified in pounds with pennies with major and minor units specifed", function() {
	  expect( CoinCount.giveChange("£16.23p") ).toEqual(["£2","£2","£2","£2","£2","£2","£2","£2","20p","2p","1p"]);
	});

	it("the input can be specified in pounds with just the major unit specifed", function() {
	  expect( CoinCount.giveChange("£14") ).toEqual(["£2","£2","£2","£2","£2","£2","£2"]);
	});

	it("the input can be specified in pounds with pennies with just the major unit specifed", function() {
	  expect( CoinCount.giveChange("£54.04") ).toEqual(["£2","£2","£2","£2","£2","£2","£2","£2","£2","£2","£2","£2","£2","£2","£2","£2","£2","£2","£2","£2","£2","£2","£2","£2","£2","£2","£2","2p","2p"]);
	});

	it("the input can be specified in pounds with pennies and no units specified", function() {
	  expect( CoinCount.giveChange("54.04") ).toEqual(["£2","£2","£2","£2","£2","£2","£2","£2","£2","£2","£2","£2","£2","£2","£2","£2","£2","£2","£2","£2","£2","£2","£2","£2","£2","£2","£2","2p","2p"]);
	});

	it("the input can be specified in pounds with recurring pennies with just the major unit specifed", function() {
	  expect( CoinCount.giveChange("£23.33333") ).toEqual(["£2","£2","£2","£2","£2","£2","£2","£2","£2","£2","£2","£1","20p","10p","2p","1p"]);
	});

	it("the input can be specified in pounds with leading zeros and no major unit specified.", function() {
	  expect( CoinCount.giveChange("001.41p") ).toEqual(["£1","20p","20p","1p"]);
	});

});

describe("A test to see if incorrect values inputted are handled correctly", function() {

	it("Negative numbers should not be allowed, passed in as a string", function() {
	  expect( CoinCount.giveChange("-13") ).toBe(false);
	});

	it("Negative numbers should not be allowed, passed in as a number", function() {
	  expect( CoinCount.giveChange(-13) ).toBe(false);
	});

	it("Negative numbers should not be allowed, passed in as a string with minor unit", function() {
	  expect( CoinCount.giveChange("-13p") ).toBe(false);
	});

	it("Negative numbers should not be allowed, passed in as a string with major minor units", function() {
	  expect( CoinCount.giveChange("-£13.40p") ).toBe(false);
	});

	it("the input should not be allowed to have an invalid character", function() {
	  expect( CoinCount.giveChange("13x") ).toBe(false);
	});

	it("the input should not allow valid characters to be in the wrong position", function() {
	  expect( CoinCount.giveChange("13p.02") ).toBe(false);
	});

	it("the input should not allow missing values", function() {
	  expect( CoinCount.giveChange("£p") ).toBe(false);
	});

	it("the input cannot have a decimal point without specifying the left hand value", function() {
	  expect( CoinCount.giveChange("£.40p") ).toBe(false);
	});

	it("Other currencies should not be supported", function() {
	  expect( CoinCount.giveChange("$45") ).toBe(false);
	});

});