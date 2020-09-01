import { LightningElement, api } from 'lwc';

export default class ProductItemForBasket extends LightningElement {
    @api productId;
    @api product;
}