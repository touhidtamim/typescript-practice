// ============================================================
// MODULES, ASYNC & API TYPING
// ============================================================


// ------------------------------------------------------------
// 1. EXPORT
// ------------------------------------------------------------

// Anything marked `export` can be used from another file.

export const appName: string = "My App";

export function add(first: number, second: number): number {
  return first + second;
}

export type User = {
  id: number;
  name: string;
};


// ------------------------------------------------------------
// 2. NAMED IMPORT
// ------------------------------------------------------------

// In another file:
//
// import { appName, add, User } from "./06_modules_async_and_api_typing";
//
// console.log(appName);
// add(10, 20);


// ------------------------------------------------------------
// 3. DEFAULT EXPORT
// ------------------------------------------------------------

class Logger {
  log(message: string): void {
    console.log(message);
  }
}

export default Logger;


// Another file:
//
// import Logger from "./06_modules_async_and_api_typing";
//
// const logger = new Logger();


// ------------------------------------------------------------
// 4. DEFAULT vs NAMED EXPORT
// ------------------------------------------------------------

// Named:
//
// export const name = "Touhid";
//
// import { name } from "./file";
//
//
//
// Default:
//
// export default Logger;
//
// import Logger from "./file";
//
// A file can have multiple named exports,
// but only one default export.


// ------------------------------------------------------------
// 5. IMPORT TYPE
// ------------------------------------------------------------

// When importing something used only as a type:
//
// import type { User } from "./types";
//
// This makes it clear that the import is type-only.
//
// Example:
//
// import type { User } from "./types";
//
// const user: User = {
//   id: 1,
//   name: "Touhid",
// };


// ------------------------------------------------------------
// 6. PROMISE TYPE
// ------------------------------------------------------------

function getNumber(): Promise<number> {
  return Promise.resolve(100);
}

function getMessage(): Promise<string> {
  return Promise.resolve("Success");
}


// ------------------------------------------------------------
// 7. ASYNC FUNCTION
// ------------------------------------------------------------

async function fetchNumber(): Promise<number> {
  return 100;
}


// ------------------------------------------------------------
// 8. AWAIT
// ------------------------------------------------------------

async function runExample(): Promise<void> {
  const numberValue = await fetchNumber();

  console.log(numberValue);
}

runExample();


// ------------------------------------------------------------
// 9. ASYNC ERROR HANDLING
// ------------------------------------------------------------

async function fetchData(): Promise<string> {
  try {
    const result = await Promise.resolve("Data loaded");

    return result;
  } catch (error) {
    console.log("Something went wrong");

    return "Fallback data";
  }
}


// ------------------------------------------------------------
// 10. UNKNOWN ERROR
// ------------------------------------------------------------

// In modern TypeScript, caught errors should be treated
// safely as `unknown`.

async function handleError(): Promise<void> {
  try {
    throw new Error("Request failed");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}


// ------------------------------------------------------------
// 11. PROMISE.ALL
// ------------------------------------------------------------

async function loadAll(): Promise<void> {
  const [user, products] = await Promise.all([
    Promise.resolve("User data"),
    Promise.resolve("Product data"),
  ]);

  console.log(user);
  console.log(products);
}

loadAll();


// ------------------------------------------------------------
// 12. API RESPONSE TYPE
// ------------------------------------------------------------

type ApiUser = {
  id: number;
  name: string;
  email: string;
};

type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};


// ------------------------------------------------------------
// 13. TYPED FETCH
// ------------------------------------------------------------

