import { createElement } from 'lwc';
import ListMobiles from 'c/listMobiles';
import { getListUi } from 'lightning/uiListApi';
import { registerLdsTestWireAdapter } from '@salesforce/sfdx-lwc-jest';

// Mock realistic data
const mockGetListUi = require('./data/getListUi.json');

// Register a standard test wire adapter.
const getListUiAdapter = registerTestWireAdapter(mockGetListUi);

describe('c-list-mobiles', () => {
  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it('@wire getMobilesList mobiles data', () => {
    const element = createElement('c-list-mobiles', {
      is: ListMobiles
    });
    document.body.appendChild(element);

    getListUiAdapter.emit(mockGetListUi);

    return Promise.resolve().then(() => {
        // Select elements for validation
        const contactEls = element.shadowRoot.querySelectorAll('p');
        expect(contactEls.length).toBe(mockGetListUi.records.count);
        expect(contactEls[0].textContent).toBe(
            mockGetListUi.records.records[0].fields.Name.value
        );
    });
  });
});