describe "Menu", ->
  beforeEach module("crossroads")

  beforeEach inject (Menu) ->
    @menu = Menu

  it "toggles mobile display", ->
    expect(@menu.isMobileShowing).toBeFalsy()
    @menu.toggleMobileDisplay()
    expect(@menu.isMobileShowing).toBeTruthy()

  describe "toggleSelecteMenuItem", ->
    it "selects index when nothing selected", ->
      expect(@menu.selectedMenuItem).toBeFalsy()
      @menu.toggleMenuItem(2)
      expect(@menu.selectedMenuItem).toEqual(2)

    it "unselects if same index is toggled", ->
      @menu.toggleMenuItem(2)
      @menu.toggleMenuItem(2)
      expect(@menu.selectedMenuItem).toBeFalsy()
