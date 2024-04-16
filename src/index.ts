import { v4 as uuidv4 } from 'uuid';

class Item {
    constructor(name: string, price: number, description: string) {
        private _id: string = uuidv4();
        private _name: string;
        private _price: number;
        private _description: string;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    get price(): number {
        return this._price;
    }

    set price(price: number) {
        this._price = price;
    }

    get description(): string {
        return this._description;
    }

    set description(description: string) {
        this._description = description;
    }
}

class User {
   

    constructor(name: string, age: number) {
       private _id = uuidv4();
       private _name: string = name;
       private _age: number = age;
       private _cart: Items[] = [];
    }

    get id(): string {
        return this._id;
    }
    set id(id: string) {
        this._id = id;
    }
    
    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    get age(): number {
        return this._age;
    }

    set age(age: number) {
        this._age = age;
    }

    get cart(): Item[] {
        return this._cart;
    }

   public addToCart(item: Item): void {
        this._cart.push(item);
    }

   public removeFromCart(item: Item): void {
        this._cart = this._cart.filter((cartItem) => cartItem.id !== item.id);
    }

   public removeQuantityFromCart(item: Item, quantity: number): void {
        let count = 0;
        this._cart = this._cart.filter((cartItem) => {
            if (cartItem.id === item.id && count < quantity) {
                count++;
                return false;
            }
            return true;
        });
    }

   public cartTotal(): number {
        return this._cart.reduce((total, item) => total + item.price, 0);
    }

    public printCart(): void {
        console.log(`${this._name}'s Cart:`);
        this._cart.forEach((item) => {
            console.log(`- ${item.name}: $${item.price}`);
        });
    }
}

class Shop {
    private _items: Item[];

    constructor() {
        this._items = [
            new Item("Shoes", 10, "A lovely pair of shoes!"),
            new Item("Hat", 15, "A lovely hat!"),
            new Item("Jacket", 20, "This is a lovely jacket!")
        ];
    }

    get items(): Item[] {
        return this._items;
    }
}

// Driver Code
const shop = new Shop();
const user = new User("Alice Goodtimes", 25);

const shoes = shop.items.find((item) => item.name === "Shoes");
if (shoes) {
    user.addToCart(shoes);
}

console.log("User's Cart after adding Shoes:");
user.printCart();
console.log("Total of User's Cart:", user.cartTotal());

const hat = shop.items.find((item) => item.name === "Hat");
if (hat) {
    user.addToCart(hat);
    user.addToCart(hat);
    user.addToCart(hat);
}

console.log(`${user.name}'s Cart after adding 3 Hats:`);
user.printCart();
console.log("Total of User's Cart:", user.cartTotal());

const jacket = shop.items.find((item) => item.name === "Jacket");
if (jacket) {
    user.addToCart(jacket);
    user.addToCart(jacket);
    user.addToCart(jacket);
}

console.log(`${user.name}'s Cart after adding 3 Jackets:`);
user.printCart();
console.log("Total of User's Cart:", user.cartTotal());

user.removeFromCart(hat);
console.log(`${user.name}'s Cart after removing Hat:`);
user.printCart();
console.log("Total of User's Cart:", user.cartTotal());

console.log("Number of Hats in User's Cart:", user.cart.filter((item) => item.name === "Hat").length);
user.removeQuantityFromCart(jacket, 2);
user.printCart();
console.log("User's Cart after removing 2 Jackets:");
console.log("Total of User's Cart:", user.cartTotal());
console.log(`${user.name}'s Cart before removing all Hats:`);
user.printCart();
console.log("Total of User's Cart:", user.cartTotal());

user.removeFromCart(hat);
console.log(`${user.name}'s Cart after removing all Hats:`);
user.printCart();
console.log("Total of User's Cart:", user.cartTotal());

console.log("Number of Hats in User's Cart:", user.cart.filter((item) => item.name === "Hat").length);

user.removeQuantityFromCart(jacket, 2);
console.log(`${user.name}'s Cart after removing 2 Jackets:`);
user.printCart();
console.log("Total of User's Cart:", user.cartTotal());