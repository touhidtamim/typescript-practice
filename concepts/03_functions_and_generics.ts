// ============================================================
// FUNCTIONS & GENERICS
// ============================================================


// ------------------------------------------------------------
// 1. FUNCTION PARAMETER TYPES
// ------------------------------------------------------------

function addNumbers(first: number, second: number) {
  return first + second;
}

addNumbers(10, 20);
// addNumbers("10", 20); // Error


// ------------------------------------------------------------
// 2. RETURN TYPE
// ------------------------------------------------------------

function multiplyNumbers(first: number, second: number): number {
  return first * second;
}

function printUserName(name: string): void {
  console.log(name);
}


// ------------------------------------------------------------
// 3. OPTIONAL PARAMETERS
// ------------------------------------------------------------

function greetUser(name: string, age?: number): string {
  if (age !== undefined) {
    return `Hello ${name}, you are ${age}`;
  }

  return `Hello ${name}`;
}

greetUser("Touhid");
greetUser("Touhid", 23);


// ------------------------------------------------------------
// 4. DEFAULT PARAMETERS
// ------------------------------------------------------------

function createMessage(name: string, role: string = "user"): string {
  return `${name} is a ${role}`;
}

createMessage("Touhid");
createMessage("Touhid", "admin");


// ------------------------------------------------------------
// 5. REST PARAMETERS
// ------------------------------------------------------------

function calculateTotal(...prices: number[]): number {
  return prices.reduce((total, price) => total + price, 0);
}

calculateTotal(100, 200, 300);


// ------------------------------------------------------------
// 6. FUNCTION TYPE
// ------------------------------------------------------------

// A variable can describe the structure of a function.

let subtractNumbers: (first: number, second: number) => number;

subtractNumbers = (first, second) => {
  return first - second;
};


// ------------------------------------------------------------
// 7. FUNCTION TYPE WITH TYPE ALIAS
// ------------------------------------------------------------

type MathOperation = (first: number, second: number) => number;

const divideNumbers: MathOperation = (first, second) => {
  return first / second;
};


// ------------------------------------------------------------
// 8. CALLBACK FUNCTION
// ------------------------------------------------------------

function calculate(
  first: number,
  second: number,
  operation: MathOperation,
): number {
  return operation(first, second);
}

const sumResult = calculate(10, 5, (first, second) => {
  return first + second;
});


// ------------------------------------------------------------
// 9. CALLBACK WITH VOID
// ------------------------------------------------------------

function processUsers(
  users: string[],
  callback: (user: string) => void,
): void {
  users.forEach(callback);
}

processUsers(["Rahim", "Karim"], (user) => {
  console.log(user);
});


// ------------------------------------------------------------
// 10. FUNCTION TYPE IN OBJECT
// ------------------------------------------------------------

type Calculator = {
  add: (first: number, second: number) => number;
  subtract: (first: number, second: number) => number;
};

const calculator: Calculator = {
  add(first, second) {
    return first + second;
  },

  subtract(first, second) {
    return first - second;
  },
};


// ------------------------------------------------------------
// 11. FUNCTION OVERLOADS
// ------------------------------------------------------------

// Multiple function signatures for different inputs.

function formatValue(value: string): string;
function formatValue(value: number): string;

function formatValue(value: string | number): string {
  if (typeof value === "number") {
    return value.toFixed(2);
  }

  return value.toUpperCase();
}

formatValue("hello");
formatValue(100);

// formatValue(true); // Error


// ------------------------------------------------------------
// 12. OVERLOAD WITH DIFFERENT RETURN TYPES
// ------------------------------------------------------------

function getValue(value: string): string[];
function getValue(value: number): number[];

function getValue(value: string | number): string[] | number[] {
  if (typeof value === "string") {
    return value.split("");
  }

  return [value];
}

const letters = getValue("Hello");
const numbersList = getValue(100);


// ------------------------------------------------------------
// 13. GENERICS — BASIC
// ------------------------------------------------------------

// Generic allows a function to work with different types
// while preserving type information.

function identity<T>(value: T): T {
  return value;
}

const stringValue = identity("Hello");
const numberValue = identity(100);
const booleanValue = identity(true);


// ------------------------------------------------------------
// 14. GENERIC TYPE INFERENCE
// ------------------------------------------------------------

// TypeScript can usually infer T automatically.

const inferredString = identity("TypeScript");
// T = string

const inferredNumber = identity(500);
// T = number


// ------------------------------------------------------------
// 15. EXPLICIT GENERIC TYPE
// ------------------------------------------------------------

const explicitString = identity<string>("Hello");

const explicitNumber = identity<number>(100);


// ------------------------------------------------------------
// 16. GENERIC ARRAY FUNCTION
// ------------------------------------------------------------

function getFirst<T>(items: T[]): T {
  return items[0];
}

const firstName = getFirst(["Rahim", "Karim"]);
const firstNumber = getFirst([10, 20, 30]);


// ------------------------------------------------------------
// 17. GENERIC WITH MULTIPLE TYPES
// ------------------------------------------------------------

function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const userPair = pair("Touhid", 23);

const mixedPair = pair(true, "active");


// ------------------------------------------------------------
// 18. GENERIC OBJECT
// ------------------------------------------------------------

function createResponse<T>(data: T) {
  return {
    success: true,
    data,
  };
}

const userResponse = createResponse({
  name: "Touhid",
  age: 23,
});

const productResponse = createResponse({
  id: 101,
  price: 500,
});


// ------------------------------------------------------------
// 19. GENERIC TYPE ALIAS
// ------------------------------------------------------------

