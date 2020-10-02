trigger UpdateOrderStatus on Custom_Order__c(after update) {
  System.debug('trigger 1');

  if (!HelperForCustomOrderTrigger.firstcall) {
    HelperForCustomOrderTrigger.firstcall = true;
    if (Trigger.new != null) {
      System.debug('Trigger 2');
      HelperForCustomOrderTrigger.updateStatus(Trigger.new);
    }
  }
  System.debug('trigger 3');
}