async function fetchUser(
  userId: number,
): Promise<ApiUser> {
  const response = await fetch(
    `https://api.example.com/users/${userId}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  const data: ApiUser = await response.json();

  return data;
}


// ------------------------------------------------------------
// 14. IMPORTANT: JSON IS NOT AUTOMATICALLY TYPE-SAFE
// ------------------------------------------------------------

// TypeScript cannot verify that external JSON really matches
// your interface/type at runtime.
//
// This:
//
// const data: ApiUser = await response.json();
//
// only tells TypeScript to treat the value as ApiUser.
//
// Runtime validation requires a validation library such as
// Zod or manual validation.


// ------------------------------------------------------------
// 15. GENERIC API FUNCTION
// ------------------------------------------------------------

async function request<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  return response.json() as Promise<T>;
}


// Usage:
//
// const user = await request<ApiUser>(
//   "https://api.example.com/users/1",
// );


// ------------------------------------------------------------
// 16. API ERROR TYPE
// ------------------------------------------------------------

type ApiError = {
  status: number;
  message: string;
};

async function requestUser(
  url: string,
): Promise<ApiUser> {
  const response = await fetch(url);

  if (!response.ok) {
    const error: ApiError = {
      status: response.status,
      message: "Failed to fetch user",
    };

    throw new Error(
      `${error.status}: ${error.message}`,
    );
  }

  return response.json() as Promise<ApiUser>;
}


// ------------------------------------------------------------
// 17. HTTP METHOD UNION
// ------------------------------------------------------------

type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE";

async function sendRequest(
  url: string,
  method: HttpMethod,
): Promise<Response> {
  return fetch(url, {
    method,
  });
}


// ------------------------------------------------------------
// 18. REQUEST OPTIONS TYPE
// ------------------------------------------------------------

type RequestOptions = {
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: string;
};

async function apiRequest(
  url: string,
  options: RequestOptions,
): Promise<Response> {
  return fetch(url, options);
}


// ------------------------------------------------------------
// 19. TYPED POST DATA
// ------------------------------------------------------------

type CreateUserInput = {
  name: string;
  email: string;
  age: number;
};

async function createUser(
  input: CreateUserInput,
): Promise<ApiUser> {
  const response = await fetch(
    "https://api.example.com/users",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return response.json() as Promise<ApiUser>;
}


// ------------------------------------------------------------
// 20. UPDATE / PATCH DATA
// ------------------------------------------------------------

type UpdateUserInput = Partial<CreateUserInput>;

async function updateUser(
  userId: number,
  input: UpdateUserInput,
): Promise<ApiUser> {
  const response = await fetch(
    `https://api.example.com/users/${userId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  return response.json() as Promise<ApiUser>;
}


// ------------------------------------------------------------
// 21. ENVIRONMENT VARIABLES
// ------------------------------------------------------------

// Environment variables are normally strings or undefined.
//
// Example:
//
// const apiUrl = process.env.API_URL;
//
// Type:
//
// string | undefined


const apiUrl: string | undefined =
  process.env.API_URL;

if (apiUrl) {
  console.log(apiUrl);
}


// ------------------------------------------------------------
// 22. MODULE AUGMENTATION — BASIC IDEA
// ------------------------------------------------------------

// TypeScript allows extending existing module declarations.
//
// Commonly used in libraries/frameworks.
//
// Example:
//
// declare module "some-library" {
//   interface Config {
//     customOption: boolean;
//   }
// }
//
// This is an advanced feature.
// Know the concept; implementation is library-specific.


// ------------------------------------------------------------
// 23. `declare` — BASIC IDEA
// ------------------------------------------------------------

// `declare` tells TypeScript that something exists elsewhere.
//
// Example:
//
// declare const API_URL: string;
//
// TypeScript knows the variable exists,
// but does not generate JavaScript for it.


// ------------------------------------------------------------
// 24. GLOBAL TYPE DECLARATION
// ------------------------------------------------------------

// In a .d.ts file:
//
// declare global {
//   interface Window {
//     customValue: string;
//   }
// }
//
// This extends global types.
//
// Usually used for:
// - Browser globals
// - Third-party libraries
// - Environment-specific variables


// ------------------------------------------------------------
// 25. TYPE-ONLY EXPORT
// ------------------------------------------------------------

export type UserId = number;

export interface ProductData {
  id: number;
  name: string;
}


// ------------------------------------------------------------
// 26. ASYNC FUNCTION WITH GENERIC
// ------------------------------------------------------------

async function fetchResource<T>(
  url: string,
): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Request failed");
  }

  return response.json() as Promise<T>;
}


