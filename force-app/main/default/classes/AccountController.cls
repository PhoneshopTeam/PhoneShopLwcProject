public with sharing class AccountController {
  @AuraEnabled(cacheable=true)
  public static Account getAccount() {
    //Id accId = [Select Id FROM Account LIMIT 1][0].Id;
    //System.debug('====================recordId: ' + recordId);
    Id recordId = '0012w00000K2JaZAAV';
    Account accountToReturn = [
      SELECT Name
      FROM Account
      WHERE ID = :recordId
    ][0];
    System.debug('accountToReturn' + accountToReturn);

    return accountToReturn;
  }

  /*public static Account getAccount(Id recordId) {
        //Id accId = [Select Id FROM Account LIMIT 1][0].Id;
        //System.debug('====================recordId: ' + recordId);
        //Id accId = '0012w00000K2JXVAA3';
        Account accountToReturn = [SELECT Name, BillingAddress, Description, Logo__c, Phone, Email__c, Working_hours__c
            FROM Account WHERE ID =: recordId][0];
        System.debug('accountToReturn'+accountToReturn);

        return accountToReturn;
    }*/
}
