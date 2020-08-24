public with sharing class ContactController {
  @AuraEnabled(cacheable=true)
  public static List<Contact> getContacts(String contactId) {
    List<Contact> contacts = [
      SELECT FirstName, LastName, Email, Personal_discont__c
      FROM Contact
      WHERE Id = :contactId
    ];

    if (contacts.isEmpty()) {
      throw new AuraHandledException('Forced error');
    }
    return contacts;
  }

  // @AuraEnabled(cacheable=true)
  // public static List<DeliveryAdress__c> getDeliveryAdress(String contactId) {
  //   List<DeliveryAdress__c> deliveryAdress = [
  //     SELECT Id, Adress__c
  //     FROM DeliveryAdress__c
  //     WHERE Contact__c = :contactId
  //   ];

  //   if (deliveryAdress.isEmpty()) {
  //     throw new AuraHandledException('Forced error');
  //   }
  //   return deliveryAdress;
  // }
}
