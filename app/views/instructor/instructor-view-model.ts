import { Observable } from '@nativescript/core';
import { NavigationService } from '../../services/navigation-service';
import { RequestService } from '../../services/request-service';
import { MaterialRequest } from '../../models/request';

export class InstructorViewModel extends Observable {
    private _myRequests: Array<MaterialRequest> = [];
    private _selectedTab: number = 0;
    private requestService: RequestService;

    constructor() {
        super();
        this.requestService = new RequestService();
        this.loadMyRequests();
    }

    get myRequests(): Array<MaterialRequest> {
        return this._myRequests;
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

    private async loadMyRequests() {
        const instructorId = global.userModel.currentUser?.id;
        if (instructorId) {
            this._myRequests = await this.requestService.getRequestsByInstructor(instructorId);
            this.notifyPropertyChange('myRequests', this._myRequests);
        }
    }
}