angular.module('crossroads')

.factory "Contact", ($cookieStore, $http, $location, $rootScope) ->

  getMaritalStatusValues: ->
    $http.get('/getMaritalStatus')
      .then ((response) ->
        if typeof response.data is 'object'
          data = response.data
        else
          null
    ), (response) ->
      null

  getGenderValues: ->
    $http.get('/getGenders')
      .then ((response) ->
        if typeof response.data is 'object'
          data = response.data
        else
          null
    ), (response) ->
      null

  getContact:  (contactId) ->
    $http.get("/getContact/#{contactId}")
      .then ((response) ->
        if typeof response.data is 'object'
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
