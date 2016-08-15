rivetsjs-stdlib
===============

A bunch of daily used formatters and bindings for [rivetsjs](http://rivetsjs.com).


Stdlib was build as a simple drop-in-place library for common problems while working with rivetsjs. It extends rivetsjs with severals formatters (as example `default` and `numberFormat`) and binders. If you find something missing, unclear written or you got any problems then feel free to send me a message or an [email](http://ocsource.ch/index.php?q=contact)


Please dont miss to take a look at the [test cases](https://rawgit.com/matthieuriolo/rivetsjs-stdlib/master/tests.html)

## Requirements and Browser support

The library has been built for rivetjs 0.7.0. And optional for  jQuery 2.1.1 and Momentjs 2.8.3

jQuery is only needed for the template binder. Momentjs is only needed for the date formatters.

The library has the same browser support as rivetjs

## Special thanks to
- [Jared Meyering](https://github.com/Jmeyering)
- [Dan Saksa](https://github.com/danhere)
- [Ben](https://github.com/benjaminmcdonald)

## License
Rivetsjs-stdlib is dual licensed with MIT and GPL


# Overview
- [Settings](#settings)
- [Formatters](#formatters)
	- [Formatter shortcuts](#formatter-shortcuts)
	- [General formatters](#general-formatters)
	- [Type detection](#type-detection)
	- [Type conversion](#type-conversion)
	- [Logical formatters](#logical-formatters)
	- [Numeric formatters](#numeric-formatters)
	- [String formatters](#string-formatters)
	- [Date formatters](#date-formatters)
	- [Object formatters](#object-formatters)
	- [Array formatters](#array-formatters)
	- [Function formatters](#function-formatters)
- [Binders](#binders)
	- [width](#width)
	- [height](#height)
	- [template](#template)



## Settings
All settings can be found in rivets.stdlib. You can change the values according to your locale!

Value | Default | Description
--- | --- | ---
defaultPrecision | 2 | numberFormat will return a number with `defaultPrecision` places after the comma
defaultThousandSeparator | ' | the symbol used to separated every group of thousands
defaultDecimalSeparator | . | the symbol used as the decimal point
defaultDateFormat | YYYY-MM-DD | momentjs pattern for the formatter date
defaultTimeFormat | HH:mm:ss | momentjs pattern for the formatter time
defaultDatetimeFormat | YYYY-MM-DD HH:mm:ss | momentjs pattern for the formatter datetime



## Formatters

The value on which the formatter will be applied is always called `target`. In case that the formatter is marked as variadic then you might pass as many parameters as you wish


### Formatter shortcuts

Shortcut | Description
--- | --- | ---
| eq | isEqual |
| ne | isEqual && negate |
| lt | isLower |
| gt | isGreater |
| le | isLowerEqual |
| lte | isLowerEqual |
| ge | isGreaterEqual |
| gte | isGreaterEqual |
| neg | negate |
| prv | preventDefault |
| inject | stringFormat |
| format | dateFormat |
| len | length |
| def | default |
| stringify | prettyPrint |
| int | integer |



### General formatters


#### prettyPrint
Returns target in a humanreadable string

- target: any
- return: string

#### log
Displays target in the browser console

- target: any


#### default
This formatter returns a default value for `target` if it is empty (detected with the formatter isEmpty)

- target: any
- param val: any | if target is empty then this value will be returned
- return: any

Example:
```html
<span rv-text="notexistingvalue | default 'property does not exist'"></span>
```

Result:
```html
<span>property does not exist</span>
```

#### add
Uses the + operation between `target` and the given parameter without doing any conversion (see sum). Therefor this
function can be used to concat strings as well

- target: any
- param val: any
- return: int, float, NaN, str

Example:
```html
<span rv-text="12 | add 1"></span>
```

Result:
```html
<span>13</span>
```

#### sub
Uses the - operation between `target` and the given parameter without doing any conversion (see substract)


- target: any
- param val: any
- return: int, float, NaN, str

Example:
```html
<span rv-text="12 | sub 1"></span>
```

Result:
```html
<span>11</span>
```


#### map
Calls a method on the given object. The first parameters defines the object and the second the methodname.
Target will be passed as the first argument to the method.

- target: any
- param obj: object
- param property: string
- variadic: any
- return: any


Example:
```html
<span rv-text="10 | map 'Math' 'sin'"></span>
```

Result:
```html
<span>-0.5440211108893699</span>
```


### Type detection

#### isEmpty
Returns true if the target represents an empty state (empty array, empty string, false, etc)

- target: any
- return: boolean


#### isBoolean
Returns true if the given target is of the type boolean

- target: any
- return: bool


#### isNumeric
Returns true if the given target can be expressed as a numeric value. This covers integers, floats, strings and booleans

- target: any
- return: bool

#### isNaN
Returns true if the given target can not be expressed as a numeric value. This covers objects, arrays and strings

- target: any
- return: bool

#### isInteger
Returns true if the given target is an integer

- target: any
- return: bool

#### isFloat
Returns true if the given target is a float

- target: any
- return: bool


#### isNumber
Returns true if the given target is an integer or a float

- target: any
- return: bool

#### isObject
Returns true if the given target is an object

- target: any
- return: bool

#### isFunction
Returns true if the given target is a function

- target: any
- return: bool


#### isArray
Returns true if the given target is an array

- target: any
- return: bool

#### isString
Returns true if the given target is a string

- target: any
- return: bool

#### isInfinity
Returns true if the given target is infinity

- target: any
- return: bool

### Type conversion

#### toBoolean
Returns the boolean representation of the given target. The conversion is similiar to the behaviour of `if() {}`

- target: any
- return: bool


#### toInteger
Returns the integer representation of the given target.

- target: any
- return: integer

#### toFloat
Returns the float representation of the given target

- target: any
- return: float

#### toDecimal
Returns the integer representation of the given target if the float representation is not more precise

- target: any
- return: integer|float


#### toArray
Returns the array representation of the given target. Objects will be flatten down by their values and single values will be wrapped in a array. Arrays will be returned unchanged

- target: any
- return: array


#### toString
Returns the string representation of the given target. This actually calls the JS method toString()

- target: any
- return: string


#### integer
Exactly the same as toInteger but implemented as two-way formatter

- two-way
- target: any
- return: string

### Comparison

#### isEqual
Returns true if the target and the first parameter are equal

- target: any
- parameter val: any
- return: bool

#### isLess
Returns true if the target is smaller as first parameter. Both values will be converted to a numeric representation

- target: any
- parameter val: any
- return: bool

#### isGreater
Returns true if the target is greater as first parameter. Both values will be converted to a numeric representation

- target: any
- parameter val: any
- return: bool

#### isLessEqual
Returns true if the target is smaller or is equal to the first parameter. Both values will be converted to a numeric representation

- target: any
- parameter val: any
- return: bool

#### isGreaterEqual
Returns true if the target is greater or is equal to the first parameter. Both values will be converted to a numeric representation

- target: any
- parameter val: any
- return: bool

### Logical formatters

#### or
Returns true if the target or one of parameters are true

- target: any
- variadic: any
- return: bool


#### and
Returns true if the target and all parameters are true

- target: any
- variadic: any
- return: bool


#### negate
Returns the negated value of target

- target: any
- return: bool

#### if
Returns the first parameter if the target is true or returns the second parameter

- target: bool
- param trueCase: any | will be returned if target is true
- param falseCase: any | will be returned if target is false
- return: any



### Numeric formatters


#### sum
Returns the sum of the target and the first parameter. Both values will be converted to a numeric representation

- target: any
- parameter val: any
- return: integer|float

#### substract
Returns the substraction of the target and the first parameter. Both values will be converted to a numeric representation

- target: any
- parameter val: any
- return: integer|float

#### multiply
Returns the multiplication of the target and the first parameter. Both values will be converted to a numeric representation

- target: any
- parameter val: any
- return: integer|float


#### divide
Returns the division of the target and the first parameter. Both values will be converted to a numeric representation. If the denominator is 0 then Infinity is returned

- target: any
- parameter val: any
- return: integer|float|Infinity

#### min
Returns the smallest number from the passed parameters and the target

- target: integer|float
- variadic: integer|float
- return: integer|float|Infinity|NaN


#### max
Returns the biggest number from the passed parameters and the target

- target: integer|float
- variadic: integer|float
- return: integer|float|Infinity|NaN

#### numberFormat
Returns a formatted version of the target as string. The number will always be rounded after the DIN 1333 (1.55 => 1.6 and -1.55 => -1.6)

- target: integer|float
- parameter precision: integer default rivets.stdlib.defaultPrecision
- parameter decimalSeparator: string default rivets.stdlib.defaultDecimalSeparator
- parameter thousandSeparator: string default rivets.stdlib.defaultThousandSeparator
- return: string

### String formatters

#### stringFormat
Returns the target with all appearance of %s replaced by the according parameter

- target: string
- variadic: string
- return: string

Example:
```html
<span rv-text="'some %s for %s' | stringFormat 'text' 'you'"></span>
```

Result:
```html
<span>some text for you</span>
```

#### split
Splits the target into an array by a given seperator

- target: string
- param val: string
- return: array

#### lower
Converts the target to lowercase

- target: string
- return: string


#### upper
Converts the target to uppercase

- target: string
- return: string

#### capitalize
Converts the first letter of every word to uppercase in target. Every substring separated by a space or a - will
be detected as a word. The rest stays the it used to (URL will not be converted to Url)

- target: string
- return: string

Example:
```html
<span rv-text="'string teXt-caSe uRl' | capitalize"></span>
```

Result:
```html
<span>String TeXt-CaSe URl</span>
```


#### contains
Returns true if the target contains the given substring or if target array holds the parameter

- target: string|array
- return: bool

#### doesNotContain
Shortcut for the function ['array'] | contains 'value' | negate 
- target: string|array
- return: bool

#### length
Returns the string length, the array length or the count of keys of an object

- target: any
- return: integer

### Date formatters

#### date
Returns the date portion as string from target (JS Date). Default formatting is rivets.stdlib.defaultDateFormat

- target: Date
- return: string


#### time
Returns the time portion as string from target (JS Date). Default formatting is rivets.stdlib.defaultTimeFormat

- target: Date
- return: string


#### datetime
Returns a datetime as string from target (JS Date). Default formatting is rivets.stdlib.defaultDatetimeFormat

- target: Date
- return: string


#### toTimestamp
Returns the unix timestamp from target (JS Date)

- target: Date
- return: integer


#### toDate
Returns the JS Date object representing the given unix timestamp

- target: integer
- return: Date


#### toMoment
Returns the momentjs object representing of the given JS Date. (use this method afterwards with the formatter `map`)

- target: Date
- return: momentjs


#### dateFormat
Returns a string formatted with momentjs.format. The first parameter specifies the format pattern

- target: JS Date
- param val: string | documented in [momentjs](http://momentjs.com/docs/#/displaying/format/)
- return: string





### Object formatters

#### pairs
Returns an object holding the object, key and the corresponding value. The returned object has therefor
always three properties: object, property and value

- target: object
- return: object

Example:
```html
<div rv-each-item="myobject | pairs">
	Found key { item.property | stringify } with value { item.value  | stringify } 
</div>
```


#### keys
Returns all keys of target

- target: object
- return: array


#### values
Returns all values of target

- target: object
- return: array

#### length
Returns the string length, the array length or the count of keys of an object

- target: any
- return: integer


### Array formatters

#### join
Returns the string by joining the target with the given parameter

- target: array
- param val: string
- return: string

#### contains
Returns true if the target contains the given substring or if target array holds the parameter

- target: string|array
- return: bool


#### length
Returns the string length, the array length or the count of keys of an object

- target: any
- return: integer



### Function formatters

#### wrap
Returns a new function which will call target with the arguments given to wrap and with the arguments used in the event caller. The arguments passed to wrap can be accessed as the first arguments

- target: function
- variadic: any
- return: function

Example:
```html
<div rv-each-item="collection">
	<div rv-on-click="aClickHandler | wrap item"></div>
</div>
```

Result:
```javascript
function aClickHandler(item, event) {
	/* a function with those arguments will be called */
}
```


#### delay
Returns a anonym functions which calls target with a delay

- target: function
- param ts: integer | delay in milliseconds
- return: function

#### preventDefault
Returns a anonym functions which calls preventDefault and afterwards target

- target: function
- return: function




## Binders


#### width 
Resets the css width value with the target


#### height
Resets the css height value with the target


#### template
The template binder is aquivalent to rv-html with the exceptions that the data bindings are accessible in the
included html. You should not use that functions since rivetsjs provides a much better way (components). But
for the most people this binder just will work fine and for non-complex problem its absolute legit to use it

Example:
```html
<div id="mydiv" rv-template="myhtml"></div>
<script>
rivets.bind($('#mydiv'), {myhtml: '<span rv-text="val"></span>', val: 'nice'})
</script>
```

Results:
```html
<div id="mydiv"><span>nice</span></div>
```




