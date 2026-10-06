// ============================================================
// TSCONFIG, TOOLING & FINAL TYPESCRIPT REVISION
// ============================================================


// ------------------------------------------------------------
// 1. TSCONFIG — BASIC IDEA
// ------------------------------------------------------------

// tsconfig.json controls how TypeScript compiles the project.
//
// Example:
//
// {
//   "compilerOptions": {
//     "target": "ES2022",
//     "module": "ESNext",
//     "strict": true,
//     "outDir": "./dist",
//     "rootDir": "./src"
//   }
// }


// ------------------------------------------------------------
// 2. IMPORTANT COMPILER OPTIONS
// ------------------------------------------------------------

// target
// -> JavaScript version TypeScript should generate.
//
// module
// -> Module system used by the project.
//
// strict
// -> Enables strict type checking.
//
// noImplicitAny
// -> Prevents variables/parameters from silently becoming any.
//
// strictNullChecks
// -> Makes null and undefined separate types.
//
// noEmit
// -> Type-check only; don't generate JavaScript.
//
// outDir
// -> Output directory for compiled JavaScript.
//
// rootDir
// -> Root directory containing source files.
//
// esModuleInterop
// -> Improves compatibility between CommonJS and ES modules.
//
// skipLibCheck
// -> Skips type checking of declaration files from dependencies.
//
// sourceMap
// -> Generates source maps for debugging.


// ------------------------------------------------------------
// 3. STRICT MODE
// ------------------------------------------------------------

// Recommended for most modern TypeScript projects.
//
// {
//   "compilerOptions": {
//     "strict": true
//   }
// }
//
// It enables several strict checks including:
// - strictNullChecks
// - noImplicitAny
// - strictFunctionTypes
// - strictPropertyInitialization
// etc.


// ------------------------------------------------------------
// 4. NOIMPLICITANY
// ------------------------------------------------------------

// Without strict checking, an untyped parameter may become any.
//
// Bad:
//
// function greet(name) {
//   console.log(name);
// }
//
// Better:
//
// function greet(name: string): void {
//   console.log(name);
// }


// ------------------------------------------------------------
// 5. STRICT NULL CHECKS
// ------------------------------------------------------------

let maybeUser: string | null = null;

if (maybeUser !== null) {
  console.log(maybeUser.toUpperCase());
}

// Without checking:
//
// maybeUser.toUpperCase(); // Error


// ------------------------------------------------------------
// 6. NOEMIT
// ------------------------------------------------------------

// Useful when another tool handles the actual build.
//
// Example:
//
// {
//   "compilerOptions": {
//     "noEmit": true
//   }
// }
//
// TypeScript only checks types.


// ------------------------------------------------------------
// 7. INCLUDE / EXCLUDE
// ------------------------------------------------------------

// tsconfig can specify which files are included/excluded.
//
// Example:
//
// {
//   "include": ["src/**/*"],
//   "exclude": ["node_modules", "dist"]
// }


// ------------------------------------------------------------
// 8. TYPESCRIPT COMPILER
// ------------------------------------------------------------

// Compile a TypeScript file:
//
// tsc app.ts
//
// Compile according to tsconfig:
//
// tsc
//
// Watch mode:
//
// tsc --watch
//
// Type-check without emitting:
//
// tsc --noEmit


// ------------------------------------------------------------
// 9. TYPESCRIPT WITH NODE.JS
// ------------------------------------------------------------

// A typical project may use:
//
// TypeScript
//   ↓
// tsc / bundler
//   ↓
// JavaScript
//   ↓
// Node.js


// ------------------------------------------------------------
// 10. DECLARATION FILES
// ------------------------------------------------------------

// `.d.ts` files contain type declarations.
//
// Example:
//
// declare function calculateTax(amount: number): number;
//
// TypeScript knows the function exists,
// but the declaration file does not implement it.
//
// Commonly seen in:
// - npm packages
// - @types packages
// - library definitions


// ------------------------------------------------------------
// 11. TYPE INFERENCE
// ------------------------------------------------------------

const userName = "Touhid";
// inferred as string

const userAge = 23;
// inferred as number

const isLoggedIn = true;
// inferred as boolean


// ------------------------------------------------------------
// 12. WHEN TO WRITE TYPES EXPLICITLY
// ------------------------------------------------------------

// Let TypeScript infer simple obvious values.

const cityName = "Dhaka";


// Add explicit types when they improve clarity or define
// an important contract.

function calculatePrice(
  price: number,
  tax: number,
): number {
  return price + tax;
}


// ------------------------------------------------------------
// 13. `as` IS NOT RUNTIME VALIDATION
// ------------------------------------------------------------

const rawData: unknown = "hello";

const forcedString = rawData as string;

console.log(forcedString);

// `as string` does NOT convert the value.
//
// Example:
//
// const value = 100 as unknown as string;
//
// Runtime value is still 100.
//
// Therefore type assertions must be used carefully.


// ------------------------------------------------------------
// 14. NON-NULL ASSERTION `!`
// ------------------------------------------------------------

const element = document.getElementById("app");

if (element) {
  element.innerHTML = "Hello";
}


