public with sharing class RegistrationController {
    @AuraEnabled
    public static void saveUser(String fName, String lName, String mail) {
     /*   User u = new User();
        u.Username = username;
        u.Email = email;
        u.CommunityNickname = communityNickname;
        u.FirstName = FirstName;
        u.Last_Name__c = communityNickname;*/

        System.debug('******************* fName ' + fName);
        System.debug('******************* lName ' + lName);
        System.debug('******************* mail ' + mail);

      /*  if(user != null){
            insert user;
        } */

        UserRole obj=new UserRole(Name= 'ABC'); 
        insert obj; 

        Profile pf= [Select Id from profile where Name='System Administrator']; 

        String orgId=UserInfo.getOrganizationId(); 
        String dateString=String.valueof(Datetime.now()).replace(' ','').replace(':','').replace('-',''); 

        Integer RandomId=Integer.valueOf(Math.rint(Math.random()*1000000)); 
        String uniqueName=orgId+dateString+RandomId; 

        User uu=new User(firstname = fName, 
            lastName = lName, 
            email = mail, 
            Username = uniqueName + '@test' + orgId + '.org', 
            EmailEncodingKey = 'ISO-8859-1', 
            Alias = uniqueName.substring(18, 23), 
            TimeZoneSidKey = 'America/Los_Angeles', 
            LocaleSidKey = 'en_US', 
            LanguageLocaleKey = 'en_US', 
            ProfileId = pf.Id, 
            UserRoleId = obj.Id
        ); 
        insert uu;
    }
}
