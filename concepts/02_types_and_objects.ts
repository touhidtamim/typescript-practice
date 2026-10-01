// ============================================================
// TYPES & OBJECTS
// ============================================================


// ------------------------------------------------------------
// 1. OBJECT TYPES
// ------------------------------------------------------------

let user: {
  name: string;
  age: number;
  isAdmin: boolean;
} = {
  name: "Touhid",
  age: 23,
  isAdmin: false,
};

// Optional property
let profile: {
  name: string;
  age?: number;
} = {
  name: "Touhid",
};

// readonly property
let account: {
  readonly id: number;
  name: string;
} = {
  id: 101,
  name: "Touhid",
};

// account.id = 202; // Error


// ------------------------------------------------------------
// 2. TYPE ALIAS
// ------------------------------------------------------------

type User = {
  name: string;
  age: number;
  email: string;
};

let userOne: User = {
  name: "Rahim",
  age: 25,
  email: "rahim@example.com",
};

let userTwo: User = {
  name: "Karim",
  age: 28,
  email: "karim@example.com",
};


// ------------------------------------------------------------
// 3. TYPE ALIAS WITH OBJECT + FUNCTION
// ------------------------------------------------------------

type Product = {
  id: number;
  name: string;
  price: number;
};

function printProduct(product: Product): void {
  console.log(product.name, product.price);
}

printProduct({
  id: 1,
  name: "Laptop",
  price: 80000,
});


// ------------------------------------------------------------
// 4. UNION TYPES
// ------------------------------------------------------------

// A value can have one of multiple types.

let id: string | number;

id = 101;
id = "user-101";

// id = true; // Error


type Status = "pending" | "success" | "failed";

let orderStatus: Status = "pending";

orderStatus = "success";
// orderStatus = "cancelled"; // Error


// ------------------------------------------------------------
// 5. UNION TYPES IN FUNCTIONS
// ------------------------------------------------------------

function printId(value: string | number): void {
  console.log(value);
}

printId(101);
printId("101");


// ------------------------------------------------------------
// 6. LITERAL TYPES
// ------------------------------------------------------------

let direction: "up" | "down" | "left" | "right";

direction = "up";
// direction = "center"; // Error


type Theme = "light" | "dark";

let currentTheme: Theme = "dark";


// ------------------------------------------------------------
// 7. INTERSECTION TYPES
// ------------------------------------------------------------

// Combines multiple types into one.

type Person = {
  name: string;
  age: number;
};

type Employee = {
  employeeId: number;
  department: string;
};

type EmployeePerson = Person & Employee;

let employee: EmployeePerson = {
  name: "Hasan",
  age: 30,
  employeeId: 5001,
  department: "Engineering",
};


// ------------------------------------------------------------
// 8. TYPE ALIAS vs INTERSECTION
// ------------------------------------------------------------

type Admin = {
  name: string;
  permissions: string[];
};

type Staff = {
  employeeId: number;
};

type AdminStaff = Admin & Staff;

let adminUser: AdminStaff = {
  name: "Admin",
  permissions: ["read", "write"],
  employeeId: 1001,
};


// ------------------------------------------------------------
// 9. ARRAY TYPES
// ------------------------------------------------------------

let numbers: number[] = [10, 20, 30];

let names: string[] = ["Rahim", "Karim"];

let users: User[] = [
  {
    name: "Rahim",
    age: 25,
    email: "rahim@example.com",
  },
  {
    name: "Karim",
    age: 28,
    email: "karim@example.com",
  },
];


// Alternative syntax

let scores: Array<number> = [80, 90, 95];


// ------------------------------------------------------------
// 10. READONLY ARRAY
// ------------------------------------------------------------

let readonlyNumbers: readonly number[] = [10, 20, 30];

// readonlyNumbers.push(40); // Error
// readonlyNumbers[0] = 100; // Error


// ------------------------------------------------------------
// 11. TUPLES
// ------------------------------------------------------------

// Fixed number of elements + fixed order/types.

let personInfo: [string, number] = ["Touhid", 23];

let response: [number, string] = [200, "OK"];

// response = ["OK", 200]; // Error


// Optional tuple element

let optionalTuple: [string, number?];

optionalTuple = ["Touhid"];
optionalTuple = ["Touhid", 23];


// ------------------------------------------------------------
// 12. NAMED TUPLES
// ------------------------------------------------------------

let coordinate: [x: number, y: number] = [10, 20];


// ------------------------------------------------------------
// 13. ENUM
// ------------------------------------------------------------

// Enums create a named set of constants.

enum Role {
  User,
  Admin,
  Moderator,
}

let currentRole: Role = Role.Admin;

console.log(currentRole); // 1


// String enum

enum HttpStatus {
  OK = "OK",
  NOT_FOUND = "NOT_FOUND",
  SERVER_ERROR = "SERVER_ERROR",
}

let statusCode: HttpStatus = HttpStatus.OK;


// ------------------------------------------------------------
// 14. ANY
// ------------------------------------------------------------

// Disables most TypeScript type checking.
// Avoid unless absolutely necessary.

let randomValue: any = "hello";

randomValue = 100;
randomValue = true;
randomValue.foo.bar(); // No compile-time error


// ------------------------------------------------------------
// 15. UNKNOWN
// ------------------------------------------------------------

// Safer alternative to any.
// Must check the type before using it.

let unknownValue: unknown = "hello";

