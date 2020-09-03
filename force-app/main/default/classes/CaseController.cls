public with sharing class CaseController {
  @AuraEnabled(cacheable=true)
  public static List<Case> getCases(String contactId) {
    List<Case> cases = [
      SELECT Id, CaseNumber, Status
      FROM Case
      WHERE ContactId = :contactId
    ];
    return cases;
  }
}
