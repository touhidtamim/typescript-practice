// ============================================================
// CLASSES & OOP
// ============================================================


// ------------------------------------------------------------
// 1. BASIC CLASS
// ------------------------------------------------------------

class UserAccount {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(): string {
    return `Hello, ${this.name}`;
  }
}

const accountOne = new UserAccount("Touhid", 23);

console.log(accountOne.greet());


// ------------------------------------------------------------
// 2. ACCESS MODIFIERS
// ------------------------------------------------------------

// public    -> accessible everywhere
// private   -> accessible only inside the class
// protected -> accessible inside class + subclasses

class BankAccount {
  public owner: string;
  private balance: number;
  protected accountType: string;

  constructor(owner: string, balance: number) {
    this.owner = owner;
    this.balance = balance;
    this.accountType = "standard";
  }

  getBalance(): number {
    return this.balance;
  }
}

const bankAccount = new BankAccount("Touhid", 50000);

console.log(bankAccount.owner);
console.log(bankAccount.getBalance());

// bankAccount.balance; // Error
// bankAccount.accountType; // Error


// ------------------------------------------------------------
// 3. PRIVATE METHODS
// ------------------------------------------------------------

class PaymentService {
  private validateAmount(amount: number): boolean {
    return amount > 0;
  }

  pay(amount: number): void {
    if (this.validateAmount(amount)) {
      console.log(`Paid ${amount}`);
    }
  }
}

const payment = new PaymentService();

payment.pay(1000);


// ------------------------------------------------------------
// 4. PROTECTED
// ------------------------------------------------------------

class Vehicle {
  protected brand: string;

  constructor(brand: string) {
    this.brand = brand;
  }
}

class Car extends Vehicle {
  drive(): void {
    console.log(`${this.brand} is driving`);
  }
}

const car = new Car("Toyota");

car.drive();

// car.brand; // Error


// ------------------------------------------------------------
// 5. PUBLIC IS DEFAULT
// ------------------------------------------------------------

class ProductItem {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const productItem = new ProductItem("Laptop");

console.log(productItem.name);


// ------------------------------------------------------------
// 6. PARAMETER PROPERTIES
// ------------------------------------------------------------

// TypeScript shorthand for declaring + initializing properties.

class Customer {
  constructor(
    public name: string,
    public email: string,
    private password: string,
  ) {}

  login(): void {
    console.log(`${this.name} logged in`);
  }
}

const customer = new Customer(
  "Rahim",
  "rahim@example.com",
  "secret123",
);

customer.login();


// ------------------------------------------------------------
// 7. READONLY PROPERTY
// ------------------------------------------------------------

class Order {
  readonly orderId: number;
  customerName: string;

  constructor(orderId: number, customerName: string) {
    this.orderId = orderId;
    this.customerName = customerName;
  }
}

const order = new Order(1001, "Karim");

// order.orderId = 2002; // Error


// ------------------------------------------------------------
// 8. GETTERS
// ------------------------------------------------------------

class Employee {
  constructor(
    private firstName: string,
    private lastName: string,
  ) {}

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

const employee = new Employee("Hasan", "Ali");

console.log(employee.fullName);


// ------------------------------------------------------------
// 9. SETTERS
// ------------------------------------------------------------

class UserSettings {
  private _username: string = "";

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    if (value.length < 3) {
      throw new Error("Username is too short");
    }

    this._username = value;
  }
}

const settings = new UserSettings();

settings.username = "Touhid";

console.log(settings.username);


// ------------------------------------------------------------
// 10. STATIC MEMBERS
// ------------------------------------------------------------

// Belongs to the class itself, not individual objects.

class Counter {
  static count: number = 0;

  constructor() {
    Counter.count++;
  }
}

new Counter();
new Counter();
new Counter();

console.log(Counter.count);


// ------------------------------------------------------------
// 11. STATIC METHOD
// ------------------------------------------------------------

class MathHelper {
  static add(first: number, second: number): number {
    return first + second;
  }
}

console.log(MathHelper.add(10, 20));


// ------------------------------------------------------------
// 12. INHERITANCE
// ------------------------------------------------------------

class Animal {
  constructor(public name: string) {}

