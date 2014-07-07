angular.module('crossroads')

.factory "Contact", ($cookieStore, $http, $location, $rootScope) ->
  getSomething: ->
    console.log("getSomething")
    $http.get('/api/ministryplatformapi/PlatformService.svc/GetPageRecord?pageid=339')
      .then ((response) ->
        console.log response.data
        if typeof response.data is 'object'
          $rootScope.lookup = response.data
          # null
          # $rootScope.lookup = "abc"
        else
          null
    ), (response) ->
      null
  getContact: ->
    $http.get('/api/ministryplatformapi/PlatformService.svc/GetPageRecord?pageid=292&recordId=2')
      .then ((response) ->
        if typeof response.data is 'object'
          # $rootScope.contact = response.data
          # response.data
          # console.log(response.data)
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
            maritalstatus: extractFieldValue(response.data, 'Marital_Status_ID')
            gender: extractFieldValue(response.data, 'Gender_ID_Text')
            employer: extractFieldValue(response.data, 'Company_Name')
            startattending: extractFieldValue(response.data, 'Anniversary_Date')

        else
          null
    ), (response) ->
      null

extractFieldValue = (res, fieldName) ->
  if res.Fields and res.Data and res.Data[0]
    i = 0

    while i < res.Fields.length
      if res.Fields[i].Name is fieldName and res.Fields[i].DataType isnt 10
        key = res.Fields[i].Name
        value = res.Data[0][res.Fields[i].Index]
        mp =
          key: key
          value: value
        return mp
      if res.Fields[i].Name is fieldName and res.Fields[i].DataType is 10
        key = res.Fields[i].Name
        value = res.Data[0][res.Fields[i].Index]
        mp =
          key: key
          value: extractDateValue(value)
        return mp
      i++
  null

extractDateValue = (mpString) ->
  unixTimestamp = mpString.match(/\((.*?)-/)
  if unixTimestamp != null
    date = new Date(Number(unixTimestamp[1]))
    year = date.getFullYear()
    month = date.getMonth() + 1
    day = date.getDate()
    stringDate = "#{month}/#{day}/#{year}"
    return stringDate
  null
