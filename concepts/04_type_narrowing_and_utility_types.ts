// ============================================================
// TYPE NARROWING & UTILITY TYPES
// ============================================================


// ------------------------------------------------------------
// 1. TYPE NARROWING
// ------------------------------------------------------------

// Narrowing means reducing a broad type to a more specific type
// based on runtime checks.

function printValue(value: string | number): void {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}

printValue("hello");
printValue(100);


// ------------------------------------------------------------
// 2. typeof NARROWING
// ------------------------------------------------------------

function formatInput(input: string | number | boolean): string {
  if (typeof input === "string") {
    return input.toUpperCase();
  }

  if (typeof input === "number") {
    return input.toFixed(2);
  }

  return input ? "YES" : "NO";
}


// ------------------------------------------------------------
// 3. TRUTHINESS NARROWING
// ------------------------------------------------------------

function printName(name: string | null | undefined): void {
  if (name) {
    console.log(name.toUpperCase());
  }
}

printName("Touhid");
printName(null);


// ------------------------------------------------------------
// 4. EQUALITY NARROWING
// ------------------------------------------------------------

function compareValues(
  first: string | number,
  second: string | number,
): void {
  if (first === second) {
    console.log("Values are equal");
  }
}


// ------------------------------------------------------------
// 5. `in` OPERATOR NARROWING
// ------------------------------------------------------------

type AdminAccount = {
  name: string;
  permissions: string[];
};

type CustomerAccount = {
  name: string;
  orders: number;
};

function processAccount(account: AdminAccount | CustomerAccount): void {
  if ("permissions" in account) {
    console.log(account.permissions);
  } else {
    console.log(account.orders);
  }
}


// ------------------------------------------------------------
// 6. `instanceof` NARROWING
// ------------------------------------------------------------

function processDate(value: Date | string): void {
  if (value instanceof Date) {
    console.log(value.getFullYear());
  } else {
    console.log(value.toUpperCase());
  }
}


// ------------------------------------------------------------
// 7. TYPE PREDICATE
// ------------------------------------------------------------

// `value is Type` tells TypeScript that a condition confirms
// a specific type.

function isString(value: unknown): value is string {
  return typeof value === "string";
}

const unknownData: unknown = "Hello";

if (isString(unknownData)) {
  console.log(unknownData.toUpperCase());
}


// ------------------------------------------------------------
// 8. CUSTOM TYPE GUARD
// ------------------------------------------------------------

type Cat = {
  name: string;
  meow: () => void;
};

type Dog = {
  name: string;
  bark: () => void;
};

function isCat(animal: Cat | Dog): animal is Cat {
  return "meow" in animal;
}

function makeSound(animal: Cat | Dog): void {
  if (isCat(animal)) {
    animal.meow();
  } else {
    animal.bark();
  }
}


// ------------------------------------------------------------
// 9. DISCRIMINATED UNION
// ------------------------------------------------------------

// A common property is used to identify the specific type.

type SuccessResponse = {
  status: "success";
  data: string;
};

type ErrorResponse = {
  status: "error";
  message: string;
};

type ApiResponse = SuccessResponse | ErrorResponse;

function handleResponse(response: ApiResponse): void {
  if (response.status === "success") {
    console.log(response.data);
  } else {
    console.log(response.message);
  }
}


// ------------------------------------------------------------
// 10. DISCRIMINATED UNION WITH MULTIPLE TYPES
// ------------------------------------------------------------

type LoadingState = {
  status: "loading";
};

type LoadedState = {
  status: "loaded";
  data: string[];
};

type FailedState = {
  status: "failed";
  error: string;
};

type RequestState =
  | LoadingState
  | LoadedState
  | FailedState;

function handleRequest(state: RequestState): void {
  switch (state.status) {
    case "loading":
      console.log("Loading...");
      break;

    case "loaded":
      console.log(state.data);
      break;

    case "failed":
      console.log(state.error);
      break;
  }
}


// ------------------------------------------------------------
// 11. NEVER WITH EXHAUSTIVE CHECK
// ------------------------------------------------------------

