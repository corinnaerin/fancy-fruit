import { createSelector, Selector } from 'reselect';
import ApplicationState from '../model/application-state';
import DateRange from '../../../common/date-range';

export const selectSearchQuery: Selector<ApplicationState, Partial<DateRange>> = (state: ApplicationState) => state.searchQuery;

export const selectStartDate = createSelector(
    selectSearchQuery,
    (searchQuery) => searchQuery.startDate
);

export const selectEndDate = createSelector(
    selectSearchQuery,
    (searchQuery) => searchQuery.endDate
);

export const selectStartDateNative = createSelector(
    selectStartDate,
    (startDate) => startDate && startDate.toDate()
);

export const selectEndDateNative = createSelector(
    selectEndDate,
    (endDate) => endDate && endDate.toDate()
);
