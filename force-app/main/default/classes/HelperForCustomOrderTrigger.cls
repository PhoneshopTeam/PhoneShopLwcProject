public with sharing class HelperForCustomOrderTrigger {
  public static Boolean firstcall = false;

  public static void updateStatus(List<Custom_Order__c> orders) {
    System.debug('method updateStatus');
    Savepoint sp = Database.setSavepoint();
    try {
      List<Custom_Order__c> ordersToUpdate = new List<Custom_Order__c>();
      for (Custom_Order__c o : orders) {
        Custom_Order__c order = [
          SELECT Id, Status__c, Delivery_date__c, Type_of_payment__c
          FROM Custom_Order__c
          WHERE Id = :o.Id
        ];
        if (order.Delivery_date__c != null) {
          order.Status__c = 'Awaiting delivery';
          if (order.Type_of_payment__c != 'by card online') {
            order.Status__c = 'Awaiting payment';
          } else {
            order.Status__c = 'Paid';
          }
        } else {
          order.Status__c = 'Without delivery';
        }

        ordersToUpdate.add(order);
      }
      update ordersToUpdate;
    } catch (Exception e) {
      System.debug('method updateStatus catch');
      Database.rollback(sp);
      System.debug(e.getMessage());
    }
  }
}
