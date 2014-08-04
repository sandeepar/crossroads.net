angular.module("crdsProfile")
.factory "Profile", ($http, $rootScope) ->

  profile =

    saveContact: (contact) ->
      console.log "save contact"

    getContact: (contactId) ->
      console.log "getContact"
      $http.get("/getContact/#{contactId}")
        .then ((response) ->
          if typeof response.data is 'object'
            data =
              emailaddress: profile.extractFieldValue(response.data, 'Email_Address')
              firstname: profile.extractFieldValue(response.data, 'First_Name')
              middlename: profile.extractFieldValue(response.data, 'Middle_Name')
              lastname: profile.extractFieldValue(response.data, 'Last_Name')
              maidenname: ''
              nickname: profile.extractFieldValue(response.data, 'Nickname')
              mobile: profile.extractFieldValue(response.data, 'Mobile_Phone')
              mobileprovider: ''
              birthdate: profile.extractFieldValue(response.data, 'Date_of_Birth')
              maritalstatus: profile.extractFieldValue(response.data, 'Marital_Status_ID')
              gender: profile.extractFieldValue(response.data, 'Gender_ID_Text')
              employer: profile.extractFieldValue(response.data, 'Company_Name')
              startattending: profile.extractFieldValue(response.data, 'Anniversary_Date')

          else
            null
      ), (response) ->
        null

    getMaritalStatusValues: ->
      console.log "getMaritalStatusValues"
      $http.get('/getMaritalStatus')
        .then ((response) ->
          if typeof response.data is 'object'
            data = profile.formatValues(response.data)
          else
            null
      ), (response) ->
        null

    getGenderValues: ->
      console.log "getGenderValues"
      $http.get('/getGenders')
        .then ((response) ->
          if typeof response.data is 'object'
            data = profile.formatValues(response.data)
          else
            null
      ), (response) ->
        null

    formatValues: (data) ->
      output = []
      i = 0

      while i < data.length
        element =
          id: data[i][0]
          value: data[i][1]

        output.push element
        i++
      output

    extractFieldValue: (res, fieldName) ->
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
              value: profile.extractDateValue(value)
            return mp
          i++
      null

    extractDateValue: (mpString) ->
      if !mpString
        return null
      unixTimestamp = mpString.match(/\((.*?)-/)
      if unixTimestamp != null
        date = new Date(Number(unixTimestamp[1]))
        year = date.getFullYear()
        month = date.getMonth() + 1
        day = date.getDate()
        stringDate = "#{month}/#{day}/#{year}"
        return stringDate
      null
