// ! The Definitive Guide to Object-Oriented JavaScript

/*
 * If you hang around the JavaScript world long enough, 
 * you'll come across a bunch of different recipes for object-oriented programming. 
 * The "standard way," so much as there can be a standard way, 
 * is the classical model. But why this? Why this... mess?
 * In this episode, we'll build it up from first principles.
 *
 * Source: http://www.objectplayground.com/
 *
 * TOC
 * 1. Object Fundamentals #t=1:18
 * 2. Functions & Methods #t=3:32
 * 3. Prototypal Inheritance #t=5:46
 * 4. Polymorphism & Method Overriding #t=9:13 
 * 5. Classes & Instantiation #t=12:11
 * 6. The Classical Model #t=16:07 
 * 7. instanceof #t=21:09 
 * 8. Future Directions #t=22:39 
 * 9. The Definitive Guide #t=23:25 
 * 10. Recommendations #t=24:56 
 */

'use strict';


// ! Intro
// ====================================

// The 'standard' way of OOP in JS
function MyClass() {
	//...
}

// The 'standard' recipe for inheritance
function MySubClass() {
	MyClass.call(this);
}
MySubClass.prototype = Object.create(MyClass.prototype);
MySubClass.prototype.constructor = MySubClass;

MySubClass.prototype.method = function () {
	MyClass.prototype.method.call(this);
	//...
}

// But why... 

// ! 1. Object Fundamentals #t=1:18
// ====================================

// Primitive Types
/*
	Undefined
	Null
	Boolean
	String
	Number
	Object
*/

// "Special Objects" - everything else you use in your programs
/*
	Function
	Array
	RegExp
*/


// Object is a set of key:value pairs. Akin to "dictionary" "hash" or "associative array" in other languages.
// can contain all the Primitive Types, as well as other objects
var myObject {
	a: undefined,
	b: null,
	c: true,
	d: 'foo',
	e: 3.14159,
	f: function bar() {/*...*/},
	g: { h: 'baz'}
};

// Primitives are passed by value
var number1, number2;

number1 = 3.14159;
number2 = number1;

number2 = 42; // number1 is unaffected, remains unchanged

// Objects are stored by reference
var object1, object 2;

object1 = {
	a: 3.14159
};

object2 = object1; // not copying the object, copying the reference

object2.a = 42; // object1.a will also be set to same value, b/c both variables point to the same object


// ! 2. Functions & Methods #t=3:32
// ====================================

// Functions are objects
// When you define a function, JS creates an object that has three Predefined properties: 
// - name
// - length, which is the number of arguments
// - prototype
//
// You can do all the things you do to objects 
// - assign properties, assign them to variables, and they are passed by reference
//
// 'this' keyword, refers to the object that called the function, not the function itself
// - or use .call() or .apply() or .bind() which are methods available on the Function.prototype


// ! 3. Prototypal Inheritance #t=5:46
// ====================================

// fundamental prototypal inheritance

// Avoid repetition - extend using Object.create()
// - define single object, and have other objects inherit or extend it

var parent = {
	get: function fn() {
		return this.val;
	},
	val: 42
};

var child = Object.create(parent);
child.val = 3.14159;

var grandchild = Object.create(child); // extend child with another child

parent.get(); // 42
child.get(); // 'this' is set to child, so while goes up the prototype chain to parent to find the function, val is the property set on child... returns 3.14159


// @TODO: pick up here: https://www.youtube.com/watch?v=PMfcsYzj-9M#t=552

// ! 4. Polymorphism & Method Overriding #t=9:13 
// ====================================

// ! 5. Classes & Instantiation #t=12:11
// ====================================

// ! 6. The Classical Model #t=16:07 
// ====================================

// ! 7. instanceof #t=21:09 
// ====================================

// ! 8. Future Directions #t=22:39 
// ====================================

// ! 9. The Definitive Guide #t=23:25 
// ====================================

// ! 10. Recommendations #t=24:56 
// ====================================

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
// ====================================

// Class - prototypes for methods 
var AnswerPrototype = {
	get: function fn1() {
		return this.val;
	}
};

// Subclass - extends Class
var FirmAnswerPrototype = Object.create(AnswerPrototype);
FirmAnswerPrototype.get = function fn2() {
	return AnswerPrototype.get.call(this) + '!!';
};

// Instances - for data
/* 
 * 1. create object by extending the prototype
 * 2. intialize its data
 */
var lifeAnswer = Object.create(AnswerPrototype); /* 1 */
lifeAnswer.val = 42; // 2
lifeAnswer.get(); // returns '42'