type ApiResponse<T> = {
  success: boolean;
  data: T;
};

const userApiResponse: ApiResponse<User> = {
  success: true,
  data: {
    name: "Rahim",
    age: 25,
    email: "rahim@example.com",
  },
};

const productApiResponse: ApiResponse<Product> = {
  success: true,
  data: {
    id: 1,
    name: "Laptop",
    price: 80000,
  },
};


// ------------------------------------------------------------
// 20. GENERIC INTERFACE
// ------------------------------------------------------------

interface ApiResult<T> {
  data: T;
  status: number;
}

const userResult: ApiResult<User> = {
  data: {
    name: "Karim",
    age: 28,
    email: "karim@example.com",
  },
  status: 200,
};


// ------------------------------------------------------------
// 21. GENERIC CONSTRAINTS
// ------------------------------------------------------------

// `extends` can restrict which types are allowed.

function getLength<T extends { length: number }>(value: T): number {
  return value.length;
}

getLength("Hello");
getLength([10, 20, 30]);

// getLength(100); // Error


// ------------------------------------------------------------
// 22. GENERIC CONSTRAINT WITH KEYOF
// ------------------------------------------------------------

function getProperty<T, K extends keyof T>(object: T, key: K): T[K] {
  return object[key];
}

const accountInfo = {
  name: "Touhid",
  age: 23,
  active: true,
};

const accountName = getProperty(accountInfo, "name");
const accountAge = getProperty(accountInfo, "age");

// getProperty(accountInfo, "email"); // Error


// ------------------------------------------------------------
// 23. GENERIC CLASS
// ------------------------------------------------------------

class Box<T> {
  constructor(public value: T) {}

  getValue(): T {
    return this.value;
  }
}

const stringBox = new Box("Hello");
const numberBox = new Box(100);

console.log(stringBox.getValue());
console.log(numberBox.getValue());


// ------------------------------------------------------------
// 24. GENERIC DEFAULT TYPE
// ------------------------------------------------------------

type Result<T = string> = {
  value: T;
};

const defaultResult: Result = {
  value: "Success",
};

const numberResult: Result<number> = {
  value: 200,
};


// ------------------------------------------------------------
// 25. ARROW FUNCTION GENERICS
// ------------------------------------------------------------

const getLast = <T>(items: T[]): T => {
  return items[items.length - 1];
};

const lastName = getLast(["A", "B", "C"]);
const lastScore = getLast([80, 90, 100]);


// ------------------------------------------------------------
// 26. GENERIC + CALLBACK
// ------------------------------------------------------------

function mapItems<T, U>(
  items: T[],
  callback: (item: T) => U,
): U[] {
  return items.map(callback);
}

const userNames = mapItems(
  [
    { name: "Rahim", age: 25 },
    { name: "Karim", age: 28 },
  ],
  (user) => user.name,
);

const userAges = mapItems(
  [
    { name: "Hasan", age: 30 },
    { name: "Nabil", age: 22 },
  ],
  (user) => user.age,
);


// ------------------------------------------------------------
// 27. `unknown` + GENERIC
// ------------------------------------------------------------

function parseJson<T>(json: string): T {
  return JSON.parse(json) as T;
}

type ApiUser = {
  id: number;
  name: string;
};

const parsedUser = parseJson<ApiUser>(
  '{"id": 1, "name": "Touhid"}',
);

console.log(parsedUser.name);


// ============================================================
// INTERVIEW
// ============================================================

// Q1. What are generics?
//
// Generics allow reusable code to work with different types
// while preserving type safety.
//
// Example:
// function identity<T>(value: T): T {
//   return value;
// }
//
// ------------------------------------------------------------

// Q2. Why use generics instead of `any`?
//
// `any` removes type safety.
//
// Generics preserve the relationship between input and output.
//
// Example:
// identity("hello") -> string
// identity(100)     -> number
//
// ------------------------------------------------------------

// Q3. What is a generic constraint?
//
// A constraint limits which types can be passed to a generic.
//
// Example:
// T extends { length: number }
//
// ------------------------------------------------------------

// Q4. What does `keyof` do?
//
// `keyof T` produces a union of the keys of T.
//
// Example:
//
// type User = {
//   name: string;
//   age: number;
// };
//
// keyof User
// -> "name" | "age"
//
// ------------------------------------------------------------

// Q5. What are function overloads?
//
// They allow a function to have multiple call signatures
// while using one implementation.
//
// Useful when the same function accepts different types
// and needs type-safe call signatures.
//
// ------------------------------------------------------------

// Q6. What is a callback function?
//
// A function passed to another function as an argument.
//
// Example:
// array.map(item => item.name)
//
// ------------------------------------------------------------

// Q7. What is the difference between optional and default
// parameters?
//
// Optional:
// parameter may be omitted and its value can be undefined.
//
// function greet(name: string, age?: number)
//
// Default:
// a value is automatically used when the argument is omitted.
//
// function greet(name: string, role = "user")
//
// ------------------------------------------------------------

// Q8. What does `T[K]` mean?
//
// It accesses the type of property K from type T.
//
// Example:
//
// type User = {
//   name: string;
//   age: number;
// };
//
// T[K] can produce string or number depending on K.
//
// ------------------------------------------------------------

// Q9. Why use `extends keyof T`?
//
// It ensures that a generic key is actually a valid key
// of the given object.
//
// ------------------------------------------------------------

// Q10. Can TypeScript generics exist at runtime?
//
// No.
//
// Generics are a compile-time feature and are erased from
// the generated JavaScript.
//
// ============================================================
