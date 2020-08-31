public with sharing class MobileDataService {
  @AuraEnabled(cacheable=true)
  public static List<Product2> getAllMobiles() {
    String query = 'SELECT Name, Description, Picture__c, Price__c FROM Product2 LIMIT 10';
    return Database.query(query);
  }
  @AuraEnabled(cacheable=true)
  public static List<Mobile_Review__c> getAllReviews(Id mobileId) {
    return [
      SELECT
        Id,
        Name,
        Comment__c,
        Rating__c,
        LastModifiedDate,
        CreatedDate,
        Contact__c,
        Contact__r.Name
      FROM Mobile_Review__c
      WHERE Product__c = :mobileId
      ORDER BY CreatedDate DESC
    ];
  }

  @AuraEnabled(cacheable=true)
  public static List<Product2> getMobilesInOrder(String orderId) {
    return [
      SELECT Id, Name, Picture__c, Price__c
      FROM Product2
      WHERE Custom_OrderId__c = :orderId
    ];
  }
}