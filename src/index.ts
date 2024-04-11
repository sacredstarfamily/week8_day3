import {v4 as uuidv4} from 'uuid';

type Item = {
    id: string;
    name: string;
    price: number;
    description: string;
    inventory: number;
};

type User = {
    id: string;
    name: string;
    age: number;
    cart: Item[];
};

function createUser(name: string, age: number): User {
    return {
        id: uuidv4(),
        name,
        age,
        cart: [],
    };
}

function createItem(name: string, price: number, description: string, inventory:number): Item {
    return {
        id: uuidv4(),
        name,
        price,
        description,
        inventory,
    };
}

function addToCart(item: Item, user: User): void {
    user.cart.push(item);
}

function removeAllOfItemFromCart(item: Item, user: User): void {
    user.cart = user.cart.filter((cartItem) => cartItem.id !== item.id);
}
function removeOneOccurrence(item: Item, user: User): void {
    const index = user.cart.findIndex((cartItem) => cartItem.id === item.id);
    if (index !== -1) {
        user.cart.splice(index, 1);
    }
}
function countItemOccurrences(item: Item, user: User): number {
    return user.cart.filter((cartItem) => cartItem.id === item.id).length;
}
function removeItemQuantity(item: Item, user: User, count: number): void {
    const occurrences = countItemOccurrences(item, user);
    const removeCount = Math.min(occurrences, count);
    for (let i = 0; i < removeCount; i++) {
        removeOneOccurrence(item, user);
    }
}
function cartTotal(user: User): number {
    return user.cart.reduce((total, item) => total + item.price, 0);
}

function printCart(user: User): void {
    console.log(`${user.name} Cart:`);
    user.cart.forEach((item) => {
        console.log(`- ${item.name}: $${item.price}`);
    });
}

// Driver Code
const user = createUser("Alice Goodtimes", 25);
const shoes = createItem("Shoes", 10, "A lovely pair of shoes!", 100);
const hat = createItem("Hat", 15, "A lovely hat!", 100);
const jacket = createItem("Jacket", 20, "This is a lovely jacket!", 100);

addToCart(shoes, user);
console.log("User's Cart after adding Shoes:");
printCart(user);
console.log("Total of User's Cart:", cartTotal(user));

addToCart(hat, user);
addToCart(hat, user);
addToCart(hat, user);
console.log(`${user.name} Cart after adding 3 Hats:`);
printCart(user);
console.log("Total of User's Cart:", cartTotal(user));

addToCart(jacket, user);
addToCart(jacket, user);
addToCart(jacket, user);
console.log(`${user.name} Cart after adding 3 Jackets:`);
printCart(user);
console.log("Total of User's Cart:", cartTotal(user));

removeAllOfItemFromCart(hat, user);
console.log(`${user.name} Cart after removing Hat:`);
printCart(user);
console.log("Total of User's Cart:", cartTotal(user));
console.log("Number of Hats in User's Cart:", countItemOccurrences(jacket, user));
removeItemQuantity(jacket, user, 2);
printCart(user);
console.log("User's Cart after removing 2 Jackets:", cartTotal(user));

