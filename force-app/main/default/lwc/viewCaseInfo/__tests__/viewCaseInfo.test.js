import {
    createElement
} from 'lwc';
import ViewCaseInfo from 'c/viewCaseInfo';

describe('c-view-case-info', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    describe('renders lightning-record-form', () => {
        it('renders lightning-record-form with given input values', () => {
            const RECORD_FIELDS_INPUT = [{
                    "fieldApiName": "CreatedDate",
                    "objectApiName": "Case",
                },
                {
                    "fieldApiName": "Type",
                    "objectApiName": "Case",
                },
                {
                    "fieldApiName": "Description",
                    "objectApiName": "Case",
                },
                {
                    "fieldApiName": "Status",
                    "objectApiName": "Case",

                },
            ];
            const RECORD_ID_INPUT = '5002w000008SYQlAAO';
            const OBJECT_API_NAME_INPUT = 'Case';

            // Create initial element
            const element = createElement('c-view-case-info', {
                is: ViewCaseInfo
            });
            // Set public properties
            element.caseId = RECORD_ID_INPUT;
            document.body.appendChild(element);

            // Validate if correct parameters have been passed to base components
            const formEl = element.shadowRoot.querySelector(
                'lightning-record-form'
            );
            expect(formEl.fields).toEqual(RECORD_FIELDS_INPUT);
            expect(formEl.objectApiName).toBe(OBJECT_API_NAME_INPUT);
            expect(formEl.recordId).toBe(RECORD_ID_INPUT);
        });
    });

    describe('displays content inside <span/>', () => {
        it('displays content inside <span/>', () => {
            const element = createElement('c-view-case-info', {
                is: ViewCaseInfo
            });
            document.body.appendChild(element);
            const span = element.shadowRoot.querySelector('span');
            expect(span.textContent).toBe('Close');
        });
    });

    describe('test button onclick', () => {
        it('test button onclick', () => {
            const element = createElement('c-view-case-info', {
                is: ViewCaseInfo
            });
            document.body.appendChild(element);

            const handler = jest.fn();
            element.addEventListener('close', handler);
            const btn = element.shadowRoot.querySelector('button');
            btn.click();
            return Promise.resolve().then(() => {
                expect(handler).toHaveBeenCalled();
            });
        });
    });

    describe('test lightning-button onclick', () => {
        it('test lightning-button onclick', () => {
            const element = createElement('c-view-case-info', {
                is: ViewCaseInfo
            });
            document.body.appendChild(element);

            const handler = jest.fn();
            element.addEventListener('close', handler);
            const handler2 = jest.fn();
            element.addEventListener('openorder', handler2);
            const btn = element.shadowRoot.querySelector('lightning-button');
            btn.click();
            return Promise.resolve().then(() => {
                expect(handler).toHaveBeenCalled();
                expect(handler2).toHaveBeenCalled();
            });
        });
    });
});