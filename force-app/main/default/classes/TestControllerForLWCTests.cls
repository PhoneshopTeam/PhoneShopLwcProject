public with sharing class TestControllerForLWCTests {
   @AuraEnabled(cacheable=true)
  public static Account getAccountList() {}
}
