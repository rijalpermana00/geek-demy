const Programee = require("./programme");
const Bill = require("./bill");
const Coupon = require("./coupon");
const Cart = require("./cart");
const Membership = require("./membership");
const CMD_ADD_PROGRAMME = 'ADD_PROGRAMME';
const CMD_APPLY_COUPON = 'APPLY_COUPON';
const CMD_ADD_PRO_MEMBERSHIP = 'ADD_PRO_MEMBERSHIP';

class Main{
    
    constructor(){
        this.programee = new Programee();
        this.cart = new Cart();
        this.coupon = new Coupon(this.cart);
        this.bill = new Bill(this);
        this.membership = new Membership(this.cart);
    }
    
    main(payload){
        const lines = payload.toString().split(/\r?\n/);
        lines.forEach((line, i) => {
            let inputLine = line;
            this.commands(inputLine)
        });
    }
    
    commands(input){
        const [action, ...params] = input.split(' ');
        switch(action.toUpperCase()){
            case CMD_ADD_PROGRAMME: 
                this.cart.add(...params)
                break;
            case CMD_APPLY_COUPON:
                this.coupon.eligibility(...params)
                break;
            case CMD_ADD_PRO_MEMBERSHIP:
                this.membership.apply(...params)
                break;
            default:
                this.bill.print()
        }
    }
}

module.exports = Main;
