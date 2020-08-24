public with sharing class CustomOrderController {
  @AuraEnabled(cacheable=true)
  public static List<Custom_Order__c> getOrders(String contactId) {
    List<Custom_Order__c> orders = [
      SELECT Id, Order_Number__c, Status__c, Total_Amount__c
      FROM Custom_Order__c
      WHERE ContactId__c = :contactId
    ];

    if (orders.isEmpty()) {
      throw new AuraHandledException('Forced error');
    }

    return orders;
  }
}
