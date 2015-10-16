# Node Continued

## Event-Driven IO
- Node is often used for "event-driven" IO operations.
- What this means is that as data flows to and from the application, events are triggered to invoke your app's logic.
- The event-driven approach allows for seamless real-time experiences due to the fact that your code is listening for and handling events instead of needing to be invoked some other way.
- We will look at a few ways that Node implements this event-driven model.

## Filesystem Access
- One powerful feature of Node is its ability to manipulate the filesystem.
- With few exceptions, file read and write operations are asynchronous, and thus provide a good deal of flexibility.

## Streams
- Many features of Node operate by a "stream", which is essentially a flowing outlet of data.
- The flow of this data can be detected by event listeners, the same as you would use for frontend event detection like clicks.
- Let's see an example that uses a very large file provided to you in this repository: [wordsEn.txt](wordsEn.txt).

```javascript
var stream = fs.createReadStream("./wordsEn.txt");

stream.on("data", function(data) {
	console.log("NEW DATA:");
	console.log(data);
});
```

- As you can see, the data comes back in chunks, and not all at once.
- This makes Node streams versatile for very large files and for data sources that will not be exhausted (think streaming).
- You will also notice that the data also comes back as a buffer, which is Node's way of working with binary data.
- There are a variety of events you can listen for on streams including `open`, `data`, `error`, `end`, and `close`.
- Let's try adding this:

```javascript
stream.on("end", function() {
	console.log("Stream has no more data");
});
```

## More on Buffers
- JavaScript readily supports unicode characters but does not work well with binary data.
- Buffers are places in memory that hold binary data.
- A buffer works like an array of bytes - small integers.
- Buffer is a class that is global, so the `require` keyword will not be necessary.
- Buffers are always fixed at a given size when created:

An empty buffer with 1024 bytes

```javascript
var buf = new Buffer(1024);
```

- You can also create a buffer from a string and pass a character encoding to it:

```javascript
var buf = new Buffer("This will be saved as binary data", "utf-8");
```

## Streams Lab
- For this lab we will be combining the principles we learned about creating a server with streams.
- We will not be using Express for this lab.
- Here are the steps you will follow:
	- Step 1: Create a read stream for the wordEn.txt file.
	- Step 2: Create a listener for the `open` event on the read stream. In the callback write a response header for the server response.
	- Step 3: Create a listener for the `data` event on the read stream. Write the data we receive back to the response.
	- Step 4: Create a listener for the `end` event on the stream. End the response on the callback, which will finish the data transmission to the user.

## Piping Data
- As data is read from a stream, Node provides us a method called `.pipe()` that allows us to send the incoming data somewhere else.
- The destination could be another stream (write stream for example), or even a server response.
- This can enable some pretty amazing things from streaming video to high-performance multiplayer games.
- Let's take a look at an example using the wordEn.txt document:

```javascript
var fs = require("fs");

var rd = fs.createReadStream("./wordsEn.txt");
var wr = fs.createWriteStream("./newWords.txt");

rd.pipe(wr);

wr.on("finish", function() {
	console.log("Write operation finished");
});
```

- Here we are setting up two streams. The read stream is dumping data into the write stream to effectively copy the file.

## Piping Lab
- In this lab we will be modifying the code we wrote to copy the files into a more generic approach including error handling.
- Here are the steps you will need to follow:
	- Step 1: Set up a function called copyFile that will be used as a generic way to copy any file.
	- Step 2: Set up your read stream and write stream within the function. Make sure the target file in your write stream comes from a function parameter.
	- Step 3: Pipe the read stream into the write stream.
	- Step 4: Make sure to do some error checking on the read and write streams to ensure that everything is going smoothly.
	- **Bonus:** Provide the user with a callback function that gets executed when the copy is complete.

## Using Modules
- So far we have seen a few modules that we have pulled from NPM to accomplish certain tasks.
- Creating our own modules is simple, and is best-practice for large applications that have a lot of functionality.
- Modules are set up as a property called `exports` of the module object:

greetings.js

```javascript
module.exports = {
	sayHello: function() {
		alert("Hello!");
	},
	
	sayGoodbye: function() {
		alert("Goodbye!");
	}
};
```

- After you set up your module you can require it in other code:

```javascript
var Greetings = require("./greetings");
```

- Since modules are just objects with functions attached, they can be constructed in a more typical JavaScript OOP fashion as well:

```javascript
function Greeting(name) {
	this.name = name;
}

Greeting.prototype.sayHello = function() {
	console.log("Hello " + this.name);
}

Greeting.prototype.sayGoodbye = function() {
	console.log("Goodbye " + this.name);
}

module.exports = Greeting;
```

- Modules can be published to NPM if you want to distribute them. More information can be found [here](https://docs.npmjs.com/getting-started/publishing-npm-packages).

## Module Lab
- In this lab we will be writing some generic functionality as helpers to work with arrays.
- We will set up each function as a module method.
- Your job is to set up a module with methods to accomplish the following operations:
	- Find last value in array
	- Sort array
	- Add value to end of array
	- Reverse array
- Try to call your methods in a separate file to practice invoking them.

## Testing with Mocha and Chai
- Testing in Node can take many forms, but Mocha and Chai are two tools that are pretty industry standard.
- Mocha is the spec runner software and Chai is the assertion library that work together to run the tests.
- Since Mocha is just a spec runner, we can install it globally so the commands can be accessed anywhere: `npm install mocha -g`.
- Chai should be specific to the project, so we will install it as a local dependency. However, it should only be used during development so we will specify that: `npm install chai --save-dev`.
- Let's see an example test:

```javascript
var expect = require("chai").expect;

var num1 = 2;
var num2 = 3;

describe("Testing Mocha and Chai", function() {
	it("Should add 2 and 3 together", function(done) {
		expect(num1 + num2).equal(5);
		done();
	});

	it("Should fail", function(done) {
		expect(num1 + num2).equal(10);
		done();
	});
});
```

## Testing Lab
- Step 1: Install all npm modules for this project with `npm install`.
- Step 2: Create a `test` folder with a file inside called library_spec.js.
- Step 3: Open up library.js and try to figure out what the functions are doing.
- Step 4: Think of how we could write tests to ensure that this functionality is correct.
- Step 5: Write the tests in library_spec.js.
- Step 6: There is one test that *should* fail. Can you correct the code to make it pass?

## Using Gulp
- Gulp is an automation tool that makes working with Node easier.
- This tool automates common processes that are normally tedious and repetitive.
- A few examples of tasks it can automate are: minifying files, compiling SASS, and linting JS code.
- Gulp is run from the command line but also necessary in the project. We will install it in two steps:
	- Step 1: `npm install gulp -g`
	- Step 2: `npm install gulp --save-dev`
- We will be practicing Gulp with the minification plugin. We will have to install it first: `npm install gulp-uglify --save-dev`.
- All projects that use Gulp work with a Gulpfile. We will set ours up to concatenate and minify our sample files:

```javascript
var gulp = require("gulp");

var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var rename = require("gulp-rename");

gulp.task("scripts", function() {
	return gulp.src("js/*.js")
		.pipe(concat("all.js"))
		.pipe(gulp.dest("dist"))
		.pipe(rename("all.min.js"))
		.pipe(uglify())
		.pipe(gulp.dest("dist"));
});

gulp.task("default", ["scripts"]);
```

