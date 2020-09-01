public with sharing class MobileDataService{
	@AuraEnabled(cacheable = true)
	public static List<Product2> getMobilesList(Integer offset, Integer pageSize, String mobileBrand){
		if (mobileBrand.equals('')){
			return [SELECT Name, Description, Picture__c, Price__c
			        FROM Product2 
			        LIMIT :pageSize
			        OFFSET :offset];
		} else{
			return [SELECT Name, Description, Picture__c, Price__c
			        FROM Product2 
			        WHERE Brand__c = :mobileBrand
			        LIMIT :pageSize
			        OFFSET :offset];
		}
	}

	@AuraEnabled
	public static List<Mobile_Review__c> getAllReviews(Id mobileId){
		return [SELECT Id, Name, Comment__c, Rating__c, LastModifiedDate, CreatedDate, Contact__c, Contact__r.Name
		        FROM Mobile_Review__c 
		        WHERE Product__c = :mobileId
		        ORDER BY CreatedDate DESC];
	}

	@AuraEnabled
	public static Integer totalRecords(String mobileBrand){
		if (mobileBrand.equals('')){
			System.debug(mobileBrand);
			return [SELECT COUNT()
			        FROM Product2 ];
		} else{
			System.debug(mobileBrand);
			return [SELECT COUNT()
			        FROM Product2 
			        WHERE Brand__c = :mobileBrand];
		}
	}

	@AuraEnabled(cacheable = true)
	public static Integer getNext(Integer offset, Integer pageSize){
		offset += pageSize;
		return offset;
	}

	@AuraEnabled(cacheable = true)
	public static Integer getPrevious(Integer offset, Integer pageSize){
		offset -= pageSize;
		return offset;
	}

	@AuraEnabled(cacheable = true)
	public static List<FatchValueWrapper> getMobileBrands(sObject objInfo, string picklistFieldApi){
		Schema.DescribeSObjectResult objDescribe = objInfo.getSObjectType().getDescribe();
		map<String, Schema.SObjectField> fieldMap = objDescribe.fields.getMap();
		list<Schema.PicklistEntry> values = fieldMap.get(picklistFieldApi).getDescribe().getPickListValues();
		list<FatchValueWrapper> objWrapper = new list<FatchValueWrapper>();
		for (Schema.PicklistEntry a : values){
			FatchValueWrapper oFatchValueWrapper = new FatchValueWrapper();
			oFatchValueWrapper.slabel = a.getLabel();
			oFatchValueWrapper.svalue = a.getValue();
			objWrapper.add(oFatchValueWrapper);
		}
		return objWrapper;
	}

	public with sharing class FatchValueWrapper{
		@auraEnabled
		public string slabel{ get; set; }

		@auraEnabled
		public string svalue{ get; set; }
	}

	@AuraEnabled(cacheable = true)
	public static List<Product2> getMobilesInOrder(String orderId){
		return [SELECT Id, Name, Picture__c, Price__c
		        FROM Product2 
		        WHERE Custom_OrderId__c = :orderId];
	}
}