  move(): void {
    console.log(`${this.name} is moving`);
  }
}

class Dog extends Animal {
  bark(): void {
    console.log(`${this.name} says woof`);
  }
}

const dog = new Dog("Bruno");

dog.move();
dog.bark();


// ------------------------------------------------------------
// 13. METHOD OVERRIDING
// ------------------------------------------------------------

class BaseNotification {
  send(): void {
    console.log("Sending notification");
  }
}

class EmailNotification extends BaseNotification {
  override send(): void {
    console.log("Sending email");
  }
}

const emailNotification = new EmailNotification();

emailNotification.send();


// ------------------------------------------------------------
// 14. `override` KEYWORD
// ------------------------------------------------------------

// `override` explicitly tells TypeScript that a method
// is overriding a parent class method.
//
// Requires the parent method to actually exist.

class ParentService {
  start(): void {
    console.log("Service started");
  }
}

class ChildService extends ParentService {
  override start(): void {
    console.log("Child service started");
  }
}


// ------------------------------------------------------------
// 15. ABSTRACT CLASS
// ------------------------------------------------------------

// Cannot be instantiated directly.
// Used as a base class.

abstract class Shape {
  abstract getArea(): number;

  describe(): void {
    console.log("This is a shape");
  }
}

class Rectangle extends Shape {
  constructor(
    private width: number,
    private height: number,
  ) {
    super();
  }

  getArea(): number {
    return this.width * this.height;
  }
}

const rectangle = new Rectangle(10, 20);

console.log(rectangle.getArea());
rectangle.describe();

// const shape = new Shape(); // Error


// ------------------------------------------------------------
// 16. ABSTRACT PROPERTY
// ------------------------------------------------------------

abstract class Database {
  abstract connect(): void;

  disconnect(): void {
    console.log("Database disconnected");
  }
}

class MongoDatabase extends Database {
  connect(): void {
    console.log("Connected to MongoDB");
  }
}

const database = new MongoDatabase();

database.connect();
database.disconnect();


// ------------------------------------------------------------
// 17. INTERFACE WITH CLASS
// ------------------------------------------------------------

interface Printable {
  print(): void;
}

class Invoice implements Printable {
  print(): void {
    console.log("Printing invoice");
  }
}

const invoice = new Invoice();

invoice.print();


// ------------------------------------------------------------
// 18. CLASS IMPLEMENTING MULTIPLE INTERFACES
// ------------------------------------------------------------

interface Serializable {
  serialize(): string;
}

interface Loggable {
  log(): void;
}

class Report implements Serializable, Loggable {
  serialize(): string {
    return "report-data";
  }

  log(): void {
    console.log("Report logged");
  }
}

const report = new Report();

report.serialize();
report.log();


// ------------------------------------------------------------
// 19. INTERFACE + PROPERTIES
// ------------------------------------------------------------

interface AuthUser {
  id: number;
  name: string;
  login(): void;
}

class Admin implements AuthUser {
  constructor(
    public id: number,
    public name: string,
  ) {}

  login(): void {
    console.log(`${this.name} logged in`);
  }
}

const admin = new Admin(1, "Touhid");

admin.login();


// ------------------------------------------------------------
// 20. POLYMORPHISM
// ------------------------------------------------------------

// Same interface/base type can refer to different implementations.

interface PaymentMethod {
  pay(amount: number): void;
}

class CreditCard implements PaymentMethod {
  pay(amount: number): void {
    console.log(`Paid ${amount} using credit card`);
  }
}

class PayPal implements PaymentMethod {
  pay(amount: number): void {
    console.log(`Paid ${amount} using PayPal`);
  }
}

function processPayment(
  paymentMethod: PaymentMethod,
  amount: number,
): void {
  paymentMethod.pay(amount);
}

processPayment(new CreditCard(), 1000);
processPayment(new PayPal(), 2000);


// ------------------------------------------------------------
// 21. COMPOSITION
// ------------------------------------------------------------

// Instead of inheriting behavior, a class can contain
// another object and delegate work to it.

class Engine {
  start(): void {
    console.log("Engine started");
  }
}

class CarWithEngine {
  constructor(private engine: Engine) {}

