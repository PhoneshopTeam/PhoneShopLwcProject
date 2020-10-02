@isTest
private class TestUpdateOrderTrigger {
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

    Custom_Order__c testOrder = new Custom_Order__c(
      Name = 'testOrder',
      Status__c = 'Draft',
      ContactId__c = selectedContact.Id,
      Discount__c = selectedContact.Personal_discont__c
    );
    insert testOrder;

    Custom_Order__c selectedOrder = [
      SELECT Id, Status__c
      FROM Custom_Order__c
      WHERE Name = 'testOrder'
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
  }

  @isTest
  static void testMethodTypeOfPaymentWithExeption() {
    System.debug('Userinfo.getProfileId() =' + Userinfo.getProfileId());

    // List<FieldPermissions> fpListForStatus = [
    //   SELECT
    //     SobjectType,
    //     Field,
    //     PermissionsRead,
    //     PermissionsEdit,
    //     Parent.ProfileId
    //   FROM FieldPermissions
    //   WHERE
    //     SobjectType = 'Custom_Order__c'
    //     AND Field = 'Custom_Order__c.Status__c'
    //     AND Parent.ProfileId = :Userinfo.getProfileId()
    // ];
    // System.debug(' fpListForStatus = ' + fpListForStatus);
    // if (!fpListForStatus.isEmpty()) {
    //   fpListForStatus[0].PermissionsEdit = false;
    // } else {
    //   System.debug('fpList.isEmpty');
    // }
    // update fpListForStatus;
    // System.debug(' fpListForStatus__c after update = ' + fpListForStatus);

    // List<FieldPermissions> fpListForTypeOfPayment = [
    //   SELECT
    //     SobjectType,
    //     Field,
    //     PermissionsRead,
    //     PermissionsEdit,
    //     Parent.ProfileId
    //   FROM FieldPermissions
    //   WHERE
    //     SobjectType = 'Custom_Order__c'
    //     AND Field = 'Custom_Order__c.Type_of_payment__c'
    //     AND Parent.ProfileId = :Userinfo.getProfileId()
    // ];

    // System.debug(' fpListForTypeOfPayment  = ' + fpListForTypeOfPayment);

    try {
      List<Custom_Order__c> customOrders = [
        SELECT Id, Name, Type_of_payment__c
        FROM Custom_Order__c
        WHERE Name = 'testOrder'
      ];
      System.debug('before update =' + customOrders);
      for (Custom_Order__c order : customOrders) {
        order.Type_of_payment__c = 'cash';
        System.debug('before trigger');
      }
      update customOrders;

      Custom_Order__c customOrderAfterUpdate = [
        SELECT Id, Status__c
        FROM Custom_Order__c
        WHERE Name = 'testOrder'
      ];

      System.debug('after update =' + customOrderAfterUpdate);
    } catch (Exception e) {
      System.debug(e.getMessage());
      System.debug('method testMethodTypeOfPaymentWithExeption catch');
      // System.assert(
      //   e.getMessage()
      //     .contains('first error: INVALID_OR_NULL_FOR_RESTRICTED_PICKLIST'),
      //   e.getMessage()
      // );
    }
  }

  @isTest
  static void testMethodTypeOfPaymentEqualCashWithoutDelivery() {
    List<Custom_Order__c> customOrders = [
      SELECT Id, Type_of_payment__c
      FROM Custom_Order__c
      WHERE Name = 'testOrder'
    ];

    for (Custom_Order__c order : customOrders) {
      order.Type_of_payment__c = 'cash';
    }
    update customOrders;
    Custom_Order__c customOrderAfterUpdate = [
      SELECT Id, Status__c
      FROM Custom_Order__c
      WHERE Name = 'testOrder'
    ];
    System.assertEquals(
      customOrderAfterUpdate.Status__c,
      'Awaiting payment;Without delivery'
    );
  }

  @isTest
  static void testMethodTypeOfPaymentEqualCashWithDelivery() {
    List<Custom_Order__c> customOrders = [
      SELECT Id, Type_of_payment__c, Delivery_date__c
      FROM Custom_Order__c
      WHERE Name = 'testOrder'
    ];

    for (Custom_Order__c order : customOrders) {
      order.Type_of_payment__c = 'cash';
      order.Delivery_date__c = Date.today();
    }
    update customOrders;
    Custom_Order__c customOrderAfterUpdate = [
      SELECT Id, Status__c
      FROM Custom_Order__c
      WHERE Name = 'testOrder'
    ];
    System.assertEquals(
      customOrderAfterUpdate.Status__c,
      'Awaiting payment;Awaiting delivery'
    );
  }

  @isTest
  static void testMethodTypeOfPaymentEqualByCardWithoutDelivery() {
    List<Custom_Order__c> customOrders = [
      SELECT Id, Type_of_payment__c
      FROM Custom_Order__c
      WHERE Name = 'testOrder'
    ];

    for (Custom_Order__c order : customOrders) {
      order.Type_of_payment__c = 'by card';
    }
    update customOrders;
    Custom_Order__c customOrderAfterUpdate = [
      SELECT Id, Status__c
      FROM Custom_Order__c
      WHERE Name = 'testOrder'
    ];
    System.assertEquals(
      customOrderAfterUpdate.Status__c,
      'Awaiting payment;Without delivery'
    );
  }

  @isTest
  static void testMethodTypeOfPaymentEqualByCardWithDelivery() {
    List<Custom_Order__c> customOrders = [
      SELECT Id, Type_of_payment__c, Delivery_date__c
      FROM Custom_Order__c
      WHERE Name = 'testOrder'
    ];

    for (Custom_Order__c order : customOrders) {
      order.Type_of_payment__c = 'by card';
      order.Delivery_date__c = Date.today();
    }
    update customOrders;
    Custom_Order__c customOrderAfterUpdate = [
      SELECT Id, Status__c
      FROM Custom_Order__c
      WHERE Name = 'testOrder'
    ];
    System.assertEquals(
      customOrderAfterUpdate.Status__c,
      'Awaiting payment;Awaiting delivery'
    );
  }

  @isTest
  static void testMethodTypeOfPaymentEqualByCardOnlineWithoutDeliveryBeforePayPal() {
    List<Custom_Order__c> customOrders = [
      SELECT Id, Type_of_payment__c
      FROM Custom_Order__c
      WHERE Name = 'testOrder'
    ];

    for (Custom_Order__c order : customOrders) {
      order.Type_of_payment__c = 'by card online';
    }
    update customOrders;

    Custom_Order__c customOrderAfterUpdate = [
      SELECT Id, Status__c
      FROM Custom_Order__c
      WHERE Name = 'testOrder'
    ];
    System.assertEquals(customOrderAfterUpdate.Status__c, 'Without delivery');
  }

  @isTest
  static void testMethodTypeOfPaymentEqualByCardOnlineWithDeliveryBeforePayPal() {
    List<Custom_Order__c> customOrders = [
      SELECT Id, Type_of_payment__c, Delivery_date__c
      FROM Custom_Order__c
      WHERE Name = 'testOrder'
    ];

    for (Custom_Order__c order : customOrders) {
      order.Type_of_payment__c = 'by card online';
      order.Delivery_date__c = Date.today();
    }
    update customOrders;

    Custom_Order__c customOrderAfterUpdate = [
      SELECT Id, Status__c
      FROM Custom_Order__c
      WHERE Name = 'testOrder'
    ];
    System.assertEquals(customOrderAfterUpdate.Status__c, 'Awaiting delivery');
  }
}
