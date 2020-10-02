@isTest
private class HttpResponseTest {
  @TestSetup
  static void setData() {
    Product2 testProduct = new Product2(
      Name = 'Test',
      Price__c = 300,
      Total_Quantity__c = 3,
      Brand__c = 'Samsung',
      Flash_Memory__c = 64,
      Operating_System__c = 'Nokia Series 30+',
      RAM__c = 8,
      Screen_Resolution__c = '1024X1080',
      Screen_Size__c = 7
    );
    insert testProduct;

    Product2 selectedProduct = [
      SELECT Id, Price__c
      FROM Product2
      WHERE Name = 'Test'
    ];

    Contact testContact = new Contact(
      FirstName = 'John',
      LastName = 'Smithd',
      Personal_discont__c = 10
    );
    insert testContact;

    Contact selectedContact = [
      SELECT Id, Personal_discont__c
      FROM Contact
      WHERE FirstName = 'John' AND LastName = 'Smithd'
    ];

    DeliveryAdress__c adress = new DeliveryAdress__c(
      Name = 'Test adress',
      Country__c = '1',
      State__c = '1',
      City__c = '1',
      Street__c = '1',
      Contact__c = selectedContact.Id
    );
    insert adress;

    DeliveryAdress__c selectedAdress = [
      SELECT Id, Adress__c
      FROM DeliveryAdress__c
      WHERE Name = 'Test adress'
    ];

    List<Custom_Order__c> testOrders = new List<Custom_Order__c>();
    testOrders.add(
      new Custom_Order__c(
        Name = 'testOrder1',
        Status__c = 'Draft',
        ContactId__c = selectedContact.Id,
        Discount__c = selectedContact.Personal_discont__c
      )
    );
    testOrders.add(
      new Custom_Order__c(
        Name = 'testOrder2',
        Status__c = 'Draft',
        ContactId__c = selectedContact.Id,
        Discount__c = selectedContact.Personal_discont__c,
        Delivery_address__c = selectedAdress.Adress__c,
        Delivery_date__c = Date.today()
      )
    );
    insert testOrders;

    Custom_Order__c selectedOrder = [
      SELECT Id, Status__c
      FROM Custom_Order__c
      WHERE Name = 'testOrder1'
    ];

    Custom_Order__c selectedOrder2 = [
      SELECT Id, Status__c
      FROM Custom_Order__c
      WHERE Name = 'testOrder2'
    ];

    Basket__c testBasket = new Basket__c(
      ProductId__c = selectedProduct.Id,
      ContactId__c = selectedContact.Id,
      CustomOrderId__c = selectedOrder.Id,
      ProductStatus__c = true,
      Quantity__c = 1,
      UnitPrice__c = selectedProduct.Price__c
    );
    insert testBasket;

    Basket__c testBasket2 = new Basket__c(
      ProductId__c = selectedProduct.Id,
      ContactId__c = selectedContact.Id,
      CustomOrderId__c = selectedOrder2.Id,
      ProductStatus__c = true,
      Quantity__c = 1,
      UnitPrice__c = selectedProduct.Price__c
    );
    insert testBasket2;

    HelperForCustomOrderTrigger.firstcall = false;
    for (Custom_Order__c o : testOrders) {
      o.Type_of_payment__c = 'by card online';
    }
    update testOrders;
  }

  @isTest
  static void testCalloutWithoutDelivery() {
    List<Custom_Order__c> customOrders = [
      SELECT Id, Type_of_payment__c, Total_Amount_With_Discount__c, Status__c
      FROM Custom_Order__c
      WHERE Name = 'testOrder1'
    ];

    System.debug('customOrder = ' + customOrders);
    Test.startTest();
    // Set mock callout class
    Test.setMock(HttpCalloutMock.class, new MockHttpResponsePaypal());

    // Call method to test.
    // This causes a fake response to be sent
    // from the class that implements HttpCalloutMock.
    HttpResponse res = PayPalController.processPayments(customOrders[0]);

    // Verify response received contains fake values
    String contentType = res.getHeader('Content-Type');
    System.assert(contentType == 'application/json');
    String actualValue = res.getBody();
    String expectedValue = '{"example":"test"}';
    String actualValueStatus = res.getStatus();
    String expectedValueStatus = 'Created';
    System.assertEquals(actualValue, expectedValue);
    System.assertEquals(actualValueStatus, expectedValueStatus);
    System.assertEquals(201, res.getStatusCode());
    Test.stopTest();
  }

  @isTest
  static void testCalloutWithDelivery() {
    List<Custom_Order__c> customOrders = [
      SELECT Id, Type_of_payment__c, Total_Amount_With_Discount__c, Status__c
      FROM Custom_Order__c
      WHERE Name = 'testOrder2'
    ];

    System.debug('customOrder = ' + customOrders);
    Test.startTest();
    // Set mock callout class
    Test.setMock(HttpCalloutMock.class, new MockHttpResponsePaypal());

    // Call method to test.
    // This causes a fake response to be sent
    // from the class that implements HttpCalloutMock.
    HttpResponse res = PayPalController.processPayments(customOrders[0]);

    // Verify response received contains fake values
    String contentType = res.getHeader('Content-Type');
    System.assert(contentType == 'application/json');
    String actualValue = res.getBody();
    String expectedValue = '{"example":"test"}';
    String actualValueStatus = res.getStatus();
    String expectedValueStatus = 'Created';
    System.assertEquals(actualValue, expectedValue);
    System.assertEquals(actualValueStatus, expectedValueStatus);
    System.assertEquals(201, res.getStatusCode());
    Test.stopTest();
  }
}