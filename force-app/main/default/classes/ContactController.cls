public with sharing class ContactController {
  @AuraEnabled(cacheable=true)
  public static List<Contact> getContacts(String contactId) {
    List<Contact> contacts = [
      SELECT FirstName, LastName, Email
      FROM Contact
      WHERE Id = :contactId
    ];

    if (contacts.isEmpty()) {
      throw new AuraHandledException('Forced error');
    }

    return contacts;
  }
}
