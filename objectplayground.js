// http://www.objectplayground.com/

'use strict';


// The constructor way of doing things...
function Person() {

	this.name = '';
	this.parts = {
		head: true,
		arms: 2,
		legs: 2
	};

}
Person.prototype.get = function () {
		return this.parts;
	};

var Bob = new Person();
Bob.name = 'Bob';
Bob.parts['arms'] = 1;





var answer = {

	val: 42,
	get: function fn1() {
		return this.val;
	}

};

var firmAnswer = Object.create(answer);
firmAnswer.get = function fn2() {
	return answer.get.call(this) + '!!';
};

firmAnswer.val = 3.1234;
firmAnswer.get();


// ! 5. Classes & Instantiation
var AnswerPrototype = {
	get: function fn1() {
		return this.val;
	}
};

var FirmAnswerPrototype = Object.create(AnswerPrototype);
FirmAnswerPrototype.get = function fn2() {
	return AnswerPrototype.get.call(this) + '!!';
};

// instances
var lifeAnswer = Object.create(AnswerPrototype);
lifeAnswer.val = 42;
lifeAnswer.get();

var dessertAnswer = Object.create(AnswerPrototype);
dessertAnswer.val = 3.14159;
dessertAnswer.get();

var luckyAnswer = Object.create(FirmAnswerPrototype);
luckyAnswer.val = 7;
luckyAnswer.get();

var magicAnswer = Object.create(FirmAnswerPrototype);
magicAnswer.val = 3;
magicAnswer.get();




// I am the base girl object.
var girl = {
	name: "",
	traits: {}
};


// -------------------------------------------------- //
// -------------------------------------------------- //
// -------------------------------------------------- //
// -------------------------------------------------- //


// Create a girl instance.
var sarah = Object.create( girl );

// Set sarah's properties.
sarah.name = "Sarah";
sarah.traits.age = 30;
sarah.traits.weight = 125;


// Create a girl instance.
var tricia = Object.create( girl );

// Set tricia's properites.
tricia.name = "Tricia";
tricia.traits.age = 32;
tricia.traits.weight = 140;


// Log the girls' traits.
console.log( "Sarah:", sarah.traits );
console.log( "Tricia:", tricia.traits );