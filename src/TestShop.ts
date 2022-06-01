import { Component } from '@martinrossil/components';
import { Product, ProductInterface } from '@martinrossil/domain';

export default class TestShop extends Component {
    public product: ProductInterface;
    public constructor() {
        super();
        this.product = new Product('name', 123);
        console.log('TestShop 2');
        this.testAsync();
    }

    private async testAsync(): Promise<boolean> {
        return await new Promise(() => true);
    }
}
customElements.define('test-shop', TestShop);