// You may sometimes see:
//
// const elementTwo = document.getElementById("app")!;
//
// `!` tells TypeScript:
// "I know this is not null."

// Use carefully because TypeScript does not verify the claim.


// ------------------------------------------------------------
// 15. OPTIONAL CHAINING
// ------------------------------------------------------------

type Profile = {
  user?: {
    name?: string;
  };
};

const profileData: Profile = {};

console.log(profileData.user?.name);


// ------------------------------------------------------------
// 16. NULLISH COALESCING
// ------------------------------------------------------------

const displayName = profileData.user?.name ?? "Guest";

console.log(displayName);


// `??` uses the fallback only when the value is
// null or undefined.
//
// Different from `||`, which also treats values like
// 0, "", and false as falsy.


// ------------------------------------------------------------
// 17. TYPE ALIAS RECAP
// ------------------------------------------------------------

type AccountInfo = {
  id: number;
  name: string;
};

type AccountId = number;

type AccountStatus =
  | "active"
  | "inactive";


// ------------------------------------------------------------
// 18. INTERFACE RECAP
// ------------------------------------------------------------

interface ProductAccount {
  id: number;
  name: string;
}

interface PremiumProductAccount
  extends ProductAccount {
  premium: boolean;
}


// ------------------------------------------------------------
// 19. UNION RECAP
// ------------------------------------------------------------

let userId: number | string;

userId = 100;
userId = "user-100";


// ------------------------------------------------------------
// 20. INTERSECTION RECAP
// ------------------------------------------------------------

type HasName = {
  name: string;
};

type HasAge = {
  age: number;
};

type NamedPerson = HasName & HasAge;

const namedPerson: NamedPerson = {
  name: "Touhid",
  age: 23,
};


// ------------------------------------------------------------
// 21. GENERIC RECAP
// ------------------------------------------------------------

function wrapValue<T>(value: T): { value: T } {
  return {
    value,
  };
}

const wrappedName = wrapValue("Touhid");
const wrappedAge = wrapValue(23);


// ------------------------------------------------------------
// 22. UTILITY TYPE RECAP
// ------------------------------------------------------------

type Account = {
  id: number;
  name: string;
  email: string;
};

// Partial
type AccountUpdate = Partial<Account>;

// Pick
type AccountPreview = Pick<Account, "id" | "name">;

// Omit
type AccountWithoutId = Omit<Account, "id">;

// Readonly
type ReadonlyAccount = Readonly<Account>;

// Record
type AccountMap = Record<string, Account>;


// ------------------------------------------------------------
// 23. TYPE NARROWING RECAP
// ------------------------------------------------------------

function processInput(
  input: string | number,
): void {
  if (typeof input === "string") {
    console.log(input.toUpperCase());
  } else {
    console.log(input.toFixed(2));
  }
}


// ------------------------------------------------------------
// 24. DISCRIMINATED UNION RECAP
// ------------------------------------------------------------

type Loading = {
  type: "loading";
};

type Success = {
  type: "success";
  data: string;
};

type Failure = {
  type: "failure";
  error: string;
};

type State = Loading | Success | Failure;

function renderState(state: State): void {
  switch (state.type) {
    case "loading":
      console.log("Loading...");
      break;

    case "success":
      console.log(state.data);
      break;

    case "failure":
      console.log(state.error);
      break;
  }
}


// ------------------------------------------------------------
// 25. FUNCTION RECAP
// ------------------------------------------------------------

type Operation = (
  first: number,
  second: number,
) => number;

const multiply: Operation = (first, second) => {
  return first * second;
};


// ------------------------------------------------------------
// 26. CLASS RECAP
// ------------------------------------------------------------

class UserService {
  constructor(
    private serviceName: string,
  ) {}

  getName(): string {
    return this.serviceName;
  }
}

const service = new UserService("User Service");

console.log(service.getName());


// ------------------------------------------------------------
// 27. INTERFACE + CLASS RECAP
// ------------------------------------------------------------

interface Repository<T> {
  findById(id: number): Promise<T>;
}

type SimpleUser = {
  id: number;
  name: string;
};

class UserRepository
  implements Repository<SimpleUser>
{
  async findById(id: number): Promise<SimpleUser> {
    return {
      id,
      name: "Touhid",
    };
  }
}


// ------------------------------------------------------------
// 28. API TYPING RECAP
// ------------------------------------------------------------

type ApiResult<T> = {
  success: boolean;
  data: T;
};

async function getData<T>(
  url: string,
): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Request failed");
  }

  return response.json() as Promise<T>;
}


// ------------------------------------------------------------
// 29. COMMON TYPESCRIPT BEST PRACTICES
// ------------------------------------------------------------

// 1. Prefer strict mode.
//
// 2. Avoid `any` unless there is a strong reason.
//
// 3. Prefer `unknown` for genuinely unknown data.
//
// 4. Let TypeScript infer obvious local variable types.
//
// 5. Explicitly type important function/API boundaries.
//
// 6. Use union types for finite possible values.
//
// 7. Reuse types instead of duplicating structures.
//
// 8. Use generics for reusable type-safe code.
//
// 9. Validate external data at runtime.
//
// 10. Avoid unnecessary type assertions.
//
// 11. Keep types close to the domain they describe.
//
// 12. Use utility types to avoid repetitive type definitions.


