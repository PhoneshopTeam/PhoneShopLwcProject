trigger DeleteRelatedMobileReviews on Product2(before delete) {
  List<Mobile_Review__c> reviewsForDelete = new List<Mobile_Review__c>();
  List<Id> reviewIdForDelete = new List<Id>();
  for (Product2 mobile : [
    SELECT Mobile_Review__c
    FROM Product2
    WHERE Id IN :Trigger.Old
  ]) {
    reviewIdForDelete.add(mobile.Mobile_Review__c);
  }
  for (Mobile_Review__c review : [
    SELECT Name
    FROM Mobile_Review__c
    WHERE Id IN :reviewIdForDelete
  ]) {
    reviewsForDelete.add(review);
  }
  delete reviewsForDelete;
}