if (typeof unknownValue === "string") {
  console.log(unknownValue.toUpperCase());
}

if (typeof unknownValue === "number") {
  console.log(unknownValue.toFixed(2));
}


// ------------------------------------------------------------
// 16. NEVER
// ------------------------------------------------------------

// Represents a value that never occurs.
// Commonly used for functions that always throw
// or never finish.

function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {}
}


// ------------------------------------------------------------
// 17. VOID
// ------------------------------------------------------------

// Function returns nothing useful.

function logMessage(message: string): void {
  console.log(message);
}


// ------------------------------------------------------------
// 18. NULL & UNDEFINED
// ------------------------------------------------------------

let username: string | null = null;

username = "Touhid";
username = null;

let result: string | undefined;

result = "success";
result = undefined;


// ------------------------------------------------------------
// 19. TYPE ASSERTION
// ------------------------------------------------------------

// Tells TypeScript what type you know a value to be.

let someValue: unknown = "TypeScript";

let textValue = someValue as string;

console.log(textValue.toUpperCase());


// Alternative syntax

let anotherValue: unknown = "Hello";

let anotherText = <string>anotherValue;


// ------------------------------------------------------------
// 20. `as const`
// ------------------------------------------------------------

// Makes properties readonly and values literal types.

const config = {
  apiUrl: "https://api.example.com",
  version: 1,
} as const;

// config.version = 2; // Error

// config.apiUrl -> "https://api.example.com"
// config.version -> 1


// ------------------------------------------------------------
// 21. INDEX SIGNATURE
// ------------------------------------------------------------

// Useful when object keys are dynamic.

type Scores = {
  [player: string]: number;
};

let playerScores: Scores = {
  Rahim: 90,
  Karim: 85,
  Hasan: 95,
};

playerScores["Nabil"] = 88;


// ------------------------------------------------------------
// 22. TYPE ALIAS WITH INDEX SIGNATURE
// ------------------------------------------------------------

type ApiResponse = {
  [key: string]: string | number;
};

let apiData: ApiResponse = {
  name: "Touhid",
  age: 23,
  city: "Dhaka",
};


// ------------------------------------------------------------
// 23. TYPE vs INTERFACE — BASIC
// ------------------------------------------------------------

// Object structure can be represented using both.

type Car = {
  brand: string;
  model: string;
};

interface Bike {
  brand: string;
  model: string;
}

let car: Car = {
  brand: "Toyota",
  model: "Corolla",
};

let bike: Bike = {
  brand: "Yamaha",
  model: "R15",
};


// ------------------------------------------------------------
// 24. INTERFACE EXTENDS
// ------------------------------------------------------------

interface BaseUser {
  name: string;
  email: string;
}

interface AdminUser extends BaseUser {
  permissions: string[];
}

let systemAdmin: AdminUser = {
  name: "Touhid",
  email: "touhid@example.com",
  permissions: ["read", "write", "delete"],
};


// ------------------------------------------------------------
// 25. TYPE INTERSECTION vs INTERFACE EXTENDS
// ------------------------------------------------------------

// Type:
type BasicUser = {
  name: string;
};

type PremiumUser = BasicUser & {
  subscription: "free" | "pro";
};


// Interface:
interface BasicAccount {
  name: string;
}

interface PremiumAccount extends BasicAccount {
  subscription: "free" | "pro";
}


// ============================================================
// INTERVIEW
// ============================================================

// Q1. What is the difference between `any` and `unknown`?
//
// any:
// - Disables type checking.
// - Can access anything directly.
//
// unknown:
// - Safer.
// - Must narrow/check the type before using it.
//
// ------------------------------------------------------------

// Q2. What is a union type?
//
// Allows a value to have multiple possible types.
//
// Example:
// let id: string | number;
//
// ------------------------------------------------------------

// Q3. What is an intersection type?
//
// Combines multiple types into one.
//
// Example:
// type Admin = User & Permissions;
//
// ------------------------------------------------------------

// Q4. What is the difference between an array and a tuple?
//
// Array:
// - Usually contains multiple values of the same type.
//
// Tuple:
// - Fixed number/order of elements with specific types.
//
// Example:
// let names: string[] = ["A", "B"];
// let user: [string, number] = ["A", 23];
//
// ------------------------------------------------------------

// Q5. What is `readonly`?
//
// Prevents modification after initialization.
//
// Example:
// type User = {
//   readonly id: number;
// };
//
// ------------------------------------------------------------

// Q6. What is the difference between `type` and `interface`?
//
// Both can describe object structures.
//
// interface:
// - Supports `extends`.
// - Can be declaration-merged.
//
// type:
// - Can represent unions, intersections, tuples,
//   primitives, etc.
//
// ------------------------------------------------------------

// Q7. What is `never`?
//
// Represents values that never occur.
// Common with functions that always throw or never return.
//
// ------------------------------------------------------------

// Q8. What is type assertion?
//
// It tells TypeScript to treat a value as a specific type.
//
// Example:
// const value = data as string;
//
// It does NOT perform runtime type conversion.
//
// ------------------------------------------------------------

// Q9. Why use `unknown` instead of `any`?
//
// `unknown` forces you to verify the actual type before
// performing type-specific operations, making code safer.
//
// ------------------------------------------------------------

// Q10. What does `as const` do?
//
// It narrows values to literal types and makes object/array
// properties readonly.
//
// Example:
// const role = "admin" as const;
// // type: "admin"
// ============================================================
