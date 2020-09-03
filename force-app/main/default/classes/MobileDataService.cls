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
  public static List<Basket__c> getBasketsInOrder(String orderId) {
    return [
      SELECT
        Id,
        UnitPrice__c,
        Quantity__c,
        TotalPrice__c,
        ProductId__r.Id,
        ProductId__r.Picture__c,
        ProductId__r.Name
      FROM Basket__c
      WHERE CustomOrderId__c = :orderId
    ];
  }
}
