public with sharing class BasketController {
    @AuraEnabled(cacheable=true)
    public static List<Product2> getProductList() {
        List<Product2> productList = [SELECT Id, Name, Description, Price__c, PictureForBasket__c 
            FROM Product2 WHERE Price__c > 0 LIMIT 10];
            System.debug('productList-----------------'+productList);
            System.debug('productList size-----------------'+productList.size());
        return productList;
    }

    @AuraEnabled(cacheable=true)
    public static Product2 getProduct(Id recordId) {
        return [SELECT Name, Description, Price__c, PictureForBasket__c 
            FROM Product2 WHERE Id =: recordId];
    }

    @AuraEnabled(cacheable=true)
    public static Product2 getProductId() {
        Product2 prod = [SELECT Id, Name, Description, Price__c, PictureForBasket__c 
            FROM Product2 WHERE Price__c > 0 LIMIT 1];
        return prod;
    }
}
