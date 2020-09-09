public with sharing class BasketController {
  /* @AuraEnabled(cacheable=true)
    public static List<Product2> getProductList(Id contactId) {
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
    }*/

  /*@AuraEnabled(cacheable=true)
    public static Product2 getProductId() {
        Product2 prod = [SELECT Id, Name, Description, Price__c, PictureForBasket__c
            FROM Product2 WHERE Price__c > 0 LIMIT 1];
        return prod;
    }*/

  @AuraEnabled(cacheable=true)
  public static List<Basket__c> getBasketList(Id contactId) {
    List<Basket__c> baskets = [
      SELECT
        Name,
        UnitPrice__c,
        TotalPrice__c,
        Quantity__c,
        ProductStatus__c,
        ProductId__c,
        ProductId__r.Name,
        ProductId__r.Description,
        ProductId__r.Price__c,
        ProductId__r.Picture__c
      FROM Basket__c
      WHERE ContactId__c = :contactId AND CustomOrderId__r.Name = 'DraftOrder'
    ];

    System.debug('basket-----------------' + baskets);
    System.debug('basket size-----------------' + baskets.size());
    return baskets;
  }

  @AuraEnabled
  public static String saveOrder(Id contactId, Id orderId) {
    String str = 'Success';

    System.debug('contactId-----------------' + contactId);
    System.debug('orderId -----------------' + orderId);

    List<Basket__c> basketsToOrder = [
      SELECT
        Name,
        UnitPrice__c,
        TotalPrice__c,
        Quantity__c,
        ProductStatus__c,
        CustomOrderId__c,
        ContactId__c,
        ProductId__c,
        ProductId__r.Name,
        ProductId__r.Description,
        ProductId__r.Price__c,
        ProductId__r.Picture__c
      FROM Basket__c
      WHERE
        ContactId__c = :contactId
        AND CustomOrderId__r.Name = 'DraftOrder'
        AND ProductStatus__c = TRUE
    ];

    System.debug('basket-----------------' + basketsToOrder);
    System.debug('basket size-----------------' + basketsToOrder.size());

    for (Basket__c basket : basketsToOrder) {
      basket.CustomOrderId__c = orderId;
      System.debug('basket.Name-----------------' + basket.Name);
      System.debug(
        'basket.CustomOrderId__c -----------------' + basket.CustomOrderId__c
      );
    }

    update basketsToOrder;

    System.debug('basketsToOrder-----------------' + basketsToOrder);
    System.debug(
      'basketsToOrder size-----------------' + basketsToOrder.size()
    );
    System.debug(
      'basketsToOrder[0].CustomOrderId__c -----------------' +
      basketsToOrder[0].CustomOrderId__c
    );

    return str;
  }

  /*@AuraEnabled(cacheable=true)
    public static List<Product2> getProductIds(List<Basket__c> basketList) {
        Id cntId = [SELECT ContactId__c FROM basketList][0].Id;
        List<Product2> productList = [SELECT ProductId__r.Id, ProductId__r.Name, ProductId__r.Description, ProductId__r.Price__c, ProductId__r.Picture__c
            FROM Basket__c WHERE ContactId__c =: cntId ];
            System.debug('cntId-----------------'+cntId);
            System.debug('productList-----------------'+productList);
            System.debug('productList size-----------------'+productList.size());
        return productList;
    }

    @AuraEnabled(cacheable=true)
    public static List<Basket__c> getBasketItem() {
        //Basket__c basket = [SELECT Name, UnitPrice__c, TotalPrice__c, Quantity__c, ProductId__r.Id, ProductId__r.Name, ProductId__r.Description,
            ProductId__r.Price__c, ProductId__r.Picture__c
            FROM Basket__c WHERE UnitPrice__c > 0 ];
        return basket;
    }*/

  @AuraEnabled(cacheable=true)
  public static List<Product2> getProductList(Id contactId) {
    List<Basket__c> basketList = [
      SELECT Id, ProductId__c
      FROM Basket__c
      WHERE ContactId__c = :contactId AND CustomOrderId__r.Name = 'DraftOrder'
    ];
    System.debug('basketList-----------------' + basketList);
    List<String> productIds = new List<String>();
    for (Basket__c basketVar : basketList) {
      System.debug('ProductId__c-----------------' + basketVar.ProductId__c);
      productIds.add(basketVar.ProductId__c);
    }
    List<Product2> productList = [
      SELECT Name, Description, Price__c, Picture__c
      FROM Product2
      WHERE Id IN :productIds
    ];
    System.debug('cntId-----------------' + contactId);
    // System.debug('basketList-----------------'+basketList);
    System.debug('productIds-----------------' + productIds);
    System.debug('productList-----------------' + productList);
    System.debug('productList size-----------------' + productList.size());
    return productList;
  }

  @AuraEnabled(cacheable=true)
  public static Contact getContactName(Id recordId) {
    Contact cnt = [
      SELECT Name, LastName, FirstName
      FROM Contact
      WHERE OwnerId = :recordId
      LIMIT 1
    ];
    System.debug('cnt-----------------' + cnt);
    return cnt;

    /*
        Id cntId = [SELECT Id, Name, LastName, FirstName FROM Contact WHERE OwnerId =: recordId LIMIT 1].Id;
        System.debug('cntId-----------------'+cntId);
        return cntId;*/

    /*System.debug('return-----------------'+[SELECT Id, Name, LastName, FirstName FROM Contact WHERE OwnerId =: recordId LIMIT 1].Id);
     return [SELECT Id, Name, LastName, FirstName FROM Contact WHERE OwnerId =: recordId LIMIT 1].Id;*/
  }
}