// Usage:
//
// const userData = await fetchResource<ApiUser>(
//   "/api/user",
// );
//
// const productData = await fetchResource<Product>(
//   "/api/product",
// );


// ------------------------------------------------------------
// 27. API RESPONSE WITH STATUS
// ------------------------------------------------------------

type Success<T> = {
  success: true;
  data: T;
};

type Failure = {
  success: false;
  error: string;
};

type Result<T> = Success<T> | Failure;

function handleResult<T>(
  result: Result<T>,
): T | null {
  if (result.success) {
    return result.data;
  }

  console.log(result.error);

  return null;
}


// Example:

const userResult: Result<ApiUser> = {
  success: true,
  data: {
    id: 1,
    name: "Touhid",
    email: "touhid@example.com",
  },
};

const resultUser = handleResult(userResult);


// ------------------------------------------------------------
// 28. API PAGINATION TYPE
// ------------------------------------------------------------

type PaginatedResponse<T> = {
  data: T[];
  page: number;
  limit: number;
  total: number;
};

const usersPage: PaginatedResponse<ApiUser> = {
  data: [
    {
      id: 1,
      name: "Rahim",
      email: "rahim@example.com",
    },
  ],
  page: 1,
  limit: 10,
  total: 1,
};


// ------------------------------------------------------------
// 29. API TYPE REUSE
// ------------------------------------------------------------

type ProductResponse =
  ApiResponse<Product>;

const productResponse: ProductResponse = {
  data: {
    id: 1,
    name: "Laptop",
    price: 80000,
  },
  status: 200,
  message: "Success",
};


// ------------------------------------------------------------
// 30. PRACTICAL API FLOW
// ------------------------------------------------------------

type LoginInput = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
  user: ApiUser;
};

async function login(
  input: LoginInput,
): Promise<LoginResponse> {
  const response = await fetch(
    "https://api.example.com/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    },
  );

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json() as Promise<LoginResponse>;
}


// ============================================================
// INTERVIEW
// ============================================================

// Q1. What is the difference between named and default
// exports?
//
// Named:
// - Multiple allowed.
// - Imported using the exact exported name.
//
// Default:
// - One default export per module.
// - Can be imported with any local name.
//
// ------------------------------------------------------------

// Q2. What does `import type` do?
//
// Imports something only for TypeScript's type system.
//
// It is useful when the imported value does not need to
// exist at runtime.
//
// ------------------------------------------------------------

// Q3. How do you type an async function?
//
// Use Promise<T>.
//
// Example:
//
// async function getUser(): Promise<User> {
//   ...
// }
//
// ------------------------------------------------------------

// Q4. Is `response.json()` automatically type-safe?
//
// No.
//
// TypeScript cannot verify the structure of external JSON
// at runtime.
//
// Runtime validation requires actual validation logic/library.
//
// ------------------------------------------------------------

// Q5. Why use generics for API functions?
//
// One reusable function can work with different response
// types while preserving type information.
//
// Example:
//
// request<User>("/users/1")
// request<Product>("/products/1")
//
// ------------------------------------------------------------

// Q6. What is the purpose of `.d.ts` files?
//
// They contain type declarations without normal runtime
// implementation.
//
// Commonly used for:
// - Libraries
// - Global variables
// - Third-party packages
// - Environment-specific types
//
// ------------------------------------------------------------

// Q7. What is `declare`?
//
// It tells TypeScript that something exists elsewhere,
// without providing its runtime implementation.
//
// ------------------------------------------------------------

// Q8. What is Promise.all()?
//
// Runs multiple promises concurrently and resolves when
// all of them resolve.
//
// The result is an array/tuple of their resolved values.
//
// ------------------------------------------------------------

// Q9. Why should API errors be handled?
//
// Network requests can fail because of:
// - HTTP errors
// - Network problems
// - Invalid responses
// - Server failures
//
// Proper error handling makes the application predictable.
//
// ------------------------------------------------------------

// Q10. What is the benefit of typing API request/response data?
//
// It provides:
// - Autocomplete
// - Compile-time checking
// - Safer refactoring
// - Clear API contracts
//
// But external data should still be validated at runtime.
//
// ============================================================
