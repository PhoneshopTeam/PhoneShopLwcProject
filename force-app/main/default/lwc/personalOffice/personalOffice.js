import {
  LightningElement,
  wire,
} from "lwc";
import getOrders from "@salesforce/apex/CustomOrderController.getOrders";
import getCases from "@salesforce/apex/CaseController.getCases";
import getDeliveryAdress from "@salesforce/apex/ContactController.getDeliveryAdress";
import {
  updateRecord
} from 'lightning/uiRecordApi';
import {
  deleteRecord
} from 'lightning/uiRecordApi';
import {
  refreshApex
} from '@salesforce/apex';
import {
  ShowToastEvent
} from 'lightning/platformShowToastEvent';

const actions = [{
  label: "View",
  name: "view"
}, {
  label: "Add new case",
  name: "new"
}];

const actions2 = [{
  label: "View",
  name: "view"
}];

const actions3 = [{
  label: "Delete",
  name: "delete"
}];

const COLS = [{
    label: "Order Number",
    fieldName: "Order_Number__c",
    hideDefaultActions: true
  },
  {
    label: "Total Cost",
    fieldName: "Total_Amount__c",
    type: "currency",
    hideDefaultActions: true
  },
  {
    label: "Delivery date",
    fieldName: "Delivery_date__c",
    hideDefaultActions: true
  },
  {
    label: "Order Status",
    fieldName: "Status__c",
    hideDefaultActions: true
  },
  {
    type: "action",
    typeAttributes: {
      rowActions: actions
    }
  }
];

const COLS2 = [{
    label: "Case Number",
    fieldName: "CaseNumber",
    hideDefaultActions: true
  },
  {
    label: "Case Status",
    fieldName: "Status",
    hideDefaultActions: true
  },
  {
    type: "action",
    typeAttributes: {
      rowActions: actions2
    }
  }
];

const COLS3 = [{
    label: "Country",
    fieldName: "Country__c",
    hideDefaultActions: true,
    editable: true
  },
  {
    label: "State",
    fieldName: "State__c",
    hideDefaultActions: true,
    editable: true
  },
  {
    label: "City",
    fieldName: "City__c",
    hideDefaultActions: true,
    editable: true
  },
  {
    label: "Street",
    fieldName: "Street__c",
    hideDefaultActions: true,
    editable: true
  },
  {
    label: "PostalCode",
    fieldName: "PostalCode__c",
    hideDefaultActions: true,
    editable: true
  },
  {
    type: "action",
    typeAttributes: {
      rowActions: actions3
    }
  }
];

export default class PersonalOffice extends LightningElement {
  //@api
  contactId = "0032w00000FyKrCAAV";
  orderId;
  caseId;
  error;

  isHideOrders = false;
  isHideCases = false;
  isOrderModalOpen = false;
  isCaseModalOpen = false;
  isCaseInfoModalOpen = false;
  isHideNewAddressButton = false;

  columnsForOrders = COLS;
  columnsForCases = COLS2;
  columnsForAdreses = COLS3;

  labelOfOrderButton = "Show all my orders";
  labelOfCaseButton = "Show all my cases";
  labelOfAddressesButton = "Show my addresses";

  draftValues = [];

  @wire(getOrders, {
    contactId: "$contactId"
  }) orders;

  @wire(getCases, {
    contactId: "$contactId"
  }) cases;

  @wire(getDeliveryAdress, {
    contactId: "$contactId"
  }) addresses;


  handleViewOrders() {
    this.isHideOrders = this.isHideOrders ? false : true;
    this.labelOfOrderButton = this.isHideOrders ?
      "Hide all my orders" :
      "Show all my orders";
  }

  handleViewCases() {
    this.isHideCases = this.isHideCases ? false : true;
    this.labelOfCaseButton = this.isHideCases ?
      "Hide all my cases" :
      "Show all my cases";
  }

  handleViewAddresses() {

    this.isHideAddresses = this.isHideAddresses ? false : true;
    this.labelOfAddressesButton = this.isHideAddresses ?
      "Hide my addresses" :
      "Show my addresses";
  }

  refresh() {
    return refreshApex(this.addresses);
  }

  handleSave(event) {
    console.log('handleSave');
    const recordInputs = event.detail.draftValues.slice().map(draft => {
      const fields = Object.assign({}, draft);
      return {
        fields
      };
    });
    const promises = recordInputs.map(recordInput => updateRecord(recordInput));

    Promise.all(promises).then(() => {
      this.dispatchEvent(
        new ShowToastEvent({
          title: 'Success',
          message: 'Address updated',
          variant: 'success'
        })
      );
      this.draftValues = [];

      return refreshApex(this.addresses);
    }).catch(error => {
      this.dispatchEvent(
        new ShowToastEvent({
          title: 'Error updating record',
          message: error.body.message,
          variant: 'error'
        })
      );
    });
  }

  navigateToOrderRecord(event) {

    const actionName = event.detail.action.name;
    this.orderId = event.detail.row.Id;

    switch (actionName) {
      case "view":
        this.openOrderModal();
        break;
      case "new":
        this.isCaseModalOpen = true;
        break;
      default:
    }
  }

  navigateToCaseRecord(event) {
    // const actionName = event.detail.action.name;
    this.caseId = event.detail.row.Id;
    this.isCaseInfoModalOpen = true;
  }

  actionWithAddressRecord(event) {
    const row = event.detail.row;

    deleteRecord(row.Id)
      .then(() => {
        this.dispatchEvent(
          new ShowToastEvent({
            title: 'Success',
            message: 'Record deleted',
            variant: 'success'
          })
        );
        return refreshApex(this.addresses);
      })
      .catch(error => {
        this.dispatchEvent(
          new ShowToastEvent({
            title: 'Error deleting record',
            message: error.body.message,
            variant: 'error'
          })
        );
      });
    console.log('this.addresses' + JSON.stringify(this.addresses.data));
  }

  openOrderModal(event) {
    if (event) {
      this.orderId = event.detail;
    }
    this.isOrderModalOpen = true;
  }

  closeOrderModal() {
    this.isOrderModalOpen = false;
  }

  closeCaseModal() {
    this.isCaseModalOpen = false;
  }

  closeCaseInfoModal() {
    this.isCaseInfoModalOpen = false;
  }
}