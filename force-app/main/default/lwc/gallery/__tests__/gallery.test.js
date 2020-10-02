import { createElement } from 'lwc';
import Gallery from 'c/gallery';
//import { registerTestWireAdapter } from '@salesforce/sfdx-lwc-jest';

/*// Mock realistic data
const mockCurrentPageReference = require('./data/CurrentPageReference.json');

// Register a standard test wire adapter.
const currentPageReferenceAdapter = registerTestWireAdapter(CurrentPageReference);*/

describe('c-gallery', () => {
  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it('test search form attributes', () => {
    const element = createElement('c-gallery', {
      is: Gallery
    });
    document.body.appendChild(element);

    // Select element for validation
    const mobileSearchFormElement = element.shadowRoot.querySelector('c-mobile-search-form');
    //const listMobilesElement = element.shadowRoot.querySelector('c-list-Mobiles');
    expect(mobileSearchFormElement.selectedBySort).toBe('');

    // Emit data from @wire
    /*currentPageReferenceAdapter.emit(mockCurrentPageReference);
  
    return Promise.resolve().then(() => {
      expect(preElement.textContent).toBe(
        JSON.stringify(mockCurrentPageReference, null, 2)
      );
    });*/
  });
});