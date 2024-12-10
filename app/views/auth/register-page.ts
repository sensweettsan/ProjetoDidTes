import { NavigatedData, Page } from '@nativescript/core';
import { RegisterViewModel } from './register-view-model';

export function navigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new RegisterViewModel();
}