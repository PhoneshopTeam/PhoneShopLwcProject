public with sharing class ChatterController {
    @AuraEnabled
    public static void addMessageInDatabase(String inputMessage) {
     Chat__c newChat = new Chat__c();
     newChat.MessageHistory__c= inputMessage;
     //newChat.Contact__c =  
     insert newChat;
    }
}