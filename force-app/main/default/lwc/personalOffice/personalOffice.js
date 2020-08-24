import { LightningElement, api, wire } from "lwc";
import getOrders from "@salesforce/apex/CustomOrderController.getOrders";
import getCases from "@salesforce/apex/CaseController.getCases";
import { encodeDefaultFieldValues } from "lightning/pageReferenceUtils";
import { NavigationMixin } from "lightning/navigation";

const actions = [
  {
    label: "View",
    name: "view"
  },
  {
    label: "Add new case",
    name: "new"
  }
];

const actions2 = [
  {
    label: "View",
    name: "view"
  }
];

const COLS = [
  {
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

const COLS2 = [
  {
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

export default class PersonalOffice extends NavigationMixin(LightningElement) {
  //@api
  contactId = "0032w00000FyKrCAAV";
  isHideOrders = false;
  isHideCases = false;
  orders;
  columnsForOrders = COLS;
  columnsForCases = COLS2;
  cases;
  labelOfOrderButton = "Show all my orders";
  labelOfCaseButton = "Show all my cases";

  @wire(getOrders, {
    contactId: "$contactId"
  })
  wiredOrders({ error, data }) {
    if (data) {
      this.orders = data;
      this.error = undefined;
    } else if (error) {
      this.error = error;
      this.orders = undefined;
      console.log("error====>");
    }
  }

  @wire(getCases, {
    contactId: "$contactId"
  })
  wiredCases({ error, data }) {
    if (data) {
      this.cases = data;
      this.error = undefined;
    } else if (error) {
      this.error = error;
      this.cases = undefined;
      console.log("error====>");
    }
  }

  handleViewOrders() {
    this.isHideOrders = this.isHideOrders ? false : true;
    this.labelOfOrderButton = this.isHideOrders
      ? "Hide all my orders"
      : "Show all my orders";
  }

  handleViewCases() {
    this.isHideCases = this.isHideCases ? false : true;
    this.labelOfCaseButton = this.isHideCases
      ? "Hide all my cases"
      : "Show all my cases";
  }

  navigateToOrderRecord(event) {
    const row = event.detail.row;
    const actionName = event.detail.action.name;

    const defaultValues = encodeDefaultFieldValues({
      Custom_OrderId__c: row.Id,
      ContactId: this.contactId
    });

    switch (actionName) {
      case "view":
        this[NavigationMixin.Navigate]({
          type: "standard__recordPage",
          attributes: {
            recordId: row.Id,
            objectApiName: "Custom_Order__c",
            actionName: actionName
          }
        });
        break;
      case "new":
        this[NavigationMixin.Navigate]({
          type: "standard__objectPage",
          attributes: {
            objectApiName: "Case",
            actionName: actionName
          },
          state: {
            defaultFieldValues: defaultValues // and here we set defaults as a nav parameter
          }
        });
        break;
      default:
    }
  }

  navigateToCaseRecord(event) {
    const row = event.detail.row;
    const actionName = event.detail.action.name;

    this[NavigationMixin.Navigate]({
      type: "standard__recordPage",
      attributes: {
        recordId: row.Id,
        objectApiName: "Case",
        actionName: actionName
      }
    });
  }
}
