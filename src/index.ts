import { v4 as uuidv4 } from 'uuid';

class Item {
    constructor(
    private _name: string,
    private _price: number,
    private _description: string,
    private _id: string = uuidv4()
) 
{

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
   

    constructor(
    private _name: string,
    private _age: number,
    private _cart: Item[] = [],
    private _id = uuidv4()
) {

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
const user = new User("Alice", 30);

user.addToCart(shop.items[0]);
user.addToCart(shop.items[1]);
user.addToCart(shop.items[2]);
user.addToCart(shop.items[2]);
user.removeFromCart(shop.items[0]);
user.removeQuantityFromCart(shop.items[1], 1);
user.printCart();