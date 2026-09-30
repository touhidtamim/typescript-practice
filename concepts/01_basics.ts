/*

1. TYPESCRIPT BASICS
   ============================================================
   */

// ------------------------------------------------------------
// TypeScript = JavaScript + Static Type System
// ------------------------------------------------------------

let userName: string = "Abrar";
let age: number = 20;
let isActive: boolean = true;

// ------------------------------------------------------------
// Type Inference
// ------------------------------------------------------------

let language = "TypeScript"; // inferred as string
let score = 100; // inferred as number

// score = "100"; // Error

// ------------------------------------------------------------
// Primitive Types
// ------------------------------------------------------------

let text: string = "Hello";
let count: number = 10;
let active: boolean = true;
let bigNumber: bigint = 100n;
let uniqueKey: symbol = Symbol("id");
let empty: null = null;
let notDefined: undefined = undefined;

// ------------------------------------------------------------
// Arrays
// ------------------------------------------------------------

const numbers: number[] = [1, 2, 3];
const names: Array<string> = ["A", "B", "C"];

numbers.push(4);
// numbers.push("5"); // Error

// ------------------------------------------------------------
// Tuples
// ------------------------------------------------------------

let user: [string, number] = ["John", 25];

user[0]; // string
user[1]; // number

// let invalidUser: [string, number] = [25, "John"]; // Error

// ------------------------------------------------------------
// any
// ------------------------------------------------------------

// Disables most type checking.
// Avoid unless absolutely necessary.

let data: any = "hello";

data = 100;
data = true;
data.foo.bar(); // No TypeScript error

// ------------------------------------------------------------
// unknown
// ------------------------------------------------------------

// Safer alternative to any.
// Must narrow before using.

let input: unknown = "hello";

if (typeof input === "string") {
  console.log(input.toUpperCase());
}

// ------------------------------------------------------------
// void
// ------------------------------------------------------------

// Usually used for functions that don't return a value.

function logMessage(message: string): void {
  console.log(message);
}

// ------------------------------------------------------------
// never
// ------------------------------------------------------------

// Represents a value that never occurs/returns.

function throwError(message: string): never {
  throw new Error(message);
}

// ------------------------------------------------------------
// Literal Types
// ------------------------------------------------------------

let direction: "left" | "right";

direction = "left";
// direction = "up"; // Error

type Status = "loading" | "success" | "error";

let requestStatus: Status = "loading";

// ------------------------------------------------------------
// Union Types
// ------------------------------------------------------------

let id: string | number;

id = "user-101";
id = 101;

// ------------------------------------------------------------
// Type Assertions
// ------------------------------------------------------------

// Tells TypeScript what type you believe a value has.

const value: unknown = "TypeScript";

const length1 = (value as string).length;

// ------------------------------------------------------------
// Non-null Assertion
// ------------------------------------------------------------

const element = document.getElementById("app");

element!.innerHTML = "Hello";

// ! tells TypeScript: "I know this is not null."

// ------------------------------------------------------------
// as const
// ------------------------------------------------------------

const config = {
  mode: "production",
  version: 1,
} as const;

// properties become readonly
// mode -> "production"
// version -> 1

// ------------------------------------------------------------
// Type Inference vs Annotation
// ------------------------------------------------------------

// Prefer inference when the type is obvious.

const framework = "React";

// Annotation is useful when:
// - function parameters
// - function return types
// - complex values
// - values whose type needs to be wider

let userId: string | number = 101;

// ============================================================
// INTERVIEW QUICK REVIEW
// ============================================================

// Q1. What is TypeScript?
// A: A statically typed superset of JavaScript that adds type checking
//    and compiles to JavaScript.

// Q2. What is type inference?
// A: TypeScript automatically determines a variable's type from its value.

// Q3. any vs unknown?
// A: any disables type checking; unknown requires type narrowing before use.

// Q4. What is never?
// A: A type for values that never occur, e.g. a function that always throws.

// Q5. What is a tuple?
// A: An array with a fixed structure and known types at specific positions.

// Q6. What is a union type?
// A: A value that can be one of multiple types.
//    Example: string | number

// Q7. What is a type assertion?
// A: It tells TypeScript to treat a value as a specific type.
//    It does not perform runtime type conversion.

// Q8. What does `as const` do?
// A: It makes values readonly and preserves their literal types.
