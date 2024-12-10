import { Observable } from '@nativescript/core';
import { NavigationService } from '../../services/navigation-service';
import { Product } from '../../models/product';

export class AdminViewModel extends Observable {
    private _products: Array<Product> = [];
    private _selectedTab: number = 0;

    constructor() {
        super();
        this.loadProducts();
    }

    get products(): Array<Product> {
        return this._products;
    }

    get selectedTab(): number {
        return this._selectedTab;
    }

    set selectedTab(value: number) {
        if (this._selectedTab !== value) {
            this._selectedTab = value;
            this.notifyPropertyChange('selectedTab', value);
        }
    }

    onLogout() {
        NavigationService.logout();
    }

    private async loadProducts() {
        // Simulate loading products
        this._products = [
            {
                id: '1',
                name: 'Luvas Descartáveis',
                quantity: 500,
                unit: 'unit',
                location: 'A3',
                monthlyEntries: 1000,
                monthlyExits: 500,
                balance: 500
            },
            // Add more sample products as needed
        ];
        this.notifyPropertyChange('products', this._products);
    }
}