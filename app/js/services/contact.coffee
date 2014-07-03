angular.module('crossroads')

.factory "Contact", ($cookieStore, $http, $location, $rootScope) ->
  getContact: ->
    $http.get('/api/ministryplatformapi/PlatformService.svc/GetPageRecord?pageid=292&recordId=2')
      .then ((response) ->
        if typeof response.data is 'object'
          $rootScope.contact = response.data
          response.data
          console.log(response.data)
          data =
            emailaddress: extractFieldValue(response.data, 'Email_Address')
            firstname: extractFieldValue(response.data, 'First_Name')
            middlename: extractFieldValue(response.data, 'Middle_Name')
            lastname: extractFieldValue(response.data, 'Last_Name')
            maidenname: ''
            nickname: extractFieldValue(response.data, 'Nickname')
            mobile: extractFieldValue(response.data, 'Mobile_Phone')
            mobileprovider: ''
            birthdate: extractFieldValue(response.data, 'Date_of_Birth')
            maritalstatus: extractFieldValue(response.data, 'Marital_Status_ID_Text')
            gender: extractFieldValue(response.data, 'Gender_ID_Text')
            employer: extractFieldValue(response.data, 'Company_Name')
            startattending: extractFieldValue(response.data, 'Anniversary_Date')

        else
          null
    ), (response) ->
      null

extractFieldValue = (res, fieldName) ->

  #console.log(res.Fields);
  #console.log(res.Data);
  #console.log(res.Data[0]);
  if res.Fields and res.Data and res.Data[0]
    i = 0

    while i < res.Fields.length
      console.log res.Fields[i].Name
      console.log res.Data[0][res.Fields[i].Index]
      console.log res.Fields[i].DataType
      return res.Data[0][res.Fields[i].Index]  if res.Fields[i].Name is fieldName and res.Fields[i].DataType isnt 10
      return '2012-07-01'  if res.Fields[i].Name is fieldName and res.Fields[i].DataType is 10
      i++
  null
