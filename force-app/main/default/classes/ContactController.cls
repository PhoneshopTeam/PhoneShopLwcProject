public with sharing class ContactController {
  @AuraEnabled(cacheable=true)
  public static List<Contact> getContacts(String contactId) {
    List<Contact> contacts = [
      SELECT FirstName, LastName, Email, Personal_discont__c
      FROM Contact
      WHERE Id = :contactId
    ];

    return contacts;
  }

  @AuraEnabled(cacheable=true)
  public static List<DeliveryAdress__c> getDeliveryAdress(String contactId) {
    List<DeliveryAdress__c> deliveryAdress = [
      SELECT
        Id,
        Country__c,
        State__c,
        City__c,
        Street__c,
        PostalCode__c,
        Adress__c
      FROM DeliveryAdress__c
      WHERE Contact__c = :contactId
    ];

    return deliveryAdress;
  }

  @AuraEnabled(cacheable=true)
  public static List<DeliveryAdress__c> getDeliveryAdressById(String id) {
    List<DeliveryAdress__c> deliveryAdress = [
      SELECT
        Id,
        Country__c,
        State__c,
        City__c,
        Street__c,
        PostalCode__c,
        Adress__c,
        Custom_OrderId__c
      FROM DeliveryAdress__c
      WHERE Id = :id
      LIMIT 1
    ];

    return deliveryAdress;
  }
}
