public with sharing class PayPalController {
@AuraEnabled(Cacheable=true)
public static void  createNewPayments(String contId, String orderId){
    String jsonobj;
    List<sObject>objlst;
    Contact cont = [SELECT Id, Name, Email, MailingAddress FROM Contact WHERE Id = :contId LIMIT 1];
    jsonobj=json.serializePretty(cont);
   Custom_Order__c order = [SELECT Id, Quantity__c, Status__c, Unit_Price__c,Type_of_payment__c FROM Custom_Order__c LIMIT 1];
   jsonobj=jsonobj+','+json.serializePretty(order);
   objlst=new list<sObject >();
   objlst=(list<sObject>)json.deserialize(jsonobj,list<sObject >.class);
   processPayments(objlst);
  
}
public static void processPayments(List<SObject> objlst){
    Http http = new Http();
    HttpResponse response = new HttpResponse();
    HttpRequest request = generateRequest(objlst);
    response = http.send(request);
    String rawResponse = response.getBody();
}
public static HttpRequest generateRequest(List<SObject> objlst) {
    String purl = 'sandbox.paypal.com';
    String user = 'phoneshoplwc@gmail.com';
    String pass = 'Q1w2e3r4t5y6';
    String sign = 'AYhigAozNLfbM9tmIH-ngqtxCFKu5nSgO3WWZ6gaKXUxz1uMjsEM5Whxj329wdGurff7hEU9FVA_UOpH';
    HttpRequest req = new HttpRequest();
    String url = 'https://api-3t.' + purl + '/2.0';
    String requestBody =  generateMsgBody(objlst, user, pass, sign);
    req.setEndpoint(url);
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

    if (res.getStatus() == 'Created') {
      update order;
    }
    system.debug(order);
    return res;
  }
}
}