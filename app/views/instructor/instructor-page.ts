import { NavigatedData, Page } from '@nativescript/core';
import { InstructorViewModel } from './instructor-view-model';

export function navigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new InstructorViewModel();
}