var dessertAnswer = Object.create(AnswerPrototype);
dessertAnswer.val = 3.14159;
dessertAnswer.get();

var luckyAnswer = Object.create(FirmAnswerPrototype);
luckyAnswer.val = 7;
luckyAnswer.get();

var magicAnswer = Object.create(FirmAnswerPrototype);
magicAnswer.val = 3;
magicAnswer.get();


/* 
 * Problems with the above method:
 * - Duplicated initialization logic.
 * - Violates encapsulation, since '.val' is accessed directly in each instance.
 *
 * Solution is to use an initialization function,
 * i.e. a common method that is used to initialize the objects
 *
 * Notice the property is now prepended with an underscore, i.e. "_val"
 * This is a common convention in JS to say the property is 'private'
 * IOW: you shouldn't access or change this property
 *
 * Following this convention, we can now change the 'prototype' / 'class'
 * e.g. AnswerPrototype without breaking any of the rest of the code
 * or needing to change the way subclasses or instances need to be programmed.
 */

// Class - prototypes for methods 
var AnswerPrototype = {
	constructor: function fn0(value) {
		this._val = value;
	},
	get: function fn1() {
		return this._val;
	}
};

// Subclass - extends Class
var FirmAnswerPrototype = Object.create(AnswerPrototype);
FirmAnswerPrototype.get = function fn2() {
	return AnswerPrototype.get.call(this) + '!!';
};

 // Instances - with 'constructor' initialization method
var lifeAnswer = Object.create(AnswerPrototype); 
lifeAnswer.constructor(42);
lifeAnswer.get(); // returns '42'

var dessertAnswer = Object.create(AnswerPrototype);
dessertAnswer.constructor(3.14159);
dessertAnswer.get();

var luckyAnswer = Object.create(FirmAnswerPrototype);
luckyAnswer.constructor(7);
luckyAnswer.get();

var magicAnswer = Object.create(FirmAnswerPrototype);
magicAnswer.constructor(3);
magicAnswer.get();



// ! 6. Classical Model
// ====================================

/*
 * Using JS built-in 'new' keyword
 * with built-in constructors and prototypes...
 *
 * This is the "classical model"
 * 1. Define the constructor first
 * 	JavaScript automatically creates an object (the prototype)
 *	to go along with that, with a constructor property that
 *	points back to our Answer function.
 *
 *	That prototype is our 'class' - fills the exact same purpose AnswerPrototype serves
 *	in previous examples.
 *
 * 2. Set our methods on the JS-provided prototype
 *
 * 3. Then instantiate by calling 'new' 
 *	which creates a child of our class,
 *	and initializes by calling the class constructor.
 */

// Define the 'Constructor' first
function Answer(value) {
	this._val = value;
}

// Set our methods on the JS-provided prototype
Answer.prototype.get = function fn1() {
	return this._val;
};

// Instantiate instances as new objects
var lifeAnswer = new Answer(42);
lifeAnswer.get(); // returns 42

var dessertAnswer = new Answer(3.14159);
dessertAnswer.get();


/*
 * The Classical Model gets a little more complicated
 * when you start dealing with subclasses
 *
 * ref: https://www.youtube.com/watch?feature=player_embedded&v=PMfcsYzj-9M#t=1169
 */

// Define the 'Constructor' first
function Answer(value) {
	this._val = value;
}

// Set our methods on the JS-provided prototype
Answer.prototype.get = function fn1() {
	return this._val;
};

// Instantiate an instance as new object
var lifeAnswer = new Answer(42);
lifeAnswer.get(); // returns 42

var dessertAnswer = new Answer(3.14159);
dessertAnswer.get();


// Subclass
function FirmAnswer(value) {
	Answer.call(this, value);
}
FirmAnswer.prototype = Object.create(Answer.prototype);
FirmAnswer.prototype.constructor = FirmAnswer;

FirmAnswer.prototype.get = function fn2() {
	return Answer.prototype.get.call(this) + "!!";
};

var luckyAnswer = new FirmAnswer(7);
luckyAnswer.get();

var magicAnswer = new FirmAnswer(3);
magicAnswer.get();


// side by side comparison of Prototypal Model and Classical Model
// https://www.youtube.com/watch?feature=player_embedded&v=PMfcsYzj-9M#t=1263





// ! 7. instanceof
// ====================================



// ! Recommendations
// ====================================

// https://www.youtube.com/watch?feature=player_embedded&v=PMfcsYzj-9M#t=1558







// ! Example from another source

// http://www.bennadel.com/blog/2184-Object-create-Improves-Constructor-Based-Inheritance-In-Javascript-It-Doesn-t-Replace-It.htm


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