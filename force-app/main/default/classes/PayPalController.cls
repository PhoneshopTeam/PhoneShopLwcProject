public with sharing class PayPalController {
  @AuraEnabled(Cacheable=true)
  public static void createNewPayments(String contId, String orderId) {
    //  Custom_Order__c order = [SELECT Total_Amount__c, Status__c FROM Custom_Order__c WHERE Id = :'a032w000007KPf3AAG' LIMIT 1];
    Custom_Order__c order = [
      SELECT Total_Amount__c, Status__c
      FROM Custom_Order__c
      WHERE Id = :orderId
      LIMIT 1
    ];
    processPayments(order);
  }

  public static HttpResponse processPayments(Custom_Order__c order) {
    HttpRequest req = new HttpRequest();
    req.setHeader(
      'Authorization',
      'Basic QVRTM3pERHlpRFZSZ1hIU09iXzJPVWZhR3VhOUNheFZRQU5BRzdYM1FOR1ZkRnVvamNlTjBnRG5QeVc5U1lfOUxWdFBxanNBYXJHOUNFVno6RUlHY3dKTGdFT2k3V1gzUjd0OGhIOU1HeGtyTjI0ZnU3azM3bks3NVhsa0xNWktFcmxMQmdtTXg0eFFDYWpYbXJuZTdrLTJFVE9nXzdOSlY='
    );
    req.setHeader('Content-Type', 'application/json;charset=UTF-8');
    req.setEndpoint('https://api.sandbox.paypal.com/v2/checkout/orders');
    req.setMethod('POST');
    Decimal amount = order.Total_Amount__c;
    system.debug(amount);
    req.setBody(
      '{\"intent\":\"CAPTURE\",\"purchase_units\":[{\"amount\":{\"currency_code\":\"USD\",\"value\":\"' +
      amount +
      '\"}}]}'
    );
    // req.setBody('{\"intent\":\"CAPTURE\",\"purchase_units\":[{\"amount\":{\"currency_code\":\"USD\",\"value\":\""amount"\"}}]}');
    // req.setBody('{\"intent\":\"CAPTURE\",\"purchase_units\":[{\"amount\":{\"currency_code\":\"USD\",\"value\":\""+order.Total_Amount__c+"\"}}]}');
    Http h = new Http();
    HttpResponse res = h.send(req);
    system.debug(res);
    system.debug(order);
    if (res.getStatus() == 'Created') {
      update order;
    }
    system.debug(order);
    return res;
  }
}