  drive(): void {
    this.engine.start();
    console.log("Car is driving");
  }
}

const engine = new Engine();
const carWithEngine = new CarWithEngine(engine);

carWithEngine.drive();


// ------------------------------------------------------------
// 22. GENERIC CLASS
// ------------------------------------------------------------

class Storage<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  getAll(): T[] {
    return this.items;
  }
}

const numberStorage = new Storage<number>();

numberStorage.add(10);
numberStorage.add(20);

const stringStorage = new Storage<string>();

stringStorage.add("A");
stringStorage.add("B");


// ------------------------------------------------------------
// 23. READONLY PARAMETER
// ------------------------------------------------------------

function printItems(items: readonly string[]): void {
  items.forEach((item) => console.log(item));

  // items.push("New"); // Error
}

printItems(["A", "B", "C"]);


// ------------------------------------------------------------
// 24. PRIVATE CONSTRUCTOR
// ------------------------------------------------------------

// Prevents direct object creation from outside the class.

class Singleton {
  private static instance: Singleton;

  private constructor() {}

  static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }

    return Singleton.instance;
  }
}

const firstInstance = Singleton.getInstance();
const secondInstance = Singleton.getInstance();

console.log(firstInstance === secondInstance);
// true


// ============================================================
// INTERVIEW
// ============================================================

// Q1. What are access modifiers in TypeScript?
//
// public:
// Accessible everywhere.
//
// private:
// Accessible only inside the class.
//
// protected:
// Accessible inside the class and subclasses.
//
// ------------------------------------------------------------

// Q2. What is inheritance?
//
// A class can reuse and extend properties/methods from
// another class using `extends`.
//
// ------------------------------------------------------------

// Q3. What is method overriding?
//
// A child class provides its own implementation of a
// method inherited from the parent class.
//
// ------------------------------------------------------------

// Q4. What does `override` do?
//
// Explicitly indicates that a child method overrides a
// parent method.
//
// It helps TypeScript catch accidental method names.
//
// ------------------------------------------------------------

// Q5. What is an abstract class?
//
// A class that cannot be instantiated directly.
//
// It can contain both implemented methods and abstract
// members that subclasses must implement.
//
// ------------------------------------------------------------

// Q6. Interface vs abstract class?
//
// Interface:
// - Defines a contract.
// - No runtime implementation.
// - A class can implement multiple interfaces.
//
// Abstract class:
// - Can contain implementation/state.
// - Can have constructors.
// - A class can extend only one class.
//
// ------------------------------------------------------------

// Q7. What is polymorphism?
//
// Different implementations can be used through the same
// common interface/base type.
//
// ------------------------------------------------------------

// Q8. What is encapsulation?
//
// Keeping internal state/implementation details protected
// and exposing only the required interface.
//
// private/protected members help achieve this.
//
// ------------------------------------------------------------

// Q9. What is composition?
//
// Building a class using other objects instead of relying
// primarily on inheritance.
//
// Example:
// Car has an Engine.
//
// ------------------------------------------------------------

// Q10. What is a static member?
//
// A member that belongs to the class itself rather than
// individual instances.
//
// Example:
// MathHelper.add()
//
// ------------------------------------------------------------

// Q11. What is a getter/setter?
//
// Getter:
// Provides controlled access to a property.
//
// Setter:
// Controls how a property is changed.
//
// ------------------------------------------------------------

// Q12. Can a TypeScript class implement multiple interfaces?
//
// Yes.
//
// class User implements A, B {}
//
// But a class can extend only one class.
//
// ------------------------------------------------------------
