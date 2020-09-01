public with sharing class RegistrContactController {
    @AuraEnabled
    public static String saveContact(Contact newContact) {
     /*   User u = new User();
        u.Username = username;
        u.Email = email;
        u.CommunityNickname = communityNickname;
        u.FirstName = FirstName;
        u.Last_Name__c = communityNickname;*/
        String str = 'Success';

        System.debug('******************* registerComp ' + newContact);
        System.debug('******************* registerComp Name ' + newContact.LastName);
        System.debug('******************* registerComp Mail ' + newContact.Email);
        System.debug('******************* registerComp Password__c ' + newContact.Password__c);
        System.debug('******************* registerComp MailingAddress ' + newContact.MailingAddress);



        if(newContact != null){
            insert newContact;
        } 
        return str;

    }
}
