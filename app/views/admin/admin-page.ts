import { NavigatedData, Page } from '@nativescript/core';
import { AdminViewModel } from './admin-view-model';

export function navigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new AdminViewModel();
}