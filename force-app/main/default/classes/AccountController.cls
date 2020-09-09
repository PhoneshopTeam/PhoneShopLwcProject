public with sharing class AccountController {
  @AuraEnabled(cacheable=true)
  public static Account getAccount(Id recordId) {
    Account accountToReturn = [
      SELECT
        Name,
        Description,
        Logo__c,
        Working_hours__c,
        Email__c,
        Phone,
        BillingAddress,
        BillingStreet,
        BillingCity
      FROM Account
      WHERE ID = :recordId
    ];
    System.debug('accountToReturn' + accountToReturn);

    return accountToReturn;
  }

  @AuraEnabled(cacheable=true)
  public static Account getAccount(Id recordId) {
    Account accountToReturn = [
      SELECT
        Name,
        Description,
        Logo__c,
        Working_hours__c,
        Email__c,
        Phone,
        BillingAddress,
        BillingStreet,
        BillingCity
      FROM Account
      WHERE ID = :recordId
    ];
    System.debug('accountToReturn' + accountToReturn);

    return accountToReturn;
  }

  /*@AuraEnabled(cacheable=true)
    public static Account getAccounts() {
        //Id accId = [Select Id FROM Account LIMIT 1][0].Id;
        //System.debug('====================recordId: ' + recordId);
        Id recordId = '0012w00000K2JaZAAV';
        Account accountToReturn = [SELECT Name, BillingAddress, Description, Logo__c, Phone, Email__c, Working_hours__c
            FROM Account WHERE ID =: recordId][0];
        System.debug('accountToReturn'+accountToReturn);

        return accountToReturn;
    }

    @AuraEnabled(cacheable=true)
    public static Account getAccountID(Id recordId) {
>>>>>>> 912e72410abac9261f1ae40f34c5da9421792b57
        //Id accId = [Select Id FROM Account LIMIT 1][0].Id;
        //System.debug('====================recordId: ' + recordId);
        //Id accId = '0012w00000K2JXVAA3';
        Account accountToReturn = [SELECT Name, BillingAddress, Description, Logo__c, Phone, Email__c, Working_hours__c
            FROM Account WHERE ID =: recordId][0];
        System.debug('accountToReturn'+accountToReturn);

        return accountToReturn;
    }*/
}