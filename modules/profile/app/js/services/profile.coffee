angular.module("crdsProfile")
.factory "Profile", ($http, $rootScope) ->

  profile =

    saveContact: (contact) ->
      console.log "save contact"

    getContact: (contactId) ->
      $http.get("/api2/GetPageRecord?pageId=292&recordId=#{contactId}").then (data) ->
        data.data[0]

    getMaritalStatusValues: ->
      $http.get('/api2/GetPageLookupRecords?pageId=339').then (data) ->
        data.data

    getGenderValues: ->
      $http.get('/api2/GetPageLookupRecords?pageId=311').then (data) ->
        data.data