function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${value}`);
}

function handleState(state: RequestState): string {
  switch (state.status) {
    case "loading":
      return "Loading";

    case "loaded":
      return "Loaded";

    case "failed":
      return "Failed";

    default:
      return assertNever(state);
  }
}


// ------------------------------------------------------------
// 12. UTILITY TYPES
// ------------------------------------------------------------

// Utility types transform existing types into new types.


// ------------------------------------------------------------
// 13. Partial<T>
// ------------------------------------------------------------

// Makes all properties optional.

type UserProfile = {
  name: string;
  age: number;
  email: string;
};

type UpdateUser = Partial<UserProfile>;

const userUpdate: UpdateUser = {
  name: "Touhid",
};


// ------------------------------------------------------------
// 14. Required<T>
// ------------------------------------------------------------

// Makes all optional properties required.

type OptionalUser = {
  name?: string;
  age?: number;
};

type CompleteUser = Required<OptionalUser>;

const completeUser: CompleteUser = {
  name: "Touhid",
  age: 23,
};


// ------------------------------------------------------------
// 15. Readonly<T>
// ------------------------------------------------------------

// Makes all properties readonly.

type ProductInfo = {
  id: number;
  name: string;
  price: number;
};

type ReadonlyProduct = Readonly<ProductInfo>;

const readonlyProduct: ReadonlyProduct = {
  id: 1,
  name: "Laptop",
  price: 80000,
};

// readonlyProduct.price = 90000; // Error


// ------------------------------------------------------------
// 16. Pick<T, K>
// ------------------------------------------------------------

// Creates a type containing only selected properties.

type UserSummary = Pick<UserProfile, "name" | "email">;

const summary: UserSummary = {
  name: "Touhid",
  email: "touhid@example.com",
};


// ------------------------------------------------------------
// 17. Omit<T, K>
// ------------------------------------------------------------

// Creates a type excluding selected properties.

type UserWithoutEmail = Omit<UserProfile, "email">;

const publicUser: UserWithoutEmail = {
  name: "Touhid",
  age: 23,
};


// ------------------------------------------------------------
// 18. Record<K, T>
// ------------------------------------------------------------

// Creates an object type with specified keys and value type.

type UserRoles = Record<string, string>;

const roles: UserRoles = {
  Touhid: "admin",
  Rahim: "user",
  Karim: "moderator",
};


// ------------------------------------------------------------
// 19. RECORD WITH UNION KEYS
// ------------------------------------------------------------

type Role = "admin" | "user" | "moderator";

type RolePermissions = Record<Role, string[]>;

const permissions: RolePermissions = {
  admin: ["read", "write", "delete"],
  user: ["read"],
  moderator: ["read", "write"],
};


// ------------------------------------------------------------
// 20. EXCLUDE<T, U>
// ------------------------------------------------------------

// Removes members from a union.

type Status = "pending" | "success" | "failed";

type FailedOrPending = Exclude<Status, "success">;

let currentStatus: FailedOrPending = "pending";

currentStatus = "failed";
// currentStatus = "success"; // Error


// ------------------------------------------------------------
// 21. EXTRACT<T, U>
// ------------------------------------------------------------

// Keeps only union members assignable to U.

type AllMethods =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE";

type WriteMethods = Extract<AllMethods, "POST" | "PUT" | "DELETE">;

let method: WriteMethods = "POST";


// ------------------------------------------------------------
// 22. NONNULLABLE<T>
// ------------------------------------------------------------

// Removes null and undefined from a type.

type MaybeName = string | null | undefined;

type ValidName = NonNullable<MaybeName>;

let cleanName: ValidName = "Touhid";


// ------------------------------------------------------------
// 23. RETURN TYPE
// ------------------------------------------------------------

// Gets the return type of a function.

function getUser(): UserProfile {
  return {
    name: "Touhid",
    age: 23,
    email: "touhid@example.com",
  };
}

type UserReturn = ReturnType<typeof getUser>;


// ------------------------------------------------------------
// 24. PARAMETERS
// ------------------------------------------------------------

// Gets function parameter types as a tuple.

function createUser(
  name: string,
  age: number,
  email: string,
): UserProfile {
  return {
    name,
    age,
    email,
  };
}

type CreateUserParams = Parameters<typeof createUser>;


// ------------------------------------------------------------
// 25. AWAITED<T>
// ------------------------------------------------------------

// Gets the resolved type of a Promise.

async function fetchUser(): Promise<UserProfile> {
  return {
    name: "Touhid",
    age: 23,
    email: "touhid@example.com",
  };
}

type FetchedUser = Awaited<ReturnType<typeof fetchUser>>;


// ------------------------------------------------------------
// 26. COMBINING UTILITY TYPES
// ------------------------------------------------------------

type CreateProduct = Omit<ProductInfo, "id">;

type UpdateProduct = Partial<CreateProduct>;

const productUpdate: UpdateProduct = {
  price: 75000,
};


// ------------------------------------------------------------
// 27. MAPPED TYPES
// ------------------------------------------------------------

// Allows creating a new type by transforming each property.

type Optional<T> = {
  [K in keyof T]?: T[K];
};

type OptionalProfile = Optional<UserProfile>;

const profileUpdate: OptionalProfile = {
  email: "new@example.com",
};


// ------------------------------------------------------------
// 28. READONLY MAPPED TYPE
// ------------------------------------------------------------

type ReadonlyType<T> = {
  readonly [K in keyof T]: T[K];
};

type FrozenProfile = ReadonlyType<UserProfile>;

const frozenProfile: FrozenProfile = {
  name: "Touhid",
  age: 23,
  email: "touhid@example.com",
};


// ------------------------------------------------------------
// 29. CONDITIONAL TYPES
// ------------------------------------------------------------

// Type-level condition:
//
// T extends U ? X : Y

type IsString<T> = T extends string ? true : false;

type StringCheck = IsString<string>;
// true

type NumberCheck = IsString<number>;
// false


// ------------------------------------------------------------
// 30. CONDITIONAL TYPE WITH GENERIC
// ------------------------------------------------------------

type ApiData<T> = T extends string
  ? { message: T }
  : { data: T };

type StringApi = ApiData<string>;

type NumberApi = ApiData<number>;


// ============================================================
// INTERVIEW
// ============================================================

// Q1. What is type narrowing?
//
// Type narrowing means reducing a broad type into a more
// specific type using checks such as typeof, in,
// instanceof, equality checks, or custom type guards.
//
// ------------------------------------------------------------

// Q2. What is a type guard?
//
// A condition that gives TypeScript information about the
// actual type of a value.
//
// Examples:
// typeof
// instanceof
// in
// custom predicate
//
// ------------------------------------------------------------

// Q3. What does `value is Type` mean?
//
// It is a type predicate used in a custom type guard.
//
// Example:
// function isString(value: unknown): value is string
//
// If the function returns true, TypeScript treats value
// as a string.
//
// ------------------------------------------------------------

// Q4. What is a discriminated union?
//
// A union where each member has a common literal property
// used to identify which specific type it is.
//
// Example:
// { status: "success"; data: string }
// { status: "error"; message: string }
//
// ------------------------------------------------------------

// Q5. What does Partial<T> do?
//
// Makes every property optional.
//
// Useful for update/patch objects.
//
// ------------------------------------------------------------

// Q6. What is the difference between Pick and Omit?
//
// Pick:
// Keeps selected properties.
//
// Omit:
// Removes selected properties.
//
// ------------------------------------------------------------

// Q7. What does Record<K, T> do?
//
// Creates an object type whose keys are K and whose values
// are T.
//
// Example:
// Record<"admin" | "user", string>
//
// ------------------------------------------------------------

// Q8. What is Exclude<T, U>?
//
// Removes U from a union T.
//
// Example:
// Exclude<"a" | "b" | "c", "b">
// -> "a" | "c"
//
// ------------------------------------------------------------

// Q9. What is ReturnType<T>?
//
// Extracts the return type of a function.
//
// Example:
// type Result = ReturnType<typeof getUser>;
//
// ------------------------------------------------------------

// Q10. What is Parameters<T>?
//
// Extracts function parameter types as a tuple.
//
// Example:
// Parameters<typeof createUser>
// -> [string, number, string]
//
// ------------------------------------------------------------

// Q11. What does Awaited<T> do?
//
// Extracts the resolved value type from a Promise.
//
// ------------------------------------------------------------

// Q12. What is a mapped type?
//
// A type that transforms each property of another type.
//
// Example:
// type Optional<T> = {
//   [K in keyof T]?: T[K];
// };
//
// ------------------------------------------------------------

// Q13. What is a conditional type?
//
// A type-level condition that selects one type or another.
//
// Syntax:
// T extends U ? X : Y
//
// ------------------------------------------------------------

// Q14. Why is `never` useful with discriminated unions?
//
// It can detect unhandled cases during exhaustive checking.
//
// If a new union member is added and not handled,
// `assertNever()` can produce a TypeScript error.
//
// ============================================================