// ------------------------------------------------------------
// 30. TYPESCRIPT + JAVASCRIPT MENTAL MODEL
// ------------------------------------------------------------

// TypeScript:
//
// .ts
//   ↓
// Type checking
//   ↓
// JavaScript
//   ↓
// Browser / Node.js
//
// Important:
// TypeScript types do NOT exist at runtime.
//
// TypeScript improves development-time safety;
// JavaScript is what actually runs.


// ============================================================
// FINAL INTERVIEW REVISION
// ============================================================

// Q1. What is TypeScript?
//
// A statically typed superset of JavaScript that adds
// compile-time type checking and other developer features.
//
// ------------------------------------------------------------

// Q2. Does TypeScript run directly in the browser?
//
// Normally no.
//
// TypeScript is compiled/transpiled into JavaScript,
// which runs in the browser or Node.js.
//
// ------------------------------------------------------------

// Q3. Does TypeScript provide runtime type safety?
//
// Not by itself.
//
// TypeScript checks types at compile time.
// External/runtime data must be validated separately.
//
// ------------------------------------------------------------

// Q4. What is type inference?
//
// TypeScript automatically determines a value's type
// from its context/value.
//
// const age = 23;
// // number
//
// ------------------------------------------------------------

// Q5. `type` vs `interface`?
//
// Both can describe object structures.
//
// `interface` is commonly useful for extendable object
// contracts and declaration merging.
//
// `type` is more flexible for unions, intersections,
// tuples, primitives, and mapped/conditional types.
//
// ------------------------------------------------------------

// Q6. `any` vs `unknown`?
//
// any:
// Removes most type checking.
//
// unknown:
// Requires narrowing before type-specific operations.
//
// Prefer unknown when the actual type is not known.
//
// ------------------------------------------------------------

// Q7. `never` vs `void`?
//
// void:
// Function returns no useful value.
//
// never:
// Function never successfully returns.
//
// ------------------------------------------------------------

// Q8. What is a union?
//
// A value can be one of several types.
//
// string | number
//
// ------------------------------------------------------------

// Q9. What is an intersection?
//
// Combines multiple types.
//
// User & Admin
//
// ------------------------------------------------------------

// Q10. What are generics?
//
// A way to create reusable code while preserving
// type information.
//
// ------------------------------------------------------------

// Q11. What is type narrowing?
//
// Converting a broad union into a more specific type
// through checks such as typeof, in, or instanceof.
//
// ------------------------------------------------------------

// Q12. What is a type guard?
//
// A runtime check that gives TypeScript information
// about a value's type.
//
// ------------------------------------------------------------

// Q13. What are utility types?
//
// Built-in type transformations such as:
//
// Partial
// Required
// Pick
// Omit
// Readonly
// Record
// Exclude
// Extract
// ReturnType
// Parameters
// Awaited
//
// ------------------------------------------------------------

// Q14. What is a discriminated union?
//
// A union where a common literal property identifies
// which member is currently being used.
//
// ------------------------------------------------------------

// Q15. What is `keyof`?
//
// Produces a union of the property keys of a type.
//
// ------------------------------------------------------------

// Q16. What is `typeof` in a type context?
//
// It can obtain the type of an existing value.
//
// Example:
//
// const user = { name: "Touhid" };
//
// type User = typeof user;
//
// ------------------------------------------------------------

// Q17. What is `as`?
//
// Type assertion.
//
// It tells TypeScript to treat a value as another type.
// It does not perform runtime conversion.
//
// ------------------------------------------------------------

// Q18. What is `as const`?
//
// Narrows values to literal types and makes the resulting
// properties/elements readonly.
//
// ------------------------------------------------------------

// Q19. What is an abstract class?
//
// A class that cannot be instantiated directly and can
// require subclasses to implement abstract members.
//
// ------------------------------------------------------------

// Q20. What is a `.d.ts` file?
//
// A declaration file containing type information for code
// whose runtime implementation exists elsewhere.
//
// ------------------------------------------------------------

// Q21. What does `strict: true` do?
//
// Enables TypeScript's strict type-checking options.
//
// It is generally recommended for modern projects.
//
// ------------------------------------------------------------

// Q22. Why type API responses?
//
// To get autocomplete, detect incorrect usage at compile
// time, improve refactoring, and document the data contract.
//
// But API data should still be runtime-validated when needed.
//
// ------------------------------------------------------------

// Q23. What is the biggest limitation of TypeScript?
//
// Types are erased when JavaScript is generated.
// Therefore TypeScript cannot guarantee that external
// runtime data actually matches a declared type.
//
// ------------------------------------------------------------

// Q24. TypeScript or JavaScript?
//
// TypeScript is generally preferred for larger applications
// because static typing improves maintainability and
// developer tooling.
//
// JavaScript remains the runtime language.
//
// ============================================================
// END OF TYPESCRIPT REVISION NOTES
// ============================================================
