trigger UpdateOrderStatus on Custom_Order__c(after update) {
  System.debug('trigger UpdateOrderStatus');

  if (!HelperForCustomOrderTrigger.firstcall) {
    HelperForCustomOrderTrigger.firstcall = true;
    if (Trigger.new != null) {
      System.debug('Trigger.new != null');
      HelperForCustomOrderTrigger.updateStatus(Trigger.new);
    }
  }
}
